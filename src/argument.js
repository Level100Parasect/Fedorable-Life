window.argumentObject = [];

readyArgument = function () {
    var argNum = (Math.floor(Math.random() * argumentObject.length)),
        curClass = $("#logo").attr("class"),
        argClass = $("#argument").attr("class"),
        webClass = $("#webHeader").attr("class"),
        arg = argumentObject[argNum];

    $("#argEvent").text(arg.text);
    $("#argTop").find("#r1").text(arg.choiceA);
    $("#argTop").find("#r2").text(arg.choiceB);
    $("#argument").find("#" + arg.answer).addClass("correct");
    $("#logo").removeClass(curClass).addClass(arg.logo);
    $("#argument").removeClass(argClass).addClass(arg.backgroundColor);
    $("#webHeader").removeClass(webClass).addClass(arg.headerColor);

    return argNum;
}

loadResponse = function (argNum, isCorrect, accPts) {
    if (isCorrect) {
        grant.argsWon += 1;
        $("#argResponse").text(argumentObject[argNum].responseCorrect);
        $("#argResponseScore").text("YOU GAINED " + accPts + " SENSE OF ACCOMPLISHMENT");
    } else {
        $("#argResponse").text(argumentObject[argNum].responseWrong);
        $("#argResponseScore").text("YOU LOST " + accPts + " SENSE OF ACCOMPLISHMENT");
    }
}

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/xml/argument.xml",
        dataType: "xml",
        success: function (xml) {
            //on init
            $(xml).find("arguments").each(function (value, key) {
                backgroundColor = $(this).find("backgroundColor").text();
                headerColor = $(this).find("headerColor").text();
                logo = $(this).find("logo").text();

                $(key).find("argument").each(function (v, k) {
                    text = $(this).find("text").text();
                    choiceA = $(this).find("choiceA").text();
                    choiceB = $(this).find("choiceB").text();
                    answer = $(this).find("answer").text();
                    responseCorrect = $(this).find("responseCorrect").text();
                    responseWrong = $(this).find("responseWrong").text();
                    hint = $(this).find("hint").text();
                    accomplish = $(this).find("accomplish").text();

                    argumentObject.push({
                        "text": text,
                        "choiceA": choiceA,
                        "choiceB": choiceB,
                        "answer": answer,
                        "responseCorrect": responseCorrect,
                        "responseWrong": responseWrong,
                        "hint": hint,
                        "accomplish": parseInt(accomplish),
                        "backgroundColor": backgroundColor,
                        "headerColor": headerColor,
                        "logo": logo
                    });
                });
            });
            console.log(argumentObject);
        }
    });
});