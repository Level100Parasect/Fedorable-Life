window.level1 = [];
window.level2 = [];
window.level3 = [];
window.level4 = [];
window.level5 = [];
window.boothEvents = [];

$(document).ready(function () {
    //on init
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
});