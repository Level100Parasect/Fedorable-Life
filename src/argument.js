window.argumentObject = [];

readyArgument = function () {
    var argNum = (Math.floor(Math.random() * argumentObject.length));
    var curClass = $("#logo").attr("class");
    var argClass = $("#argument").attr("class");
    var webClass = $("#webHeader").attr("class");

    $("#argEvent").text(argumentObject[argNum].text);
    $("#argTop").find("#r1").text(argumentObject[argNum].choiceA);
    $("#argTop").find("#r2").text(argumentObject[argNum].choiceB);
    $("#argument").find("#" + argumentObject[argNum].answer).addClass("correct");
    $("#logo").removeClass(curClass).addClass(argumentObject[argNum].logo);
    $("#argument").removeClass(argClass).addClass(argumentObject[argNum].backgroundColor);
    $("#webHeader").removeClass(webClass).addClass(argumentObject[argNum].headerColor);

    return argNum;
}

loadResponse = function (argNum, isCorrect) {
    if (isCorrect) {
        grant.argsWon += 1;
        var text = argumentObject[argNum].responseCorrect;
        var points = "YOU GAINED " + argumentObject[argNum].accomplish + " SENSE OF ACCOMPLISHMENT";
        $("#argResponse").text(text);
        $("#argResponseScore").text(points);
    }
    else {
        var text = argumentObject[argNum].responseWrong;
        var points = "YOU LOST " + argumentObject[argNum].accomplish + " SENSE OF ACCOMPLISHMENT";
        $("#argResponse").text(text);
        $("#argResponseScore").text(points);
    }
}

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/xml/argument.xml",
        dataType: "xml",
        success: function (xml) {
            //on init
            $(xml).find("argument").each(function (value, key) {
                text = $(this).find("text").text();
                choiceA = $(this).find("choiceA").text();
                choiceB = $(this).find("choiceB").text();
                answer = $(this).find("answer").text();
                responseCorrect = $(this).find("responseCorrect").text();
                responseWrong = $(this).find("responseWrong").text();
                accomplish = $(this).find("accomplish").text();
                backgroundColor = $(this).find("backgroundColor").text();
                headerColor = $(this).find("headerColor").text();
                logo = $(this).find("logo").text();

                argumentObject.push({
                    "text": text,
                    "choiceA": choiceA,
                    "choiceB": choiceB,
                    "answer": answer,
                    "responseCorrect": responseCorrect,
                    "responseWrong": responseWrong,
                    "accomplish": accomplish,
                    "backgroundColor": backgroundColor,
                    "headerColor": headerColor,
                    "logo": logo
                });
            });
        }
    });
});