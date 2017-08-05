$(window).on('load', function () {
    //tests items involved with speaking
    function testSpeak() {
        var limitGood = speakObjectGood.length;
        console.log("Good speak events");
        console.log(limitGood);

        for (var i = 0; i < limitGood; i++) {
            console.log("speak text is: " + speakObjectGood[i].text);
            console.log("speak effect is: " + speakObjectGood[i].effect);

            console.log("speak map is: ");
            console.log(speakMap[speakObjectGood[i].effect].name);
            console.log(speakMap[speakObjectGood[i].effect].text);
        }

        var limitBad = speakObjectBad.length;
        console.log("Bad speak events");
        console.log(limitBad);

        for (var i = 0; i < limitBad; i++) {
            console.log("speak text is: " + speakObjectBad[i].text);
            console.log("speak effect is: " + speakObjectBad[i].effect);

            console.log("speak map is: ");
            console.log(speakMap[speakObjectBad[i].effect].name);
            console.log(speakMap[speakObjectBad[i].effect].text);
        }
    }

    function testQuest() {
        var quests = questObject.length;
        console.log("Quests");
        console.log("Number of quests: " + quests);

        for (var i = 0; i < quests; i++) {
            console.log("quest text is: " + questObject[i].text);
            console.log("quest complete is: " + questObject[i].complete);

            for (var j = 0; j < questObject[i].steps.length; j++) {
                console.log("Step " + j + 1);
                console.log("text for step: " + questObject[i].steps[j].stepText);
                console.log("text for choice 1: " + questObject[i].steps[j].choice1Text);
                console.log("response for choice 1: " + questObject[i].steps[j].choice1Resp);
                console.log("effect for choice 1: " + questObject[i].steps[j].choice1Effect);
                console.log("   effect is: " + questMap[questObject[i].steps[j].choice1Effect].text);
                console.log("text for choice 2: " + questObject[i].steps[j].choice2Text);
                console.log("response for choice 2: " + questObject[i].steps[j].choice2Resp);
                console.log("effect for choice 2: " + questObject[i].steps[j].choice2Effect);
                console.log("   effect is: " + questMap[questObject[i].steps[j].choice2Effect].text);
            }
        }
    }

    function testGym() {
        var workouts = gymObject.length;
        console.log("Number of workouts: " + workouts);

        for (var i = 0; i < workouts; i++) {
            console.log("workout text is: " + gymObject[i].text);
            console.log("workout choice is: ");

            for (var j = 0; j < gymObject[i].event.length; j++) {
                console.log("choice text is: " + gymObject[i].event[j].choice);
                console.log("    energy is: " + gymObject[i].event[j].energy);
                console.log("    weight is: " + gymObject[i].event[j].weight);
                console.log("    accomplish is: " + gymObject[i].event[j].accomplish);
                console.log("    chance is: " + gymObject[i].event[j].choice);
                console.log("    success is: " + gymObject[i].event[j].success);
                console.log("    fail is: " + gymObject[i].event[j].fail);
            }
        }
    }

    function testConvention() {
        var events1 = level1.length;
        console.log("Number of events: " + events1);

        for (var i = 0; i < events1; i++) {
            console.log("convention title is: " + level1[i].title);
            console.log("convention text is: " + level1[i].text);
            console.log("convention effect is: " + level1[i].effect);
            console.log("convention map is:");
            console.log("   name" + conventionMap[level1[i].effect].name);
            console.log("   text" + conventionMap[level1[i].effect].text);
            console.log("   effect" + conventionMap[level1[i].effect].effect);
        }

        var events2 = level2.length;
        for (var i = 0; i < events2; i++) {
            console.log("convention title is: " + level2[i].title);
            console.log("convention text is: " + level2[i].text);
            console.log("convention effect is: " + level2[i].effect);
            console.log("convention map is:");
            console.log("   name" + conventionMap[level2[i].effect].name);
            console.log("   text" + conventionMap[level2[i].effect].text);
            console.log("   effect" + conventionMap[level2[i].effect].effect);
        }

        var events3 = level3.length;
        for (var i = 0; i < events3; i++) {
            console.log("convention title is: " + level3[i].title);
            console.log("convention text is: " + level3[i].text);
            console.log("convention effect is: " + level3[i].effect);
            console.log("convention map is:");
            console.log("   name" + conventionMap[level3[i].effect].name);
            console.log("   text" + conventionMap[level3[i].effect].text);
            console.log("   effect" + conventionMap[level3[i].effect].effect);
        }

        var events4 = level4.length;
        for (var i = 0; i < events4; i++) {
            console.log("convention title is: " + level4[i].title);
            console.log("convention text is: " + level4[i].text);
            console.log("convention effect is: " + level4[i].effect);
            console.log("convention map is:");
            console.log("   name" + conventionMap[level4[i].effect].name);
            console.log("   text" + conventionMap[level4[i].effect].text);
            console.log("   effect" + conventionMap[level4[i].effect].effect);
        }

        var events5 = level5.length;
        for (var i = 0; i < events5; i++) {
            console.log("convention title is: " + level5[i].title);
            console.log("convention text is: " + level5[i].text);
            console.log("convention effect is: " + level5[i].effect);
            console.log("convention map is:");
            console.log("   name" + conventionMap[level5[i].effect].name);
            console.log("   text" + conventionMap[level5[i].effect].text);
            console.log("   effect" + conventionMap[level5[i].effect].effect);
        }
    }
    //testSpeak();
    //testGym();
    //testQuest();
    //testConvention();
});