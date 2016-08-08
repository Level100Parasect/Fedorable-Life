window.speakObjectGood = [];
window.speakObjectBad = [];

speakEffect = function (effect) {
    var text = '';
    switch (effect) {
        case 'excitementUp':
            grant.statExcitement += 10;
            text = "<br/><br/>You have recovered 10 excitement";
            break;
        case 'hungerUp':
            grant.statHunger += 10;
            text = "<br/><br/>You have recovered 10 hunger";
            break;
        case 'soaUp':
            grant.statAccomplishment += 10;
            text = "<br/><br/>You have recovered 10 accomplishment";
            break;
        case 'energyUp':
            grant.statEnergy += 10;
            text = "<br/><br/>You have recovered 10 energy";
            break;
        case 'moneyUp':
            grant.paid(10);
            text = "<br/><br/>You have gained $10";
            break;
        case 'inLove':
            grant.changeStatus('In Love');
            text = "<br/><br/>You have fallen in love (++Accomplishment)";
            break;
        case 'content':
            grant.changeStatus('Content');
            text = "<br/><br/>You are now content (+Energy, +Excitement, +Accomplishment)";
            break;
        case 'confident':
            grant.changeStatus('Confident');
            text = "<br/><br/>You are feeling confident (+Excitement, ++Accomplishment)";
            break;
        case 'hatPlus':
            grant.fedsBought++;
            text = "<br/><br/>You got a new fedora for your collection";
            break;
        case 'photoUp':
            grant.picsTaken++;
            text = "<br/><br/>You took a new photo";
            break;
        case 'soaDown':
            grant.statAccomplishment -= 10;
            text = "<br/><br/>You have lost 10 sense of accomplishment";
            break;
        case 'excitementDown':
            grant.statExcitement -= 10;
            text = "<br/><br/>You have lost 10 excitement";
            break;
        case 'moneyDown':
            if (!cost(10)) { grant.statMoney = 0; }
            text = "<br/><br/>You have lost $10";
            break;
        case 'heartbroken':
            grant.changeStatus('Heartbroken');
            text = "<br/><br/>Your heart has shattered (-Accomplishment)";
            break;
        case 'embarrassed':
            grant.changeStatus('Embarrassed');
            text = "<br/><br/>You feel embarrassed (-Excitement)";
            break;
        case 'emasculated':
            grant.changeStatus('Emasculated');
            text = "<br/><br/>Your have gotten emasculated (-Excitement, --Accomplishment)";
            break;
        case 'paranoid':
            grant.changeStatus('Paranoid');
            text = "<br/><br/>You feel paranoid (-Energy, -Excitement)";
            break;
        case 'discontent':
            grant.changeStatus('Discontent');
            text = "<br/><br/>You feel discontent (-Energy, -Excitement, -Accomplishment)";
            break;
        case 'sick':
            grant.changeStatus('Sick');
            text = "<br/><br/>You feel discontent (-Energy, -Hunger)";
            break;
        default:
            break;
    }
    grant.render();
    return text;
};

$(document).ready(function () {
    //on init
    $.ajax({
        type: "GET",
        url: "/xml/speak.xml",
        dataType: "xml",
        success: function (xml) {
            $(xml).find("good").find("event").each(function (value, key) {
                $(this).each(function (value, key) {
                    var text = $(this).find("text").text();
                    var effect = $(this).find("effect").text();

                    speakObjectGood.push({
                        "text": text,
                        "effect": effect
                    });
                });
            });

            $(xml).find("bad").find("event").each(function (value, key) {
                $(this).each(function (value, key) {
                    var text = $(this).find("text").text();
                    var effect = $(this).find("effect").text();

                    speakObjectBad.push({
                        "text": text,
                        "effect": effect
                    });
                });
            });
        }
    });
});