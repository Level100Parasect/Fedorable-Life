window.gymObject = [];

$(document).ready(function () {
    //on init
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
                        var additional = $(this).find("additional").text();
                        var chance = $(this).find("chance").text();
                        var success = $(this).find("success").text();
                        var fail = $(this).find("fail").text();

                        event.push({
                            "choice": choice,
                            "energy": parseInt(energy),
                            "weight": parseFloat(weight),
                            "accomplish": parseInt(accomplish),
                            "additional": additional,
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
});
