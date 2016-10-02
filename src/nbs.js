function mainCharacter() {
    //updates ui bar every time it is called
	this.render = function () {
	    this.checkStatus();
	    this.checkSocial();

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
        MB: {
            //Checks for player death
            if (this.statEnergy <= 0) {
	            endGame(nodeGameEndSleep);
                break MB;
	        } /* END IF */
	        if (this.statHunger <= 0) {
	            endGame(nodeGameEndHungry);
                break MB;
	        } /* END IF */
	        if (this.statExcitement <= 0) {
	            endGame(nodeGameEndBored);
                break MB;
	        } /* END IF */
	        if (this.statAccomplishment <= 0) {
	            endGame(nodeGameEndAccomplishment);
                break MB;
	        } /* END IF */

            //Caps player's stats to 100
	        if (this.statEnergy > 100) {
	            this.statEnergy = 100;
	        } /* END IF */
	        if (this.statHunger > 100) {
	            this.statHunger = 100;
	        } /* END IF */
	        if (this.statExcitement > 100) {
	            this.statExcitement = 100;
	        } /* END IF */
	        if (this.statAccomplishment > 100) {
	            this.statAccomplishment = 100;
	        } /* END IF */

            //Fedora God ending
	        if ((this.statEuphoria >= 9000) && (!this.endFG)) {
	            endGame(nodeGameEndFG);
	            this.endFG = true;
	        } /* END IF */

            //Normal Guy ending
	        if ((this.timesSocialized >= 100) && (!this.endNorm)) {
	            endGame(nodeGameEndNormal);
	            this.endNorm = true;
	        } /* END IF */
	    
            //Iron Pill ending
            if ((this.timesDieted >= 25) && (this.timesExersized >= 25) && (!this.endIron)) {
                endGame(nodeGameEndIron);
                this.endIron = true;
            } /* END IF */

            //E-Fame ending
            if ((this.picsTaken === 100) && (!this.endEFame)){
                endGame(nodeGameEndEFame);
                this.endEFame = true;
            } /* END IF */

            //employed ending
	        if ((this.secretEndingItem1) && (this.secretEndingItem2) && (this.secretEndingItem3) && (!this.endEmployed)) {
	            endGame(nodeGameEndEmployed);
	            this.endEmployed = true;
	        } /* END IF */

            //waifu ending
            if ((this.secretEvent) && (!this.endWaifu)) {
	            endGame(nodeGameEndWaifu);
	            this.endWaifu = true;
	        } /* END IF */

            //golden ending
            if ((this.endFG) && (this.endEFame) && (this.endEmployed) && (this.endIron) && (this.endWaifu) && (this.endNorm) && (!this.endGolden)) {
	            endGame(nodeGameEndGolden);
	            this.endGolden = true;
	        } /* END IF */
        } /* END MB */
	} /* END OF checkStatus */

    this.checkSocial = function () {
        if (between(grant.socialSkills, 5, 50)) {
	        this.statSocial = 'Creepy';
        } else if (between(grant.socialSkills, 50, 100)) {
	        this.statSocial = 'Weird';
        } else if (between(grant.socialSkills, 100, 150)) {
	        this.statSocial = 'Eh...';
        } else if (between(grant.socialSkills, 150, 200)) {
	        this.statSocial = 'Exists';
        } else if (grant.socialSkills >= 200) {
	        this.statSocial = 'Normal';
        } /* END IF */
    } /* END OF checkSocial */

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
        var node = nodeEv1 + event.title + nodeEv2 + event.text + "<br/><br/>" + conventionMap[event.effect].text + nodeEv3;
        genericDia(node);
    }  /*END OF event */

    this.speak = function () {
        var roll = randomizer(100),
            success = 100 - this.socialSkills,
            speakNode = "",
            speakEvent = (Math.floor(Math.random() * speakObjectGood.length)),
            effect = "";
        if (roll >= success) {
            effect = speakObjectGood[speakEvent].effect;
            speakMap[effect].effect();
            speakNode = "<div id='genericDialog'><p id='GDTitle'>Social Interaction Gone Okay</p><div><p id='gdText'>" + speakObjectGood[speakEvent].text + "<br><br>" + speakMap[effect].text + "</p><div class='gdi speakg'></div></div><button class='continueGameBtn' id='emd'></button></div>";
            this.socialSkills += 2;
        } else {
            effect = speakObjectBad[speakEvent].effect;
            speakMap[effect].effect();
            speakNode = "<div id='genericDialog'><p id='GDTitle'>Social Interaction Gone Terrible</p><div><p id='gdText'>" + speakObjectBad[speakEvent].text + "<br><br>" + speakMap[effect].text + "</p><div class='gdi speakb'></div></div><button class='continueGameBtn' id='emd'></button></div>";
            this.socialSkills++;
        } /* END IF */
        this.timesSocialized++;
        this.statEnergy -= 3;
        this.statHunger -= 3;
        this.render();
        genericDia(speakNode);
    } /* END OF speak */

    this.booth = function () {
        var nodeBooth = "<div id='genericDialog'><p id='GDTitle'>Booth Purchase</p><div><p id='gdText'>",
            random = (Math.floor(Math.random() * boothEvents.length)),
            text = boothEvents[random].text + "<br><br>",
            nodeEnd = "</p><div class='gdi booth'></div></div><button class='continueGameBtn' id='emd'></button></div>",
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
            this.statEuphoria += pts;
            nodeBooth = nodeBooth + text + " Spent $" + itemCost + " and got " + pts + " Euphoria!" + nodeEnd;
            genericDia(nodeBooth);
            this.render();
        } else {
            play("pp1");
        } /* END IF */
    }   /* END OF booth */

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
                this.goHome();
                genericDia(nodeConvOver);
            } /* END IF */
        } /* END IF */
    } /* END OF sleep */

	this.drink = function (money) {
	    if (cost(money)) {
	        this.statAccomplishment += 5;
	        this.statExcitement += 7;
	        this.drinksRound++;
	    }; /* END IF */

	    if (this.drinksRound === 5) {
	        this.changeStatus('Drunk');
	    } /* END IF */

	    if (this.drinksRound === 10) {
	        this.goHome();
	        this.changeStatus('Hungover');
	        genericDia(nodeKickedBar);
	    } /* END IF */
	    this.render();
	} /* END OF drink */

	this.work = function () {
	    play("cr1");
	    if (this.endEmployed) {
	        this.wage = 50;
	        this.statEnergy -= 7;
	        this.statHunger -= 5;
	        this.statExcitement -= 3;
	        this.statAccomplishment -= 5;
	    } else {
	        this.statEnergy -= 7;
	        this.statHunger -= 5;
	        this.statExcitement -= 7;
	        this.statAccomplishment -= 10;

	        if ((this.timesWorked >= 60) && (this.wage === 27)) {
	            this.wage = 35;
	            genericDia(nodePro5);
	        } else if ((this.timesWorked >= 45) && (this.wage === 21)) {
	            this.wage = 27;
	            genericDia(nodePro4);
	        } else if ((this.timesWorked >= 30) && (this.wage === 15)) {
	            this.wage = 21;
	            genericDia(nodePro3);
	        } else if ((this.timesWorked >= 20) && (this.wage === 11)) {
	            this.wage = 15;
	            genericDia(nodePro2);
	        } else if ((this.timesWorked >= 10) && (this.wage === 7)) {
	            this.wage = 11;
	            genericDia(nodePro1);
	        } /* END IF */
	    } /* END IF */
	    this.timesWorked++;
	    this.paid(this.wage);

	    this.render();
	} /* END OF work */

    this.photography = function () {
        play("pc1");
        this.statEnergy -= 5;
        this.statHunger -= 3;
        this.statExcitement += 5;
        this.statAccomplishment += 7;
        if (this.endEFame){
            this.hWage = 30;
        } else {
            if ((this.picsTaken >= 60) && (this.hWage === 15)) {
                this.hWage = 25;
                genericDia(nodePho5);
            } else if ((this.picsTaken >= 45) && (this.hWage === 10)) {
                this.hWage = 15;
                genericDia(nodePho4);
            } else if ((this.picsTaken >= 30) && (this.hWage === 7)) {
                this.hWage = 10;
                genericDia(nodePho3);
            } else if ((this.picsTaken >= 20) && (this.hWage === 5)) {
                this.hWage = 7;
                genericDia(nodePho2);
            } else if ((this.picsTaken >= 10) && (this.hWage === 0)) {
                this.hWage = 5;
                genericDia(nodePho1);
            } /* END IF */
        } /* END IF */
        this.picsTaken++;
        this.paid(this.hWage);

        this.render();
    } /* END OF photography */

    this.paid = function(money) {
        this.statMoney += money;
        this.moneyMade += money;
    } /* END OF paid */

    this.game = function (type) {
        switch (type) {
            case "home":
                play("gm1");
                if (this.endFG) {
					this.changeStatus('Euphoric');
                } /* END IF */
                if (randomizer(10) === 10) {
                    var money = randomizer(20);
                    var nodeGameEvent = '<div id="rndmEvnt"><div id="logoVapor"></div><div id="dark"><p id="green">Is this still your current email address? murdermaster420@metalbane.com Yes No, update</br>Your email address is used to confirm purchases and help you manage access to your Vapor account. Learn more.</p><p id="darker">You sold all of the Vapor trading cards that you have amassed through hours of playing video games. You were able to acquire $' + money + '.</p></div><button class="exitEvnt" id="emd"></button></div>';
                    gameEvent(nodeGameEvent);
                    this.paid(money);
                } /* END IF */
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
                break;
                this.render();
        } /* END IF */
    } /* END OF game */

    this.changeNBSprite = function () {
        var place;
        if (this.atHome) {
            place = "-bedroom.png"
        } else if (this.atBar) {
            place = "-bar.png"
        } else {
            place = "-convention.png"
        }
        $("#sprite img").attr("src", "images/nb/" + this.sprite + place);
    }

    //Resets all variables for being at home
    this.goHome = function(){
        var bgHome = this.secretEndingItem3 ? "images/bg/BackgroundApartment.png" : "images/bg/BackgroundRoom.png";
        $("#location").attr("src", bgHome);
        $("#sprite img").attr("src", "images/nb/" + this.sprite + "-bedroom.png");
        $("#footer").html(ftrAtHome);
        this.atConv = false;
        this.atBar = false;
        this.atHome = true;
    } /* END OF goHome */

    //Resets all variables for being at bar
    this.goBar = function(){
        $("#location").attr("src", "images/bg/BackgroundBar.png");
        $("#sprite img").attr("src", "images/nb/" + this.sprite + "-bar.png");
        $("#footer").html(ftrAtBar);
        this.barHopped++;
        this.atBar = true;
        this.atHome = false;
    } /* END OF goBar */

    //Resets all variables for being at convention
    this.goConv = function(){
        $("#location").attr("src", "images/bg/BackgroundConvention.png");
        $("#sprite img").attr("src", "images/nb/" + this.sprite + "-convention.png");
        $("#footer").html(ftrAtConv);
        this.convAttended++;
        this.atConv = true;
        this.atHome = false;
        this.convDay = 0;
    } /* END OF goConv */

    this.newGame = function(){
        //mainCharacter primary stat variables
	    this.statEnergy = 100;
	    this.statHunger = 100;
	    this.statExcitement = 100;
	    this.statAccomplishment = 100;
	    this.statEuphoria = 0;
	    this.statStatus = 'Normal';
	    this.statMoney = 20;
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
        this.timesDieted = 0;
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
        this.secretEvent = false;
        this.sprite = "sprite";
        //this.weight = 280.0;
        //this.niceGuyPoints = 0;
        //resets screen to bedroom
        this.goHome();
    } /* END OF newGame */

    this.saveGame = function(){
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
            timesDieted: this.timesDieted,
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
            secretEvent: this.secretEvent,
            sprite: this.sprite
            //weight: this.weight,
            //niceGuyPoints: this.niceGuyPoints
        }; /* END OBJECT */
        //Puts the object into storage
        localStorage.setItem('FedLifeSG', JSON.stringify(mcObject));
    } /* END OF saveGame */

    this.loadGame = function (optSel) {
        //Retrieves the object from storage
        var retrievedObject = localStorage.getItem('FedLifeSG');
        if (retrievedObject === null) {
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
            this.timesDieted = json.timesDieted;
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
            this.secretEvent = json.secretEvent;
            this.sprite = json.sprite;
            //this.weight = json.weight;
            //this.niceGuyPoints = json.niceGuyPoints;

            //resets screen to bedroom
            this.goHome();
            //if player loads with non-normal status
            statusMap[this.statStatus].changeHtml();
            this.render();

            $("#mainDialog").dialog("close");
        } /* END IF */
    } /* END OF loadGame */

    this.resetStatus = function() {
        this.changeStatus('Normal');
        this.decayEnergy = 2;
        this.decayHunger = 2;
        this.decayExcitement = 2;
        this.decaySOA = 2;
    } /* END OF resetStatus */

    this.changeStatus = function(newStatus) {
		if(statusMap[newStatus].priority > statusMap[this.statStatus].priority) {
            this.decayEnergy = 2;
            this.decayHunger = 2;
            this.decayExcitement = 2;
            this.decaySOA = 2;

            this.statStatus = newStatus;
            statusMap[newStatus].changeHtml();
        } /* END IF */
    } /* END OF changeStatus */

    this.openOptions = function () {
        var optionsNode = '<div id="travelDia"><table class="optionsTable"><tr><td id="optionsTableHeader">Options</td></tr><tr><td>Mute Music</td><td><button id="muteMusic" class="mute"></button></td></tr><tr><td>Mute Sounds</td><td><button id="muteSound" class="mute"></button></td></tr><tr><td>Switch Neckbeard</td><td><select id="changeNB"><option value="sprite">Nick M. Beardman</option>';
        if (this.statEuphoria >= 1000)
            optionsNode += '<option value="sprite2">Fred "Murdermaster" Wilhelm</option>';

        if (this.statEuphoria >= 2000)
            optionsNode += '<option value="sprite3">Mr. Nice Guy</option>';

        if (this.statEuphoria >= 3000)
            optionsNode += '<option value="sprite4">Dick Wolf</option>';

        if (this.statEuphoria >= 8000)
            optionsNode += '<option value="sprite8">An actual white knight</option>';

        if (this.endFG)
            optionsNode += '<option value="sprite9">Fedora God</option>';

        if (this.endEFame)
            optionsNode += '<option value="sprite11">E-Fame Ending</option>';

        if (this.endWaifu)
            optionsNode += '<option value="sprite13">Waifu Ending</option>';

        if (this.endNorm)
            optionsNode += '<option value="sprite14">Normal Ending</option>';

        if (this.endGolden)
            optionsNode += '<option value="sprite15">Golden Ending</option>';

        optionsNode += '</select></td></tr><tr><td colspan="2"><p id="resetSaveFile">Reset Save File</p></td></tr></table><br><button class="backGameBtn" id="emd"></button></div>';
        return optionsNode;
    }
} /* END OF mainCharacter */
function progress(percent, element) { 
	var progressBarWidth = percent * element.width() / 100;

	element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "% ");
} /* END OF progress */

function checkStatus(){
    if((grant.statStatus !== 'Normal') && (sTimer == 0)){
        sTimer = 15;
        statusEffect();
    } else if(grant.statStatus != 'Normal'){
        statusEffect();
    } /* END IF */
} /* END OF checkStatus */

function statusEffect(){
    var status = grant.statStatus;
    statusMap[status].effect();
    statusMap[status].changeHtml();
    
    if(sTimer === 1) {
        grant.resetStatus();
    } /* END IF */
    sTimer--;
} /* END OF statusEffect */

function checkBrowser(){
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
    // At least Safari 3+: "[object HTMLElementConstructor]"
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // Internet Explorer 6-11
    var isIE = false || !!document.documentMode;
    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;
    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    if((!isChrome) && (!isFirefox)) {
        $("#mainDialog").html(nodeBlockScreen);
    } /* END IF */
} /* END OF checkBrowser */

function init(){
    var backgroundAudio=document.getElementById("music");
    backgroundAudio.volume=0.5;
    window.grant = new mainCharacter();
    window.sTimer = 0;
    window.sfx = true;
    decay();
    grant.render();
    objectLoader();
} /* END OF init */

function cost(money) {
    var proceed = false;
    if (money > grant.statMoney) {
        grant.statAccomplishment -= 10;
        grant.render();
        $("#mainDialog").dialog("close");
        setTimeout(function () {
            genericDia(nodeNoMoney);
        }, 500);
    } else {
        grant.statMoney -= money;
        grant.moneySpent += money;
        proceed = true;
    } /* END IF */
    return proceed;
} /* END OF cost */

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

    itemArray[0] = new item("item1", 2, function () { grant.statHunger += 3; grant.statEuphoria += 5; });
    itemArray[1] = new item("item2", 5, function () { grant.statHunger += 10; });
    itemArray[2] = new item("item3", 8, function () { grant.statHunger += 15; });
    itemArray[3] = new item("item4", 2, function () { grant.statEnergy += 3; });
    itemArray[4] = new item("item5", 6, function () { grant.statEnergy += 10; if (randomizer(3) === 1) { grant.changeStatus('Tweaked'); } });
    itemArray[5] = new item("item6", 15, function () { grant.statEnergy += 15; grant.statEuphoria += 3; });
    itemArray[6] = new item("item7", 5, function () { grant.statExcitement += 3; grant.statAccomplishment += 3; });
    itemArray[7] = new item("item8", 15, function () { grant.statExcitement += 10; grant.statAccomplishment += 10; });
    itemArray[8] = new item("item9", 40, function () { grant.statExcitement += 25; grant.statAccomplishment += 25; grant.statEuphoria += 10; });
    itemArray[9] = new item("item10", 10, function () { grant.statEuphoria += 50; grant.fedsBought++; });
    itemArray[10] = new item("item11", 20, function () { grant.statEuphoria += 100; grant.figsBought++; });
    itemArray[11] = new item("item12", 45, function () { grant.statEuphoria += 250; grant.wepsBought++; });
    itemArray[12] = new item("item13", 250, function () { grant.secretEndingItem1 = true; });
    itemArray[13] = new item("item14", 500, function () { grant.secretEndingItem2 = true; });
    itemArray[14] = new item("item15", 1000, function () { grant.secretEndingItem3 = true; grant.goHome(); });
    itemArray[15] = new item("item16", 5, function () { grant.socialSkills++; });
    itemArray[16] = new item("item17", 15, function () { grant.timesDieted++; grant.statEnergy += 5; grant.statAccomplishment += 5; grant.statEuphoria += 10; });
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
    statusArray[0] = new status('Normal', white, null, 100, "You are normal. Kinda...", function () { grant.resetStatus(); });
    statusArray[1] = new status('Tweaked', green, 5, 95, "Energy+", function () { grant.decayEnergy = -1; });
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
    statusArray[15] = new status('Motivated', green, 10, 7, "Energy++, Accomplishment+", function () { grant.decayEnergy = -2; grant.decaySOA = 1; });
    statusArray[16] = new status('Dishonored', red, 15, 6, "Energy--, Accomplishment-", function () { grant.decayEnergy = 4; grant.decaySOA = 3; });

    var len = statusArray.length;
    while (len--) {
        var statusObj = statusArray[len];
        var mapKey = statusArray[len].name;
        statusMap[mapKey] = statusObj;
    }

    //speak
    window.speakMap = {};
    window.speakArray = [];
    speakArray[0] = new speak('excitementUp', "You recovered 10 excitement", function () { grant.statExcitement += 10; });
    speakArray[1] = new speak('hungerUp', "You recovered 10 hunger", function () { grant.statHunger += 10; });
    speakArray[2] = new speak('soaUp', "You recovered 10 accomplishment", function () { grant.statAccomplishment += 10; });
    speakArray[3] = new speak('energyUp', "You recovered 10 energy", function () { grant.statEnergy += 10; });
    speakArray[4] = new speak('moneyUp', "You gained $10", function () { grant.paid(10); });
    speakArray[5] = new speak('inLove', "You have fallen in love (++Accomplishment)", function () { grant.changeStatus('In Love'); });
    speakArray[6] = new speak('content', "You are now content (+Energy, +Excitement, +Accomplishment)", function () { grant.changeStatus('Content'); });
    speakArray[7] = new speak('confident', "You are feeling confident (+Excitement, ++Accomplishment)", function () { grant.changeStatus('Confident'); });
    speakArray[8] = new speak('hatPlus', "You got a new fedora for your collection", function () { grant.fedsBought++; });
    speakArray[9] = new speak('photoUp', "You took a new photo", function () { grant.picsTaken++; });
    speakArray[10] = new speak('soaDown', "You lost 10 sense of accomplishment", function () { grant.statAccomplishment -= 10; });
    speakArray[11] = new speak('excitementDown', "You lost 10 excitement", function () { grant.statExcitement -= 10; });
    speakArray[12] = new speak('moneyDown', "You lost $10", function () { if (!cost(10)) { grant.statMoney = 0; } });
    speakArray[13] = new speak('heartbroken', "Your heart has shattered (-Accomplishment)", function () { grant.changeStatus('Heartbroken'); });
    speakArray[14] = new speak('embarrassed', "You feel embarrassed (-Excitement)", function () { grant.changeStatus('Embarrassed'); });
    speakArray[15] = new speak('emasculated', "You feel emasculated (-Excitement, --Accomplishment)", function () { grant.changeStatus('Emasculated'); });
    speakArray[16] = new speak('paranoid', "You feel paranoid (-Energy, -Excitement)", function () { grant.changeStatus('Paranoid'); });
    speakArray[17] = new speak('discontent', "You feel discontent (-Energy, -Excitement, -Accomplishment)", function () { grant.changeStatus('Discontent'); });
    speakArray[17] = new speak('sick', "You feel sick (-Energy, -Hunger)", function () { grant.changeStatus('Sick'); });
    speakArray[18] = new speak('motivated', "You feel motivated (++Energy, +Accomplishment)", function () { grant.changeStatus('Motivated'); });
    speakArray[19] = new speak('dishonored', "You feel dishonored (--Energy, -Accomplishment)", function () { grant.changeStatus('Dishonored'); });
    speakArray[20] = new speak('deadInside', "You are dead inside (--Everything)", function () { grant.changeStatus('Dead Inside'); });
    speakArray[21] = new speak('hungerDown', "You lost 10 hunger", function () { grant.statHunger -= 10; });

    function speak(name, text, effect) {
        this.name = name;
        this.text = text;
        this.effect = effect;
    } /* END OBJECT SPEAK */

    var len = speakArray.length;
    while (len--) {
        var speakObj = speakArray[len];
        var mapKey = speakArray[len].name;
        speakMap[mapKey] = speakObj;
    } /* END WHILE */

    //convention
    window.conventionMap = {};
    window.conventionArray = [];

    //photo shoot
    conventionArray[0] = new convention('ps1', '+5 Excitement<br/>+1 Picture Taken', function () { grant.statExcitement += 5; grant.picsTaken++; grant.render(); });
    conventionArray[1] = new convention('ps2', '+10 Excitement<br>+1 Social Skill<br>+2 Pictures Taken', function () { grant.statExcitement += 10; grant.timesSocialized += 1; grant.socialSkills += 1; grant.picsTaken += 2; grant.render(); });
    conventionArray[2] = new convention('ps3', '+15 Excitement<br>+3 Social Skill<br>+3 Pictures Taken', function () { grant.statExcitement += 15; grant.timesSocialized += 3; grant.socialSkills += 3; grant.picsTaken += 3; grant.render(); });
    conventionArray[3] = new convention('ps4', '+20 Excitement<br>+3 Social Skill<br>+4 Pictures Taken', function () { grant.statExcitement += 20; grant.timesSocialized += 3; grant.socialSkills += 3; grant.picsTaken += 4; grant.render(); });
    conventionArray[4] = new convention('ps5', '+25 Excitement<br>+3 Social Skill<br>+5 Pictures Taken', function () { grant.statExcitement += 25; grant.timesSocialized += 3; grant.socialSkills += 3; grant.picsTaken += 5; grant.render(); });

    //figurine give away
    conventionArray[5] = new convention('fg1', '+5 Euphoria<br>+1 Figurine', function () { grant.statEuphoria += 5; grant.figsBought++; grant.render(); });
    conventionArray[6] = new convention('fg2', '+10 Euphoria<br>+1 Social Skill<br>+1 Figurine', function () { grant.statEuphoria += 10; grant.timesSocialized += 1; grant.socialSkills += 1; grant.figsBought++; grant.render(); });
    conventionArray[7] = new convention('fg3', '+25 Euphoria<br>+2 Social Skill<br>+1 Figurine', function () { grant.statEuphoria += 25; grant.timesSocialized += 2; grant.socialSkills += 2; grant.figsBought++; grant.render(); });
    conventionArray[8] = new convention('fg4', '+50 Euphoria<br>+3 Social Skill<br>+2 Figurines', function () { grant.statEuphoria += 50; grant.timesSocialized += 3; grant.socialSkills += 3; grant.figsBought += 2; grant.render(); });
    conventionArray[9] = new convention('fg5', '+100 Euphoria<br>+5 Social Skill<br>+3 Figurines', function () { grant.statEuphoria += 100; grant.timesSocialized += 5; grant.socialSkills += 5; grant.figsBought += 3; grant.render(); });

    //qa panel
    conventionArray[10] = new convention('qa1', '+5 Excitement<br>+5 Euphoria', function () { grant.statExcitement += 5; grant.statEuphoria += 5; grant.render(); });
    conventionArray[11] = new convention('qa2', '+10 Excitement<br>+10 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.statEuphoria += 10; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[12] = new convention('qa3', '+15 Excitement<br>+25 Euphoria<br>+3 Social Skill', function () { grant.statExcitement += 15; grant.statEuphoria += 25; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });
    conventionArray[13] = new convention('qa4', '+20 Excitement<br>+5 Accomplishment<br>+50 Euphoria<br>+3 Social Skill', function () { grant.statExcitement += 20; grant.statAccomplishment += 5; grant.statEuphoria += 50; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });
    conventionArray[14] = new convention('qa5', '+25 Excitement<br>+10 Accomplishment<br>+100 Euphoria<br>+3 Social Skill', function () { grant.statExcitement += 25; grant.statAccomplishment += 10; grant.statEuphoria += 100; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });

    //maid cafe
    conventionArray[15] = new convention('mc1', '+5 Excitement<br>+Tweaked(+Energy)', function () { grant.statExcitement += 5; grant.changeStatus('Tweaked'); grant.render(); });
    conventionArray[16] = new convention('mc2', '+10 Excitement<br>+1 Social Skill<br>+Tweaked(+Energy)', function () { grant.statExcitement += 10; grant.timesSocialized += 1; grant.socialSkills += 1; grant.changeStatus('Tweaked'); grant.render(); });
    conventionArray[17] = new convention('mc3', '+15 Excitement<br>+3 Social Skill<br>+Tweaked(+Energy)', function () { grant.statExcitement += 15; grant.timesSocialized += 3; grant.socialSkills += 3; grant.changeStatus('Tweaked'); grant.render(); });
    conventionArray[18] = new convention('mc4', '+20 Excitement<br>+4 Social Skill<br>+Tweaked(+Energy)', function () { grant.statExcitement += 20; grant.timesSocialized += 4; grant.socialSkills += 4; grant.changeStatus('Tweaked'); grant.render(); });
    conventionArray[19] = new convention('mc5', '+25 Excitement<br>+5 Social Skill<br>+Tweaked(+Energy)', function () { grant.statExcitement += 25; grant.timesSocialized += 5; grant.socialSkills += 5; grant.changeStatus('Tweaked'); grant.render(); });

    //anime karaoke
    conventionArray[20] = new convention('ak1', '+10 Excitement', function () { grant.statExcitement += 10; grant.render(); });
    conventionArray[21] = new convention('ak2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[22] = new convention('ak3', '+20 Excitement<br>+5 Accomplishment<br>+1 Social Skill<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 20; grant.statAccomplishment += 5; grant.timesSocialized += 1; grant.socialSkills += 1; grant.changeStatus('Content'); grant.render(); });
    conventionArray[23] = new convention('ak4', '+25 Excitement<br>+10 Accomplishment<br>+1 Social Skill<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 25; grant.statAccomplishment += 10; grant.timesSocialized += 1; grant.socialSkills += 1; grant.changeStatus('Content'); grant.render(); });
    conventionArray[24] = new convention('ak5', '+30 Excitement<br>+15 Accomplishment<br>+2 Social Skill<br>+Confident(+Excitement, ++Accomplishment)', function () { grant.statExcitement += 30; grant.statAccomplishment += 15; grant.timesSocialized += 2; grant.socialSkills += 2; grant.changeStatus('Confident'); grant.render(); });

    //rave
    conventionArray[25] = new convention('rv1', '+10 Excitement', function () { grant.statExcitement += 10; grant.render(); });
    conventionArray[26] = new convention('rv2', '+20 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 20; grant.timesSocialized += 1; grant.socialSkills += 1; });
    conventionArray[27] = new convention('rv3', '+30 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 30; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });
    conventionArray[28] = new convention('rv4', '+40 Excitement<br>+4 Social Skill', function () { grant.statExcitement += 40; grant.timesSocialized += 4; grant.socialSkills += 4; grant.render(); });
    conventionArray[29] = new convention('rv5', '+50 Excitement<br>+5 Social Skill', function () { grant.statExcitement += 50; grant.timesSocialized += 5; grant.socialSkills += 5; grant.render(); });

    //celebrity signing
    conventionArray[30] = new convention('cs1', '+5 Excitement<br>+5 Euphoria', function () { grant.statExcitement += 5; grant.statEuphoria += 5; grant.render(); });
    conventionArray[31] = new convention('cs2', '+10 Excitement<br>+10 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.timesSocialized += 1; grant.socialSkills += 1; grant.statEuphoria += 10; grant.render(); });
    conventionArray[32] = new convention('cs3', '+15 Excitement<br>+5 Accomplishment<br>+25 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.statAccomplishment += 5; grant.timesSocialized += 1; grant.socialSkills += 1; grant.statEuphoria += 25; grant.render(); });
    conventionArray[33] = new convention('cs4', '+20 Excitement<br>+10 Accomplishment<br>+50 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 20; grant.statAccomplishment += 10; grant.timesSocialized += 1; grant.socialSkills += 1; grant.statEuphoria += 50; grant.render(); });
    conventionArray[34] = new convention('cs5', '+25 Excitement<br>+15 Accomplishment<br>+100 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 25; grant.statAccomplishment += 15; grant.timesSocialized += 1; grant.socialSkills += 1; grant.statEuphoria += 100; grant.render(); });

    //game demo
    conventionArray[35] = new convention('gd1', '+10 Excitement', function () { grant.statExcitement += 10; grant.render(); });
    conventionArray[36] = new convention('gd2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 20; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[37] = new convention('gd3', '+20 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 30; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });
    conventionArray[38] = new convention('gd4', '+25 Excitement<br>+5 Social Skill', function () { grant.statExcitement += 40; grant.timesSocialized += 5; grant.socialSkills += 5; grant.render(); });
    conventionArray[39] = new convention('gd5', '+30 Excitement<br>+5 Social Skill', function () { grant.statExcitement += 50; grant.timesSocialized += 5; grant.socialSkills += 5; grant.render(); });

    //magic show
    conventionArray[40] = new convention('ms1', '+10 Excitement', function () { grant.statExcitement += 10; grant.render(); });
    conventionArray[41] = new convention('ms2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[42] = new convention('ms3', '+20 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 20; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });
    conventionArray[43] = new convention('ms4', '+25 Excitement<br>+3 Social Skill<br>+10 Euphoria<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 25; grant.timesSocialized += 3; grant.socialSkills += 3; grant.statEuphoria += 10; grant.changeStatus('Content'); grant.render(); });
    conventionArray[44] = new convention('ms5', '+30 Excitement<br>+3 Social Skill<br>+25 Euphoria<br>+Confident(+Excitement, ++Accomplishment)', function () { grant.statExcitement += 30; grant.timesSocialized += 3; grant.socialSkills += 3; grant.statEuphoria += 25; grant.changeStatus('Confident'); grant.render(); });

    //idol concert
    conventionArray[45] = new convention('ic1', '+5 Excitement<br>+5 Euphoria', function () { grant.statExcitement += 5; grant.statEuphoria += 5; grant.render(); });
    conventionArray[46] = new convention('ic2', '+10 Excitement<br>+1 Social Skill<br>+10 Euphoria', function () { grant.statExcitement += 10; grant.timesSocialized += 1; grant.socialSkills += 1; grant.statEuphoria += 10; grant.render(); });
    conventionArray[47] = new convention('ic3', '+15 Excitement<br>+3 Social Skill<br>+25 Euphoria', function () { grant.statExcitement += 15; grant.timesSocialized += 3; grant.socialSkills += 3; grant.statEuphoria += 25; grant.render(); });
    conventionArray[48] = new convention('ic4', '+20 Excitement<br>+3 Social Skill<br>+50 Euphoria', function () { grant.statExcitement += 20; grant.timesSocialized += 3; grant.socialSkills += 3; grant.statEuphoria += 50; grant.render(); });
    conventionArray[49] = new convention('ic5', '+25 Excitement<br>+3 Social Skill<br>+100 Euphoria', function () { grant.statExcitement += 25; grant.timesSocialized += 3; grant.socialSkills += 3; grant.statEuphoria += 100; grant.render(); });

    //dance off
    conventionArray[50] = new convention('do1', '+10 Excitement', function () { grant.statExcitement += 10; grant.render(); });
    conventionArray[51] = new convention('do2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[52] = new convention('do3', '+20 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 20; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });
    conventionArray[53] = new convention('do4', '+25 Excitement<br>+5 Accomplishment<br>+3 Social Skill<br>+Confident(+Excitement, ++Accomplishment)', function () { grant.statExcitement += 25; grant.statAccomplishment += 5; grant.timesSocialized += 3; grant.socialSkills += 3; grant.changeStatus('Confident'); grant.render(); });
    conventionArray[54] = new convention('do5', '+30 Excitement<br>+10 Accomplishment<br>+3 Social Skill<br>+Confident(+Excitement, ++Accomplishment)', function () { grant.statExcitement += 30; grant.statAccomplishment += 10; grant.timesSocialized += 3; grant.socialSkills += 3; grant.changeStatus('Confident'); grant.render(); });

    //human chess
    conventionArray[55] = new convention('hc1', '+10 Excitement', function () { grant.statExcitement += 10; grant.render(); });
    conventionArray[56] = new convention('hc2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[57] = new convention('hc3', '+20 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 20; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });
    conventionArray[58] = new convention('hc4', '+25 Excitement<br>+5 Social Skill', function () { grant.statExcitement += 25; grant.timesSocialized += 5; grant.socialSkills += 5; grant.render(); });
    conventionArray[59] = new convention('hc5', '+30 Excitement<br>+5 Social Skill<br>+Euphoric(+++All)', function () { grant.statExcitement += 30; grant.timesSocialized += 5; grant.socialSkills += 5; grant.changeStatus('Euphoric'); grant.render(); });

    //game o ninja
    conventionArray[60] = new convention('gn1', '+10 Excitement', function () { grant.statExcitement += 10; grant.render(); });
    conventionArray[61] = new convention('gn2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[62] = new convention('gn3', '+20 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 20; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });
    conventionArray[63] = new convention('gn4', '+25 Excitement<br>+5 Social Skill', function () { grant.statExcitement += 25; grant.timesSocialized += 5; grant.socialSkills += 5; grant.render(); });
    conventionArray[64] = new convention('gn5', '+30 Excitement<br>+7 Social Skill<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 30; grant.timesSocialized += 7; grant.socialSkills += 7; grant.changeStatus('Content'); grant.render(); });

    //quiz show
    conventionArray[65] = new convention('qs1', '+10 Excitement', function () { grant.statExcitement += 10; grant.render(); });
    conventionArray[66] = new convention('qs2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[67] = new convention('qs3', '+20 Excitement<br>+3 Social Skill<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 20; grant.timesSocialized += 3; grant.socialSkills += 3; grant.changeStatus('Content'); grant.render(); });
    conventionArray[68] = new convention('qs4', '+25 Excitement<br>+5 Accomplishment<br>+3 Social Skill<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 25; grant.statAccomplishment += 5; grant.timesSocialized += 3; grant.socialSkills += 3; grant.changeStatus('Content'); grant.render(); });
    conventionArray[69] = new convention('qs5', '+30 Excitement<br>+5 Accomplishment<br>+3 Social Skill<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 30; grant.statAccomplishment += 10; grant.timesSocialized += 3; grant.socialSkills += 3; grant.statMoney += 50; grant.changeStatus('Content'); grant.render(); });

    //open mic
    conventionArray[70] = new convention('om1', '+10 Excitement', function () { grant.statExcitement += 10; grant.render(); });
    conventionArray[71] = new convention('om2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[72] = new convention('om3', '+20 Excitement<br>+3 Social Skill<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 20; grant.timesSocialized += 3; grant.socialSkills += 3; grant.changeStatus('Content'); grant.render(); });
    conventionArray[73] = new convention('om4', '+25 Excitement<br>+5 Social Skill<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 25; grant.timesSocialized += 5; grant.socialSkills += 5; grant.changeStatus('Content');grant.render(); });
    conventionArray[74] = new convention('om5', '+30 Excitement<br>+7 Social Skill<br>+Confident(+Excitement, ++Accomplishment)', function () { grant.statExcitement += 30; grant.timesSocialized += 7; grant.socialSkills += 7; grant.changeStatus('Confident'); grant.render(); });

    //larp battle
    conventionArray[75] = new convention('lb1', '+10 Excitement', function () { grant.statExcitement += 10; grant.render(); });
    conventionArray[76] = new convention('lb2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[77] = new convention('lb3', '+20 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 20; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });
    conventionArray[78] = new convention('lb4', '+25 Excitement<br>+5 Social Skill', function () { grant.statExcitement += 25; grant.timesSocialized += 5; grant.socialSkills += 5; grant.render(); });
    conventionArray[79] = new convention('lb5', '+30 Excitement<br>+7 Social Skill', function () { grant.statExcitement += 30; grant.timesSocialized += 7; grant.socialSkills += 7; grant.render(); });

    //tcg competition
    conventionArray[80] = new convention('tc1', '+5 Excitement', function () { grant.statExcitement += 5; grant.render(); });
    conventionArray[81] = new convention('tc2', '+10 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[82] = new convention('tc3', '+10 Excitement<br>+5 Accomplishment<br>+2 Social Skill', function () { grant.statExcitement += 15; grant.statAccomplishment += 5; grant.timesSocialized += 2; grant.socialSkills += 2; grant.render(); });
    conventionArray[83] = new convention('tc4', '+20 Excitement<br>+10 Accomplishment<br>+3 Social Skill', function () { grant.statExcitement += 20; grant.statAccomplishment += 10; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });
    conventionArray[84] = new convention('tc5', '+25 Excitement<br>+15 Accomplishment<br>+3 Social Skill<br>+50 Money', function () { grant.statExcitement += 25; grant.statAccomplishment += 15; grant.timesSocialized += 3; grant.socialSkills += 3; grant.statMoney += 50; grant.render(); });

    //painting event
    conventionArray[85] = new convention('pe1', '+5 Excitement<br>+5 Accomplishment', function () { grant.statExcitement += 5; grant.statAccomplishment += 5; grant.render(); });
    conventionArray[86] = new convention('pe2', '+10 Excitement<br>+5 Accomplishment<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.statAccomplishment += 5; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[87] = new convention('pe3', '+15 Excitement<br>+10 Accomplishment<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.statAccomplishment += 10; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[88] = new convention('pe4', '+20 Excitement<br>+15 Accomplishment<br>+1 Social Skill', function () { grant.statExcitement += 20; grant.statAccomplishment += 15; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[89] = new convention('pe5', '+25 Excitement<br>+20 Accomplishment<br>+1 Social Skill', function () { grant.statExcitement += 25; grant.statAccomplishment += 20; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });

    //table top gaming
    conventionArray[90] = new convention('tt1', '+10 Excitement', function () { grant.statExcitement += 10; grant.render(); });
    conventionArray[91] = new convention('tt2', '+20 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 20; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[92] = new convention('tt3', '+30 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 30; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });
    conventionArray[93] = new convention('tt4', '+40 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 40; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });
    conventionArray[94] = new convention('tt5', '+50 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 50; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });

    //dating auction
    conventionArray[95] = new convention('da1', '+10 Excitement', function () { grant.statExcitement += 10; grant.render(); });
    conventionArray[96] = new convention('da2', '+15 Excitement', function () { grant.statExcitement += 15; grant.render(); });
    conventionArray[97] = new convention('da3', '+20 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 20; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[98] = new convention('da4', '+25 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 25; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });
    conventionArray[99] = new convention('da5', '+30 Excitement<br>+5 Social Skill<br>+Confident(+Excitement, ++Accomplishment)', function () { grant.statExcitement += 30; grant.timesSocialized += 5; grant.socialSkills += 5; grant.changeStatus('Confident'); grant.render(); });

    //bar meet
    conventionArray[100] = new convention('bm1', '+10 Excitement', function () { grant.statExcitement += 10; grant.render(); });
    conventionArray[101] = new convention('bm2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[102] = new convention('bm3', '+20 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 20; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });
    conventionArray[103] = new convention('bm4', '+25 Excitement<br>+5 Social Skill', function () { grant.statExcitement += 25; grant.timesSocialized += 5; grant.socialSkills += 5; grant.render(); });
    conventionArray[104] = new convention('bm5', '+30 Excitement<br>+7 Social Skill<br>+Content(+Energy, +Excitement, +Accomplishment)', function () { grant.statExcitement += 30; grant.timesSocialized += 7; grant.socialSkills += 7; grant.changeStatus('Content'); grant.render(); });

    //anime theories
    conventionArray[105] = new convention('at1', '+5 Excitement', function () { grant.statExcitement += 5; grant.render(); });
    conventionArray[106] = new convention('at2', '+10 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[107] = new convention('at3', '+15 Excitement<br>+2 Social Skill<br>+1 Arguments Entered', function () { grant.statExcitement += 15; grant.timesSocialized += 2; grant.socialSkills += 2; grant.argsEntered += 1; grant.render(); });
    conventionArray[108] = new convention('at4', '+20 Excitement<br>+3 Social Skill<br>+1 Arguments Won<br>+Confident(+Excitement, ++Accomplishment)', function () { grant.statExcitement += 20; grant.timesSocialized += 3; grant.socialSkills += 3; grant.argsEntered += 1; grant.argsWon += 1; grant.changeStatus('Confident'); grant.render(); });
    conventionArray[109] = new convention('at5', '+25 Excitement<br>+4 Social Skill<br>+1 Arguments Won<br>+Confident(+Excitement, ++Accomplishment)', function () {  grant.statExcitement += 25; grant.timesSocialized += 4; grant.socialSkills += 4; grant.argsEntered += 1; grant.argsWon += 1; grant.changeStatus('Confident'); grant.render(); });

    //loutube interview
    conventionArray[110] = new convention('li1', '+5 Excitement', function () { grant.statExcitement += 5; grant.render(); });
    conventionArray[111] = new convention('li2', '+10 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.socialSkills += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[112] = new convention('li3', '+10 Excitement<br>+5 Accomplishment<br>+5 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.statAccomplishment += 5; grant.statEuphoria += 5; grant.socialSkills += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[113] = new convention('li4', '+10 Excitement<br>+10 Accomplishment<br>+25 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.statAccomplishment += 10; grant.statEuphoria += 25; grant.socialSkills += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[114] = new convention('li5', '+10 Excitement<br>+15 Accomplishment<br>+50 Euphoria<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.statAccomplishment += 15; grant.statEuphoria += 50; grant.socialSkills += 1; grant.socialSkills += 1; grant.render(); });

    //zombie apocalyse
    conventionArray[115] = new convention('za1', '+10 Excitement', function () { grant.statExcitement += 10; grant.render(); });
    conventionArray[116] = new convention('za2', '+20 Excitement', function () { grant.statExcitement += 20; grant.render(); });
    conventionArray[117] = new convention('za3', '+25 Excitement<br>+5 Accomplishment<br>+1 Social Skill', function () { grant.statExcitement += 25; grant.statAccomplishment += 5; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[118] = new convention('za4', '+30 Excitement<br>+10 Accomplishment<br>+2 Social Skill', function () { grant.statExcitement += 30; grant.statAccomplishment += 10; grant.timesSocialized += 2; grant.socialSkills += 2; grant.render(); });
    conventionArray[119] = new convention('za5', '+35 Excitement<br>+15 Accomplishment<br>+3 Social Skill', function () { grant.statExcitement += 35; grant.statAccomplishment += 15; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });

    //free food
    conventionArray[120] = new convention('ff1', '+10 Hunger', function () { grant.statHunger += 10; grant.render(); });
    conventionArray[121] = new convention('ff2', '+15 Hunger<br>+1 Social Skill', function () { grant.statHunger += 15; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[122] = new convention('ff3', '+20 Hunger<br>+5 Excitement<br>+2 Social Skill', function () { grant.statHunger += 20; grant.statExcitement += 5; grant.timesSocialized += 2; grant.socialSkills += 2; grant.render(); });
    conventionArray[123] = new convention('ff4', '+25 Hunger<br>+10 Excitement<br>+3 Social Skill', function () { grant.statHunger += 25; grant.statExcitement += 10; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });
    conventionArray[124] = new convention('ff5', '+30 Hunger<br>+20 Excitement<br>+3 Social Skill', function () { grant.statHunger += 30; grant.statExcitement += 20; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });

    //anime viewing session
    conventionArray[125] = new convention('avs1', '+10 Excitement', function () { grant.statExcitement += 10; grant.render(); });
    conventionArray[126] = new convention('avs2', '+15 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[127] = new convention('avs3', '+20 Excitement<br>+3 Social Skill<br>+5 Euphoria', function () {  grant.statExcitement += 20; grant.timesSocialized += 3; grant.socialSkills += 3; grant.statEuphoria += 5; grant.render(); });
    conventionArray[128] = new convention('avs4', '+25 Excitement<br>+4 Social Skill<br>+10 Euphoria', function () { grant.statExcitement += 25; grant.timesSocialized += 4; grant.socialSkills += 4; grant.statEuphoria += 10; grant.render(); });
    conventionArray[129] = new convention('avs5', '+30 Excitement<br>+5 Social Skill<br>+25 Euphoria', function () { grant.statExcitement += 30; grant.timesSocialized += 5; grant.socialSkills += 5; grant.statEuphoria += 25; grant.render(); });

    //ball pit
    conventionArray[130] = new convention('bp1', '+10 Excitement', function () { grant.statExcitement += 10; grant.render(); });
    conventionArray[131] = new convention('bp2', '+20 Excitement', function () { grant.statExcitement += 20; grant.render(); });
    conventionArray[132] = new convention('bp3', '+30 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 30; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[133] = new convention('bp4', '+40 Excitement<br>+2 Social Skill', function () { grant.statExcitement += 40; grant.timesSocialized += 2; grant.socialSkills += 2; grant.render(); });
    conventionArray[134] = new convention('bp5', '+50 Excitement<br>+3 Social Skill', function () { grant.statExcitement += 50; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });

    //mech piloting
    conventionArray[135] = new convention('mp1', '+5 Excitement', function () { grant.statExcitement += 5; grant.render(); });
    conventionArray[136] = new convention('mp2', '+10 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 10; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[137] = new convention('mp3', '+15 Excitement<br>+5 Accomplishment<br>+1 Social Skill<br>+5 Euphoria', function () { grant.statExcitement += 15; grant.statAccomplishment += 5; grant.timesSocialized += 1; grant.socialSkills += 1; grant.statEuphoria += 5; grant.render(); });
    conventionArray[138] = new convention('mp4', '+20 Excitement<br>+10 Accomplishment<br>+1 Social Skill<br>+10 Euphoria', function () { grant.statExcitement += 20; grant.statAccomplishment += 10; grant.timesSocialized += 1; grant.socialSkills += 1; grant.statEuphoria += 10; grant.render(); });
    conventionArray[139] = new convention('mp5', '+25 Excitement<br>+10 Accomplishment<br>+3 Social Skill<br>+25 Euphoria', function () { grant.statExcitement += 25; grant.statAccomplishment += 10; grant.timesSocialized += 3; grant.socialSkills += 3; grant.statEuphoria += 25; grant.render(); });

    //anime bingo
    conventionArray[140] = new convention('ab1', '+10 Excitement', function () { grant.statExcitement += 10; grant.render(); });
    conventionArray[141] = new convention('ab2', '+15 Excitement', function () { grant.statExcitement += 15; grant.render(); });
    conventionArray[142] = new convention('ab3', '+20 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 20; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[143] = new convention('ab4', '+25 Excitement<br>+3 Social Skill<br>+50 Money', function () { grant.statExcitement += 25; grant.timesSocialized += 3; grant.socialSkills += 3; grant.statMoney += 50; grant.render(); });
    conventionArray[144] = new convention('ab5', '+30 Excitement<br>+5 Social Skill<br>+100 Money', function () { grant.statExcitement += 30; grant.timesSocialized += 5; grant.socialSkills += 5; grant.statMoney += 100; grant.render(); });

    //swimming party
    conventionArray[145] = new convention('sp1', '+10 Excitement', function () { grant.statExcitement += 10; grant.render(); });
    conventionArray[146] = new convention('sp2', '+15 Excitement<br>+5 Accomplishment<br>+1 Social Skill', function () { grant.statExcitement += 15; grant.statAccomplishment += 5; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[147] = new convention('sp3', '+20 Excitement<br>+5 Accomplishment<br>+2 Social Skill', function () { grant.statExcitement += 20; grant.statAccomplishment += 5; grant.timesSocialized += 2; grant.socialSkills += 2; grant.render(); });
    conventionArray[148] = new convention('sp4', '+25 Excitement<br>+10 Accomplishment<br>+3 Social Skill', function () { grant.statExcitement += 25; grant.statAccomplishment += 10; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });
    conventionArray[149] = new convention('sp5', '+30 Excitement<br>+15 Accomplishment<br>+3 Social Skill', function () { grant.statExcitement += 30; grant.statAccomplishment += 15; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });

    //artist alley give
    conventionArray[150] = new convention('aag1', '+5 Euphoria<br>+1 Fedora', function () { grant.statEuphoria += 5; grant.fedsBought++; grant.render(); });
    conventionArray[151] = new convention('aag2', '+10 Euphoria<br>+1 Fedora', function () { grant.statEuphoria += 10; grant.fedsBought++; grant.render(); });
    conventionArray[152] = new convention('aag3', '+5 Excitement<br>+1 Social Skill<br>+25 Euphoria<br>+2 Fedoras', function () { grant.statExcitement += 5; grant.timesSocialized += 1; grant.socialSkills += 1; grant.statEuphoria += 25; grant.fedsBought += 2; grant.render(); });
    conventionArray[153] = new convention('aag4', '+10 Excitement<br>+2 Social Skill<br>+50 Euphoria<br>+2 Fedoras', function () { grant.statExcitement += 10; grant.timesSocialized += 2; grant.socialSkills += 2; grant.statEuphoria += 50; grant.fedsBought += 2; grant.render(); });
    conventionArray[154] = new convention('aag5', '+15 Excitement<br>+3 Social Skill<br>+100 Euphoria<br>+3 Fedoras', function () { grant.statExcitement += 15; grant.timesSocialized += 3; grant.socialSkills += 3; grant.statEuphoria += 100; grant.fedsBought += 3; grant.render(); });

    //speed date
    conventionArray[155] = new convention('sd1', '+5 Excitement<br>+1 Social Skill', function () { grant.statExcitement += 5; grant.timesSocialized += 1; grant.socialSkills += 1; grant.render(); });
    conventionArray[156] = new convention('sd2', '+10 Excitement<br>+5 Accomplishment<br>+2 Social Skill', function () { grant.statExcitement += 10; grant.statAccomplishment += 5; grant.timesSocialized += 2; grant.socialSkills += 2; grant.render(); });
    conventionArray[157] = new convention('sd3', '+15 Excitement<br>+5 Accomplishment<br>+3 Social Skill', function () { grant.statExcitement += 15; grant.statAccomplishment += 5; grant.timesSocialized += 3; grant.socialSkills += 3; grant.render(); });
    conventionArray[158] = new convention('sd4', '+20 Excitement<br>+10 Accomplishment<br>+4 Social Skill', function () { grant.statExcitement += 20; grant.statAccomplishment += 10; grant.timesSocialized += 4; grant.socialSkills += 4; grant.render(); });
    conventionArray[159] = new convention('sd5', 'The two of you spent most of your time together at the convention...', function () { grant.secretEvent = true; grant.statExcitement += 25; grant.statAccomplishment += 10; grant.timesSocialized += 5; grant.socialSkills += 5; grant.render(); });

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
} /* END OF objectLoader */

//Number randomizer method
function randomizer(max){
    return Math.floor(Math.random() * max) + 1;
} /* END OF randomizer */

//Play sound method
function play(url) {
    if(sfx)
        new Audio("sound/"+ url + ".mp3").play();
} /* END OF play */

//Checks if inbetween method
function between(x, min, max) {
  return x >= min && x < max;
} /* END OF between */

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
    checkBrowser();
    init();
    var currentArgNum = 0;
    var $md = $("#mainDialog");
    var $ft = $("#footer");
    $ft.html(ftrAtHome);
    setTimeout(function () {
        $("#wrapper").css('visibility', 'visible');
    }, 500);

    $md.on("click", function (e) {
        switch (e.target.id) {
            case "emd":
                play("pp1");
                $md.dialog("close");
                break;
            case "mmNewGame":
                play("pp1");
                grant.newGame();
                grant.render();
                $md.dialog("close");
                setTimeout(function () {
                    genericDia(nodeNGScreen1);
                }, 500);
                break;
            case "credits":
                play("pp1");
                $md.html(nodeCreditScreen);
                break;
            case "ngScreen1":
                play("pp1");
                $md.html(nodeNGScreen2);
                break;
            case "ngScreen2":
                play("pp1");
                $md.html(nodeNGScreen3);
                break;
            case "ngScreen3":
                play("pp1");
                $md.html(nodeNGScreen4);
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
                startScreen();
                break;
            case "gym":
                if (cost(10)) { grant.timesExersized++; grant.statEnergy -= 15; grant.statAccomplishment += 15; grant.statEuphoria += 5; play("tm1"); grant.render(); } /* END IF */
                break;
            case "egFG":
                play("pp1");
                genericDia(nodeEGFG);
                break;
            case "egEmployed":
                play("pp1");
                genericDia(nodeEGEmploy);
                break;
            case "egIron":
                play("pp1");
                grant.decTime = 6000;
                genericDia(nodeEGIron);
                break;
            case "egEFame":
                play("pp1");
                genericDia(nodeEGEfame);
                break;
            case "egNorm":
                play("pp1");
                genericDia(nodeEGNorm);
                break;
            case "egWaifu":
                play("pp1");
                genericDia(nodeEGWaifu);
                break;
            case "bar":
                var money = grant.endNorm ? 0 : 20;
                if (cost(money)) {
                    play("vv1");
                    grant.goBar();
                    grant.render();
                    $md.dialog("close");
                } /* END IF */
                break;
            case "convention":
                var money = grant.endWaifu ? 0 : 60;
                if (cost(money)) {
                    play("vv1");
                    grant.goConv();
                    grant.render();
                    $md.dialog("close");
                } /* END IF */
                break;
            case "goHome":
                play("pp1");
                grant.goHome();
                $md.dialog("close");
                break;
            case "quit":
                play("pp1");
                startScreen();
                break;
            case "vFGE":
                play("pp1");
                endGame(unGameEndFG);
                break;
            case "vEFE":
                play("pp1");
                endGame(unGameEndEFame);
                break;
            case "vEME":
                play("pp1");
                endGame(unGameEndEmployed);
                break;
            case "vIPE":
                play("pp1");
                endGame(unGameEndIron);
                break;
            case "vWFE":
                play("pp1");
                endGame(unGameEndWaifu);
                break;
            case "vNME":
                play("pp1");
                endGame(unGameEndNormal);
                break;
            case "vGOE":
                play("pp1");
                endGame(unGameEndGolden);
                break;
            case "ts":
                play("pp1");
                loadStats();
                break;
            case "muteMusic":
                var music = document.getElementById("music");
                var button = $("#muteMusic");
                music.muted = !music.muted;
                play("pp1");
                music.muted ? button.attr("class", "unmute") : button.attr("class", "mute");
                break;
            case "muteSound":
                var button = $("#muteSound");
                sfx = !sfx;
                play("pp1");
                sfx ? button.attr("class", "mute") : button.attr("class", "unmute");
                break;
            case "music1":
                play("rs1");
                var music = document.getElementById("music");
                $(music).attr("src", "sound/music1.mp3");
                break;
            case "music2":
                play("rs1");
                var music = document.getElementById("music");
                $(music).attr("src", "sound/music2.mp3");
                break;
            case "music3":
                play("rs1");
                var music = document.getElementById("music");
                $(music).attr("src", "sound/music3.mp3");
                break;
            case "resetSaveFile":
                play("pp1");
                $md.dialog("close");
                setTimeout(function () {
                    exitDia(resetSF);
                }, 400);
                break;
            case "resetSF":
                play("pp1");
                localStorage.removeItem("FedLifeSG");
                $md.dialog("close");
                setTimeout(function () {
                    startScreen();
                }, 500);
                break;
            case "toOptions":
                play("pp1");
                $md.dialog("close");
                setTimeout(function () {
                    travelDia(grant.openOptions());
                }, 400);
                break;
        } /* END SWITCH */
    }); /* END ON CLICK MAIN DIALOG */

    $ft.on("click", function (e) {
        switch (e.target.id) {
            case "sleep":
                grant.sleep();
                break;
            case "shop":
                play("pp1");
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
                if (grant.atConv) {
                    grant.game("conv");
                } else {
                    grant.game("home");
                } /* END IF */
                grant.statExcitement += 10;
                grant.statAccomplishment += 2;
                grant.statEnergy -= 5;
                grant.statHunger -= 2;
                grant.timesGamed++;

                grant.render();
                break;
            case "flame":
                play("kb1");
                grant.argsEntered += 1;
                $("#argument").find(".correct").removeClass("correct");
                currentArgNum = readyArgument();
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
                if (grant.statEnergy > 25) {
                    play("sp1");
                    grant.event();
                } else {
                    play("pp1");
                    genericDia(nodeStopEvent);
                } /* END IF */
                break;
            case "photo":
                grant.photography();
                break;
            case "food":
                if (cost(10)) { play("ef1"); grant.statHunger += 7; grant.render(); } /* END IF */
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
                jukeboxDia(jukebox);
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
            accPts = parseInt(argumentObject[currentArgNum].accomplish),
            usedHint = $("#hintText").is(':visible');
        if ($(this).hasClass("correct")) {
            grant.statExcitement += 3;
            accPts = usedHint ? accPts - 10 : accPts + accPts;
            grant.statAccomplishment += accPts;
            isCorrect = true;
            if (this.endFG) {
                this.changeStatus('Euphoric');
            } /* END IF */
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
    /*
    $(document).keypress(function(e) {
    if((e.which === 13) || (e.which === 32) || (e.which === 39) || (e.which === 27)) {
    var inMenu = $(".ui-dialog").is(":visible");
    if(inMenu){
    //this finds all of them, but the attr only grabs the first id. Need to error handle
    var myVar = $("#mainDialog").find('.continueGameBtn, .exitEvnt, .exitShop');
    var action = $(myVar).attr('id');
    actionMap[action].effect();
    }
    }
    });
    */
    function loadStats() {
        var argWon = grant.argsWon,
            figs = grant.figsBought,
            hats = grant.fedsBought,
            weps = grant.wepsBought;

        //capping off unlockable logic
        if (figs > 25)
            figs = 25;
        if (hats > 50)
            hats = 50;
        if (weps > 15)
            weps = 15;

        var collectables = figs + hats + weps;
        var statsHtmlTop = '<div id="overAll"><span>Stats</span><button class="exitShop" id="emd"></button><div id="tabs"><ul class="nav nav-tabs"><li><a href="#tab-1">Overall</a></li><li><a href="#tab-2">Whiteboard</a></li><li><a href="#tab-3">Bookshelf</a></li><li><a href="#tab-4">Display Wall</a></li><li><a href="#tab-5">Weapon Cache</a></li></ul><div id="tab-1" class="fixedSizedTab">';

        var endFGNode = lnFG,
            endEFNode = lnEF,
            endEMNode = lnEM,
            endIPNode = lnIP,
            endWFNode = lnWF,
            endNMNode = lnNM,
            endGONode = lnGO;

        if (grant.endFG)
            endFGNode = unFG;

        if (grant.endEFame)
            endEFNode = unEF;

        if (grant.endEmployed)
            endEMNode = unEM;

        if (grant.endIron)
            endIPNode = unIP;

        if (grant.endWaifu)
            endWFNode = unWF;

        if (grant.endNorm)
            endNMNode = unNM;

        if (grant.endGolden)
            endGONode = unGO;

        //overall html generation
        var tab1 = '<div id="oaTable" class="tabInd"><table><tr><td>Overall Stats:</td></tr><tr><td>Collectables:</td><td>' + collectables + '/90</td><td>Times Excersized:</td><td>' + grant.timesExersized + '</td></tr><tr><td>Money Made:</td><td>$' + grant.moneyMade + '</td><td>Times Bar Hopped:</td><td>' + grant.barHopped + '</td></tr><tr><td>Money Spent:</td><td>$' + grant.moneySpent + '</td><td>Conventions Attended:</td><td>' + grant.convAttended + '</td></tr><tr><td>Times Worked:</td><td>' + grant.timesWorked + '</td>' + endFGNode + '</tr><tr><td>Times Gamed:</td><td>' + grant.timesGamed + '</td>' + endEFNode + '</tr><tr><td>Arguments Entered:</td><td>' + grant.argsEntered + '</td>' + endEMNode + '</tr><tr><td>Pictures Taken:</td><td>' + grant.picsTaken + '</td>' + endIPNode + '</tr><tr><td>Times Dieted:</td><td>' + grant.timesDieted + '</td>' + endWFNode + '</tr><tr><td>Times Socialized:</td><td>' + grant.timesSocialized + '</td>' + endNMNode + '</tr><tr><td>Social Level:</td><td>' + grant.socialSkills + '</td>' + endGONode + '</tr></table></div></div>';

        //argument rendering logic
        var totalFives = Math.floor(argWon / 5),
            remainder = argWon % 5,
            argHtml = "";

        if (totalFives != 0) {
            for (i = 0; i < totalFives; i++) {
                argHtml += t5;
            } /* END FOR */
        } /* END IF */
        if (remainder == 1) {
            argHtml += t1;
        } else if (remainder == 2) {
            argHtml += t2;
        } else if (remainder == 3) {
            argHtml += t3;
        } else if (remainder == 4) {
            argHtml += t4;
        } /* END IF */
        //loutag
        var tab2 = '<div id="tab-2" class="fixedSizedTab"><div id="imgArg"><div><div class="sb"></div></div><div id="argTal">' + argHtml + '</div></div></div>',
            tab3 = '<div id="tab-3" class="fixedSizedTab"><img src="/images/shelf/sh' + figs + '.png"/></div>',
            tab4 = '<div id="tab-4" class="fixedSizedTab"><img src="/images/rack/hr' + hats + '.png"/></div>',
            tab5 = '<div id="tab-5" class="fixedSizedTab"><img src="/images/cache/wc' + weps + '.png"/></div></div></div>',
            statsHtml = statsHtmlTop + tab1 + tab2 + tab3 + tab4 + tab5;

        statsDia(statsHtml);
    } /* END IF */
});