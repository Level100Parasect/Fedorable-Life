window.argumentObject = [];
window.speakObjectGood = [];
window.speakObjectBad = [];
window.gymObject = [];
window.questObject = [];
window.level1 = [];
window.level2 = [];
window.level3 = [];
window.level4 = [];
window.level5 = [];
window.boothEvents = [];
window.job1 = [];
window.job2 = [];
window.eat = [];
window.drink = [];
window.booth = [];
window.photo = [];
window.travel = [];
window.game1 = [];
window.game2 = [];

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
    $.ajax({
        type: "GET",
        url: "/xml/gym.xml",
        dataType: "xml",
        success: function (xml) {
            $(xml).find("events").find("workout").each(function (value, key) {
                $(this).each(function (value, key) {
                    var text = $(this).find("text:first").text();
                    var event = [];

                    $(this).find("event").each(function (value, key) {
                        var choice = $(this).find("choice").text();
                        var energy = $(this).find("energy").text();
                        var weight = $(this).find("weight").text();
                        var accomplish = $(this).find("accomplish").text();
                        var chance = $(this).find("chance").text();
                        var success = $(this).find("success").text();
                        var fail = $(this).find("fail").text();

                        event.push({
                            "choice": choice,
                            "energy": parseInt(energy),
                            "weight": parseFloat(weight),
                            "accomplish": parseInt(accomplish),
                            "chance": parseInt(chance),
                            "success": success,
							"fail": fail
                        });
                    });

                    gymObject.push({
                        "text": text,
                        "event": event
                    });
                });
            });
        }
    });
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
    $.ajax({
        type: "GET",
        url: "/xml/event.xml",
        dataType: "xml",
        success: function (xml) {
            $(xml).find("booth").find("event").each(function (value, key) {
                $(this).each(function (value, key) {
                    var text = $(this).find("text").text();

                    boothEvents.push({
                        "text": text
                    });
                });
            });

            $(xml).find("events").find("level1").find("event").each(function (value, key) {
                $(this).each(function (value, key) {
                    var title = $(this).find("title").text();
                    var text = $(this).find("text").text();
                    var effect = $(this).find("effect").text();

                    level1.push({
                        "title": title,
                        "text": text,
                        "effect": effect
                    });
                });
            });

            $(xml).find("events").find("level2").find("event").each(function (value, key) {
                $(this).each(function (value, key) {
                    var title = $(this).find("title").text();
                    var text = $(this).find("text").text();
                    var effect = $(this).find("effect").text();

                    level2.push({
                        "title": title,
                        "text": text,
                        "effect": effect
                    });
                });
            })
            
            $(xml).find("events").find("level3").find("event").each(function (value, key) {
                $(this).each(function (value, key) {
                    var title = $(this).find("title").text();
                    var text = $(this).find("text").text();
                    var effect = $(this).find("effect").text();

                    level3.push({
                        "title": title,
                        "text": text,
                        "effect": effect
                    });
                });
            })
            $(xml).find("events").find("level4").find("event").each(function (value, key) {
                $(this).each(function (value, key) {
                    var title = $(this).find("title").text();
                    var text = $(this).find("text").text();
                    var effect = $(this).find("effect").text();

                    level4.push({
                        "title": title,
                        "text": text,
                        "effect": effect
                    });
                });
            })
            $(xml).find("events").find("level5").find("event").each(function (value, key) {
                $(this).each(function (value, key) {
                    var title = $(this).find("title").text();
                    var text = $(this).find("text").text();
                    var effect = $(this).find("effect").text();

                    level5.push({
                        "title": title,
                        "text": text,
                        "effect": effect
                    });
                });
            });
        }
    });
    $.ajax({
        type: "GET",
        url: "/xml/random.xml",
        dataType: "xml",
        success: function (xml) {
            $(xml).find("job1").find("event").each(function (value, key) {
                $(this).each(function (value, key) {
                    var title = $(this).find("title").text();
                    var text = $(this).find("text").text();
                    var effect = $(this).find("effect").text();

                    job1.push({
                        "title": title,
                        "text": text,
                        "effect": effect
                    });
                });
            });
            $(xml).find("job2").find("event").each(function (value, key) {
                $(this).each(function (value, key) {
                    var title = $(this).find("title").text();
                    var text = $(this).find("text").text();
                    var effect = $(this).find("effect").text();

                    job2.push({
                        "title": title,
                        "text": text,
                        "effect": effect
                    });
                });
            });
            $(xml).find("eat").find("event").each(function (value, key) {
                $(this).each(function (value, key) {
                    var title = $(this).find("title").text();
                    var text = $(this).find("text").text();
                    var effect = $(this).find("effect").text();

                    eat.push({
                        "title": title,
                        "text": text,
                        "effect": effect
                    });
                });
            });
            $(xml).find("drink").find("event").each(function (value, key) {
                $(this).each(function (value, key) {
                    var title = $(this).find("title").text();
                    var text = $(this).find("text").text();
                    var effect = $(this).find("effect").text();

                    drink.push({
                        "title": title,
                        "text": text,
                        "effect": effect
                    });
                });
            });
            $(xml).find("booth").find("event").each(function (value, key) {
                $(this).each(function (value, key) {
                    var title = $(this).find("title").text();
                    var text = $(this).find("text").text();
                    var effect = $(this).find("effect").text();

                    booth.push({
                        "title": title,
                        "text": text,
                        "effect": effect
                    });
                });
            });
            $(xml).find("photo").find("event").each(function (value, key) {
                $(this).each(function (value, key) {
                    var title = $(this).find("title").text();
                    var text = $(this).find("text").text();
                    var effect = $(this).find("effect").text();

                    photo.push({
                        "title": title,
                        "text": text,
                        "effect": effect
                    });
                });
            });
            $(xml).find("travel").find("event").each(function (value, key) {
                $(this).each(function (value, key) {
                    var title = $(this).find("title").text();
                    var text = $(this).find("text").text();
                    var effect = $(this).find("effect").text();

                    travel.push({
                        "title": title,
                        "text": text,
                        "effect": effect
                    });
                });
            });
            $(xml).find("game1").find("event").each(function (value, key) {
                $(this).each(function (value, key) {
                    var title = $(this).find("title").text();
                    var text = $(this).find("text").text();
                    var effect = $(this).find("effect").text();

                    game1.push({
                        "title": title,
                        "text": text,
                        "effect": effect
                    });
                });
            });
            $(xml).find("game2").find("event").each(function (value, key) {
                $(this).each(function (value, key) {
                    var title = $(this).find("title").text();
                    var text = $(this).find("text").text();
                    var effect = $(this).find("effect").text();

                    game2.push({
                        "title": title,
                        "text": text,
                        "effect": effect
                    });
                });
            });
        }
    });
});