window.questObject = [];

$(document).ready(function () {
    //on init
    $.ajax({
        type: "GET",
        url: "/xml/quests.xml",
        dataType: "xml",
        success: function (xml) {
            $(xml).find("events").find("quest").each(function (value, key) {
                $(this).each(function (value, key) {
                    var text = $(this).find("text:first").text();
                    var complete = $(this).find("complete").text();
                    var steps = [];

                    $(this).find("step").each(function (value, key) {
                        var choice1 = $(this).find("choice1");
                        var choice2 = $(this).find("choice2");

                        var stepText = $(this).find("text:first").text();
                        var choice1Text = $(choice1).find("text:first").text();
                        var choice1Resp = $(choice1).find("response").text();
                        var choice1Effect = $(choice1).find("effect").text();
                        var choice2Text = $(choice2).find("text:first").text();
                        var choice2Resp = $(choice2).find("response").text();
                        var choice2Effect = $(choice2).find("effect").text();

                        steps.push({
                            "stepText": stepText,
                            "choice1Text": choice1Text,
                            "choice1Resp": choice1Resp,
                            "choice1Effect": choice1Effect,
                            "choice2Text": choice2Text,
                            "choice2Resp": choice2Resp,
                            "choice2Effect": choice2Effect
                        });
                    });

                    questObject.push({
                        "text": text,
                        "complete": complete,
                        "steps": steps
                    });
                });
            });
        }
    });
});