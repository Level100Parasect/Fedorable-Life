function mainCharacter() {
    //updates ui bar every time it is called
	this.render = function () {
	    this.checkStatus();
        if(dialogArray.length > 0) dialogArray[0].display();

	    progress(this.statEnergy, $("#energy"));
	    progress(this.statHunger, $("#hunger"));
	    progress(this.statExcitement, $("#excitement"));
	    progress(this.statAccomplishment, $("#accomplishment"));

	    $("#social").text(this.statSocial);
	    $("#status").text(this.statStatus);
	    $("#euphoria").text(this.statEuphoria);
	    $("#money").text(this.statMoney);
	} /* END OF render */

	this.checkStatus = function () {
        //Checks for player death
        if (this.statEnergy <= 0) {
            endGame(createEndScreen("sleep", "endGameBtn"));
            return;
        } /* END IF */
        if (this.statHunger <= 0) {
            endGame(createEndScreen("hungry", "endGameBtn"));
            return;
        } /* END IF */
        if (this.statExcitement <= 0) {
            endGame(createEndScreen("bored", "endGameBtn"));
            return;
        } /* END IF */
        if (this.statAccomplishment <= 0) {
            endGame(createEndScreen("accomplish", "endGameBtn"));
            return;
        } /* END IF */

        //Caps player's stats to 100
        if (this.statEnergy > 100) this.statEnergy = 100;
        if (this.statHunger > 100) this.statHunger = 100;
        if (this.statExcitement > 100) this.statExcitement = 100;
        if (this.statAccomplishment > 100) this.statAccomplishment = 100;
	} /* END OF checkStatus */

	this.changeEnding = function (ending) {
	    switch (ending) {
	        case "fg":
	            this.endFG = true;
	            break;
            case "efame":
	            this.endEFame = true;
	            break;
            case "employed":
	            this.endEmployed = true;
	            break;
            case "iron":
	            this.endIron = true;
	            break;
            case "waifu":
	            this.endWaifu = true;
	            break;
            case "norm":
	            this.endNorm = true;
	            break;
	    } /* END SWITCH */

	    //golden ending
	    if ((this.endFG) && (this.endEFame) && (this.endEmployed) && (this.endIron) && (this.endWaifu) && (this.endNorm) && (!this.endGolden)) {
            var dialogNode = new dialog(endGame, createEndScreen("golden", "emd"));
            dialogArray.push(dialogNode);
            var dialogNode = new dialog(genericDia, nodeEGGolden);
            dialogArray.push(dialogNode);
	        this.endGolden = true;
	    } /* END IF */
	}

	this.changeSecretItem = function (item) {
        var hasEnding = this.endEmployed;
	    if (item === 1) {
	        this.secretEndingItem1 = true;
            if(!hasEnding) {
                var dialogNode = new dialog(genericDia, unlockItem1);
                dialogArray.push(dialogNode);
            }
	    } /* END IF */
        if (item === 2) {
            this.secretEndingItem2 = true;
            if(!hasEnding) {
                var dialogNode = new dialog(genericDia, unlockItem2);
                dialogArray.push(dialogNode);
            }
        } /* END IF */
        if (item === 3) {
            this.secretEndingItem3 = true;
            grant.travel("bedroom");
            if(!hasEnding) {
                var dialogNode = new dialog(genericDia, unlockItem3);
                dialogArray.push(dialogNode);
            }
        } /* END IF */

        //employed ending
        if ((this.secretEndingItem1) && (this.secretEndingItem2) && (this.secretEndingItem3) && (!hasEnding)) {
            var dialogNode = new dialog(endGame, createEndScreen("employed", "emd"));
            dialogArray.push(dialogNode);
            var dialogNode = new dialog(genericDia, nodeEGEmploy);
            dialogArray.push(dialogNode);
            this.changeEnding("employed");
        } /* END IF */
	} /* END OF changeSecretItem */

    this.changeEuphoria = function (euphoria) {
      this.statEuphoria += euphoria;

      //Fedora God ending
      if ((this.statEuphoria >= 9000) && (!this.endFG)) {
        var dialogNode = new dialog(endGame, createEndScreen("fedoraGod", "emd"));
        dialogArray.push(dialogNode);
        var dialogNode = new dialog(genericDia, nodeEGFG);
        dialogArray.push(dialogNode);
        this.changeEnding("fg");
      } /* END IF */
    } /* END OF changeEuphoria */

    this.changeNGP = function (ngp) {
      this.niceGuyPoints += ngp;

      //waifu ending
      if ((this.niceGuyPoints >= 25) && (!this.endWaifu)) {
        var dialogNode = new dialog(endGame, createEndScreen("waifu", "emd"));
        dialogArray.push(dialogNode);
        var dialogNode = new dialog(genericDia, nodeEGWaifu);
        dialogArray.push(dialogNode);
        this.changeEnding("waifu");
      } /* END IF */
    } /* END OF changeNGP */

    this.changeWeight = function (weight) {
      var oldWeight = this.weight,
          newWeight = oldWeight - weight;
      newWeight = Math.round(newWeight * 10) / 10;
      if (newWeight < 140.0) newWeight = 140.0;
      this.weight = newWeight;

      //Iron Pill ending
      if ((this.weight <= 140) && (!this.endIron)) {
        var dialogNode = new dialog(endGame, createEndScreen("iron", "emd"));
        dialogArray.push(dialogNode);
        var dialogNode = new dialog(genericDia, nodeEGIron);
        dialogArray.push(dialogNode);
        grant.decTime = 6000;
        this.changeEnding("iron");
      } /* END IF */
    } /* END OF changeWeight */

    this.changeSocial = function (sp, ts) {
        this.socialSkills += sp;
        if (ts) this.timesSocialized++;
        if (this.statSocial === 'Normal') return;

        if (between(this.timesSocialized, 0, 25)) {
            this.statSocial = 'Creepy';
        } else if (between(this.timesSocialized, 25, 50)) {
            this.statSocial = 'Weird';
        } else if (between(this.timesSocialized, 50, 75)) {
            this.statSocial = 'Eh...';
        } else if (between(this.timesSocialized, 75, 100)) {
            this.statSocial = 'Exists';
        } else if ((this.timesSocialized >= 150) && (!this.endNorm)){
            this.statSocial = 'Normal';
            var dialogNode = new dialog(endGame, createEndScreen("normal", "emd"));
            dialogArray.push(dialogNode);
            var dialogNode = new dialog(genericDia, nodeEGNorm);
            dialogArray.push(dialogNode);
            this.changeEnding("norm");
        } /* END IF */
    } /* END OF changeSocial */

    this.event = function () {
        var random = (Math.floor(Math.random() * level1.length)),
            event;
        switch (this.statSocial) {
            case "Creepy":
                event = level1[random];
                break;
            case "Weird":
                event = level2[random];
                break;
            case "Eh...":
                event = level3[random];
                break;
            case "Exists":
                event = level4[random];
                break;
            case "Normal":
                event = level5[random];
                break;
        } /* END SWITCH */
        conventionMap[event.effect].effect();
        var text = event.text + "<br><br>" + conventionMap[event.effect].text;
        var node = generic.replace("{TITLE}", event.title).replace("{TEXT}", text).replace("{IMG}", "event").replace("{BTN}", "emd");
        var dialogNode = new dialog(genericDia, node);
        dialogArray.push(dialogNode);
        this.render();
    } /*END OF event */

    this.speak = function () {
        var roll = randomizer(100),
            success = 0,
            speakEvent = (Math.floor(Math.random() * speakObjectGood.length)),
            arr = [],
            title = "Social Interaction Gone ",
            img, ss, ts, ngp, dr;

        if (this.drinksRound === 0) dr = 1; else dr = this.drinksRound;
        if (this.niceGuyPoints === 0) ngp = 1; else ngp = this.niceGuyPoints;
        if (this.timesSocialized === 0) ts = 1; else ts = this.timesSocialized;
        if (this.socialSkills === 0) ss = 1; else ss = this.socialSkills;

        success = (ss / ts) * ngp * dr;
        if (success >= roll) {
            arr = speakObjectGood;
            title += "Okay";
            img = "speakg";
            this.changeSocial(2, true);
        } else {
            arr = speakObjectBad;
            title += "Terrible";
            img = "speakb";
            this.changeSocial(1, true);
        } /* END IF */
        this.statEnergy -= 3;
        this.statHunger -= 3;
        var effect = arr[speakEvent].effect,
            event = eventMap[effect],
            text = arr[speakEvent].text + "<br><br>" + event.text,
            speakNode = generic.replace("{TITLE}", title).replace("{TEXT}", text).replace("{IMG}", img).replace("{BTN}", "emd");
        event.effect();
        var dialogNode = new dialog(genericDia, speakNode);
        dialogArray.push(dialogNode);
        this.render();
    } /* END OF speak */

    this.booth = function () {
        var random = (Math.floor(Math.random() * boothEvents.length)),
            text = boothEvents[random].text + "<br><br>",
            itemCost = 0,
            pts = 0;

        switch (this.statSocial) {
            case "Creepy":
                itemCost = 30;
                pts = 25;
                text += "You spent more than you thought -";
                break;
            case "Weird":
                itemCost = 25;
                pts = 50;
                text += "You spent a decent amount -";
                break;
            case "Eh...":
                itemCost = 20;
                pts = 100;
                text += "You spent a moderate amount -";
                break;
            case "Exists":
                itemCost = 15;
                pts = 175;
                text += "You managed to get some sweet deals -";
                break;
            case "Normal":
                itemCost = 10;
                pts = 250;
                text += "You haggled down the prices for more stuff -";
                break;
        } /* END SWITCH */

        if (cost(itemCost)) {
            play("cr1");
            this.changeEuphoria(pts);
            this.randomEvent("booth");
            text += " Spent $" + itemCost + " and got " + pts + " Euphoria!";
            nodeBooth = generic.replace("{TITLE}", "Booth Purchase").replace("{TEXT}", text).replace("{IMG}", "booth").replace("{BTN}", "emd");
            var dialogNode = new dialog(genericDia, nodeBooth);
            dialogArray.push(dialogNode);
            this.render();
        } else play("pp1");
    }    /* END OF booth */

    this.sleep = function () {
        play("sn1");
        this.statEnergy += 100;
        this.statHunger -= 15;
        this.statExcitement -= 15;
        this.statAccomplishment -= 15;
        this.render();
        if (this.atConv) {
            this.convDay++;
            if (this.convDay === 3) {
                this.travel("bedroom");
                genericDia(nodeConvOver);
            } /* END IF */
        } /* END IF */
        if (this.atHome) { 
            if (randomizer(6) === 6) {
                var quest = questObject[currentQuestNum],
                    firstStep = quest.steps[0],
                    text = 'You woke up with an unread text from your mother...<br><br>' + quest.text + '<br><br>' + firstStep.stepText;
                $("#questEvent").html("");
                $("#quest1").show();
                $("#questBottom").hide();

                $("#questEvent").append(text);
                $("#c1").text(firstStep.choice1Text);
                $("#c2").text(firstStep.choice2Text);
                $("#quest").dialog("open");
            } /* END IF */
        } /* END IF */
    }   /* END OF sleep */

    this.drink = function (money) {
        this.randomEvent("drink");
        if (cost(money)) {
            this.statAccomplishment += 5;
            this.statExcitement += 7;
            this.drinksRound++;
        }; /* END IF */

        if (this.drinksRound === 5) this.changeStatus('Drunk');

        if (this.drinksRound === 10) {
            this.travel("bedroom");
            this.changeStatus('Hungover');
            this.statAccomplishment -= 15;
            this.drinksRound = 0;
            var dialogNode = new dialog(genericDia, nodeKickedBar);
            dialogArray.push(dialogNode);
        } /* END IF */
        this.render();
    }  /* END OF drink */

    this.work = function () {
        play("cr1");
        this.timesWorked++;
        if (this.endEmployed) {
            this.wage = 50;
            this.statEnergy -= 7;
            this.statHunger -= 5;
            this.statExcitement -= 3;
            this.statAccomplishment -= 5;
            this.randomEvent("job2");
        } else {
            this.statEnergy -= 7;
            this.statHunger -= 5;
            this.statExcitement -= 7;
            this.statAccomplishment -= 10;
            if ((this.timesWorked >= 60) && (this.wage === 27)) {
                this.wage = 35;
                var dialogNode = new dialog(genericDia, nodePro5);
                dialogArray.push(dialogNode);
            } else if ((this.timesWorked >= 45) && (this.wage === 21)) {
                this.wage = 27;
                var dialogNode = new dialog(genericDia, nodePro4);
                dialogArray.push(dialogNode);
            } else if ((this.timesWorked >= 30) && (this.wage === 15)) {
                this.wage = 21;
                var dialogNode = new dialog(genericDia, nodePro3);
                dialogArray.push(dialogNode);
            } else if ((this.timesWorked >= 20) && (this.wage === 11)) {
                this.wage = 15;
                var dialogNode = new dialog(genericDia, nodePro2);
                dialogArray.push(dialogNode);
            } else if ((this.timesWorked >= 10) && (this.wage === 7)) {
                this.wage = 11;
                var dialogNode = new dialog(genericDia, nodePro1);
                dialogArray.push(dialogNode);
            } /* END IF */
        } /* END IF */
        this.paid(this.wage);
        this.randomEvent("job1");
        this.render();
    }    /* END OF work */

    this.takePics = function (pics) {
        play("pc1");
        this.statEnergy -= 5;
        this.statHunger -= 3;
        this.statExcitement += 5;
        this.statAccomplishment += 7;

        this.picsTaken += pics;
        this.paid(this.hWage);
        this.render();

        if (this.endEFame) return;
        //E-Fame ending
        if ((this.picsTaken === 100) && (!this.endEFame)) {
            endGame(createEndScreen("efame", "egEFame"));
            var dialogNode = new dialog(endGame, createEndScreen("efame", "emd"));
            dialogArray.push(dialogNode);
            var dialogNode = new dialog(genericDia, nodeEGEfame);
            dialogArray.push(dialogNode);
            this.changeEnding("efame");
            this.hWage = 30;
        } /* END IF */

        if ((this.picsTaken >= 60) && (this.hWage === 15)) {
            this.hWage = 25;
            var dialogNode = new dialog(genericDia, nodePho5);
            dialogArray.push(dialogNode);
        } else if ((this.picsTaken >= 45) && (this.hWage === 10)) {
            this.hWage = 15;
            var dialogNode = new dialog(genericDia, nodePho4);
            dialogArray.push(dialogNode);
        } else if ((this.picsTaken >= 30) && (this.hWage === 7)) {
            this.hWage = 10;
            var dialogNode = new dialog(genericDia, nodePho3);
            dialogArray.push(dialogNode);
        } else if ((this.picsTaken >= 20) && (this.hWage === 5)) {
            this.hWage = 7;
            var dialogNode = new dialog(genericDia, nodePho2);
            dialogArray.push(dialogNode);
        } else if ((this.picsTaken >= 10) && (this.hWage === 0)) {
            this.hWage = 5;
            var dialogNode = new dialog(genericDia, nodePho1);
            dialogArray.push(dialogNode);
        } /* END IF */
        this.randomEvent("photo");
        this.render();
    }   /* END OF takePics */

    this.paid = function(money) {
        this.statMoney += money;
        this.moneyMade += money;
    } /* END OF paid */

    this.game = function (type) {
        switch (type) {
            case "home":
                play("pp1");
                if (this.endFG) this.changeStatus('Euphoric');
                gameEvent(vapor);
                break;
            case "bar":
                this.statEnergy -= 4;
                this.statHunger -= 2;
                if (randomizer(20) === 20) {
                    genericDia(nodePoolEvnt);
                    this.statAccomplishment += 10;
                    this.statExcitement += 10;
                    this.paid(50);
                } else {
                    this.statAccomplishment += 5;
                    this.statExcitement += 5;
                } /* END IF */
                break;
            case "conv":
                play("gm1");
                if (randomizer(40) === 40) {
                    genericDia(nodeGameConv);
                    this.paid(150);
                } /* END IF */
                grant.statExcitement += 10;
                grant.statAccomplishment += 2;
                grant.statEnergy -= 5;
                grant.statHunger -= 2;
                grant.timesGamed++;
                break;
        } /* END IF */
    } /* END OF game */

    this.changeNBSprite = function () {
        var place;
        if (this.atHome) place = "-bedroom";
        else if (this.atBar) place = "-bar";
        else place = "-convention";
        $("#sprite .sprite").attr("id", this.sprite + place);
    }  /* END OF changeNBSprite */

    this.changeBG = function () {
        var bgHome;
        if (this.secretEndingItem3) bgHome = grant.brMode ? "images/bg/BackgroundApartment.png" : "images/bg/BackgroundRoom.png";
        else bgHome = "images/bg/BackgroundRoom.png";
        return bgHome;
    } /* END OF changeBG */

    //Resets all variables for travel
    this.travel = function (loc) {
        var footer = '',
            bg = '';
        switch (loc) {
            case "bedroom":
                bg = this.changeBG();
                footer = ftrAtHome;
                this.atConv = false;
                this.atBar = false;
                this.atHome = true;
                break;
            case "bar":
                bg = "images/bg/BackgroundBar.png";
                footer = ftrAtBar;
                this.drinksRound = 0;
                this.barHopped++;
                this.atBar = true;
                this.atHome = false;
                break;
            case "convention":
                bg = "images/bg/BackgroundConvention.png";
                footer = ftrAtConv;
                this.convAttended++;
                this.atConv = true;
                this.atHome = false;
                this.convDay = 0;
                break;
        } /* END SWITCH */
        $("#location").attr("src", bg);
        $("#sprite .sprite").attr("id", this.sprite + "-" + loc);
        $("#footer").html(footer);
    } /* END OF travel */

    this.newGame = function(){
        //mainCharacter primary stat variables
	    this.statEnergy = 100;
	    this.statHunger = 100;
	    this.statExcitement = 100;
	    this.statAccomplishment = 100;
	    this.statEuphoria = 0;
	    this.statStatus = 'Normal';
	    this.statMoney = 20000;
	    this.statSocial = 'Creepy';
        //mainCharacter decay stat variables
	    this.decayEnergy = 2;
	    this.decayHunger = 2;
	    this.decayExcitement = 2;
	    this.decaySOA = 2;
	    this.decTime = 3000;
        //mainCharacter wage variables
	    this.wage = 7;
	    this.hWage = 0;
        //mainCharacter display stat variables
	    this.itemsBought = 0;
	    this.timesGamed = 0;
	    this.argsEntered = 0;
        this.timesWorked = 0;
        this.moneyMade = 20;
        this.moneySpent = 0;
        this.convAttended = 0;
        this.timesExersized = 0;
        this.barHopped = 0;
        this.timesSocialized = 0;
        this.picsTaken = 0;
        //mainCharacter collection variables
	    this.argsWon = 0;
	    this.figsBought = 0;
	    this.fedsBought = 0;
	    this.wepsBought = 0;
        //mainCharacter end game variables
	    this.endFG = false;
	    this.endEFame = false;
	    this.endEmployed = false;
	    this.endIron = false;
	    this.endWaifu = false;
	    this.endNorm = false;
	    this.endGolden = false;
        //mainCharacter miscellanious variables
	    this.secretEndingItem1 = false;
	    this.secretEndingItem2 = false;
	    this.secretEndingItem3 = false;
	    this.atHome = true;
	    this.atBar = false;
	    this.atConv = false;
	    this.socialSkills = 0;
	    this.convDay = 0;
	    this.drinksRound = 0;
        this.sprite = "sprite";
        this.weight = 250.0;
        this.niceGuyPoints = 24;
        //options
        this.muteMusic = false;
        this.muteSounds = false;
        this.hintMode = false;
        this.brMode = true;
        this.background = "bedroom";
        //resets screen to bedroom
        this.travel(this.background);
        this.render();
    } /* END OF newGame */

    this.saveGame = function () {
        var mcObject = {
            energy: this.statEnergy,
            hunger: this.statHunger,
            excitement: this.statExcitement,
            accomplishment: this.statAccomplishment,
            euphoria: this.statEuphoria,
            status: this.statStatus,
            money: this.statMoney,
            statSocial: this.statSocial,
            decayEnergy: this.decayEnergy,
            decayHunger: this.decayHunger,
            decayExcitement: this.decayExcitement,
            decaySOA: this.decaySOA,
            decTime: this.decTime,
            wage: this.wage,
            hWage: this.hWage,
            itemsBought: this.itemsBought,
            timesGamed: this.timesGamed,
            argsEntered: this.argsEntered,
            timesWorked: this.timesWorked,
            moneyMade: this.moneyMade,
            moneySpent: this.moneySpent,
            convAttended: this.convAttended,
            timesExersized: this.timesExersized,
            barHopped: this.barHopped,
            timesSocialized: this.timesSocialized,
            picsTaken: this.picsTaken,
            argsWon: this.argsWon,
            figsBought: this.figsBought,
            fedsBought: this.fedsBought,
            wepsBought: this.wepsBought,
            endFG: this.endFG,
            endEFame: this.endEFame,
            endEmployed: this.endEmployed,
            endIron: this.endIron,
            endWaifu: this.endWaifu,
            endNorm: this.endNorm,
            endGolden: this.endGolden,
            secretEndingItem1: this.secretEndingItem1,
            secretEndingItem2: this.secretEndingItem2,
            secretEndingItem3: this.secretEndingItem3,
            atHome: this.atHome,
            atBar: this.atBar,
            atConv: this.atConv,
            socialSkills: this.socialSkills,
            convDay: this.convDay,
            drinksRound: this.drinksRound,
            sprite: this.sprite,
            weight: this.weight,
            niceGuyPoints: this.niceGuyPoints,
            muteMusic: this.muteMusic,
            muteSounds: this.muteSounds,
            hintMode: this.hintMode,
            brMode: this.brMode,
            background: this.background
        }; /* END OBJECT */
        //Makes a save file
        $.cookie("testSF", JSON.stringify(mcObject), { expires: 9999 });
    }  /* END OF saveGame */

    this.loadGame = function (optSel) {
        //Retrieves the save file
        var retrievedObject = $.cookie("testSF");
        if ((retrievedObject === undefined) || (retrievedObject === null)) {
            alert("No saved data detected.");
        } else {
            var json = JSON.parse(retrievedObject);
            this.statEnergy = json.energy;
            this.statHunger = json.hunger;
            this.statExcitement = json.excitement;
            this.statAccomplishment = json.accomplishment;
            this.statEuphoria = json.euphoria;
            this.statStatus = json.status;
            this.statMoney = json.money;
            this.statSocial = json.statSocial;
            this.decayEnergy = json.decayEnergy;
            this.decayHunger = json.decayHunger;
            this.decayExcitement = json.decayExcitement;
            this.decaySOA = json.decaySOA;
            this.decTime = json.decTime;
            this.wage = json.wage;
            this.hWage = json.hWage;
            this.itemsBought = json.itemsBought;
            this.timesGamed = json.timesGamed;
            this.argsEntered = json.argsEntered;
            this.timesWorked = json.timesWorked;
            this.moneyMade = json.moneyMade;
            this.moneySpent = json.moneySpent;
            this.convAttended = json.convAttended;
            this.timesExersized = json.timesExersized;
            this.barHopped = json.barHopped;
            this.timesSocialized = json.timesSocialized;
            this.picsTaken = json.picsTaken;
            this.argsWon = json.argsWon;
            this.figsBought = json.figsBought;
            this.fedsBought = json.fedsBought;
            this.wepsBought = json.wepsBought;
            this.endFG = json.endFG;
            this.endEFame = json.endEFame;
            this.endEmployed = json.endEmployed;
            this.endIron = json.endIron;
            this.endWaifu = json.endWaifu;
            this.endNorm = json.endNorm;
            this.endGolden = json.endGolden;
            this.secretEndingItem1 = json.secretEndingItem1;
            this.secretEndingItem2 = json.secretEndingItem2;
            this.secretEndingItem3 = json.secretEndingItem3;
            this.atHome = json.atHome;
            this.atBar = json.atBar;
            this.atConv = json.atConv;
            this.socialSkills = json.socialSkills;
            this.convDay = json.convDay;
            this.drinksRound = json.drinksRound;
            this.sprite = json.sprite;
            this.weight = json.weight;
            this.niceGuyPoints = json.niceGuyPoints;
            this.muteMusic = json.muteMusic;
            this.muteSounds = json.muteSounds;
            this.hintMode = json.hintMode;
            this.brMode = json.brMode;
            this.background = json.background;

            //turns off music if save option
            if(this.muteMusic){ 
                var music = document.getElementById("music");
                music.muted = ! music.muted;
            } /* END IF */

            //resets screen to background
            this.travel(this.background);
            //if player loads with non-normal status
            statusMap[this.statStatus].changeHtml();
            this.render();

            $("#mainDialog").dialog("close");
        } /* END IF */
    } /* END OF loadGame */

    this.resetStatus = function() {
        this.statStatus = 'Normal';
        statusMap['Normal'].changeHtml();
        this.decayEnergy = 2;
        this.decayHunger = 2;
        this.decayExcitement = 2;
        this.decaySOA = 2;
    } /* END OF resetStatus */

    this.changeStatus = function(newStatus) {
		if(statusMap[newStatus].priority > statusMap[this.statStatus].priority) {
            this.statStatus = newStatus;
            statusMap[newStatus].changeHtml();
        } /* END IF */
    } /* END OF changeStatus */

    this.randomEvent = function (place) {
        var chance = this.niceGuyPoints * 5;
        if (chance > 90) chance = 90;
        var roll = 100 - chance;
        if (randomizer(roll) === 1) {
        //if (1 === 1) {
            var arr;
            switch (place) {
                case "job1":
                    arr = job1;
                    break;
                case "job2":
                    arr = job2;
                    break;
                case "eat":
                    arr = eat;
                    break;
                case "drink":
                    arr = drink;
                    break;
                case "booth":
                    arr = booth;
                    break;
                case "photo":
                    arr = photo;
                    break;
            } /* END SWITCH */
            var rand = arr[randomizer(arr.length - 1)];
            var title = rand.title;
            var text = rand.text;
            var effect = rand.effect;
            eventMap[effect].effect();
            var nodeEvent = randomEvnt.replace("{TITLE}", title).replace("{TEXT}", text).replace("{EFFECT}", eventMap[effect].text);
            var dialogNode = new dialog(genericDia, nodeEvent);
            dialogArray.push(dialogNode);
        } /* END IF */
    }   /* END OF randomEvent */

    this.openOptions = function () {
        var optionsNode = '<div id="travelDia"><table class="optionsTable"><tr><td id="optionsTableHeader">Options</td></tr>';
        //music
        optionsNode += grant.muteMusic ? '<tr><td>Mute Music</td><td><button id="muteMusic" class="unmute"></button></td></tr>' : '<tr><td>Mute Music</td><td><button id="muteMusic" class="mute"></button></td></tr>';
        //sound
        optionsNode += grant.muteSounds ? '<tr><td>Mute Sounds</td><td><button id="muteSound" class="unmute"></button></td></tr>' : '<tr><td>Mute Sounds</td><td><button id="muteSound" class="mute"></button></td></tr>';
        //select
        optionsNode += '<tr><td>Switch Neckbeard</td><td><select id="changeNB"><option value="sprite">Nick M. Beardman</option>';
        //euphoria unlocks
        if (this.statEuphoria >= 1000) optionsNode += '<option value="sprite2">Fred "Murdermaster" Wilhelm</option>';
        if (this.statEuphoria >= 2000) optionsNode += '<option value="sprite3">Mr. Nice Guy</option>';
        if (this.statEuphoria >= 3000) optionsNode += '<option value="sprite4">Dick Wolf</option>';
        if (this.statEuphoria >= 4000) optionsNode += '<option value="sprite5">John "Hideyoshi" Smith</option>';
        if (this.statEuphoria >= 5000) optionsNode += '<option value="sprite6">"Puzzles"</option>';
        if (this.statEuphoria >= 6000) optionsNode += '<option value="sprite7">Bret</option>';
        if (this.statEuphoria >= 7000) optionsNode += '<option value="sprite8">An actual white knight</option>';
        //ending unlocks
        if (this.endFG) optionsNode += '<option value="sprite9">Fedora God</option>';
        if (this.endEmployed) optionsNode += '<option value="sprite10">Adult-ing Ending</option>';
        if (this.endEFame) optionsNode += '<option value="sprite11">E-Fame Ending</option>';
        if (this.endIron) optionsNode += '<option value="sprite12">Iron Pill Ending</option>';
        if (this.endWaifu) optionsNode += '<option value="sprite13">Waifu Ending</option>';
        if (this.endNorm) optionsNode += '<option value="sprite14">Normal Ending</option>';
        if (this.endGolden) optionsNode += '<option value="sprite15">Golden Ending</option>';
        optionsNode += '<option value="sprite16">Anniversary</option>';
        optionsNode += '</select></td></tr>';
        //secret item 1 unlock
        if (this.secretEndingItem1) optionsNode += grant.hintMode ? '<tr><td>Toggle No-Hint Mode</td><td><button id="toggleHint" class="hintOn"></button></td></tr>' : '<tr><td>Toggle No-Hint Mode</td><td><button id="toggleHint" class="hintOff"></button></td></tr>';
        //secret item 3 unlock
        if (this.secretEndingItem3) optionsNode += grant.brMode ? '<tr><td>Toggle Apartment</td><td><button id="toggleApartment" class="aptOn"></button></td></tr>' : '<tr><td>Toggle Apartment</td><td><button id="toggleApartment" class="aptOff"></button></td></tr>';
        optionsNode += '<tr><td colspan="2"><p id="resetSaveFile">Reset Save File</p></td></tr></table><br><button class="backGameBtn" id="emd"></button></div>';
        return optionsNode;
    } /* END IF */
} /* END OF mainCharacter */
function progress(percent, element) { 
	var progressBarWidth = percent * element.width() / 100;
	element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "% ");
} /* END OF progress */

function checkStatus(){
    var status = grant.statStatus;
    if((status !== 'Normal') && (sTimer == 0)){
        sTimer = statusMap[status].timer;
        statusEffect();
    } else if(status != 'Normal'){
        statusEffect();
    } /* END IF */
} /* END OF checkStatus */

function statusEffect(){
    var status = grant.statStatus;
    statusMap[status].effect();
    statusMap[status].changeHtml();
    
    if(sTimer === 1) grant.resetStatus();
    sTimer--;
} /* END OF statusEffect */

function init(){
    var backgroundAudio = document.getElementById("music");
    backgroundAudio.volume = 0.6;
    window.dialogArray = [];
    window.dialogIterate = 0;
    window.grant = new mainCharacter();
    window.sTimer = 0;
    decay();
    grant.render();
    objectLoader();
} /* END OF init */

function createEndScreen(image, btnId){
    return '<div id="gameEnd"><img src="images/es/'+ image +'.png"></img><button id="' + btnId +'" class="continueGameBtn"></button></div>';
} /* END OF createEndScreen */

function cost(money) {
    var proceed = false;
    if (money > grant.statMoney) {
        grant.statAccomplishment -= 10;
        dialogRefresh(genericDia, nodeNoMoney);
        grant.render();
    } else {
        grant.statMoney -= money;
        grant.moneySpent += money;
        proceed = true;
    } /* END IF */
    return proceed;
} /* END OF cost */

function startWorkOut() {
    currentGymNum = randomizer(gymObject.length) - 1;
    var workOut = gymObject[currentGymNum]
        event = workOut.event,
        len = event.length;
    choice1 = randomizer(len) - 1;
    choice2 = randomizer(len) - 1;

    if (choice1 === choice2) {
        if (choice2 === (len-1)) choice2--;
        else choice2++;
    }

    $("#gymEvent").html("");
    $("#gym1").show();
    $("#gymBottom").hide();

    $("#gymEvent").append(workOut.text);
    $("#g1").text(event[choice1].choice);
    $("#g2").text(event[choice2].choice);
} /* END OF startWorkOut */

function objectLoader(){
    //item objects
    function item(name, money, effect) {
        this.name = name;
        this.money = money;
        this.effect = effect;
        this.purchase = function () { if (cost(this.money)) { this.effect(); play("cr1"); } else { play("pp1"); } };
    }
    window.itemMap = {};
    window.itemArray = [];

    itemArray[0] = new item("item1", 2, function () { grant.statHunger += 3; grant.changeEuphoria(5); });
    itemArray[1] = new item("item2", 5, function () { grant.statHunger += 10; });
    itemArray[2] = new item("item3", 8, function () { grant.statHunger += 15; });
    itemArray[3] = new item("item4", 2, function () { grant.statEnergy += 3; });
    itemArray[4] = new item("item5", 6, function () { grant.statEnergy += 10; if (randomizer(3) === 1) { grant.changeStatus('Tweaked'); } });
    itemArray[5] = new item("item6", 15, function () { grant.statEnergy += 15; grant.changeEuphoria(3); });
    itemArray[6] = new item("item7", 5, function () { grant.statExcitement += 3; grant.statAccomplishment += 3; });
    itemArray[7] = new item("item8", 15, function () { grant.statExcitement += 10; grant.statAccomplishment += 10; });
    itemArray[8] = new item("item9", 40, function () { grant.statExcitement += 25; grant.statAccomplishment += 25; grant.changeEuphoria(10); });
    itemArray[9] = new item("item10", 10, function () { grant.changeEuphoria(50); grant.fedsBought++; });
    itemArray[10] = new item("item11", 20, function () { grant.changeEuphoria(100); grant.figsBought++; });
    itemArray[11] = new item("item12", 45, function () { grant.changeEuphoria(250); grant.wepsBought++; });
    itemArray[12] = new item("item13", 250, function () { if (!grant.secretEndingItem1) { grant.changeSecretItem(1); }});
    itemArray[13] = new item("item14", 500, function () { if (!grant.secretEndingItem2) { grant.changeSecretItem(2); }});
    itemArray[14] = new item("item15", 1000, function () { if (!grant.secretEndingItem3) { grant.changeSecretItem(3); }});
    itemArray[15] = new item("item16", 5, function () { grant.changeSocial(1,false); });
    itemArray[16] = new item("item17", 15, function () { grant.changeWeight(0.4); grant.statEnergy += 5; grant.statAccomplishment += 5; });
    itemArray[17] = new item("item18", 20, function () { grant.resetStatus(); });

    var len = itemArray.length;
    while (len--) {
        var itemObj = itemArray[len];
        var mapKey = itemArray[len].name;
        itemMap[mapKey] = itemObj;
    }

    //loads status effects
    function status(name, style, timer, priority, tooltip, effect) {
        this.name = name;
        this.style = style;
        this.timer = timer;
		this.priority = priority;
        this.tooltip = tooltip;
        this.effect = effect;
        this.changeHtml = function () { $("#status").prop('title', this.tooltip).css('color', this.style); }
    }

    window.statusMap = [];
    window.statusArray = [];
    var white = "white",
		green = "#2ECC71",
		red = "#E74C3C";
    statusArray[0] = new status('Normal', white, null, 0, "You are normal. Kinda...", function () { grant.resetStatus(); });
    statusArray[1] = new status('Tweaked', green, 5, 95, "Energy++", function () { grant.decayEnergy = -1; });
    statusArray[2] = new status('Hungover', red, 10, 99, "Energy--", function () { grant.decayEnergy = 4; });
    statusArray[3] = new status('Drunk', red, 10, 98, "Energy-", function () { grant.decayEnergy = 3; });
    statusArray[4] = new status('In Love', green, 5, 9, "Accomplishment++", function () { grant.decaySOA = -2; });
    statusArray[5] = new status('Confident', green, 5, 50, "Accomplishment++, Excitement+", function () { grant.decaySOA = -2; grant.decayExcitement = 1; });
    statusArray[6] = new status('Content', green, 15, 1, "Energy+, Accomplishment+, Excitement+", function () { grant.decayEnergy = 1; grant.decaySOA = 1; grant.decayExcitement = 1; });
    statusArray[7] = new status('Heartbroken', red, 15, 11, "Accomplishment-", function () { grant.decaySOA = 3; });
    statusArray[8] = new status('Embarrassed', red, 5, 10, "Excitement-", function () { grant.decayExcitement = 3; });
    statusArray[9] = new status('Emasculated', red, 15, 12, "Accomplishment--, Excitement-", function () { grant.decaySOA = 4; grant.decayExcitement = 3; });
    statusArray[10] = new status('Paranoid', red, 10, 5, "Energy-, Accomplishment-", function () { grant.decayEnergy = 3; grant.decayExcitement = 3; });
    statusArray[11] = new status('Discontent', red, 15, 4, "Energy-, Accomplishment-, Excitement-", function () { grant.decayEnergy = 3; grant.decaySOA = 3; grant.decayExcitement = 3; });
    statusArray[12] = new status('Sick', red, 15, 3, "Energy-, Hunger-", function () { grant.decayEnergy = 3; grant.decayHunger = 3; });
    statusArray[13] = new status('Euphoric', green, 15, 97, "All++", function () { grant.decayEnergy = -4; grant.decayHunger = -4; grant.decayExcitement = -4; grant.decaySOA = -4; });
    statusArray[14] = new status('Dead Inside', red, 15, 96, "All--", function () { grant.decayEnergy = 3; grant.decayHunger = 3; grant.decayExcitement = 3; grant.decaySOA = 3; });
    statusArray[15] = new status('Motivated', green, 10, 7, "Energy++, Accomplishment+", function () { grant.decayEnergy = -1; grant.decaySOA = 1; });
    statusArray[16] = new status('Dishonored', red, 15, 6, "Energy--, Accomplishment-", function () { grant.decayEnergy = 4; grant.decaySOA = 3; });

    var len = statusArray.length;
    while (len--) {
        var statusObj = statusArray[len];
        var mapKey = statusArray[len].name;
        statusMap[mapKey] = statusObj;
    }

    //loads events
    function event(name, text, effect) {
        this.name = name;
        this.text = text;
        this.effect = effect;
    }

    window.eventMap = {};
    window.eventArray = [];
	eventArray[0] = new event('excitementUp', "+10 Excitement", function () { grant.statExcitement += 10; });
    eventArray[1] = new event("excitementUpL", "+30 Excitement", function () { grant.statExcitement += 30; });
    eventArray[2] = new event('hungerUp', "+10 Hunger", function () { grant.statHunger += 10; });
    eventArray[3] = new event('soaUp', "+10 Accomplishment", function () { grant.statAccomplishment += 10; });
    eventArray[4] = new event('energyUp', "+10 Energy", function () { grant.statEnergy += 10; });
    eventArray[5] = new event('moneyUp', "+10 Money", function () { grant.paid(10); });
    eventArray[6] = new event("moneyUpM", "+30 Money", function () { grant.paid(30); });
	eventArray[7] = new event("moneyUpL", "+50 Money", function () { grant.paid(50); });
    eventArray[8] = new event('inLove', "You are now in love (++Accomplishment)", function () { grant.changeStatus('In Love'); });
    eventArray[9] = new event('content', "You are now content (+Energy, +Excitement, +Accomplishment)", function () { grant.changeStatus('Content'); });
    eventArray[10] = new event('confident', "You are feeling confident (+Excitement, ++Accomplishment)", function () { grant.changeStatus('Confident'); });
    eventArray[11] = new event('hatPlus', "+1 Fedora", function () { grant.fedsBought++; });
    eventArray[12] = new event('photoUp', "+1 Photo", function () { grant.takePics(1); });
    eventArray[13] = new event('soaDown', "-10 Accomplishment", function () { grant.statAccomplishment -= 10; });
    eventArray[14] = new event('excitementDown', "-10 Excitement", function () { grant.statExcitement -= 10; });
    eventArray[15] = new event('moneyDown', "-10 Money", function () { if (!cost(10)) { grant.statMoney = 0; } });
    eventArray[16] = new event('heartbroken', "Your heart has shattered (-Accomplishment)", function () { grant.changeStatus('Heartbroken'); });
    eventArray[17] = new event('embarrassed', "You feel embarrassed (-Excitement)", function () { grant.changeStatus('Embarrassed'); });
    eventArray[18] = new event('emasculated', "You feel emasculated (-Excitement, --Accomplishment)", function () { grant.changeStatus('Emasculated'); });
    eventArray[19] = new event('paranoid', "You feel paranoid (-Energy, -Excitement)", function () { grant.changeStatus('Paranoid'); });
    eventArray[20] = new event('discontent', "You feel discontent (-Energy, -Excitement, -Accomplishment)", function () { grant.changeStatus('Discontent'); });
    eventArray[21] = new event('sick', "You feel sick (-Energy, -Hunger)", function () { grant.changeStatus('Sick'); });
    eventArray[22] = new event('motivated', "You feel motivated (++Energy, +Accomplishment)", function () { grant.changeStatus('Motivated'); });
    eventArray[23] = new event('dishonored', "You feel dishonored (--Energy, -Accomplishment)", function () { grant.changeStatus('Dishonored'); });
    eventArray[24] = new event('deadInside', "You are dead inside (--Everything)", function () { grant.changeStatus('Dead Inside'); });
    eventArray[25] = new event('hungerDown', "-10 Hunger", function () { grant.statHunger -= 10; });
    eventArray[26] = new event('ngpUp', "+1 Nice Guy Point", function () { grant.changeNGP(1); });
    eventArray[27] = new event('energyDown', "-10 Energy", function () { grant.statEnergy -= 10; });
	eventArray[28] = new event("socialUp", "+1 Social Skill", function () { grant.changeSocial(1,true); });
    eventArray[29] = new event("workOut", "Lost 1.0lb<br>-10 Energy", function () { grant.statEnergy -= 10; grant.changeWeight(1.0); });
    eventArray[30] = new event("euphoriaUp", "+25 Euphoria", function () { grant.changeEuphoria(25); });
	eventArray[31] = new event("transport", "+10 Excitement<br>Spent $10", function () { grant.statExcitement += 10; cost(10); });
    eventArray[32] = new event("buyMags", "+3 Excitement<br>+25 Euphoria<br>Spent $10", function () { grant.statExcitement += 3; grant.changeEuphoria(25); cost(10); });
    eventArray[33] = new event("compliment", "+2 Excitement<br>+3 Social Skill", function () { grant.statExcitement += 2; grant.changeSocial(3,true); });
    eventArray[34] = new event("donate", "+20 Accomplishment<br>+25 Euphoria<br>+1 Social Skill<br>Spent $20", function () { grant.statAccomplishment += 20; grant.changeEuphoria(25); grant.changeSocial(1,true); cost(20); });
    eventArray[35] = new event("swatAway", "+3 Excitement<br>You are feeling confident (+Excitement, ++Accomplishment)<br>-5 Energy", function () { grant.statEnergy -= 5; grant.statExcitement += 3; grant.changeStatus('Confident'); });
    eventArray[36] = new event("leadOut", "+10 Accomplishment<br>+25 Euphoria", function () { grant.statAccomplishment += 10; grant.changeEuphoria(25); });
    eventArray[37] = new event("petDog", "+5 Excitement<br>+3 Social Skill", function () { grant.statExcitement += 5; grant.changeSocial(3,true); });
    eventArray[38] = new event("ridable", "+5 Excitement<br>+5 Accomplishment", function () { grant.statExcitement += 5; grant.statAccomplishment += 5; });
    eventArray[39] = new event("lateFees", "+5 Accomplishment<br>Spent $5", function () { grant.statAccomplishment += 5; cost(5); });
    eventArray[40] = new event("buySnack", "+10 Hunger<br>Spent $5", function () { grant.statHunger += 10; cost(5); });
    eventArray[41] = new event("vintageComics", "+10 Excitement<br>+10 Euphoria", function () { grant.statExcitement += 10; grant.changeEuphoria(10); });
    eventArray[42] = new event("chessWin", "+10 Excitement<br>+10 Accomplishment<br>+1 Social Skill", function () { grant.statExcitement += 10; grant.statAccomplishment += 10; grant.changeSocial(1,true); });
    eventArray[43] = new event("chessLose", "+3 Social Skill", function () { grant.changeSocial(3,true); });
    eventArray[44] = new event("spinGlobe", "+10 Excitement<br>Spent $15", function () { grant.statExcitement += 10; cost(15); });
    eventArray[45] = new event("photoLook", "You are now content (+Energy, +Excitement, +Accomplishment)<br>Spent $15", function () { grant.changeStatus('Content'); cost(15); });
    eventArray[46] = new event("arcadePlay", "+10 Excitement<br>+2 Social Skill<br>Spent $10", function () { grant.statExcitement += 10; grant.changeSocial(2,true); cost(15); });
    eventArray[47] = new event("katanaShop", "+5 Excitement<br>+5 Accomplishment<br>+25 Euphoria", function () { grant.statExcitement += 5; grant.statAccomplishment += 5; grant.changeEuphoria(25); });
    eventArray[48] = new event("coffeeShop", "+5 Energy<br>+1 Social Skill<br>Spent $5", function () { grant.statEnergy += 5; grant.changeSocial(1,true); });
    eventArray[49] = new event("burgerPlace", "+20 Hunger<br>Spent $10", function () { grant.statHunger += 20; cost(10); });
    eventArray[50] = new event("dontDoDrugs", "-10 Energy<br>-15 Excitement<br>+20 Accomplishment<br>+2 Social Skill", function () { grant.statEnergy -= 10; grant.statExcitement -= 15; grant.statAccomplishment += 20; grant.changeSocial(2,true); });
    eventArray[51] = new event("doDrugs", "-25 Accomplishment", function () { grant.statAccomplishment -= 25; });
    eventArray[52] = new event("askForHelp", "+2 Social Skill<br>Spent $5", function () { grant.changeSocial(2,true); cost(5); });
    eventArray[53] = new event("buyStamps", "+15 Excitement<br>Spent $10", function () { grant.statExcitement += 15; cost(10); });
    eventArray[54] = new event("buyFig", "+5 Excitement<br>+100 Euphoria<br>Spent $25", function () { grant.statExcitement += 5; cost(25); });
    eventArray[55] = new event("buyBooks", "-25 Accomplishment<br>Spent $10", function () { grant.statAccomplishment -= 25; grant.changeEuphoria(100); cost(10); });
    eventArray[56] = new event("workDo", "Did Work", function () { grant.work(); });
    eventArray[57] = new event("iceCream", "+5 Hunger<br>+15 Excitement<br>-5 Accomplishment<br>Spent $10", function () { grant.statHunger += 5; grant.statExcitement += 15; grant.statAccomplishment -= 5; cost(10); });
    eventArray[58] = new event("relaxed", "+5 Excitement<br>+5 Accomplishment", function () { grant.statExcitement += 5; grant.statAccomplishment += 5; });
    eventArray[59] = new event("buyWiper", "+10 Accomplishment<br>+1 Nice Guy Point<br>Spent $30", function () { grant.statAccomplishment += 10; grant.changeNGP(1); cost(30); });
    eventArray[60] = new event("buyOil", "-5 Accomplishment<br>Spent $15", function () { grant.statAccomplishment -= 5; cost(15); });
    eventArray[61] = new event("buyDonuts", "+15 Hunger<br>Spent $5", function () { grant.statHunger += 15; cost(5); });
    eventArray[62] = new event("buyCoffee", "+15 Energy<br>Spent $5", function () { grant.statEnergy += 15; cost(5); });
    eventArray[63] = new event("givePie", "-5 Hunger<br>+15 Accomplishment", function () { grant.statHunger -= 5; grant.statAccomplishment += 15; });
    eventArray[64] = new event("makeNachos", "+10 Excitement<br>+10 Accomplishment", function () { grant.statExcitement += 10; grant.statAccomplishment += 10; });
    eventArray[65] = new event("makeTaquitos", "+5 Excitement<br>+5 Accomplishment", function () { grant.statExcitement += 5; grant.statAccomplishment += 5; });
    eventArray[66] = new event("sacDew", "+10 Accomplishment<br>+1 Nice Guy Point", function () { grant.statAccomplishment += 10; grant.changeNGP(1); });
    eventArray[67] = new event("buyCannoli", "+1 Nice Guy Point<br>Spent $5", function () { grant.changeNGP(1); cost(5); });
	eventArray[68] = new event("payHigh", "+1 Nice Guy Point<br>Spent $25", function () { grant.changeNGP(1); cost(25); });
    eventArray[69] = new event("payLow", "Spent $22", function () { cost(22); });
    eventArray[70] = new event("dogLie", "+10 Excitement<br>+1 Social Skill", function () { grant.statExcitement += 10; grant.changeSocial(1,true); });
    eventArray[71] = new event("tellTruth", "+2 Social Skill<br>+1 Nice Guy Point", function () { grant.changeSocial(2,true); grant.changeNGP(1); });
    eventArray[72] = new event("playFetch", "+5 Excitement<br>Lost 0.4lb", function () { grant.statExcitement += 5; grant.changeWeight(0.4); });
    eventArray[73] = new event("feedDog", "+5 Excitement<br>-10 Accomplishment", function () { grant.statExcitement += 5; grant.statAccomplishment -= 10; });
    eventArray[74] = new event("dontFeed", "+5 Hunger<br>+5 Accomplishment", function () { grant.statHunger += 5; grant.statAccomplishment += 5; });
    eventArray[75] = new event("researchStuff", "+5 Accomplishment<br>+1 Social Skill", function () { grant.statAccomplishment += 5; grant.changeSocial(1,false); });
    eventArray[76] = new event("ironClothes", "+5 Accomplishment<br>+1 Nice Guy Point<br>-10 Energy", function () { grant.statAccomplishment += 5; grant.changeNGP(1); grant.statEnergy -= 10});
    eventArray[77] = new event("leavePile", "+15 Energy", function () { grant.statEnergy += 15; });
    eventArray[78] = new event("eatWatch", "+4 Hunger<br>+7 Excitement", function () { grant.statHunger += 4; grant.statExcitement += 7; });
    eventArray[79] = new event("coatRack", "+3 Accomplishment<br>Lost 0.3lb<br>-5 Energy", function () { grant.changeWeight(0.3); grant.statAccomplishment += 3; grant.statEnergy -= 5; });
    eventArray[80] = new event("clothesDresser", "+15 Accomplishment", function () { grant.statAccomplishment += 15; });
	
	var len = eventArray.length;
    while (len--) {
        var eventObj = eventArray[len];
        var mapKey = eventArray[len].name;
        eventMap[mapKey] = eventObj;
    } /* END WHILE */

    //convention
    window.conventionMap = {};
    window.conventionArray = [];
    //photo shoot
    conventionArray[0] = new convention('ps1', '+5 Excitement<br>+1 Picture Taken', function () { grant.statExcitement += 5; grant.takePics(1); });
    conventionArray[1] = new convention('ps2', '+10 Excitement<br>+1 Social Skill<br>+2 Pictures Taken', function () { grant.statExcitement += 10; grant.changeSocial(1,true); grant.takePics(2); });
    conventionArray[2] = new convention('ps3', '+15 Excitement<br>+3 Social Skill<br>+3 Pictures Taken', function () { grant.statExcitement += 15; grant.changeSocial(3,true); grant.takePics(3); });
    conventionArray[3] = new convention('ps4', '+20 Excitement<br>+3 Social Skill<br>+4 Pictures Taken', function () { grant.statExcitement += 20; grant.changeSocial(3,true); grant.takePics(4); });
    conventionArray[4] = new convention('ps5', '+25 Excitement<br>+3 Social Skill<br>+5 Pictures Taken', function () { grant.statExcitement += 25; grant.changeSocial(3,true); grant.takePics(5); });

    //figurine give away
    conventionArray[5] = new convention('fg1', '+5 Euphoria<br>+1 Figurine', function () { grant.changeEuphoria(5); grant.figsBought++; });
    conventionArray[6] = new convention('fg2', '+10 Euphoria<br>+1 Social Skill<br>+1 Figurine', function () { grant.changeEuphoria(10); grant.changeSocial(1,true); grant.figsBought++; });
    conventionArray[7] = new convention('fg3', '+25 Euphoria<br>+2 Social Skill<br>+1 Figurine', function () { grant.changeEuphoria(25); grant.changeSocial(2,true); grant.figsBought++; });
    conventionArray[8] = new convention('fg4', '+50 Euphoria<br>+3 Social Skill<br>+2 Figurines', function () { grant.changeEuphoria(50); grant.changeSocial(3,true); grant.figsBought += 2; });
    conventionArray[9] = new convention('fg5', '+100 Euphoria<br>+5 Social Skill<br>+3 Figurines', function () { grant.changeEuphoria(100); grant.changeSocial(5,true); grant.figsBought += 3; });

    //qa panel
    conventionArray[10] = new convention('qa1', '+5 Excitement<br>+5 Euphoria', function () { grant.statExcitement += 5; grant.changeEuphoria(5); });
    conventionArray[11] = new convention('qa2', '+10 Excitement<br>+10 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.changeEuphoria(10); grant.changeSocial(1,true); });
    conventionArray[12] = new convention('qa3', '+15 Excitement<br>+25 Euphoria<br>+3 Social Skill', function () { grant.statExcitement += 15; grant.changeEuphoria(25); grant.changeSocial(3,true); });
    conventionArray[13] = new convention('qa4', '+20 Excitement<br>+5 Accomplishment<br>+50 Euphoria<br>+3 Social Skill', function () { grant.statExcitement += 20; grant.statAccomplishment += 5; grant.changeEuphoria(50); grant.changeSocial(3,true); });
    conventionArray[14] = new convention('qa5', '+25 Excitement<br>+10 Accomplishment<br>+100 Euphoria<br>+3 Social Skill', function () { grant.statExcitement += 25; grant.statAccomplishment += 10; grant.changeEuphoria(100); grant.changeSocial(3,true); });

    //maid cafe
    conventionArray[15] = new convention('mc1', '+5 Excitement<br>+Tweaked(+Energy)', function () { grant.statExcitement += 5; grant.changeStatus('Tweaked'); });
    conventionArray[16] = new convention('mc2', '+10 Excitement<br>+1 Social Skill<br>+Tweaked(+Energy)', function () { grant.statExcitement += 10; grant.changeSocial(1,true); grant.changeStatus('Tweaked'); });
    conventionArray[17] = new convention('mc3', '+15 Excitement<br>+3 Social Skill<br>+Tweaked(+Energy)', function () { grant.statExcitement += 15; grant.changeSocial(3,true); grant.changeStatus('Tweaked'); });
    conventionArray[18] = new convention('mc4', '+20 Excitement<br>+4 Social Skill<br>+Tweaked(+Energy)', function () { grant.statExcitement += 20; grant.changeSocial(4,true); grant.changeStatus('Tweaked'); });
    conventionArray[19] = new convention('mc5', '+25 Excitement<br>+5 Social Skill<br>+Tweaked(+Energy)', function () { grant.statExcitement += 25; grant.changeSocial(5,true); grant.changeStatus('Tweaked'); });

    //anime karaoke
    conventionArray[20] = new convention('ak1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[21] = new convention('ak2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.changeSocial(1,true); });
    conventionArray[22] = new convention('ak3', '+20 Excitement<br>+5 Accomplishment<br>+1 Social Skill<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 20; grant.statAccomplishment += 5; grant.changeSocial(1,true); grant.changeStatus('Content'); });
    conventionArray[23] = new convention('ak4', '+25 Excitement<br>+10 Accomplishment<br>+1 Social Skill<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 25; grant.statAccomplishment += 10; grant.changeSocial(1,true); grant.changeStatus('Content'); });
    conventionArray[24] = new convention('ak5', '+30 Excitement<br>+15 Accomplishment<br>+2 Social Skill<br>+Confident(+Excitement, ++Accomplishment)', function () { grant.statExcitement += 30; grant.statAccomplishment += 15; grant.changeSocial(2,true); grant.changeStatus('Confident'); });

    //rave
    conventionArray[25] = new convention('rv1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[26] = new convention('rv2', '+20 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 20; grant.changeSocial(1,true); });
    conventionArray[27] = new convention('rv3', '+30 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 30; grant.changeSocial(3,true); });
    conventionArray[28] = new convention('rv4', '+40 Excitement<br>+4 Social Skill', function () { grant.statExcitement += 40; grant.changeSocial(4,true); });
    conventionArray[29] = new convention('rv5', '+50 Excitement<br>+5 Social Skill', function () { grant.statExcitement += 50; grant.changeSocial(5,true); });

    //celebrity signing
    conventionArray[30] = new convention('cs1', '+5 Excitement<br>+5 Euphoria', function () { grant.statExcitement += 5; grant.changeEuphoria(5); });
    conventionArray[31] = new convention('cs2', '+10 Excitement<br>+10 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.changeSocial(1,true); grant.changeEuphoria(10); });
    conventionArray[32] = new convention('cs3', '+15 Excitement<br>+5 Accomplishment<br>+25 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.statAccomplishment += 5; grant.changeSocial(1,true); grant.changeEuphoria(25); });
    conventionArray[33] = new convention('cs4', '+20 Excitement<br>+10 Accomplishment<br>+50 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 20; grant.statAccomplishment += 10; grant.changeSocial(1,true); grant.changeEuphoria(50); });
    conventionArray[34] = new convention('cs5', '+25 Excitement<br>+15 Accomplishment<br>+100 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 25; grant.statAccomplishment += 15; grant.changeSocial(1,true); grant.changeEuphoria(100); });

    //game demo
    conventionArray[35] = new convention('gd1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[36] = new convention('gd2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 20; grant.changeSocial(1,true); });
    conventionArray[37] = new convention('gd3', '+20 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 30; grant.changeSocial(3,true); });
    conventionArray[38] = new convention('gd4', '+25 Excitement<br>+5 Social Skill', function () { grant.statExcitement += 40; grant.changeSocial(5,true); });
    conventionArray[39] = new convention('gd5', '+30 Excitement<br>+5 Social Skill', function () { grant.statExcitement += 50; grant.changeSocial(5,true); });

    //magic show
    conventionArray[40] = new convention('ms1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[41] = new convention('ms2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.changeSocial(1,true); });
    conventionArray[42] = new convention('ms3', '+20 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 20; grant.changeSocial(3,true); });
    conventionArray[43] = new convention('ms4', '+25 Excitement<br>+3 Social Skill<br>+10 Euphoria<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 25; grant.changeSocial(3,true); grant.changeEuphoria(10); grant.changeStatus('Content'); });
    conventionArray[44] = new convention('ms5', '+30 Excitement<br>+3 Social Skill<br>+25 Euphoria<br>+Confident(+Excitement, ++Accomplishment)', function () { grant.statExcitement += 30; grant.changeSocial(3,true); grant.changeEuphoria(25); grant.changeStatus('Confident'); });

    //idol concert
    conventionArray[45] = new convention('ic1', '+5 Excitement<br>+5 Euphoria', function () { grant.statExcitement += 5; grant.changeEuphoria(5); });
    conventionArray[46] = new convention('ic2', '+10 Excitement<br>+1 Social Skill<br>+10 Euphoria', function () { grant.statExcitement += 10; grant.changeSocial(1,true); grant.changeEuphoria(10); });
    conventionArray[47] = new convention('ic3', '+15 Excitement<br>+3 Social Skill<br>+25 Euphoria', function () { grant.statExcitement += 15; grant.changeSocial(3,true); grant.changeEuphoria(25); });
    conventionArray[48] = new convention('ic4', '+20 Excitement<br>+3 Social Skill<br>+50 Euphoria', function () { grant.statExcitement += 20; grant.changeSocial(3,true); grant.changeEuphoria(50); });
    conventionArray[49] = new convention('ic5', '+25 Excitement<br>+3 Social Skill<br>+50 Euphoria', function () { grant.statExcitement += 25; grant.changeSocial(3,true); grant.changeEuphoria(50); });

    //dance off
    conventionArray[50] = new convention('do1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[51] = new convention('do2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.changeSocial(1,true); });
    conventionArray[52] = new convention('do3', '+20 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 20; grant.changeSocial(3,true); });
    conventionArray[53] = new convention('do4', '+25 Excitement<br>+5 Accomplishment<br>+3 Social Skill<br>+Confident(+Excitement, ++Accomplishment)', function () { grant.statExcitement += 25; grant.statAccomplishment += 5; grant.changeSocial(3,true); grant.changeStatus('Confident'); });
    conventionArray[54] = new convention('do5', '+30 Excitement<br>+10 Accomplishment<br>+3 Social Skill<br>+Confident(+Excitement, ++Accomplishment)', function () { grant.statExcitement += 30; grant.statAccomplishment += 10; grant.changeSocial(3,true); grant.changeStatus('Confident'); });

    //human chess
    conventionArray[55] = new convention('hc1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[56] = new convention('hc2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.changeSocial(1,true); });
    conventionArray[57] = new convention('hc3', '+20 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 20; grant.changeSocial(3,true); });
    conventionArray[58] = new convention('hc4', '+25 Excitement<br>+5 Social Skill', function () { grant.statExcitement += 25; grant.changeSocial(5,true); });
    conventionArray[59] = new convention('hc5', '+30 Excitement<br>+5 Social Skill<br>+Euphoric(+++All)', function () { grant.statExcitement += 30; grant.changeSocial(5,true); grant.changeStatus('Euphoric'); });

    //game o ninja
    conventionArray[60] = new convention('gn1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[61] = new convention('gn2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.changeSocial(1,true); });
    conventionArray[62] = new convention('gn3', '+20 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 20; grant.changeSocial(3,true); });
    conventionArray[63] = new convention('gn4', '+25 Excitement<br>+5 Social Skill', function () { grant.statExcitement += 25; grant.changeSocial(5,true); });
    conventionArray[64] = new convention('gn5', '+30 Excitement<br>+7 Social Skill<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 30; grant.changeSocial(7,true); grant.changeStatus('Content'); });

    //quiz show
    conventionArray[65] = new convention('qs1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[66] = new convention('qs2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.changeSocial(1,true); });
    conventionArray[67] = new convention('qs3', '+20 Excitement<br>+3 Social Skill<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 20; grant.changeSocial(3,true); grant.changeStatus('Content'); });
    conventionArray[68] = new convention('qs4', '+25 Excitement<br>+5 Accomplishment<br>+3 Social Skill<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 25; grant.statAccomplishment += 5; grant.changeSocial(3,true); grant.changeStatus('Content'); });
    conventionArray[69] = new convention('qs5', '+30 Excitement<br>+5 Accomplishment<br>+3 Social Skill<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 30; grant.statAccomplishment += 10; grant.changeSocial(3,true); grant.statMoney += 50; grant.changeStatus('Content'); });

    //open mic
    conventionArray[70] = new convention('om1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[71] = new convention('om2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.changeSocial(1,true); });
    conventionArray[72] = new convention('om3', '+20 Excitement<br>+3 Social Skill<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 20; grant.changeSocial(3,true); grant.changeStatus('Content'); });
    conventionArray[73] = new convention('om4', '+25 Excitement<br>+5 Social Skill<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 25; grant.changeSocial(5,true); grant.changeStatus('Content');});
    conventionArray[74] = new convention('om5', '+30 Excitement<br>+7 Social Skill<br>+Confident(+Excitement, ++Accomplishment)', function () { grant.statExcitement += 30; grant.changeSocial(7,true); grant.changeStatus('Confident'); });

    //larp battle
    conventionArray[75] = new convention('lb1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[76] = new convention('lb2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.changeSocial(1,true); });
    conventionArray[77] = new convention('lb3', '+20 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 20; grant.changeSocial(3,true); });
    conventionArray[78] = new convention('lb4', '+25 Excitement<br>+5 Social Skill', function () { grant.statExcitement += 25; grant.changeSocial(5,true); });
    conventionArray[79] = new convention('lb5', '+30 Excitement<br>+7 Social Skill', function () { grant.statExcitement += 30; grant.changeSocial(7,true); });

    //tcg competition
    conventionArray[80] = new convention('tc1', '+5 Excitement', function () { grant.statExcitement += 5; });
    conventionArray[81] = new convention('tc2', '+10 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.changeSocial(1,true); });
    conventionArray[82] = new convention('tc3', '+10 Excitement<br>+5 Accomplishment<br>+2 Social Skill', function () { grant.statExcitement += 15; grant.statAccomplishment += 5; grant.changeSocial(2,true); });
    conventionArray[83] = new convention('tc4', '+20 Excitement<br>+10 Accomplishment<br>+3 Social Skill', function () { grant.statExcitement += 20; grant.statAccomplishment += 10; grant.changeSocial(3,true); });
    conventionArray[84] = new convention('tc5', '+25 Excitement<br>+15 Accomplishment<br>+3 Social Skill<br>+50 Money', function () { grant.statExcitement += 25; grant.statAccomplishment += 15; grant.changeSocial(3,true); grant.statMoney += 50; });

    //painting event
    conventionArray[85] = new convention('pe1', '+5 Excitement<br>+5 Accomplishment', function () { grant.statExcitement += 5; grant.statAccomplishment += 5; });
    conventionArray[86] = new convention('pe2', '+10 Excitement<br>+5 Accomplishment<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.statAccomplishment += 5; grant.changeSocial(1,true); });
    conventionArray[87] = new convention('pe3', '+15 Excitement<br>+10 Accomplishment<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.statAccomplishment += 10; grant.changeSocial(1,true); });
    conventionArray[88] = new convention('pe4', '+20 Excitement<br>+15 Accomplishment<br>+1 Social Skill', function () { grant.statExcitement += 20; grant.statAccomplishment += 15; grant.changeSocial(1,true); });
    conventionArray[89] = new convention('pe5', '+25 Excitement<br>+20 Accomplishment<br>+1 Social Skill', function () { grant.statExcitement += 25; grant.statAccomplishment += 20; grant.changeSocial(1,true); });

    //table top gaming
    conventionArray[90] = new convention('tt1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[91] = new convention('tt2', '+20 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 20; grant.changeSocial(1,true); });
    conventionArray[92] = new convention('tt3', '+30 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 30; grant.changeSocial(3,true); });
    conventionArray[93] = new convention('tt4', '+40 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 40; grant.changeSocial(3,true); });
    conventionArray[94] = new convention('tt5', '+50 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 50; grant.changeSocial(3,true); });

    //dating auction
    conventionArray[95] = new convention('da1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[96] = new convention('da2', '+15 Excitement<br>+1 Nice Guy Point', function () { grant.statExcitement += 15; grant.changeNGP(1); });
    conventionArray[97] = new convention('da3', '+20 Excitement<br>+1 Social Skill<br>+1 Nice Guy Point', function () { grant.statExcitement += 20; grant.changeSocial(1,true); grant.changeNGP(1); });
    conventionArray[98] = new convention('da4', '+25 Excitement<br>+3 Social Skill<br>+1 Nice Guy Point', function () { grant.statExcitement += 25; grant.changeSocial(3,true); grant.changeNGP(1); });
    conventionArray[99] = new convention('da5', '+30 Excitement<br>+5 Social Skill<br>+Confident(+Excitement, ++Accomplishment)<br>+1 Nice Guy Point', function () { grant.statExcitement += 30; grant.changeSocial(5,true); grant.changeStatus('Confident'); grant.changeNGP(1); });

    //bar meet
    conventionArray[100] = new convention('bm1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[101] = new convention('bm2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.changeSocial(1,true); });
    conventionArray[102] = new convention('bm3', '+20 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 20; grant.changeSocial(3,true); });
    conventionArray[103] = new convention('bm4', '+25 Excitement<br>+5 Social Skill', function () { grant.statExcitement += 25; grant.changeSocial(5,true); });
    conventionArray[104] = new convention('bm5', '+30 Excitement<br>+7 Social Skill<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 30; grant.changeSocial(7,true); grant.changeStatus('Content'); });

    //anime theories
    conventionArray[105] = new convention('at1', '+5 Excitement', function () { grant.statExcitement += 5; });
    conventionArray[106] = new convention('at2', '+10 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.changeSocial(1,true); });
    conventionArray[107] = new convention('at3', '+15 Excitement<br>+2 Social Skill<br>+1 Arguments Entered', function () { grant.statExcitement += 15; grant.changeSocial(2,true); grant.argsEntered += 1; });
    conventionArray[108] = new convention('at4', '+20 Excitement<br>+3 Social Skill<br>+1 Arguments Won<br>+Confident(+Excitement, ++Accomplishment)', function () { grant.statExcitement += 20; grant.changeSocial(3,true); grant.argsEntered += 1; grant.argsWon += 1; grant.changeStatus('Confident'); });
    conventionArray[109] = new convention('at5', '+25 Excitement<br>+4 Social Skill<br>+1 Arguments Won<br>+Confident(+Excitement, ++Accomplishment)', function () {  grant.statExcitement += 25; grant.changeSocial(4,true); grant.argsEntered += 1; grant.argsWon += 1; grant.changeStatus('Confident'); });

    //loutube interview
    conventionArray[110] = new convention('li1', '+5 Excitement', function () { grant.statExcitement += 5; });
    conventionArray[111] = new convention('li2', '+10 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.changeSocial(1,true); });
    conventionArray[112] = new convention('li3', '+10 Excitement<br>+5 Accomplishment<br>+5 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.statAccomplishment += 5; grant.changeEuphoria(5); grant.changeSocial(1,true); });
    conventionArray[113] = new convention('li4', '+10 Excitement<br>+10 Accomplishment<br>+25 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.statAccomplishment += 10; grant.changeEuphoria(25); grant.changeSocial(1,true); });
    conventionArray[114] = new convention('li5', '+10 Excitement<br>+15 Accomplishment<br>+25 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.statAccomplishment += 15; grant.changeEuphoria(25); grant.changeSocial(1,true); });

    //zombie apocalyse
    conventionArray[115] = new convention('za1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[116] = new convention('za2', '+20 Excitement', function () { grant.statExcitement += 20; });
    conventionArray[117] = new convention('za3', '+25 Excitement<br>+5 Accomplishment<br>+1 Social Skill', function () { grant.statExcitement += 25; grant.statAccomplishment += 5; grant.changeSocial(1,true); });
    conventionArray[118] = new convention('za4', '+30 Excitement<br>+10 Accomplishment<br>+2 Social Skill', function () { grant.statExcitement += 30; grant.statAccomplishment += 10; grant.changeSocial(2,true); });
    conventionArray[119] = new convention('za5', '+35 Excitement<br>+15 Accomplishment<br>+3 Social Skill', function () { grant.statExcitement += 35; grant.statAccomplishment += 15; grant.changeSocial(3,true); });

    //free food
    conventionArray[120] = new convention('ff1', '+10 Hunger', function () { grant.statHunger += 10; });
    conventionArray[121] = new convention('ff2', '+15 Hunger<br>+1 Social Skill', function () { grant.statHunger += 15; grant.changeSocial(1,true); });
    conventionArray[122] = new convention('ff3', '+20 Hunger<br>+5 Excitement<br>+2 Social Skill', function () { grant.statHunger += 20; grant.statExcitement += 5; grant.changeSocial(2,true); });
    conventionArray[123] = new convention('ff4', '+25 Hunger<br>+10 Excitement<br>+3 Social Skill', function () { grant.statHunger += 25; grant.statExcitement += 10; grant.changeSocial(3,true); });
    conventionArray[124] = new convention('ff5', '+30 Hunger<br>+20 Excitement<br>+3 Social Skill', function () { grant.statHunger += 30; grant.statExcitement += 20; grant.changeSocial(3,true); });

    //anime viewing session
    conventionArray[125] = new convention('avs1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[126] = new convention('avs2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.changeSocial(1,true); });
    conventionArray[127] = new convention('avs3', '+20 Excitement<br>+3 Social Skill<br>+5 Euphoria', function () {  grant.statExcitement += 20; grant.changeSocial(3,true); grant.changeEuphoria(5); });
    conventionArray[128] = new convention('avs4', '+25 Excitement<br>+4 Social Skill<br>+10 Euphoria', function () { grant.statExcitement += 25; grant.changeSocial(4,true); grant.changeEuphoria(10); });
    conventionArray[129] = new convention('avs5', '+30 Excitement<br>+5 Social Skill<br>+25 Euphoria', function () { grant.statExcitement += 30; grant.changeSocial(5,true); grant.changeEuphoria(25); });

    //ball pit
    conventionArray[130] = new convention('bp1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[131] = new convention('bp2', '+20 Excitement', function () { grant.statExcitement += 20; });
    conventionArray[132] = new convention('bp3', '+30 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 30; grant.changeSocial(1,true); });
    conventionArray[133] = new convention('bp4', '+40 Excitement<br>+2 Social Skill', function () { grant.statExcitement += 40; grant.changeSocial(2,true); });
    conventionArray[134] = new convention('bp5', '+50 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 50; grant.changeSocial(3,true); });

    //mech piloting
    conventionArray[135] = new convention('mp1', '+5 Excitement', function () { grant.statExcitement += 5; });
    conventionArray[136] = new convention('mp2', '+10 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.changeSocial(1,true); });
    conventionArray[137] = new convention('mp3', '+15 Excitement<br>+5 Accomplishment<br>+1 Social Skill<br>+5 Euphoria', function () { grant.statExcitement += 15; grant.statAccomplishment += 5; grant.changeSocial(1,true); grant.changeEuphoria(5); });
    conventionArray[138] = new convention('mp4', '+20 Excitement<br>+10 Accomplishment<br>+1 Social Skill<br>+10 Euphoria', function () { grant.statExcitement += 20; grant.statAccomplishment += 10; grant.changeSocial(1,true); grant.changeEuphoria(10); });
    conventionArray[139] = new convention('mp5', '+25 Excitement<br>+10 Accomplishment<br>+3 Social Skill<br>+25 Euphoria', function () { grant.statExcitement += 25; grant.statAccomplishment += 10; grant.changeSocial(3,true); grant.changeEuphoria(25); });

    //anime bingo
    conventionArray[140] = new convention('ab1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[141] = new convention('ab2', '+15 Excitement', function () { grant.statExcitement += 15; });
    conventionArray[142] = new convention('ab3', '+20 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 20; grant.changeSocial(1,true); });
    conventionArray[143] = new convention('ab4', '+25 Excitement<br>+3 Social Skill<br>+50 Money', function () { grant.statExcitement += 25; grant.changeSocial(3,true); grant.statMoney += 50; });
    conventionArray[144] = new convention('ab5', '+30 Excitement<br>+5 Social Skill<br>+100 Money', function () { grant.statExcitement += 30; grant.changeSocial(5,true); grant.statMoney += 100; });

    //swimming party
    conventionArray[145] = new convention('sp1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[146] = new convention('sp2', '+15 Excitement<br>+5 Accomplishment<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.statAccomplishment += 5; grant.changeSocial(1,true); });
    conventionArray[147] = new convention('sp3', '+20 Excitement<br>+5 Accomplishment<br>+2 Social Skill', function () { grant.statExcitement += 20; grant.statAccomplishment += 5; grant.changeSocial(2,true); });
    conventionArray[148] = new convention('sp4', '+25 Excitement<br>+10 Accomplishment<br>+3 Social Skill', function () { grant.statExcitement += 25; grant.statAccomplishment += 10; grant.changeSocial(3,true); });
    conventionArray[149] = new convention('sp5', '+30 Excitement<br>+15 Accomplishment<br>+3 Social Skill', function () { grant.statExcitement += 30; grant.statAccomplishment += 15; grant.changeSocial(3,true); });

    //artist alley give
    conventionArray[150] = new convention('aag1', '+5 Euphoria<br>+1 Fedora', function () { grant.changeEuphoria(5); grant.fedsBought++; });
    conventionArray[151] = new convention('aag2', '+10 Euphoria<br>+1 Fedora', function () { grant.changeEuphoria(10); grant.fedsBought++; });
    conventionArray[152] = new convention('aag3', '+5 Excitement<br>+1 Social Skill<br>+25 Euphoria<br>+2 Fedoras', function () { grant.statExcitement += 5; grant.changeSocial(1,true); grant.changeEuphoria(25); grant.fedsBought += 2; });
    conventionArray[153] = new convention('aag4', '+10 Excitement<br>+2 Social Skill<br>+50 Euphoria<br>+2 Fedoras', function () { grant.statExcitement += 10; grant.changeSocial(2,true); grant.changeEuphoria(50); grant.fedsBought += 2; });
    conventionArray[154] = new convention('aag5', '+15 Excitement<br>+3 Social Skill<br>+100 Euphoria<br>+3 Fedoras', function () { grant.statExcitement += 15; grant.changeSocial(3,true); grant.changeEuphoria(100); grant.fedsBought += 3; });

    //live podcast show
    conventionArray[155] = new convention('lps1', '+5 Accomplishment<br>+10 Euphoria', function () { grant.statAccomplishment += 5; grant.changeEuphoria(10); });
    conventionArray[156] = new convention('lps2', '+10 Accomplishment<br>+25 Euphoria', function () { grant.statAccomplishment += 10; grant.changeEuphoria(25); });
    conventionArray[157] = new convention('lps3', '+15 Accomplishment<br>+50 Euphoria', function () { grant.statAccomplishment += 15; grant.changeEuphoria(50); });
    conventionArray[158] = new convention('lps4', '+20 Accomplishment<br>+100 Euphoria', function () { grant.statAccomplishment += 20; grant.changeEuphoria(100); });
    conventionArray[159] = new convention('lps5', '+25 Accomplishment<br>+250 Euphoria', function () { grant.statAccomplishment += 25; grant.changeEuphoria(250); });

    //parapara dance lessons
    conventionArray[160] = new convention('pdl1', '+5 Energy<br>+5 Euphoria<br>Lost 0.4lb', function () { grant.statEnergy += 5; grant.changeEuphoria(5); grant.changeWeight(0.4); });
    conventionArray[161] = new convention('pdl2', '+10 Energy<br>+10 Euphoria<br>+1 Social Skill<br>Lost 0.6lb', function () { grant.statEnergy += 10; grant.changeSocial(1,true); grant.changeEuphoria(10); grant.changeWeight(0.6); });
    conventionArray[162] = new convention('pdl3', '+10 Energy<br>+25 Euphoria<br>+2 Social Skill<br>Lost 1.0lb', function () { grant.statEnergy += 10; grant.changeSocial(2,true); grant.changeEuphoria(25); grant.changeWeight(1.0); });
    conventionArray[163] = new convention('pdl4', '+15 Energy<br>+25 Euphoria<br>+2 Social Skill<br>Lost 1.5lb', function () { grant.statEnergy += 15; grant.changeSocial(2,true); grant.changeEuphoria(25); grant.changeWeight(1.5); });
    conventionArray[164] = new convention('pdl5', '+15 Energy<br>+25 Euphoria<br>+3 Social Skill<br>Lost 2.0lb', function () { grant.statEnergy += 15; grant.changeSocial(3,true); grant.changeEuphoria(25); grant.changeWeight(2.0); });

    //improv show
    conventionArray[165] = new convention('is1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[166] = new convention('is2', '+25 Excitement', function () { grant.statExcitement += 25; });
    conventionArray[167] = new convention('is3', '+40 Excitement', function () { grant.statExcitement += 40;  });
    conventionArray[168] = new convention('is4', '+60 Excitement', function () { grant.statExcitement += 60; });
    conventionArray[169] = new convention('is5', '+75 Excitement', function () { grant.statExcitement += 75; });

    //vocaloid concert
    conventionArray[170] = new convention('vc1', '+5 Excitement<br>+5 Euphoria', function () { grant.statExcitement += 5; grant.changeEuphoria(5); });
    conventionArray[171] = new convention('vc2', '+10 Excitement<br>+1 Social Skill<br>+10 Euphoria', function () { grant.statExcitement += 10; grant.changeSocial(1,true); grant.changeEuphoria(10); });
    conventionArray[172] = new convention('vc3', '+15 Excitement<br>+3 Social Skill<br>+25 Euphoria', function () { grant.statExcitement += 15; grant.changeSocial(3,true); grant.changeEuphoria(25); });
    conventionArray[173] = new convention('vc4', '+20 Excitement<br>+3 Social Skill<br>+50 Euphoria', function () { grant.statExcitement += 20; grant.changeSocial(3,true); grant.changeEuphoria(50); });
    conventionArray[174] = new convention('vc5', '+25 Excitement<br>+3 Social Skill<br>+100 Euphoria', function () { grant.statExcitement += 25; grant.changeSocial(3,true); grant.changeEuphoria(100); });

    //bubble tea tasting
    conventionArray[175] = new convention('btt1', '+5 Energy<br>+5 Hunger<br>+5 Excitement', function () { grant.statEnergy += 5; grant.statHunger += 5; grant.statExcitement += 5; });
    conventionArray[176] = new convention('btt2', '+10 Energy<br>+5 Hunger<br>+10 Excitement', function () { grant.statEnergy += 10; grant.statHunger += 10; grant.statExcitement += 10; });
    conventionArray[177] = new convention('btt3', '+15 Energy<br>+10 Hunger<br>+15 Excitement', function () { grant.statEnergy += 15; grant.statHunger += 10; grant.statExcitement += 15; });
    conventionArray[178] = new convention('btt4', '+20 Energy<br>+10 Hunger<br>+20 Excitement<br>+1 Social Skill', function () { grant.statEnergy += 20; grant.statHunger += 10; grant.statExcitement += 20; grant.changeSocial(1,true); });
    conventionArray[179] = new convention('btt5', '+25 Energy<br>+10 Hunger<br>+20 Excitement<br>+3 Social Skill', function () { grant.statEnergy += 25; grant.statHunger += 10; grant.statExcitement += 20; grant.changeSocial(3,true); });

    //voice actor
    conventionArray[180] = new convention('va1', '+5 Excitement<br>+5 Euphoria', function () { grant.statExcitement += 5; grant.changeEuphoria(5); });
    conventionArray[181] = new convention('va2', '+10 Excitement<br>+10 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.changeEuphoria(10); grant.changeSocial(1,true); });
    conventionArray[182] = new convention('va3', '+15 Excitement<br>+25 Euphoria<br>+2 Social Skill', function () { grant.statExcitement += 15; grant.changeEuphoria(25); grant.changeSocial(2,true); });
    conventionArray[183] = new convention('va4', '+20 Excitement<br>+50 Euphoria<br>+3 Social Skill', function () { grant.statExcitement += 20; grant.changeEuphoria(50); grant.changeSocial(3,true); });
    conventionArray[184] = new convention('va5', '+25 Excitement<br>+100 Euphoria<br>+3 Social Skill', function () { grant.statExcitement += 25; grant.changeEuphoria(100); grant.changeSocial(3,true); });

    //koto & sake tasting event
    conventionArray[185] = new convention('te1', '+5 Energy<br>+5 Hunger<br>+5 Excitement', function () { grant.statEnergy += 5; grant.statHunger += 5; grant.statExcitement += 5; });
    conventionArray[186] = new convention('te2', '+5 Energy<br>+5 Hunger<br>+10 Excitement<br>+1 Social Skill', function () { grant.statEnergy += 5; grant.statHunger += 5; grant.statExcitement += 10; grant.changeSocial(1,true); });
    conventionArray[187] = new convention('te3', '+10 Energy<br>+5 Hunger<br>+15 Excitement<br>+2 Social Skill', function () { grant.statEnergy += 10; grant.statHunger += 5; grant.statExcitement += 15; grant.changeSocial(2,true); });
    conventionArray[188] = new convention('te4', '+10 Energy<br>+5 Hunger<br>+20 Excitement<br>+3 Social Skill', function () { grant.statEnergy += 10; grant.statHunger += 5; grant.statExcitement += 20; grant.changeSocial(3,true); });
    conventionArray[189] = new convention('te5', '+15 Energy<br>+5 Hunger<br>+20 Excitement<br>+4 Social Skill', function () { grant.statEnergy += 15; grant.statHunger += 5; grant.statExcitement += 20; grant.changeSocial(4,true); });

    //cosplay runway
    conventionArray[190] = new convention('cr1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[191] = new convention('cr2', '+20 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 20; grant.changeSocial(1,true); });
    conventionArray[192] = new convention('cr3', '+25 Excitement<br>+2 Social Skill', function () { grant.statExcitement += 25; grant.changeSocial(2,true); });
    conventionArray[193] = new convention('cr4', '+30 Excitement<br>+10 Euphoria<br>+2 Social Skill', function () { grant.statExcitement += 30;  grant.changeEuphoria(10); grant.changeSocial(2,true); });
    conventionArray[194] = new convention('cr5', '+35 Excitement<br>+10 Euphoria<br>+3 Social Skill<br>+3 Pictures Taken', function () { grant.statExcitement += 35; grant.changeEuphoria(10); grant.changeSocial(3,true); grant.takePics(3); });

    //anime lazer tag
    conventionArray[195] = new convention('alz1', '+10 Excitement', function () { grant.statExcitement += 10; });
    conventionArray[196] = new convention('alz2', '+20 Excitement<br>+1 Social Skill<br>Lost 0.5lb', function () { grant.statExcitement += 20; grant.changeSocial(1,true); grant.changeWeight(0.5); });
    conventionArray[197] = new convention('alz3', '+30 Excitement<br>+1 Social Skill<br>Lost 1.0lb', function () { grant.statExcitement += 30; grant.changeSocial(1,true); grant.changeWeight(1.0); });
    conventionArray[198] = new convention('alz4', '+40 Excitement<br>+2 Social Skill<br>Lost 1.5lb', function () { grant.statExcitement += 40; grant.changeSocial(2,true); grant.changeWeight(1.5); });
    conventionArray[199] = new convention('alz5', '+50 Excitement<br>+3 Social Skill<br><br>Lost 1.5lb', function () { grant.statExcitement += 50; grant.changeSocial(3,true); grant.changeWeight(1.5); });

    //virtual reality
    conventionArray[200] = new convention('vr1', '+5 Excitement<br>+10 Euphoria', function () { grant.statExcitement += 5; grant.changeEuphoria(10); });
    conventionArray[201] = new convention('vr2', '+5 Excitement<br>+25 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 5; grant.changeEuphoria(25); grant.changeSocial(1,true); });
    conventionArray[202] = new convention('vr3', '+10 Excitement<br>+50 Euphoria<br>+2 Social Skill', function () { grant.statExcitement += 10; grant.changeEuphoria(50); grant.changeSocial(2,true); });
    conventionArray[203] = new convention('vr4', '+10 Excitement<br>+100 Euphoria<br>+2 Social Skill', function () { grant.statExcitement += 10; grant.changeEuphoria(100); grant.changeSocial(2,true); });
    conventionArray[204] = new convention('vr5', '+15 Excitement<br>+250 Euphoria<br>+3 Social Skill', function () { grant.statExcitement += 15; grant.changeEuphoria(250); grant.changeSocial(3,true); });

    //anime retrospective
    conventionArray[205] = new convention('ar1', '+5 Excitement<br>+5 Euphoria', function () { grant.statExcitement += 5; grant.changeEuphoria(5); });
    conventionArray[206] = new convention('ar2', '+10 Excitement<br>+10 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.changeEuphoria(10); grant.changeSocial(1,true); });
    conventionArray[207] = new convention('ar3', '+15 Excitement<br>+25 Euphoria<br>+2 Social Skill', function () { grant.statExcitement += 15; grant.changeEuphoria(25); grant.changeSocial(2,true); });
    conventionArray[208] = new convention('ar4', '+20 Excitement<br>+50 Euphoria<br>+3 Social Skill', function () { grant.statExcitement += 20; grant.changeEuphoria(50); grant.changeSocial(3,true); });
    conventionArray[209] = new convention('ar5', '+15 Excitement<br>+100 Euphoria<br>+4 Social Skill', function () { grant.statExcitement += 25; grant.changeEuphoria(100); grant.changeSocial(4,true); });

    //celebrity cosplay
    conventionArray[210] = new convention('cc1', '+5 Accomplishment<br>+5 Euphoria<br>+1 Picture Taken', function () { grant.statAccomplishment += 5; grant.changeEuphoria(5); grant.takePics(1); });
    conventionArray[211] = new convention('cc2', '+5 Accomplishment<br>+10 Euphoria<br>+2 Pictures Taken', function () { grant.statAccomplishment += 5; grant.changeEuphoria(10); grant.takePics(2); });
    conventionArray[212] = new convention('cc3', '+5 Accomplishment<br>+25 Euphoria<br>+3 Pictures Taken', function () { grant.statAccomplishment += 10; grant.changeEuphoria(5); grant.takePics(3); });
    conventionArray[213] = new convention('cc4', '+10 Accomplishment<br>+25 Euphoria<br>+1 Social Skill<br>+4 Pictures Taken', function () { grant.statAccomplishment += 10; grant.changeEuphoria(25); grant.changeSocial(1,true); grant.takePics(4);  });
    conventionArray[214] = new convention('cc5', '+10 Accomplishment<br>+25 Euphoria<br>+1 Social Skill<br>+5 Pictures Taken', function () { grant.statAccomplishment += 10; grant.changeEuphoria(25); grant.changeSocial(1,true); grant.takePics(5); });

    //celebrity lip synch
    conventionArray[215] = new convention('clr1', '+5 Excitement<br>+5 Euphoria', function () { grant.statExcitement += 5; grant.changeEuphoria(5); });
    conventionArray[216] = new convention('clr2', '+10 Excitement<br>+5 Accomplishment<br>+10 Euphoria', function () { grant.statExcitement += 10; grant.statAccomplishment += 5; grant.changeEuphoria(10); });
    conventionArray[217] = new convention('clr3', '+15 Excitement<br>+10 Accomplishment<br>+25 Euphoria', function () { grant.statExcitement += 15; grant.statAccomplishment += 10; grant.changeEuphoria(25); });
    conventionArray[218] = new convention('clr4', '+20 Excitement<br>+15 Accomplishment<br>+50 Euphoria', function () { grant.statExcitement += 20; grant.statAccomplishment += 15; grant.changeEuphoria(50); });
    conventionArray[219] = new convention('clr5', '+25 Excitement<br>+20 Accomplishment<br>+100 Euphoria', function () { grant.statExcitement += 25; grant.statAccomplishment += 20; grant.changeEuphoria(100); });

    //speed date
    conventionArray[220] = new convention('sd1', '+1 Social Skill<br>+1 Nice Guy Point', function () { grant.changeSocial(1,true); grant.changeNGP(1); });
    conventionArray[221] = new convention('sd2', '+5 Accomplishment<br>+2 Social Skill<br>+1 Nice Guy Point', function () { grant.statAccomplishment += 5; grant.changeSocial(2,true); });
    conventionArray[222] = new convention('sd3', '+5 Excitement<br>+5 Accomplishment<br>+3 Social Skill<br>+1 Nice Guy Point', function () { grant.statExcitement += 5; grant.statAccomplishment += 5; grant.changeSocial(3,true); grant.changeNGP(1); });
    conventionArray[223] = new convention('sd4', '+10 Excitement<br>+10 Accomplishment<br>+4 Social Skill<br>+1 Nice Guy Point', function () { grant.statExcitement += 10; grant.statAccomplishment += 10; grant.changeSocial(4,true); grant.changeNGP(1); });
    conventionArray[224] = new convention('sd5', '+15 Excitement<br>+10 Accomplishment<br>+5 Social Skill<br>+1 Nice Guy Point', function () { grant.statExcitement += 15; grant.statAccomplishment += 10; grant.changeSocial(5,true); grant.changeNGP(1); });

    function convention(name, text, effect) {
        this.name = name;
        this.text = text;
        this.effect = effect;
    } /* END OBJECT CONVENTION */

    var len = conventionArray.length;
    while (len--) {
        var convObj = conventionArray[len];
        var mapKey = conventionArray[len].name;
        conventionMap[mapKey] = convObj;
    } /* END WHILE */

    /*
    //actions on click
    function action(name, effect) {
        this.name = name;
        this.effect = effect;
    }
    */
} /* END OF objectLoader */

//Number randomizer method
function randomizer(max){
    return Math.floor(Math.random() * max) + 1;
} /* END OF randomizer */

//Play sound method
function play(url) {
    if(!grant.muteSounds) new Audio("sound/"+ url + ".mp3").play();
} /* END OF play */

//Checks if inbetween method
function between(x, min, max) {
  return x >= min && x < max;
} /* END OF between */

//If dialog box needs to refresh before loading new main dialog
function dialogRefresh (func, node) {
    $md.dialog("close");
    setTimeout(function () {
        func(node);
    }, 400);
}

//If dialog box needs to refresh before loading new main dialog
function dialog(func, node){
    this.node = node;
    this.display = function () { func(node); }
}

function changeDialog () {
    var arrLen = dialogArray.length - 1;
    if (arrLen === -1) {
        $md.dialog("close");
    } else {
        if (dialogIterate === arrLen) {
            dialogArray = [];
            dialogIterate = 0;
            $md.dialog("close");
        } else {
             dialogIterate++;
             dialogArray[dialogIterate].display();
        }
    }
    play("pp1");
}

function reverseDialog () {
    var arrLen = dialogArray.length - 1;
    if (dialogIterate !== 0) {
        dialogIterate--;
        dialogArray[dialogIterate].display();
    } else {
        dialogIterate = arrLen;
        dialogArray[arrLen].display();
    }
    play("pp1");
}

function openTutorial(){
    $md.dialog("close");
    for(var i = 1; i < 15; i++){
        var tutorialDialog = tutorial.replace("{PICTURE}", i).replace("{PAGE}", i);
        var dialogNode = new dialog(tutorialDia, tutorialDialog);
        dialogArray.push(dialogNode);
    }
}

function decay(){
    var inMenu = $(".ui-dialog").is(":visible");
    if(!inMenu){
        checkStatus();

        grant.statEnergy -= grant.decayEnergy;
	    grant.statHunger -= grant.decayHunger;
	    grant.statExcitement -= grant.decayExcitement;
	    grant.statAccomplishment -= grant.decaySOA;

	    grant.render();
    } /* END IF */
    setTimeout(decay, grant.decTime);
} /* END OF decay */

$(window).on('load', function () {
    init();
    var currentArgNum = 0;
    window.currentGymNum = 0;
    window.currentQuestNum = 0;
    window.currentStep = 0;
    window.choice1 = 0;
    window.choice2 = 0;
    window.$md = $("#mainDialog");
    window.$ft = $("#footer");
    $ft.html(ftrAtHome);
    setTimeout(function () {
        $("#wrapper").css('visibility', 'visible');
    }, 500);

    $md.on("click", function (e) {
        switch (e.target.id) {
            case "emd":
                changeDialog();
                break;
            case "rmd":
                reverseDialog();
                break;
            case "hmd":
                $md.dialog("close");
                dialogIterate = 0;
                dialogArray = [];
                play("pp1");
                break;
            case "mmNewGame":
                play("pp1");
                grant.newGame();
                openTutorial();
                setTimeout(function () { grant.render() }, 400);
                break;
            case "credits":
                play("pp1");
                $md.html(nodeCreditScreen);
                break;
            case "credCont":
                play("pp1");
                $md.html(nodeStartScreen);
                break;
            case "mmCont":
                play("pp1");
                grant.loadGame();
                break;
            case "endGameBtn":
                play("pp1");
                $("#gymDialog").dialog("close");
                $("#quest").dialog("close");
                $("#argument").dialog("close");
                startScreen();
                break;
            case "gym":
                if (cost(10)) {
                    startWorkOut();
                    play("pp1");
                    $md.dialog("close");
                    $("#gymDialog").dialog("open");
                    grant.render();
                    grant.timesExersized++;
                } /* END IF */
                break;
            case "bar":
                var money = grant.endNorm ? 0 : 20;
                if (cost(money)) {
                    play("vv1");
                    grant.travel("bar");
                    grant.render();
                    $md.dialog("close");
                } else play("pp1");
                break;
            case "convention":
                var money = grant.endWaifu ? 0 : 60;
                if (cost(money)) {
                    play("vv1");
                    grant.travel("convention");
                    grant.render();
                    $md.dialog("close");
                } else play("pp1");
                break;
            case "goHome":
                play("pp1");
                grant.travel("bedroom");
                $md.dialog("close");
                break;
            case "quit":
                play("pp1");
                startScreen();
                break;
            case "vFGE":
                play("pp1");
                endGame(createEndScreen("fedoraGod", "ts"));
                break;
            case "vEFE":
                play("pp1");
                endGame(createEndScreen("efame", "ts"));
                break;
            case "vEME":
                play("pp1");
                endGame(createEndScreen("employed", "ts"));
                break;
            case "vIPE":
                play("pp1");
                endGame(createEndScreen("iron", "ts"));
                break;
            case "vWFE":
                play("pp1");
                endGame(createEndScreen("waifu", "ts"));
                break;
            case "vNME":
                play("pp1");
                endGame(createEndScreen("normal", "ts"));
                break;
            case "vGOE":
                play("pp1");
                endGame(createEndScreen("golden", "ts"));
                break;
            case "ts":
                play("pp1");
                loadStats();
                break;
            case "muteMusic":
                var music = document.getElementById("music");
                var button = $("#muteMusic");
                music.muted = !music.muted;
                grant.muteMusic = !grant.muteMusic;
                play("pp1");
                music.muted ? button.attr("class", "unmute") : button.attr("class", "mute");
                break;
            case "muteSound":
                var button = $("#muteSound");
                grant.muteSounds = !grant.muteSounds;
                play("pp1");
                grant.muteSounds ? button.attr("class", "unmute") : button.attr("class", "mute");
                break;
            case "toggleHint":
                var button = $("#toggleHint");
                grant.hintMode = !grant.hintMode;
                play("pp1");
                grant.hintMode ? button.attr("class", "hintOn") : button.attr("class", "hintOff");
                break;
            case "toggleApartment":
                var button = $("#toggleApartment");
                grant.brMode = !grant.brMode;
                play("pp1");
                grant.brMode ? button.attr("class", "aptOn") : button.attr("class", "aptOff");
                if (grant.atHome) $("#location").attr("src", grant.changeBG());
                break;
            case "music1":
            case "music2":
            case "music3":
            case "music4":
            case "music5":
            case "music6":
                play("rs1");
                var music = document.getElementById("music");
                $(music).attr("src", "sound/" + e.target.id + ".mp3");
                break;
            case "play1":
                play("gm1");
                grant.statExcitement += 3;
                grant.statAccomplishment += 6;
                grant.statEnergy -= 15;
                grant.statHunger -= 10;
                grant.timesGamed++;
                grant.render();
                break;
            case "play2":
                play("gm1");
                grant.statExcitement += 7;
                grant.statAccomplishment += 2;
                grant.statEnergy -= 5;
                grant.statHunger -= 2;
                grant.timesGamed++;
                if ((randomizer(10) === 10) && (grant.statEnergy >= 0)) {
                    var money = randomizer(15);
                    var nodeGameEvent = vaporCard.replace("{MONEY}", money);
                    dialogRefresh(gameEvent, nodeGameEvent);
                    grant.paid(money);
                } /* END IF */
                grant.render();
                break;
            case "play3":
                play("gm1");
                grant.statExcitement += 4;
                grant.statAccomplishment += 2;
                grant.statEnergy -= 15;
                grant.statHunger -= 7;
                grant.timesGamed++;
                if ((randomizer(10) === 10) && (grant.statEnergy >= 0)) {
                    var money1 = randomizer(25);
                    var money2 = randomizer(25);
                    var money = money1 + money2;
                    var nodeGameEvent = vaporCard.replace("{MONEY}", money);
                    dialogRefresh(gameEvent, nodeGameEvent);
                    grant.paid(money);
                } /* END IF */
                grant.render();
                break;
            case "addToCart":
                if (cost(5)) { play("cr1"); grant.changeEuphoria(10); grant.render(); }
                break;
            case "resetSaveFile":
                play("pp1");
                dialogRefresh(exitDia, resetSF);
                break;
            case "resetSF":
                play("pp1");
                $.removeCookie("testSF");
                $md.dialog("close");
                setTimeout(function () {
                    startScreen();
                }, 500);
                break;
            case "toOptions":
                play("pp1");
                dialogRefresh(travelDia, grant.openOptions());
                break;
            case "toVapor":
                play("pp1");
                dialogRefresh(gameEvent, vapor);
                break;
        } /* END SWITCH */
    }); /* END ON CLICK MAIN DIALOG */

    $ft.on("click", function (e) {
        switch (e.target.id) {
            case "sleep":
                currentQuestNum = (Math.floor(Math.random() * questObject.length));
                currentStep = 0;
                grant.sleep();
                break;
            case "shop":
                play("pp1");
                var item1Node = grant.secretEndingItem1 ? '<button id="item13" disabled></button><p>Sold Out</p>' : '<button id="item13" title="Make yourself more marketable to future employers"></button><p>Price: $250</p>';
                var item2Node = grant.secretEndingItem2 ? '<button id="item14" disabled></button><p>Sold Out</p>' : '<button id="item14" title="The only thing that stands between you and teaching. Other then lack of presentability, experience, etc..."></button><p>Price: $500</p>';
                var item3Node = grant.secretEndingItem3 ? '<button id="item15" disabled></button><p>Sold Out</p>' : '<button id="item15" title="Move out of the attic. Grow up. Become man."></button><p>Price: $1000</p>';
                var shop = shopNode.replace("{ITEM1NODE}", item1Node).replace("{ITEM2NODE}", item2Node).replace("{ITEM3NODE}", item3Node);
                shopScreen(shop);
                break;
            case "work":
                grant.work();
                break;
            case "travel":
                play("pp1");
                travelDia(travel);
                break;
            case "options":
                play("pp1");
                travelDia(grant.openOptions());
                break;
            case "game":
                if (grant.atConv) grant.game("conv");
                else grant.game("home");
                grant.render();
                break;
            case "flame":
                play("kb1");
                grant.argsEntered += 1;
                $("#argument").find(".correct").removeClass("correct");
                currentArgNum = readyArgument();
                if (!grant.hintMode) { $("#hint").show(); } else { $("#hint").hide(); }
                $("#argTop").show();
                $("#hintText").hide();
                $("#argBottom").hide();
                $("#argument").dialog("open");
                break;
            case "stats":
                play("pp1");
                loadStats();
                break;
            case "booth":
                grant.booth();
                break;
            case "event":
                if (grant.statEnergy > 15) {
                    play("sp1");
                    grant.statEnergy -= 15;
                    grant.event();
                } else {
                    play("pp1");
                    genericDia(nodeStopEvent);
                } /* END IF */
                break;
            case "photo":
                grant.takePics(1);
                break;
            case "food":
                if (cost(10)) { play("ef1"); grant.statEnergy -= 2; grant.statHunger += 7; grant.statAccomplishment -= 3; grant.randomEvent("eat"); grant.render(); }
                break;
            case "drink":
                play("dk1");
                grant.drink(5);
                break;
            case "pool":
                play("pb1");
                grant.game("bar");
                grant.render();
                break;
            case "speak":
                play("sp1");
                grant.speak();
                break;
            case "save":
                play("pp1");
                grant.saveGame();
                exitDia(saveGame);
                break;
            case "home":
                play("pp1");
                exitDia(goHome);
                break;
            case "jukebox":
                play("pp1");
                grant.secretEndingItem2 ? jukeboxDia(jukebox2) : jukeboxDia(jukebox);
                break;
            case "exit":
                play("pp1");
                exitDia(leaveGame);
                break;
        } /* END SWITCH */
    }); /* END ON CLICK FOOTER */

    $("#hint").click(function () {
        $("#hintText").text(argumentObject[currentArgNum].hint).show();
    });

    $("#ansA, #ansB").click(function () {
        play("kb1");
        var isCorrect = false,
            accPts = argumentObject[currentArgNum].accomplish,
            usedHint = $("#hintText").is(':visible');
        if ($(this).hasClass("correct")) {
            grant.statExcitement += 3;
            if (!usedHint) {
                accPts = accPts + accPts;
                if (!grant.hintMode) accPts += 10;
            } /* END IF */
            grant.statAccomplishment += accPts;
            isCorrect = true;
            if (this.endFG) this.changeStatus('Euphoric');
        } else {
            grant.statAccomplishment -= accPts;
            grant.statExcitement -= 3;
        } /* END IF */
        loadResponse(currentArgNum, isCorrect, accPts);
        grant.statEnergy -= 3;
        grant.statHunger -= 3;
        $(this).removeClass("correct");
        $("#argTop").hide();
        $("#argBottom").show();
    }).hover(function () {
        $(this).toggleClass("highlight");
    });

    $("#choiceA, #choiceB").click(function () {
        play("pp1");
        var quest = questObject[currentQuestNum],
            step = quest.steps[currentStep],
            choice = $(this).attr('id'),
            response = choice === 'choiceA' ? step.choice1Resp : step.choice2Resp,
            effect = choice === 'choiceA' ? step.choice1Effect : step.choice2Effect;
        MB:
        {
            if (effect === 'quit') break MB;
            response += '<br><br>' + eventMap[effect].text;

            if (currentStep === 4) {
                response += '<br><br>' + quest.complete + '<br><br>MOM QUEST COMPLETE! You have gained a Nice Guy Point';
                grant.changeNGP(1);
                break MB;
            } /* END IF */

            if ((currentStep === 0) && (effect != 'quit')) {
                response += '<br><br>MOM QUEST STARTED!';
                break MB;
            } /* END IF */
        } /* END MB */

        grant.statEnergy -= 5;

        $("#questResponse").html("");
        $("#exitQuest").removeClass().addClass("continueGameBtn").addClass(effect);
        $("#questResponse").append(response);

        $("#quest1").hide();
        $("#questBottom").show();
    }).hover(function () {
        $(this).toggleClass("highlight");
    });

    $("#gymA, #gymB").click(function () {
        play("pp1");
        var roll = randomizer(100);
        var workOut = gymObject[currentGymNum];
        var chose = $(this).attr("id") === "gymA" ? choice1 : choice2;
        var select = workOut.event[chose];
        var text = "";
        if (roll > select.chance) {
            grant.statEnergy -= select.energy;
            grant.statAccomplishment -= select.accomplish;
            text = select.fail + "<br><br>You used up " + select.energy + " energy<br>You lost " + select.energy + " accomplishment<br>You had to go home";
            $("#continueGym").css("display", "none");
        } else {
            grant.statEnergy -= select.energy;
            grant.statAccomplishment += select.accomplish;
            grant.changeWeight(select.weight);
            text = select.success + "<br><br>You lost " + select.weight + "lbs<br>You used up " + select.energy + " energy<br>You gained " + select.energy + " accomplishment";
            $("#continueGym").show();
        }
        $("#gymResponse").html("").append(text);
        $("#gym1").hide();
        $("#gymBottom").css("display", "inline-block");
    }).hover(function () {
        $(this).toggleClass("highlight");
    });

    $("#continueGym").click(function () {
        play("pp1");
        grant.render();
        startWorkOut();
    });

    $("#exitGym").click(function () {
        play("pp1");
        grant.render();
        $("#gymDialog").dialog("close");
    });

    $("#exitQuest").click(function () {
        play("pp1");
        currentStep++;
        var effect = $(this).attr("class").split(" ", 2)[1],
            step = questObject[currentQuestNum].steps[currentStep];
        if (effect === 'quit') {
            $("#quest").dialog("close");
        } else {
            if (currentStep === 5) {
                $("#quest").dialog("close");
            } else {
                eventMap[effect].effect();
                grant.render();
                $("#questEvent").html("").append(step.stepText);
                $("#quest1").show();
                $("#questBottom").hide();
                $("#c1").text(step.choice1Text);
                $("#c2").text(step.choice2Text);
            } /* END IF */
        } /* END IF */
    });

    $md.on("click", "#shopList", function (event) {
        var targetId = event.target.id;
        if (targetId !== "emd") {
            itemMap[targetId].purchase();
            grant.render();
        }
    });

    $md.on("hover", ".hl", function () {
        $(this).toggleClass("highlight");
    });

    $md.on("change", "#changeNB", function () {
        grant.sprite = $('#changeNB').val();
        grant.changeNBSprite();
    });

    $("#exitArg").click(function () {
        play("pp1");
        grant.render();
        $("#argument").dialog("close");
    });

    function loadStats() {
        var argWon = grant.argsWon,
            figs = grant.figsBought,
            hats = grant.fedsBought,
            weps = grant.wepsBought;

        //capping off unlockable logic
        if (figs > 25) figs = 25;
        if (hats > 50) hats = 50;
        if (weps > 15) weps = 15;

        var collectables = figs + hats + weps;
        var statsHtmlTop = '<div id="overAll"><div class="overallTitle">Stats</div><button class="exitShop" id="emd"></button><div id="tabs"><ul class="nav nav-tabs"><li><a href="#tab-1">Overall</a></li><li><a href="#tab-2">Whiteboard</a></li><li><a href="#tab-3">Bookshelf</a></li><li><a href="#tab-4">Display Wall</a></li><li><a href="#tab-5">Weapon Cache</a></li></ul><div id="tab-1" class="fixedSizedTab">';

        var endFGNode = grant.endFG ? unFG : lnFG,
            endEFNode = grant.endEFame ? unEF : lnEF,
            endEMNode = grant.endEmployed ? unEM : lnEM,
            endIPNode = grant.endIron ? unIP : lnIP,
            endWFNode = grant.endWaifu ? unWF : lnWF,
            endNMNode = grant.endNorm ? unNM : lnNM,
            endGONode = grant.endGolden ? unGO : lnGO;

        //overall html generation
        var tab1 = '<div id="oaTable" class="tabInd"><table><tr><td>Overall Stats:</td></tr><tr><td>Collectables:</td><td>' + collectables + '/90</td><td>Gym Trips:</td><td>' + grant.timesExersized + '</td></tr><tr><td>Money Made:</td><td>$' + grant.moneyMade + '</td><td>Times Bar Hopped:</td><td>' + grant.barHopped + '</td></tr><tr><td>Money Spent:</td><td>$' + grant.moneySpent + '</td><td>Conventions Attended:</td><td>' + grant.convAttended + '</td></tr><tr><td>Times Worked:</td><td>' + grant.timesWorked + '</td>' + endFGNode + '</tr><tr><td>Times Gamed:</td><td>' + grant.timesGamed + '</td>' + endEFNode + '</tr><tr><td>Arguments Entered:</td><td>' + grant.argsEntered + '</td>' + endEMNode + '</tr><tr><td>Pictures Taken:</td><td>' + grant.picsTaken + '</td>' + endIPNode + '</tr><tr><td>Total Weight:</td><td>' + grant.weight + '</td>' + endWFNode + '</tr><tr><td>Nice Guy Points:</td><td>' + grant.niceGuyPoints + '</td>' + endNMNode + '</tr><tr><td>Social Level:</td><td>' + grant.socialSkills + '</td>' + endGONode + '</tr></table></div></div>';

        //argument rendering logic
        var totalFives = Math.floor(argWon / 5),
            remainder = argWon % 5,
            argHtml = "";

        if (totalFives != 0) {
            for (i = 0; i < totalFives; i++) argHtml += t5;
        } /* END IF */
        if (remainder == 1) argHtml += t1;
        else if (remainder == 2) argHtml += t2;
        else if (remainder == 3) argHtml += t3;
        else if (remainder == 4) argHtml += t4;

        var tab2 = '<div id="tab-2" class="fixedSizedTab"><div id="imgArg"><div><div class="sb"></div></div><div id="argTal">' + argHtml + '</div></div></div>',
            tab3 = '<div id="tab-3" class="fixedSizedTab"><img src="/images/shelf/sh' + figs + '.png"/></div>',
            tab4 = '<div id="tab-4" class="fixedSizedTab"><img src="/images/rack/hr' + hats + '.png"/></div>',
            tab5 = '<div id="tab-5" class="fixedSizedTab"><img src="/images/cache/wc' + weps + '.png"/></div></div></div>',
            statsHtml = statsHtmlTop + tab1 + tab2 + tab3 + tab4 + tab5;
        statsDia(statsHtml);
    } /* END IF */
});