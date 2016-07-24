//all actions on click(?), convention events
function status(name, style, timer, tooltip, effect) {
    this.name = name;
    this.style = style;
    this.timer = timer;
    this.tooltip = tooltip;
    this.effect = effect;
    this.changeHtml = function () { $("#status").prop('title', this.tooltip).css('color', this.style); }
}

var statusArray = [];
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
 
//statusMap['Tweaked'].effect();
//alert(statusMap['Tweaked'].changeHtml());

for(i = 0; i < statusArray.length; i++) {
    var statusObj = statusArray[i];
    var mapKey = statusArray[i].name;
    statusMap[mapKey] = statusObj;
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