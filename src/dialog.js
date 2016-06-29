$(document).ready(function () {
    //on init
    window.w = $(window).width();
    window.h = $(window).height() + 45;

    window.dlog = $("#mainDialog").dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        closeOnEscape: false,
        show: 'fadeIn',
        hide: 'fadeOut',
        fluid: true
    });
    $(dlog).closest("div.ui-dialog").removeClass('ui-widget-content');
    $(dlog).parent().css("border", "2px solid #ecf0f1");
    startScreen();

    h -= 31;
    $("#argument").dialog({
        autoOpen: false,
        modal: true,
        width: 850,
        height: 'auto',
        resizable: false,
        closeOnEscape: false,
        show: 'fadeIn',
        hide: 'fadeOut'
    });
    $(".ui-dialog-titlebar").hide();
});

function startScreen() {
    $(dlog).dialog({ height: h, width: w, dialogClass: 'startScreen' }).html(nodeStartScreen);
    dlog.dialog("open");
};

function endGame(node) {
    $(dlog).dialog({ height: 380, width: 650, dialogClass: 'startScreen' }).html(node);
    dlog.dialog("open");
};

function shopScreen(node) {
    $(dlog).dialog({ height: 480, width: 640, dialogClass: 'shopList' }).html(node);
    dlog.dialog("open");
};

function genericDia(node) {
    $(dlog).dialog({ height: 'auto', width: 650, dialogClass: 'startScreen' }).html(node);
    dlog.dialog("open");
};

function gameEvent(node){
    $(dlog).dialog({ height: 'auto', width: 675, dialogClass: 'gameEvent' }).html(node);
    dlog.dialog("open");
}

function travelDia(node){
    $(dlog).dialog({ height: 'auto', width: 640, dialogClass: 'travelDia' }).html(node);
    dlog.dialog("open");
}

function statsDia(node){
    $(dlog).dialog({ height: 520, width: 650, dialogClass: 'startScreen' }).html(node);
    dlog.dialog("open");
    $("#tabs").tabs({ active: 'tab-1' });
}

function exitDia(node){
    $(dlog).dialog({ height: 'auto', width: 650, dialogClass: 'leaveGameDialog' }).html(node);
    dlog.dialog("open");
}