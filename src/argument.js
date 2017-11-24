window.argumentObject = [];

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
        }
    });
});