define(['https://pcplab.sfo2.digitaloceanspaces.com/common/qiat.js'], function (qiatExtension) {
    return qiatExtension({
        // uncomment the following line in order to skip blocks using esc + enter
        // DEBUG: true, 

        category1: {
            title: 'סוג 2', // swich titles to fit hebrew
            hint: ' - 2',
            name: 'משפטים עצמיים חיוביים', //Will appear in the data.
            stimuli: [ //Stimuli content as PIP's media objects
                'אני מכובדת',
                'אני בעלת ערך',
                'אני מוכשרת',
                'אני מוצלחת',
                'אני טובה',
                'אני מעניינת'
            ]
        },
        category2: {
            title: 'סוג 1',  // swich titles to fit hebrew
            hint: ' - 1',
            name: 'משפטים עצמיים שליליים', //Will appear in the data.
            stimuli: [ //Stimuli content as PIP's media objects
                'אני לא אהובה',
                'אני חסרת ערך',
                'אני חלשה',
                'אני פגיעה',
                'אני רעה',
                'אני כשלון'
            ]
        },
        attribute1: {
            title: 'שקר',
            name:  'שקר',
            stimuli: [
                'אני מנגנת עכשיו על גיטרה חשמלית',
                'אני נמצאת בחוף הים',
                'אני כרגע מטפסת על הר',
                'אני קונה כרגע מצרכים במכולת',
                'אני צופה בחדשות'
            ]
        },
        attribute2: {
            title: 'אמת',
            name:  'אמת',
            stimuli: [
                'אני מבצעת ניסוי בפסיכולוגיה',
                'אני כרגע מול המחשב',
                'אני צופה במסך המחשב',
                'האצבעות שלי מונחות על המקלדת',
                'אני קוראת את מה שכתוב על המסך'
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
            '<div style="color: white; text-align:right;direction:rtl;">',
            '<div> אנא ודאי כי קראת את ההוראות ביסודיות לפני שתמשיכי לעמוד הבא.</div><div>במשימה שלפניך תתבקשי למיין משפטים לקטגוריות.<br>',
            'המשימה דורשת שתפעלי מהר עד כמה שאפשר, ושתבצעי כמה שפחות טעויות.<br>',
            'אלה ארבע הקטגוריות אליהן תתבקשי לסווג את המשפטים:</div>',
            '<font color="#FFFF00"> <%= current.category1.title %> <br> <%= current.category2.title %> </font><br>',
            '<font color="#00FFFF"> <%= current.attribute1.title %> <br> <%= current.attribute2.title %> </font>',
            '<div><br>אנא לחצי על מקש הרווח על מנת להמשיך...</div>',
            '</div>'
        ].join('\n'),

        /*
         * This is the prompt that is displayed before the start of each trial
         */
        startBlockInst: '<div style="font-size:22px;">לחצי על מקש הרווח על מנת להתחיל</div>',

        /*
         * Block 1
         * *******************************************************************************************************************
         * Instruction page displaying all attributes
         */
        instAttributeInventory: [
            '<div style="text-align:right;direction:rtl;">',
            '<p>אלה המשפטים שתתבקשי לחלק במטלת המיון הראשונה:</p>',
            '<table style="height: 238px; width: 779px;" cellspacing="10">',
            '<tbody>',
            '<tr style="height: 31px;">',
            '<td style="width: 362px; height: 31px;"><span style="color: #00ffff;"><%= current.attribute1.title %>: </span></td>',
            '<td style="width: 35px; height: 31px;"><span style="color: #00ffff;"> </span></td>',
            '<td style="width: 366px; height: 31px;"><span style="color: #00ffff;"><%= current.attribute2.title %>: </span></td>',
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
            '<p> לחצי על מקש רווח על מנת להמשיך לקרוא את ההוראות...</p></div>'
        ].join('\n'),

        /*
         * Instructions for attribute practice
         */
        instAttributePractice: [
            '<div style="font-size: 22px; color: white; text-align:right;direction:rtl;">',
            '<p id="instructions">',
            '<b> אנא </b> הניחי את אצבע יד שמאל על מקש <b>D</b>  הניחי את אצבע יד ימין על מקש <b>L</b>  במקלדת שלפניך <br>',
            'משפטים המייצגים את הקטגוריות שבראש המסך יופיעו בזה אחר זה במרכז המסך.<br>',
            'כאשר המשפט שייך לקטגורה מצד ימין, לחצי על מקש הD.  <br>',
            'כאשר המשפט שייך לקטגוריה מצד שמאל, לחצי על מקש ה L. <br><br></p>',
            '<p id="instructions"> כל משפט שייך לקטגוריה אחת בלבד. <br>',
            'אם תבצעי טעות <font color="#FF0000">X</font> יופיע.&nbsp;',
            'בכדי לתקן את הטעות, לחצי על המקש השני. למשל, אם לחצת בטעות L , תקני זאת על ידי לחיצה על מקש הD. <br>',
            'אנא לחצי על מקש הרווח על מנת להמשיך...',
            '</p>',
            '</div>'
        ].join('\n'),

        /*
         * Block2
         * *******************************************************************************************************************
         * Instruction page displaying all categories
         */
        instCategoryInventory: [
            '<div style="text-align:right;direction:rtl;">',
            '<p>אלה המשפטים שתתבקשי לסווג במטלת המיון הבאה:</p>',
            '<table style="height: 238px; width: 779px;" cellspacing="10">',
            '<tbody style="color: #ffff00;">',
            '<tr style="height: 31px;">',
            '<td style="width: 362px; height: 31px;"><span >משפטים המתארים את <%= current.category1.title %>: </span></td>',
            '<td style="width: 35px; height: 31px;"></td>',
            '<td style="width: 366px; height: 31px;"><span>משפטים המתארים את <%= current.category2.title %>: </span></td>',
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
            '<p> אנא לחצי על מקש הרווח על מנת להמשיך...</p></div>'
        ].join('\n'),

        /*
         * Instruction for category practice with hints
         */
        instCategoryPracticeHinted: [
            '<div style="font-size: 22px; color: white; text-align:right;direction:rtl;">',
            '<p id="instructions">כפי שניתן לראות, הקטגוריות השתנו. גם המשפטים שתצטרכי לסווג השתנו <br>',
            'החוקים, לעומת זאת, נשארו זהים.</p>',
            '<p id="instructions"> כאשר המשפט שייך לקטגוריה מצד ימין, לחצי על מקש הL. כאשר המשפט שייך לקטגוריה מצד שמאל, לחצי על מקש הD. <br><br>',
            '<font color="#FFFF00"><b>בחלק זה של המשימה, יופיע בסוף כל משפט רמז שיסייע למשימת הסיווג, בכדי לעזור לך ללמוד את הקטגוריות. מאוחר יותר לא יינתן רמז זה.</b></font><br>',
            'אם תבצעי טעות, תוכלי לתקן את הטעות על ידי לחיצה על המקש השני.<br>',
            '<font color="#FFFF00">    חלק זה נועד לאימון על מנת ללמוד את הקטגוריות  .<br>',
            'לכן, אין צורך לבצע אותו במהירות</font><br>',
            'אנא לחצי על מקש הרווח על מנת להמשיך...</p>',
            '</div>'
        ].join('\n'),

        /*
         * Block3
         * *******************************************************************************************************************
         * Instruction for category practice without hints
         */
        instCategoryPractice: [
            '<div style="font-size: 22px; color: white; text-align:right;direction:rtl;">',
            '<p id="instructions">',
            'מייני שוב לפי אותן הקטגוריות.<br>',
            '<font color="#FFFF00">הפעם, רמזים לא יוצגו עם המשפטים.</font><br><br>',
            'אנא לחצי על מקש הרווח על מנת להמשיך...',
            '</div>'
        ].join('\n'),

        /*
         * Block4
         * *******************************************************************************************************************
         * Instruction for category practice without hints
         */
        instDouble: [
            '<div style="font-size: 22px; text-align:right;direction:rtl;">',
            '<p id="instructions" style="color: white;">',
            'כפי שניתן לראות , ארבע הקטגוריות שראית קודם בנפרד, מופיעות כעת יחד<br>',
            'הצבע הכחול או הצהוב של המשפטים יסייעו לך לזהות את הקטגוריה המתאימה.<br>',
            ' השתמשי במקשים D וL בכדי לסווג את המשפטים לקטגוריות שמימין או לקטגוריות שמשמאל</p>',
            '<p id="instructions" style="color: white;"><br><font color="#FFFF00"><b>מייני הכי מהר שאת יכולה, תוך ביצוע כמה שפחות טעויות.</b></font></p>',
            '<p id="instructions" style=""><font color="#ffffff">אנא לחצי על מקש הרווח על מנת להמשיך...</font></p>',
            '</div>'
        ].join('\n'),

        instSwitchPractice: [
            '<div style="font-size: 22px; color: white; text-align:right;direction:rtl;">',
            '<p id="instructions">',
            'כפי שניתן לראות, כעת שוב יש רק שתי קטגוריות, והן החליפו צדדים.<br>',
            'הקטגוריה שהייתה קודם לכן בצד שמאל מופיעה כעת בימין, וזו שהייתה בצד ימין מופיעה כעת בשמאל.<br>',
            'עתה תוכלי להתאמן בסידור החדש של הקטגוריות.<br>',
            'השתמשי במקשי הL והD בכדי לסווג משפטים לימין או לשמאל <br>',
            'תקני טעויות על ידי לחיצה על המקש השני.<br>',
            'אנא לחצי על מקש הרווח על מנת להמשיך',
            '</div>'
        ].join('\n'),

        instSwitch: [
            '<div style="font-size: 22px; text-align:right;direction:rtl;">',
            '<p id="instructions">',
            'כפי שניתן לראות, ארבע הקטגוריות כעת מופיעות בסידור החדש.<br><br>',
            '<font color="#FFFF00"><b>זכרי לפעול הכי מהר שאת יכולה, תוך ביצוע כמה שפחות טעויות.</b></font>',
            '</p>',
            '<p id="instructions">',
            '<br>',
            '<font color="#ffffff">אנא לחצי על מקש הרווח על מנת להמשיך...</font>',
            '</p>',
            '</div>'
          ].join('\n'),

    });

    //NOTE: when you test the task, remember that pressing ESC and then ENTER skips blocks.
});

