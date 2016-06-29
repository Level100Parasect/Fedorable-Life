$(document).ready(function () {
    $("#mainDialog").on("click", "#shopList", function (event) {
        var targetId = event.target.id;
        switch (targetId) {
            case 'item1':
                if (cost(2)) { grant.statHunger += 2; grant.statEuphoria += 1; play("cr1"); }
                break;
            case 'item2':
                if (cost(5)) { grant.statHunger += 8; play("cr1"); }
                break;
            case 'item3':
                if (cost(8)) { grant.statHunger += 15; play("cr1"); }
                break;
            case 'item4':
                if (cost(2)) { grant.statEnergy += 2; play("cr1"); }
                break;
            case 'item5':
                if (cost(6)) { grant.statEnergy += 10; if (randomizer(3) === 1) { grant.statStatus = 'Tweaked'; } play("cr1"); }
                break;
            case 'item6':
                if (cost(15)) { grant.statEnergy += 15; grant.statEuphoria += 3; play("cr1"); }
                break;
            case 'item7':
                if (cost(5)) { grant.statExcitement += 3; grant.statAccomplishment += 3; play("cr1"); }
                break;
            case 'item8':
                if (cost(15)) { grant.statExcitement += 10; grant.statAccomplishment += 10; play("cr1"); }
                break;
            case 'item9':
                if (cost(40)) { grant.statExcitement += 25; grant.statAccomplishment += 25; grant.statEuphoria += 5; play("cr1"); }
                break;
            case 'item10':
                if (cost(10)) { grant.statEuphoria += 50; grant.fedsBought++; play("cr1"); }
                break;
            case 'item11':
                if (cost(20)) { grant.statEuphoria += 100; grant.figsBought++; play("cr1"); }
                break;
            case 'item12':
                if (cost(45)) { grant.statEuphoria += 250; grant.wepsBought++; play("cr1"); }
                break;
            case 'item13':
                if (cost(250)) { grant.secretEndingItem1 = true; play("cr1"); }
                break;
            case 'item14':
                if (cost(500)) { grant.secretEndingItem2 = true; play("cr1"); }
                break;
            case 'item15':
                if (cost(1000)) { grant.secretEndingItem3 = true; play("cr1"); }
                break;
            case 'item16':
                if (cost(5)) { grant.socialSkills++; play("cr1"); }
                break;
            case 'item17':
                if (cost(15)) { grant.timesDieted++; grant.statEnergy += 3; grant.statEuphoria += 5; play("cr1"); }
                break;
            case 'item18':
                if (cost(20)) { resetStatus(); play("cr1"); }
                break;
        }
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
        }
        else {
            grant.statMoney -= moneyNeeded;
            grant.moneySpent += moneyNeeded;
            proceed = true;
        }
        return proceed;
    }
});