# minnojs-qiat
Implementation of qiat in MinnoJS

### Installation
In order to use the qiat, first copy the [settings file](./settings.js) and modify it according to your needs.
Documentation of all parameters can be found inline.
Upload the settings file to a server and make sure you know the URL to it.

Next, in order to integrate with qualtrics, create a text question in your survey and set it up as a `Multiline` question.
Make sure that there is a page break before and after it.

Click the cog at the left of the question in order to see the question settings dropdown.
Choose `Add Javascript`, and copy-paste the code from [`qulatrics.js`](./qualtrics.js).
Change the `url` variable at the top of the file to point to your settings file.
That's it.

The qiat will save the results of the task as a CSV into the question column.

### Parsing
You can use the code in [`parse.R`](./parse.R) in order to parse your data.
You should run the code in R, it will add the function `qiat.parse` into your environment.
Then read your qulatrics data into a data frame (make sure you clean the first rows that describe the columns first).
And parse it using `qiat.parse`.

The arguments to the function are as follows:

Argument    | description
----------- | -----------
df          | The data frame with all the data from qualtrics
id          | The column in the df holding the unique identifier you want to keep
dataColumn  | The column in the df holding the qiat data

Assuming you want to use `ResponseId` as a unique identifier and the qiat data is held in `Q4`,
your code will look something like this:

```r
df = read.csv('data.csv') # if you are on R version < 4.0 you will need to add stringsAsFactors = FALSE
parsed = qiat.parse(df, ResponseId, Q4)
```

### Legend
Each row in the reponse represents a single stimulus-response pair.
The interpertation of the data exported from the qIAT is as follows:

Column      | Description
----------- | -----------
id          | The value of the ID column as defined in minno.parse
condition   | Randomization condition (can be 0 or 1) - condition 1 indicates that category1 started out on the left and vice versa
group       | The name of the stimulus group as defined in the settings file (e.g. category1.name)
latency     | The response latency in miliseconds
block       | Block number
stimulus    | The index of the stimulus as defined in the settings file
correct     | Whether the initial response was correct (1 if yes, 0 if no)

### Analysis

We provide R code in order to analyze your data.
Before you can use it, please make sure that you have `tidyverse` installed.
If you don't - this is how you install it:

```r
install.packages('tidyverse')
```

Not you can use the code in [`analyze.R`](./analyze.R) in order to parse your data.
You should run the code in R, it will add the function `qiat.analyze` into your environment.

Now you can input the parsed data from `qiat.parse` into `qiat.analyze`.

```R
results = qiat.analyze(parsed)
```

If you want to change the default parameters, you can do that too:

```r
results = qiat.analyze(
  parsed,
  
  cong = c(4),
  incong = c(6),
  
  exclusion_too_fast = 300,
  exclusion_max_fast_perc = 0.1,
  exclusion_max_error_perc = 0.2,
  exclusion_max_latency = 3e4,
  
  analyze_max_latency = 1e4,
  analyze_min_latency = 400
)
```

Argument                    | Description
--------------------------- | -----------
cong                        | Vector of congruent blocks (i.e. `c(3,4)`)
incong                      | Vector of incongruent blocks (i.e. `c(6,7)`)
exclusion\_too\_fast        | Latency defined as too fast for computing percent of fast trials
exclusion\_max\_fast\_perc  | Percent of fast trials considered cause for exclusion
exclusion\_max\_error\_perc | Percent of error trials considered cause for exclusion
exclusion\_max\_latency     | Maximum latency of a tiral considered cause for exclusion
analyze\_max\_latency       | Maximum latency of trials used for computing the dscore
analyze\_min\_latency       | Minimum latency of trials used for computing the dscore

### Outcome

The results from `qiat.analyze` is a list of 5 data.frames:

Key             | Description
---             | ---
trials          | A data.frame with all trials with the addition of global and within block indexes
participants    | A data.frame with all participants, their exclusion statistics and dscores
dscore.all      | A data.frame with participants and auxilary scores for computing their dscores
dscore.even     | A data.frame with participants and auxilary scores for computing their dscores for even trials
dscore.odd      | A data.frame with participants and auxilary scores for computing their dscores for odd trials

