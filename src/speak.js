window.speakObjectGood = [];
window.speakObjectBad = [];

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