//all actions on click, convention, speak events
var conventionMap = {};
var conventionArray = [];
conventionArray[0] = new convention('ps1', "+5 Excitement<br/>+1 Picture Taken", function () { grant.statExcitement += 5; grant.picsTaken++;
grant.render(); });
//statusMap['Tweaked'].effect();
//alert(statusMap['Tweaked'].changeHtml());

for(i = 0; i < statusArray.length; i++) {
    var conventionObj = conventionArray[i];
    var mapKey = conventionArray[i].name;
    conventionMap[mapKey] = conventionObj;
}

//actions on click
function action(name, effect) {
    this.name = name;
    this.effect = effect;
}

//convention
function convention(name, text, effect) {
    this.name = name;
    this.text = text;
    this.effect = effect;
}

//speak
var speakMap = {};
var speakArray = [];
speakArray[0] = new speak('excitementUp', "<br/><br/>You have recovered 10 excitement", function () { grant.statExcitement += 10; });
speakArray[1] = new speak('hungerUp', "<br/><br/>You have recovered 10 excitement", function () { grant.statHunger += 10; });
speakArray[2] = new speak('soaUp', "<br/><br/>You have recovered 10 accomplishment", function () { grant.statAccomplishment += 10; });
speakArray[3] = new speak('energyUp', "<br/><br/>You have recovered 10 energy", function () { grant.statEnergy += 10; });
speakArray[4] = new speak('moneyUp', "<br/><br/>You have gained $10", function () { grant.paid(10); });
speakArray[5] = new speak('inLove', "<br/><br/>You have fallen in love (++Accomplishment)", function () { grant.changeStatus('In Love'); });
speakArray[6] = new speak('content', "<br/><br/>You are now content (+Energy, +Excitement, +Accomplishment)", function () { grant.changeStatus('Content'); });
speakArray[7] = new speak('confident', "<br/><br/>You are feeling confident (+Excitement, ++Accomplishment)", function () { grant.changeStatus('Confident'); });
speakArray[8] = new speak('hatPlus', "<br/><br/>You got a new fedora for your collection", function () { grant.fedsBought++; });
speakArray[9] = new speak('photoUp', "<br/><br/>You took a new photo", function () { grant.picsTaken++; });
speakArray[10] = new speak('soaDown', "<br/><br/>You have lost 10 sense of accomplishment", function () { grant.statAccomplishment -= 10; });
speakArray[11] = new speak('excitementDown', "<br/><br/>You have lost 10 excitement", function () { grant.statExcitement -= 10; });
speakArray[12] = new speak('moneyDown', "<br/><br/>You have lost $10", function () { if (!cost(10)) { grant.statMoney = 0; } });
speakArray[13] = new speak('heartbroken', "<br/><br/>Your heart has shattered (-Accomplishment)", function () { grant.changeStatus('Heartbroken'); });
speakArray[14] = new speak('embarrassed', "<br/><br/>You feel embarrassed (-Excitement)", function () { grant.changeStatus('Embarrassed'); });
speakArray[15] = new speak('emasculated', "<br/><br/>Your have gotten emasculated (-Excitement, --Accomplishment)", function () { grant.changeStatus('Emasculated'); });
speakArray[16] = new speak('paranoid', "<br/><br/>You feel paranoid (-Energy, -Excitement)", function () { grant.changeStatus('Paranoid'); });
speakArray[17] = new speak('discontent', "<br/><br/>You feel discontent (-Energy, -Excitement, -Accomplishment)", function () { grant.changeStatus('Discontent'); });
speakArray[17] = new speak('sick', "<br/><br/>You feel sick (-Energy, -Hunger)", function () { grant.changeStatus('Sick'); });

function speak(name, text, effect) {
    this.name = name;
    this.text = text;
    this.effect = effect;
}

for(i = 0; i < speakArray.length; i++) {
    var speakObj = speakArray[i];
    var mapKey = speakArray[i].name;
    speakMap[mapKey] = speakObj;
}