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

    this.event = function() {
        var random = (Math.floor(Math.random() * level1.length));
        //var random = 28;
        var node = "";
        switch(this.statSocial){
            case "Creepy":
                node = nodeEv1 + level1[random].title + nodeEv2 + level1[random].text + "<br/><br/>" + eventEffect(level1[random].effect) + nodeEv3;
                break;
            case "Weird":
                node = nodeEv1 + level2[random].title + nodeEv2 + level2[random].text + "<br/><br/>" + eventEffect(level2[random].effect) + nodeEv3;
                break;
            case "Eh...":
                node = nodeEv1 + level3[random].title + nodeEv2 + level3[random].text + "<br/><br/>" + eventEffect(level3[random].effect) + nodeEv3;
                break;
            case "Exists":
                node = nodeEv1 + level4[random].title + nodeEv2 + level4[random].text + "<br/><br/>" + eventEffect(level4[random].effect) + nodeEv3;
                break;
            case "Normal":
                node = nodeEv1 + level5[random].title + nodeEv2 + level5[random].text + "<br/><br/>" + eventEffect(level5[random].effect) + nodeEv3;
                break;
        } /* END SWITCH */
        genericDia(node);
    } /*END OF event */

    this.speak = function () {
        var roll = randomizer(100),
            success = 100 - this.socialSkills,
            speakNode = "",
            speakEvent = (Math.floor(Math.random() * speakObjectGood.length)),
            effect = "";
        if (roll >= success) {
            effect = speakObjectGood[speakEvent].effect;
            speakMap[effect].effect();
            speakNode = "<div id='genericDialog'><p id='GDTitle'>Social Interaction Gone Okay</p><div><p id='gdText'>" + speakObjectGood[speakEvent].text + "<br><br>" + speakMap[effect].text + "</p><img id='GDIcon' src='images/generic/ispeakg.png'/></div><button class='continueGameBtn' id='emd'></button></div>";
            this.socialSkills += 2;
        } else {
            effect = speakObjectBad[speakEvent].effect;
            speakMap[effect].effect();
            speakNode = "<div id='genericDialog'><p id='GDTitle'>Social Interaction Gone Terrible</p><div><p id='gdText'>" + speakObjectBad[speakEvent].text + "<br><br>" + speakMap[effect].text + "</p><img id='GDIcon' src='images/generic/ispeakb.png'/></div><button class='continueGameBtn' id='emd'></button></div>";
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
            nodeEnd = "</p><img id='GDIcon' src='images/generic/ibooth.png'/></div><button class='continueGameBtn' id='emd'></button></div>",
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
	    this.render();

	    if (this.drinksRound === 5) {
	        this.statStatus = 'Drunk';
	    } /* END IF */

	    if (this.drinksRound === 10) {
	        this.goHome();
	        this.statStatus = 'Hungover';
	        genericDia(nodeKickedBar);
	    } /* END IF */
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
            this.wage = 30;
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
                    this.statStatus = 'Euphoric';
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

    this.changeNBSprite = function() {
        $("#sprite img").attr("src", "images/nb/" + this.sprite + "-bedroom.png");
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

            //resets screen to bedroom
            this.goHome();
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
        this.statStatus = newStatus;
        statusMap[newStatus].changeHtml();
    } /* END OF changeStatus */

    this.openOptions = function () {
        var optionsNode = '<div id="travelDia"><table class="optionsTable"><tr><td id="optionsTableHeader">Options</td></tr><tr><td>Mute Music</td><td><button id="muteMusic" class="mute"></button></td></tr><tr><td>Mute Sounds</td><td><button id="muteSound" class="mute"></button></td></tr><tr><td>Switch Neckbeard</td><td><select id="changeNB"><option value="sprite">Nick M. Beardman</option>';
        if (this.statEuphoria >= 1000)
            optionsNode += '<option value="sprite2">Fred "Murdermaster" Wilhelm</option>';

        if (this.statEuphoria >= 2000)
            optionsNode += '<option value="sprite3">Mr. Nice Guy</option>';

        if (this.endEFame)
            optionsNode += '<option value="sprite11">E-Fame Ending</option>';

        if (this.endNorm)
            optionsNode += '<option value="sprite14">Normal Ending</option>';

        if (this.endGolden)
            optionsNode += '<option value="sprite15">Golden Ending</option>';

        optionsNode += '</select></td></tr></table><br><button class="backGameBtn" id="emd"></button></div>';
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
    window.grant = new mainCharacter();
    window.timer;
    window.sTimer = 0;
    window.sfx = true;
    decay();
    grant.render();
    objectLoader();
} /* END OF init */

function cost(moneyNeeded) {
    var proceed = false;
    if (moneyNeeded > grant.statMoney) {
        grant.statAccomplishment -= 10;
        grant.render();
        $("#mainDialog").dialog("close");
        setTimeout(function () {
            genericDia(nodeNoMoney);
        }, 500);
    } else {
        grant.statMoney -= moneyNeeded;
        grant.moneySpent += moneyNeeded;
        proceed = true;
    }
    return proceed;
}

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

    itemArray[0] = new item("item1", 2, function () { grant.statHunger += 2; grant.statEuphoria += 1; });
    itemArray[1] = new item("item2", 5, function () { grant.statHunger += 8; });
    itemArray[2] = new item("item3", 8, function () { grant.statHunger += 15; });
    itemArray[3] = new item("item4", 2, function () { grant.statEnergy += 2; });
    itemArray[4] = new item("item5", 6, function () { grant.statEnergy += 10; if (randomizer(3) === 1) { grant.changeStatus('Tweaked'); } });
    itemArray[5] = new item("item6", 15, function () { grant.statEnergy += 15; grant.statEuphoria += 3; });
    itemArray[6] = new item("item7", 5, function () { grant.statExcitement += 3; grant.statAccomplishment += 3; });
    itemArray[7] = new item("item8", 15, function () { grant.statExcitement += 10; grant.statAccomplishment += 10; });
    itemArray[8] = new item("item9", 40, function () { grant.statExcitement += 25; grant.statAccomplishment += 25; grant.statEuphoria += 5; });
    itemArray[9] = new item("item10", 10, function () { grant.statEuphoria += 50; grant.fedsBought++; });
    itemArray[10] = new item("item11", 20, function () { grant.statEuphoria += 100; grant.figsBought++; });
    itemArray[11] = new item("item12", 45, function () { grant.statEuphoria += 250; grant.wepsBought++; });
    itemArray[12] = new item("item13", 250, function () { grant.secretEndingItem1 = true; });
    itemArray[13] = new item("item14", 500, function () { grant.secretEndingItem2 = true; });
    itemArray[14] = new item("item15", 1000, function () { grant.secretEndingItem3 = true; });
    itemArray[15] = new item("item16", 5, function () { grant.socialSkills++; });
    itemArray[16] = new item("item17", 15, function () { grant.timesDieted++; grant.statEnergy += 3; grant.statEuphoria += 5; });
    itemArray[17] = new item("item18", 20, function () { grant.resetStatus(); });

    var len = itemArray.length;
    while (len--) {
        var itemObj = itemArray[len];
        var mapKey = itemArray[len].name;
        itemMap[mapKey] = itemObj;
    }

    //loads status effects
    function status(name, style, timer, tooltip, effect) {
        this.name = name;
        this.style = style;
        this.timer = timer;
        this.tooltip = tooltip;
        this.effect = effect;
        this.changeHtml = function () { $("#status").prop('title', this.tooltip).css('color', this.style); }
    }

    window.statusMap = [];
    window.statusArray = [];
    var white = "white";
    var green = "#2ECC71";
    var red = "#E74C3C";
    statusArray[0] = new status('Normal', white, null, "You are normal. Kinda...", function () { grant.resetStatus(); });
    statusArray[1] = new status('Tweaked', green, 5, "Energy+", function () { grant.decayEnergy = -1; });
    statusArray[2] = new status('Hungover', red, 10, "Energy--", function () { grant.decayEnergy = 4; });
    statusArray[3] = new status('Drunk', red, 10, "Energy-", function () { grant.decayEnergy = 3; });
    statusArray[4] = new status('In Love', green, 5, "Accomplishment++", function () { grant.decaySOA = -2; });
    statusArray[5] = new status('Confident', green, 15, "Accomplishment++, Excitement+", function () { grant.decaySOA = -2; grant.decayExcitement = 1; });
    statusArray[6] = new status('Content', green, 15, "Energy+, Accomplishment+, Excitement+", function () { grant.decayEnergy = 1; grant.decaySOA = 1; grant.decayExcitement = 1; });
    statusArray[7] = new status('Heartbroken', red, 15, "Accomplishment-", function () { grant.decaySOA = 3; });
    statusArray[8] = new status('Embarrassed', red, 5, "Excitement-", function () { grant.decayExcitement = 3; });
    statusArray[9] = new status('Emasculated', red, 15, "Accomplishment--, Excitement-", function () { grant.decaySOA = 4; grant.decayExcitement = 3; });
    statusArray[10] = new status('Paranoid', red, 10, "Energy-, Accomplishment-", function () { grant.decayEnergy = 3; grant.decayExcitement = 3; });
    statusArray[11] = new status('Discontent', red, 15, "Energy-, Accomplishment-, Excitement-", function () { grant.decayEnergy = 3; grant.decaySOA = 3; grant.decayExcitement = 3; });
    statusArray[12] = new status('Sick', red, 15, "Energy-, Hunger-", function () { grant.decayEnergy = 3; grant.decayHunger = 3; });
    statusArray[13] = new status('Euphoric', green, 15, "All++", function () { grant.decayEnergy = -4; grant.decayHunger = -4; grant.decayExcitement = -4; grant.decaySOA = -4; });
    statusArray[14] = new status('Dead Inside', red, 15, "All-", function () { grant.decayEnergy = 3; grant.decayHunger = 3; grant.decayExcitement = 3; grant.decaySOA = 3; });
    statusArray[15] = new status('Motivated', green, 10, "Energy++, Accomplishment+", function () { grant.decayEnergy = -2; grant.decaySOA = 1; });
    statusArray[16] = new status('Dishonored', red, 15, "Energy--, Accomplishment-", function () { grant.decayEnergy = 4; grant.decaySOA = 3; });

    var len = statusArray.length;
    while (len--) {
        var statusObj = statusArray[len];
        var mapKey = statusArray[len].name;
        statusMap[mapKey] = statusObj;
    }

    //speak
    window.speakMap = {};
    window.speakArray = [];
    speakArray[0] = new speak('excitementUp', "You have recovered 10 excitement", function () { grant.statExcitement += 10; });
    speakArray[1] = new speak('hungerUp', "You have recovered 10 excitement", function () { grant.statHunger += 10; });
    speakArray[2] = new speak('soaUp', "You have recovered 10 accomplishment", function () { grant.statAccomplishment += 10; });
    speakArray[3] = new speak('energyUp', "You have recovered 10 energy", function () { grant.statEnergy += 10; });
    speakArray[4] = new speak('moneyUp', "You have gained $10", function () { grant.paid(10); });
    speakArray[5] = new speak('inLove', "You have fallen in love (++Accomplishment)", function () { grant.changeStatus('In Love'); });
    speakArray[6] = new speak('content', "You are now content (+Energy, +Excitement, +Accomplishment)", function () { grant.changeStatus('Content'); });
    speakArray[7] = new speak('confident', "You are feeling confident (+Excitement, ++Accomplishment)", function () { grant.changeStatus('Confident'); });
    speakArray[8] = new speak('hatPlus', "You got a new fedora for your collection", function () { grant.fedsBought++; });
    speakArray[9] = new speak('photoUp', "You took a new photo", function () { grant.picsTaken++; });
    speakArray[10] = new speak('soaDown', "You have lost 10 sense of accomplishment", function () { grant.statAccomplishment -= 10; });
    speakArray[11] = new speak('excitementDown', "You have lost 10 excitement", function () { grant.statExcitement -= 10; });
    speakArray[12] = new speak('moneyDown', "You have lost $10", function () { if (!cost(10)) { grant.statMoney = 0; } });
    speakArray[13] = new speak('heartbroken', "Your heart has shattered (-Accomplishment)", function () { grant.changeStatus('Heartbroken'); });
    speakArray[14] = new speak('embarrassed', "You feel embarrassed (-Excitement)", function () { grant.changeStatus('Embarrassed'); });
    speakArray[15] = new speak('emasculated', "Your have gotten emasculated (-Excitement, --Accomplishment)", function () { grant.changeStatus('Emasculated'); });
    speakArray[16] = new speak('paranoid', "You feel paranoid (-Energy, -Excitement)", function () { grant.changeStatus('Paranoid'); });
    speakArray[17] = new speak('discontent', "You feel discontent (-Energy, -Excitement, -Accomplishment)", function () { grant.changeStatus('Discontent'); });
    speakArray[17] = new speak('sick', "You feel sick (-Energy, -Hunger)", function () { grant.changeStatus('Sick'); });
    speakArray[18] = new speak('motivated', "You feel motivated (++Energy, +Accomplishment)", function () { grant.changeStatus('Motivated'); });
    speakArray[19] = new speak('dishonored', "You feel dishonored (--Energy, -Accomplishment)", function () { grant.changeStatus('Dishonored'); });
    speakArray[20] = new speak('deadInside', "You are dead inside (--Everything)", function () { grant.changeStatus('Dead Inside'); });

    function speak(name, text, effect) {
        this.name = name;
        this.text = text;
        this.effect = effect;
    }

    var len = speakArray.length;
    while (len--) {
        var speakObj = speakArray[len];
        var mapKey = speakArray[len].name;
        speakMap[mapKey] = speakObj;
    }
} /* END OF objectLoader */

//Number randomizer method
function randomizer(max){
    return Math.floor(Math.random() * max) + 1;
} /* END OF randomizer */

//Play sound method
function play(url) {
    if(sfx){
        new Audio("sound/"+ url + ".mp3").play();
    }
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
    timer = setTimeout(decay, grant.decTime);
} /* END OF decay */

$(window).on('load', function () {
    checkBrowser();
    init();
    var currentArgNum = 0;
    var $md = $("#mainDialog");
    var $ft = $("#footer");
    $("#footer").html(ftrAtHome);
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
        } /* END SWITCH */
    }); /* END ON CLICK MAIN DIALOG */

    $("#footer").on("click", function (e) {
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
                this.statStatus = 'Euphoric';
            }
        } else {
            grant.statAccomplishment -= accPts;
            grant.statExcitement -= 3;
        }
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

        //bookshelf logic
        if (figs > 25) {
            figs = 25;
        } /* END IF */
        //rack logic
        if (hats > 50) {
            hats = 50;
        } /* END IF */
        //cache logic
        if (weps > 15) {
            weps = 15;
        } /* END IF */

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

        var tab2 = '<div id="tab-2" class="fixedSizedTab"><div id="imgArg"><div><img id="argHdr" src="images/misc/sb.png"/></div><div id="argTal">' + argHtml + '</div></div></div>',
            tab3 = '<div id="tab-3" class="fixedSizedTab"><img src="/images/shelf/sh' + figs + '.png"/></div>',
            tab4 = '<div id="tab-4" class="fixedSizedTab"><img src="/images/rack/hr' + hats + '.png"/></div>',
            tab5 = '<div id="tab-5" class="fixedSizedTab"><img src="/images/cache/wc' + weps + '.png"/></div></div></div>',
            statsHtml = statsHtmlTop + tab1 + tab2 + tab3 + tab4 + tab5;

        statsDia(statsHtml);
    } /* END IF */
});