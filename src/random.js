window.job1 = [];
window.job2 = [];
window.eat = [];
window.drink = [];
window.booth = [];
window.photo = [];
window.travel = [];
window.game1 = [];
window.game2 = [];
//on init
$(document).ready(function () {
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
