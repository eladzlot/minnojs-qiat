define(['https://pcplab.sfo2.digitaloceanspaces.com/common/qiat.js'], function (qiatExtension) {
    return qiatExtension({
        // uncomment the following line in order to skip blocks using esc + enter
        // DEBUG: true, 
        category1: {
            title: 'Type 1',
            hint: ' - 1',
            name: 'High Self-Criticism', //Will appear in the data.
            stimuli: [ //Stimuli content as PIP's media objects
                'I often find that I don\'t live up to my own standards or ideals',
                'When things go wrong I call myself names',
                'I tend not to be satisfied with what I have',
                'I have a difficult time accepting weaknesses in myself',
                'I tend to be very critical of myself',
                'I very frequently compare myself to standards or goals'
            ]
        },
        category2: {
            title: 'Type 2',
            hint: ' - 2',
            name: 'Low Self-Criticism', //Will appear in the data.
            stimuli: [ //Stimuli content as PIP's media objects
                'I find it easy to forgive myself',
                'I like being me',
                'When things go wrong I can still feel lovable and acceptable',
                'I am gentle and supportive with myself',
                'I can accept failures and setbacks without feeling inadequate',
                'I seldom compare myself to standards or goals'
            ]
        },
        attribute1: {
            title: 'True',
            name: 'TRUE',
            stimuli: [
                'I am completing a computer task',
                'I am using the computer',
                'I am breathing air',
                'I have my fingers placed on the keyboard',
                'I am looking at a computer screen'
            ]
        },
        attribute2: {
            title: 'False',
            name: 'FALSE',
            stimuli: [
                'I am playing football',
                'I am sunbathing at the beach',
                'I am currently playing an electric guitar',
                'I am climbing a steep mountain',
                'I am buying groceries in the local grocery store'
            ]
        },

        /**
         * The number of trials for each block
         * The first number represents the first block, the second number represents the second block and so on.
         */
        blockCount:[20,20,40,40,40,40,40],

        /*
         * These are instructions that will be displayed at the beginning of the task.
         * Category/attribute names will not be displayed on top
         * You can add any number of instruction pages into the array
         */
        preTaskInstructions: [
            '<div style="color: white; text-align: left;">',
            '<div>Please make sure that you have read the instructions thoroughly before continuing to the next page.</div><div>In the next task, you will need to classify sentences into categories.<br>',
            'Please do this as quickly as you can, while making as few mistakes as possible.<br>',
            'These are the four categories into which you will classify the sentences:</div>',
            '<font color="#FFFF00">Type 1<br>Type 2</font><br>',
            '<font color="#00FFFF">True<br>False</font>',
            '<div><br>To continue reading the instructions, press the space bar.</div>',
            '</div>'
        ].join('\n'),

        /*
         * This is the prompt that is displayed before the start of each trial
         */
        startBlockInst: '<div style="font-size:22px;">Press the spacebar to begin</div>',

        /*
         * Block 1
         * *******************************************************************************************************************
         * Instruction page displaying all attributes
         */
        instAttributeInventory: [
            '<div style="text-align:left">',
            '<p>These are the sentences you will need to classify first:</p>',
            '<table style="height: 238px; width: 779px;" cellspacing="10">',
            '<tbody>',
            '<tr style="height: 31px;">',
            '<td style="width: 362px; height: 31px;"><span style="color: #00ffff;">True: </span></td>',
            '<td style="width: 35px; height: 31px;"><span style="color: #00ffff;"> </span></td>',
            '<td style="width: 366px; height: 31px;"><span style="color: #00ffff;">False: </span></td>',
            '</tr>',
            '<% for (var i = 0; i<current.attribute1.stimuli.length; i++) { %>',
            '    <tr style="height: 49px;">',
            '    <td style="width: 362px; height: 49px;"><span style="color: #00ffff;"><%= current.attribute1.stimuli[i] %></span></td>',
            '    <td style="width: 35px; height: 49px;"><span style="color: #00ffff;"> </span></td>',
            '    <td style="width: 366px; height: 49px;"><span style="color: #00ffff;"><%= current.attribute2.stimuli[i] %></span></td>',
            '    </tr>',
            '<% } %>',
            '</tbody>',
            '</table>',
            '<p> Press the spacebar to continue reading the instructions...</p></div>'
        ].join('\n'),

        /*
         * Instructions for attribute practice
         */
        instAttributePractice: [
            '<div style="font-size: 22px; color: white; text-align: left;">',
            '<p id="instructions">',
            'Please <b>PUT YOUR INDEX FINGERS</b> on the <b>D</b> and <b>L</b> keys of your keyboard.<br>',
            'Sentences representing the categories at the top of the screen will appear one by one in the middle of the screen.<br>',
            'When the sentence belongs to a category on the left, press the D key.<br>',
            'When the sentence belongs to a category on the right, press the L key.<br><br></p>',
            '<p id="instructions">Each sentence belongs to only one category.<br>',
            'If you make an error, an <font color="#FF0000">X</font> will appear.&nbsp;',
            'You will need to quickly press the other, correct key.<br>',
            'Please press the space bar to continue...',
            '</p>',
            '</div>'
        ].join('\n'),

        /*
         * Block2
         * *******************************************************************************************************************
         * Instruction page displaying all categories
         */
        instCategoryInventory: [
            '<div style="text-align:left">',
            '<p>These are the sentences you will need to classify now:</p>',
            '<table style="height: 238px; width: 779px;" cellspacing="10">',
            '<tbody style="color: #ffff00;">',
            '<tr style="height: 31px;">',
            '<td style="width: 362px; height: 31px;"><span >Sentences describing Type 1: </span></td>',
            '<td style="width: 35px; height: 31px;"></td>',
            '<td style="width: 366px; height: 31px;"><span>Sentences describing Type 2: </span></td>',
            '</tr>',
            '<% for (var i = 0; i<current.category1.stimuli.length; i++) { %>',
            '    <tr style="height: 49px;">',
            '    <td style="width: 362px; height: 49px;"><span ><%= current.category1.stimuli[i] %></span></td>',
            '    <td style="width: 35px; height: 49px;"></td>',
            '    <td style="width: 366px; height: 49px;"><span ><%= current.category2.stimuli[i] %></span></td>',
            '    </tr>',
            '<% } %>',
            '</tbody>',
            '</table>',
            '<p> Press the spacebar to continue reading the instructions...</p></div>'
        ].join('\n'),

        /*
         * Instruction for category practice with hints
         */
        instCategoryPracticeHinted: [
            '<div style="font-size: 22px; color: white; text-align: left;">',
            '<p id="instructions">As you can see, the categories have changed.<br>',
            'The sentences for sorting have changed as well. The rules, however, are the same.</p>',
            '<p id="instructions">Press either D or L to sort sentences to the categories on the screen.<br><br>',
            '<font color="#FFFF00"><b>In this part of the task, each sentence will include a categorization hint to help you learn the categories. Later, this hint will not be provided.</b></font><br>',
            'If you make an error, correct it by hitting the other key.<br>',
            '<font color="#FFFF00">This part is for practice, and will help you learn the categories.&nbsp;<br>',
            'Therefore, speed here is not important.</font><br>',
            'Please press the space bar to continue...</p>',
            '</div>'
        ].join('\n'),

        /*
         * Block3
         * *******************************************************************************************************************
         * Instruction for category practice without hints
         */
        instCategoryPractice: [
            '<div style="font-size: 22px; color: white; text-align: left;">',
            '<p id="instructions">',
            'Sort the sentences into the same two categories again.<br>',
            '<font color="#FFFF00">This time, hints will not be presented with the sentences.</font><br><br>',
            'Please press the space bar to continue...',
            '</div>'
        ].join('\n'),

        /*
         * Block4
         * *******************************************************************************************************************
         * Instruction for category practice without hints
         */
        instDouble: [
            '<div style="font-size: 22px; text-align: left;">',
            '<p id="instructions" style="color: white;">',
            'As you can see, all four categories now appear together.<br>',
            'The blue or yellow color of the sentences will help you identify the appropriate category for each sentence.<br>',
            'Use the D and L keys to categorize sentences into the four groups, left and right.</p>',
            '<p id="instructions" style="color: white;"><br><font color="#FFFF00"><b>Work as fast as you can, while making as few errors as possible.</b></font></p>',
            '<p id="instructions" style=""><font color="#ffffff">Please press the space bar to continue...</font></p>',
            '</div>'
        ].join('\n'),

        instSwitchPractice: [
            '<div style="font-size: 22px; color: white; text-align: left;">',
            '<p id="instructions">',
            'As you can see, there are now again only two categories, but they have switched positions.<br>',
            'The category that was previously on the left is now on the right, and the category that was on the right is now on the left.<br>',
            'Now you will practice this new configuration of the categories.<br>',
            'Use the D and L keys to categorize the sentences, left and right.<br>',
            'Correct errors by hitting the other key.<br>',
            'Please press the space bar to continue...',
            '</div>'
        ].join('\n'),

        instSwitch: [
            '<div style="font-size: 22px; text-align: left;">',
            '<p id="instructions">',
            'As you can see, all four categories now appear together, in the new configuration.<br><br>',
            '<font color="#FFFF00"><b>Remember to go as fast as you can while making as few errors as possible.</b></font>',
            '</p>',
            '<p id="instructions">',
            '<br>',
            '<font color="#ffffff">Please press the space bar to continue...</font>',
            '</p>',
            '</div>'
          ].join('\n'),

    });

    //NOTE: when you test the task, remember that pressing ESC and then ENTER skips blocks.
});
