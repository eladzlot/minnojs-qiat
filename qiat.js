define(['timeAPI','underscore'], function(APIConstructor, _) {
    return function qiat(settings) {
        var API = new APIConstructor();
        var current = API.addCurrent(settings);

        var catColor = '#FFFF00';
        var attColor = '#00FFFF';
        var catSize = '1.4em';
        var attSize = '1.4em';
        var tmp;

        API.addSequence([
            {inherit:'instructions', data:{content:current.preTaskInstructions, center:'top'}},

            // block 1
            {inherit:'instructions', data:{content:current.instAttributeInventory, center:'top'}},
            {inherit:'instructions', data:{content:current.instAttributePractice, showLayout:true, type:'attribute', side:1, center:'bottom'}},
            {inherit:'instructions', data:{content:current.startBlockInst, showLayout:true, type:'attribute', side:1}},
            getTrials({side:1, type:'attribute', n:2, block:1}),

            // block 2
            {inherit:'instructions', data:{content:current.instCategoryInventory, center:'top'}},
            {inherit:'instructions', data:{content:current.instCategoryPracticeHinted, showLayout:true, type:'category', side:1, center:'bottom'}},
            {inherit:'instructions', data:{content:current.startBlockInst, showLayout:true, type:'attribute', side:1}},
            getTrials({side:1, type:'category', n:2, block:2, hint:'true'}),

            // block 3
            {inherit:'instructions', data:{content:current.instCategoryPractice, showLayout:true, side:1, type:'category'}},
            {inherit:'instructions', data:{content:current.startBlockInst, showLayout:true, type:'attribute', side:1}},
            getTrials({side:1, type:'category', n:4, block:3}),

            // block 4
            {inherit:'instructions', data:{content:current.instDouble, showLayout:true, side:2, type:'double', center:'bottom'}},
            {inherit:'instructions', data:{content:current.startBlockInst, showLayout:true, type:'attribute', side:2}},
            getTrials({side:1, type:'double', n:4, block:4}),

            // block 5
            {inherit:'instructions', data:{content:current.instSwitchPractice, showLayout:true, side:1, type:'category', center:'bottom'}},
            {inherit:'instructions', data:{content:current.startBlockInst, showLayout:true, type:'attribute', side:1}},
            getTrials({side:2, type:'category', n:4, block:5}),

            // block 6
            {inherit:'instructions', data:{content:current.instSwitch, showLayout:true, side:2, type:'double', center:'bottom'}},
            {inherit:'instructions', data:{content:current.startBlockInst, showLayout:true, type:'attribute', side:2}},
            getTrials({side:2, type:'double', n:4, block:6})
        ]);

        /** 
         * Randomly switch category/attribute order
         **/
        if (Math.random() > 0.5) {
            tmp = current.category1;
            current.category1 = settings.category2;
            current.category2 = tmp;
        }
        if (Math.random() > 0.5) {
            tmp = current.attribute1;
            current.attribute1 = settings.attribute2;
            current.attribute2 = tmp;
        }
        
        API.addSettings('logger', {
            // gather logs in array
            onRow: function(logName, log, settings, ctx){
                if (!ctx.logs) ctx.logs = [];
                ctx.logs.push(log);
            },
            // onEnd trigger save (by returning a value)
            onEnd: function(name, settings, ctx){
                return ctx.logs;
            },
            // Transform logs into a string
            serialize: function(name, logs, settings){
                return JSON.stringify(logs);
            },
            // Set logs into an input (i.e. put them wherever you want)
            send: function(name, serialized, settings, ctx){
                (window.minnoJS.logger || _.noop)(serialized);
            }
        });
        
        API.addSettings('onEnd', window.minnoJS.onEnd || _.noop)

        API.addSettings('canvas', {
            proportions: {width: 700, height: 504},
            background: '#3d3e3f',
            borderWidth: 0,
            canvasBackground: '#3d3e3f',
            css: { color: 'white', borderTop: '2px solid #e7e7e9', lineHeight:1.2, fontWeight:400 }
        });

        API.addTrialSets('sort', {
            input: [
                { handle: 'skip1', on: 'keypressed', key: 27 }, //Esc + Enter will skip blocks
                { handle: 'left', on: 'keypressed', key: 'd' },
                { handle: 'right', on: 'keypressed', key: 'l' }
            ],

            layout: [
                {inherit: 'layoutLeft'},
                {inherit: 'layoutRight'}
            ] ,

            interactions: [
                // begin trial : display stimulus immediately
                {
                    conditions: [{ type: 'begin' }],
                    actions: [{ type: 'showStim', handle: 'targetStim' }]
                },

                // error response
                {
                    conditions: [
                        { type: 'inputEqualsTrial', property: 'corResp', negate: true }, //Not the correct response.
                        { type: 'inputEquals', value: ['right', 'left'] }	// responded with one of the two responses
                    ],
                    actions: [
                        { type: 'setTrialAttr', setter: { score: 0 } },	// set the score to 1
                        { type: 'showStim', handle: 'error' }, // show error stimulus
                        { type: 'trigger', handle: 'onError' }	// perhaps we need to end the trial (if no errorCorrection)
                    ]
                },

                // error when there is no correction
                {
                    conditions: [
                        { type: 'trialEquals', property: 'errorCorrection', value: false }, //no error correction.
                        { type: 'inputEquals', value: 'onError' } //Was error
                    ],
                    actions: [
                        { type: 'removeInput', handle: 'All' }, //Cannot respond anymore
                        { type: 'log' }, // log this trial
                        { type: 'trigger', handle: 'ITI', duration: 500 } // Continue to the ITI, after that error fb has been displayed
                    ]
                },

                // correct
                {
                    conditions: [{ type: 'inputEqualsTrial', property: 'corResp' }],	// check if the input handle is equal to correct response (in the trial's data object)
                    actions: [
                        { type: 'removeInput', handle: 'All' }, //Cannot respond anymore
                        { type: 'log' }, // log this trial
                        { type: 'trigger', handle: 'ITI' } // End the trial after ITI
                    ]
                },

                // Display nothing for ITI until the next trial
                {
                    conditions: [{ type: 'inputEquals', value: 'ITI' }],
                    actions: [
                        { type: 'removeInput', handle: 'All' }, //Cannot respond anymore
                        { type: 'hideStim', handle: 'All' }, // hide everything
                        { type: 'trigger', handle: 'end', duration: 250  } // Continue to the ITI, after that error fb has been displayed
                    ]
                },

                // end after ITI
                {
                    conditions: [{ type: 'inputEquals', value: 'end' }],
                    actions: [
                        { type: 'endTrial' }
                    ]
                },

                // skip block: enter and then ESC
                {
                    conditions: [
                        { type: 'inputEquals', value: 'skip1' },
                        function () { return settings.DEBUG == true; }
                    ],
                    actions: [
                        { type: 'setInput', input: { handle: 'skip2', on: 'enter' } } // allow skipping if next key is enter.
                    ]
                },

                // skip block: then ESC
                {
                    conditions: [{ type: 'inputEquals', value: 'skip2' }],
                    actions: [
                        { type: 'goto', destination: 'nextWhere', properties: { blockStart: true } },
                        { type: 'endTrial' }
                    ]
                }
            ]
        });


        API.addTrialSets('instructions',{
            data: {blockStart:true},
            input: [
                {handle: 'next', on: 'space'}
            ],
            stimuli: [
                {handle:'content', media: {html:'<%= trialData.content %>'}, location: {bottom: '<%= trialData.center == "bottom" ? 0 : "auto" %>', top: '<%= trialData.center == "top" ? 5 : "auto" %>'}},
                {inherit:'layoutLeft'},
                {inherit:'layoutRight'}
            ],
            interactions: [
                {
                    conditions: [{type:'begin'}],
                    actions: [{type:'showStim', handle: 'content'}]
                },
                {
                    conditions: [{type:'begin'}, {type:'trialEquals', property:'showLayout', value:true}],
                    actions: [{type:'showStim', handle: 'All'}]
                },
				{
					conditions: [{type:'inputEquals',value:'next'}],
					actions: [
						{type:'hideStim', handle:'All'},
						{type:'trigger', handle:'endTrial', duration:500}
					]
				},
				{
					conditions: [{type:'inputEquals',value:'endTrial'}],
					actions: [{type:'endTrial'}]
				}
            ]
        });

        API.addStimulusSets({
            targetStim: { handle: 'targetStim', media: '<%= trialData.stim + (trialData.hint ? trialData.hintText : \'\') %>' },
            error: { handle: 'error', location: { top: 60 }, css: { color: 'red', fontSize: '60px', fontWeight:900 }, media: { word: 'X' }, nolog: true },
            attribute: { inherit: 'targetStim', css: { color: attColor, fontSize: attSize, fontWeight:'bold'}},
            category: { inherit: 'targetStim', css: { color: catColor, fontSize: catSize, fontWeight:'bold'}},
            layoutLeft: {
                location: { top: 5, left: 0 },
                media: {
                    html: [
                        '<div style="font-size:30px;font-weight:bold;">',
                        '  <% if ([\'double\',\'attribute\'].indexOf(trialData.type) !== -1) { %>',
                        '    <div style="color:#00FFFF">',
                        '      <%= current.attribute1.name %>',
                        '    </div>',
                        '  <% } %>',
                        '  <% if ([\'double\',\'category\'].indexOf(trialData.type) !== -1) { %>',
                        '    <div style="color:#FFFF00; margin-top:0.5em;">',
                        '      Type <%= trialData.side %>',
                        '    </div>',
                        '  <% } %>',
                        '</div>'
                    ].join('\n')
                }
            },
            layoutRight: {
                location: { top: 5, right: 0 },
                media: {
                    html: [
                        '<div style="font-size:30px;font-weight:bold;">',
                        '  <% if ([\'double\',\'attribute\'].indexOf(trialData.type) !== -1) { %>',
                        '    <div style="color:#00FFFF">',
                        '      <%= current.attribute2.name %>',
                        '    </div>',
                        '  <% } %>',
                        '  <% if ([\'double\',\'category\'].indexOf(trialData.type) !== -1) { %>',
                        '    <div style="color:#FFFF00; margin-top:0.5em;">',
                        '      Type <%= trialData.side === 1 ? 2 : 1 %>',
                        '    </div>',
                        '  <% } %>',
                        '</div>'
                    ].join('\n')
                }
            }
        });
        
        API.addTrialSets({
            attr1: current.attribute1.stimuli.map(stimToTrial('attribute')),
            attr2: current.attribute2.stimuli.map(stimToTrial('attribute')),
            cat1: current.category1.stimuli.map(stimToTrial('category', ' - 1')),
            cat2: current.category2.stimuli.map(stimToTrial('category', ' - 2')),
            attribute1set: [
                {inherit:{type:'exRandom', set:'attr1'}, data: {corResp:'left'}},
                {inherit:{type:'exRandom', set:'attr2'}, data: {corResp:'right'}}
            ].reduce(repeatArray,[]),
            attribute2set: [ // same as 1 - just convinience because we never switch locations
                {inherit:{type:'exRandom', set:'attr1'}, data: {corResp:'left'}},
                {inherit:{type:'exRandom', set:'attr2'}, data: {corResp:'right'}}
            ].reduce(repeatArray,[]),
            category1set: [
                {inherit:{type:'exRandom', set:'cat1'}, data: {corResp:'left'}},
                {inherit:{type:'exRandom', set:'cat2'}, data: {corResp:'right'}}
            ].reduce(repeatArray,[]),
            category2set: [
                {inherit:{type:'exRandom', set:'cat1'}, data: {corResp:'right'}},
                {inherit:{type:'exRandom', set:'cat2'}, data: {corResp:'left'}}
            ].reduce(repeatArray,[])
        });

        return API.script;

        /**
         * Create a block mixer 
         * All settings are passed on as trialData
         * 
         * @param {Object} trialsSettings 
         * @param {Integer} trialSettings.side 1-cat1left, 2-cat2left
         * @param {String} trialSettings.type double/attribute/category the type of block this is
         * @param {Integer} trialSettings.n number of trials in this block
         */
        function getTrials(trialsSettings){
            var side = trialsSettings.side;
            var type = trialsSettings.type;
            var n = trialsSettings.n;

            var trials = type !== 'double'
                ? [{inherit: {type:'exRandom', set: type + side + 'set'}, data:trialsSettings}]
                : [
                    {inherit: {type:'exRandom', set: 'attribute' + side + 'set'}, data:trialsSettings},
                    {inherit:{type:'exRandom', set: 'category' + side + 'set'}, data:trialsSettings}
                ];

            return {
                mixer: 'repeat',
                times: type !== 'double' ? n : n/2,
                data: [
                    {
                        mixer:'wrapper',
                        data: trials
                    }
                ]
            }
        }

        /**
         * 
         * @param {String} type attribute/category
         * @param {String} hintText text to concatenate as hint
         */
        function stimToTrial(type, hintText){
            return function(stim){
                return {
                    inherit:'sort',
                    data:{stim:stim, hintText:hintText},
                    stimuli: [
                        {inherit: type},
                        {inherit: 'error'}
                    ]
                };
            }
        }

        function repeatArray(arr, val){ return arr.concat(val,val,val,val,val); }
    }
});