//all actions on click, convention
var conventionMap = {};
var conventionArray = [];
conventionArray[0] = new convention('ps1', "+5 Excitement<br/>+1 Picture Taken", function () { grant.statExcitement += 5; grant.picsTaken++;
grant.render(); });
//statusMap['Tweaked'].effect();
//alert(statusMap['Tweaked'].changeHtml());

for(i = 0; i < conventionArray.length; i++) {
    var conventionObj = conventionArray[i];
    var mapKey = conventionArray[i].name;
    conventionMap[mapKey] = conventionObj;
}

//convention
function convention(name, text, effect) {
    this.name = name;
    this.text = text;
    this.effect = effect;
}

//actions on click
function action(name, effect) {
    this.name = name;
    this.effect = effect;
}