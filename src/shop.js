$(document).ready(function () {
    function item(name, money, effect) {
        this.name = name;
        this.money = money;
        this.effect = effect;
        this.purchase = function () { if (cost(this.money)) { this.effect(); } else { play("pp1"); } };
    }
    var itemMap = {};
    var itemArray = [];

    itemArray[0] = new item("item1", 2, function () { grant.statHunger += 2; grant.statEuphoria += 1; play("cr1"); });
    itemArray[1] = new item("item2", 5, function () { grant.statHunger += 8; play("cr1"); });
    itemArray[2] = new item("item3", 8, function () { grant.statHunger += 15; play("cr1"); });
    itemArray[3] = new item("item4", 2, function () { grant.statEnergy += 2; play("cr1"); });
    itemArray[4] = new item("item5", 6, function () { grant.statEnergy += 10; if (randomizer(3) === 1) { grant.statStatus = 'Tweaked'; } play("cr1"); });
    itemArray[5] = new item("item6", 15, function () { grant.statEnergy += 15; grant.statEuphoria += 3; play("cr1"); });
    itemArray[6] = new item("item7", 5, function () { grant.statExcitement += 3; grant.statAccomplishment += 3; play("cr1"); });
    itemArray[7] = new item("item8", 15, function () { grant.statExcitement += 10; grant.statAccomplishment += 10; play("cr1"); });
    itemArray[8] = new item("item9", 40, function () { grant.statExcitement += 25; grant.statAccomplishment += 25; grant.statEuphoria += 5; play("cr1"); });
    itemArray[9] = new item("item10", 10, function () { grant.statEuphoria += 50; grant.fedsBought++; play("cr1"); });
    itemArray[10] = new item("item11", 20, function () { grant.statEuphoria += 100; grant.figsBought++; play("cr1"); });
    itemArray[11] = new item("item12", 45, function () { grant.statEuphoria += 250; grant.wepsBought++; play("cr1"); });
    itemArray[12] = new item("item13", 250, function () { grant.secretEndingItem1 = true; play("cr1"); });
    itemArray[13] = new item("item14", 500, function () { grant.secretEndingItem2 = true; play("cr1"); });
    itemArray[14] = new item("item15", 1000, function () { grant.secretEndingItem3 = true; play("cr1"); });
    itemArray[15] = new item("item16", 5, function () { grant.socialSkills++; play("cr1"); });
    itemArray[16] = new item("item17", 15, function () { grant.timesDieted++; grant.statEnergy += 3; grant.statEuphoria += 5; play("cr1"); });
    itemArray[17] = new item("item18", 20, function () { grant.resetStatus(); play("cr1"); });

    for(i = 0; i < itemArray.length; i++) {
        var itemObj = itemArray[i];
        var mapKey = itemArray[i].name;
        itemMap[mapKey] = itemObj;
    }

    $("#mainDialog").on("click", "#shopList", function (event) {
        var targetId = event.target.id;
        itemMap[targetId].purchase();
        grant.render();
    });

    cost = function (moneyNeeded) {
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
});