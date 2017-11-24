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
    window.nodeStartScreen = '<div id="startScreen"><p><a id="pn" href="https://fedorablelife.wordpress.com/" target="_blank">Version 0.6</a><a id="fbButton" href="https://www.facebook.com/FedorableLife/" target="_blank"></a><a id="twButton" href="https://twitter.com/NickBeardman" target="_blank"></a><a id="gpButton" href="https://plus.google.com/u/0/b/117720636938381447783/117720636938381447783/posts/p/pub" target="_blank"></a></p><img src="/images/Logo.png"/><div><button class="newGameBtn" id="mmNewGame"></button><button class="continueGameBtn" id="mmCont"></button><button class="creditsBtn" id="credits"></button></div></div>';
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

    $("#quest").dialog({
        autoOpen: false,
        modal: true,
        width: 850,
        height: 'auto',
        resizable: false,
        closeOnEscape: false,
        show: 'fadeIn',
        hide: 'fadeOut'
    });

    $("#gymDialog").dialog({
        autoOpen: false,
        modal: true,
        width: 640,
        height: 'auto',
        resizable: false,
        closeOnEscape: false,
        show: 'fadeIn',
        hide: 'fadeOut'
    });

    $("#tDialog").dialog({
        autoOpen: false,
        modal: true,
        width: 640,
        height: 'auto',
        resizable: false,
        closeOnEscape: false,
        show: 'fadeIn',
        hide: 'fadeOut'
    });

    $("#alertDialog").dialog({
        autoOpen: false,
        modal: true,
        width: 640,
        height: 'auto',
        resizable: false,
        closeOnEscape: false,
        show: 'fadeIn',
        hide: 'fadeOut',
        dialogClass: 'leaveDia'
    });

    $(".ui-dialog-titlebar").hide();
});

function startScreen() {
    $(dlog).dialog({ height: h, width: w, dialogClass: 'startScreen' }).html(nodeStartScreen);
    dlog.dialog("open");
};

function endGame(node) {
    $(dlog).dialog({ height: 390, width: 650, dialogClass: 'startScreen' }).html(node);
    dlog.dialog("open");
};

function shopScreen(node) {
    $(dlog).dialog({ height: 480, width: 640, dialogClass: 'shopList' }).html(node);
    dlog.dialog("open");
};

function tutorialDia(node) {
    $(dlog).dialog({ height: 400, width: 650, dialogClass: 'startScreen' }).html(node);
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

function jukeboxDia(node){
    $(dlog).dialog({ height: 'auto', width: 640, dialogClass: 'jukeboxDia' }).html(node);
    dlog.dialog("open");
}

function statsDia(node){
    $(dlog).dialog({ height: 520, width: 650, dialogClass: 'startScreen' }).html(node);
    dlog.dialog("open");
    $("#tabs").tabs({ active: 'tab-1' });
}

function exitDia(node){
    $(dlog).dialog({ height: 'auto', width: 650, dialogClass: 'leaveDia' }).html(node);
    dlog.dialog("open");
}