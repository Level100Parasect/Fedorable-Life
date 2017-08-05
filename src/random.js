window.job1 = [];
window.job2 = [];
window.eat = [];
window.drink = [];
window.booth = [];
window.photo = [];

$(document).ready(function () {
    //on init
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
        }
    });
});
