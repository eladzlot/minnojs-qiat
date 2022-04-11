library(tidyverse, hash)

# Analyze qiat/iat data
#
# @param data (data.frame) <id, block(int), latency(int), correct(0,1), condition(1,2)>
#
# @param cong (int) blocks in condition 1, dflt:c(4)
# @param incong (int) blocks in condition 2, dflt:c(6)
#
# Criteria for excluding participants: 
# @param exclusion_too_fast (int) criteria of too fast trial for exclusion_max_fast_perc dflt:300,
# @param exclusion_max_fast_perc (double) maximum percent of fast trials dflt:0.1
# @param exclusion_max_error_perc (double) maximum percent of errors dflt:0.2
# @param exclusion_max_latency (int) maximum latency dflt:30000
#  
# Criteria for excluding trials from analysis
# @param analyze_max_latency (int) maximum valid latency dflt:10000
# @param analyze_min_latency (int) minimum valid latency dflt:400

# PAIRED_EVENS variable is defined to divide evens and odds by pairs:  
# 1 is even | 2&3 are odds | 4&5 are evens | 6&7 are odds ... and so on. 
PAIRED_EVENS = c(0,1)

qiat.analyze = function (
  data,
  
  cong = c(4),
  incong = c(6),
  
  exclusion_too_fast = 300,
  exclusion_max_fast_perc = 0.1,
  exclusion_max_error_perc = 0.2,
  exclusion_max_latency = 3e4,
  
  analyze_max_latency = 1e4,
  analyze_min_latency = 400
){
  
  if (length(cong) != length(incong)) stop('cong and incong must be the same length')
  # @TODO: error if missing columns from data
  
  # PAIRED_EVENS variable is defined to divide evens and odds by pairs  
  # 1 is even | 2&3 are odds | 4&5 are evens | 6&7 are odds ... and so on 
  trials.tidy = data %>%
    mutate(isEven = row_number() %% 2) %>%
    mutate(isPairedEven = (row_number() %% 4) %in% PAIRED_EVENS) %>%
    group_by(id) %>% mutate(trialN = row_number()) %>% ungroup() %>%
    group_by(id,block) %>% mutate(trialNBlock = row_number()) %>% ungroup()
  
  # left and rights are also a new way of calculating split half reliability. 
  # each subject gets 20 trial assign to left randomly and the other 20 are
  # assign to right, and the reliability would be calculated based on them.
  
  random_lefts = hash()
  for (id in unique(trials.tidy$id)) {
    random_lefts[id] = sample(c(0:19), size = 10, replace = F)
  }
  
  isLeft = c()
  for (idx in c(1:length(trials.tidy$id))) {
    id = trials.tidy$id[idx]
    isLeft[idx] = (trials.tidy$trialNBlock[idx] %% 20) %in% random_lefts[[id]]
  }
  
  trials.tidy$isLeft = isLeft
  
  participants.validity = trials.tidy %>%
    group_by(id) %>%
    summarize(
      .groups = 'drop',
      nTrials = sum(block %in% c(cong,incong)),
      maxLatency = max(latency, na.rm = TRUE),
      percFast = sum((block %in% c(cong,incong)) & (latency<=exclusion_too_fast))/nTrials,
      percError = sum((block %in% c(cong,incong)) & !correct)/nTrials,
      exclude = percError>exclusion_max_error_perc | percFast>exclusion_max_fast_perc | maxLatency>exclusion_max_latency | nTrials < 40
    ) %>% 
    ungroup()
  
  dscore = function(df){
    # already grouped by id and block as well as filtered from bad trials
    outcome = df %>%
      summarise(
        .groups = 'drop',
        condition = first(condition), 
        n = n(), 
        mean = mean(latency), 
        var = var(latency)
      ) %>%
      pivot_wider(names_from = block, values_from = c(mean,var,n))
      
      for (i in 1:length(cong)){
        varCong = outcome[,paste0('var_',cong[i])]
        varIncong = outcome[,paste0('var_',incong[i])]
        nCong = outcome[,paste0('n_',cong[i])]
        nIncong = outcome[,paste0('n_',incong[i])]
        meanCong = outcome[,paste0('mean_',cong[i])]
        meanIncong = outcome[,paste0('mean_',incong[i])]
        pooled_sd = sqrt(
          (
            varCong * (nCong-1) 
            + varIncong * (nIncong - 1) 
          ) 
          / (nCong+nIncong-2)
        )
        dscore = (meanCong-meanIncong)/pooled_sd
        outcome[,paste0('dscore_',i)] = dscore * ifelse(outcome$condition == 0, 1, -1)
        outcome[,paste0('pooledSD_',i)] = pooled_sd
      }
      if (length(cong) == 1) outcome$dscore = outcome$dscore_1
      else outcome$dscore = (outcome$dscore_1+outcome$dscore_2)/2
      outcome
  }
  
  trials.good = trials.tidy %>% 
    filter(block %in% c(cong,incong)) %>%
    group_by(id, block) %>%
    filter(latency >= analyze_min_latency, latency <= analyze_max_latency)
  
  dscores.all = dscore(trials.good)
  dscores.even = dscore(trials.good %>% filter(isEven == 0))
  dscores.odd = dscore(trials.good %>% filter(isEven == 1))
  dscores.paired.even = dscore(trials.good %>% filter(isPairedEven == 1))
  dscores.paired.odd = dscore(trials.good %>% filter(isPairedEven == 0))
  dscores.random.lefts = dscore(trials.good %>% filter(isLeft == 1)) 
  dscores.random.rights = dscore(trials.good %>% filter(isLeft == 0))
  
    list(
      trials = trials.tidy,
      dscores.all = dscores.all,
      dscores.even = dscores.even,
      dscores.odd = dscores.odd,
      dscores.paired.even = dscores.paired.even,
      dscores.paired.odd = dscores.paired.odd,
      dscores.random.lefts = dscores.random.lefts,
      dscores.random.rights = dscores.random.rights,
      participants = participants.validity %>%
        left_join(dscores.all %>% select(id,condition, dscore), by = 'id') %>%
        left_join(dscores.even %>% select(id,dscore_even = dscore), by = 'id') %>%
        left_join(dscores.odd %>% select(id,dscore_odd = dscore), by = 'id') %>%
        left_join(dscores.paired.even %>% select(id,dscore_paired_even = dscore), by = 'id') %>%
        left_join(dscores.paired.odd %>% select(id,dscore_paired_odd = dscore), by = 'id') %>%
        left_join(dscores.random.lefts %>% select(id,dscore_lefts = dscore), by = 'id') %>%
        left_join(dscores.random.rights %>% select(id,dscore_rights = dscore), by = 'id') 
    )
}
