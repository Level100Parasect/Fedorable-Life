window.level1 = [];
window.level2 = [];
window.level3 = [];
window.level4 = [];
window.level5 = [];
window.boothEvents = [];
//future update - randomize stat increase:
//ps, fg, qa, mc, ak, rv, cs, gd, ms, ic, do, hc, gn, qs, om, lb, tc, pe, tt, da, bm, at, li, za, sd

eventEffect = function (effect) {
    var text = '';
    grant.statEnergy -= 25;
    switch (effect) {
        case 'ps1':
            grant.statExcitement += 5;
            grant.picsTaken++;
            grant.render();
            text = '+5 Excitement<br/>+1 Picture Taken';
            break;
        case 'ps2':
            grant.statExcitement += 10;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.picsTaken += 2;
            grant.render();
            text = '+10 Excitement<br/>+1 Social Skill<br/>+2 Pictures Taken';
            break;
        case 'ps3':
            grant.statExcitement += 15;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.picsTaken += 3;
            grant.render();
            text = '+15 Excitement<br/>+3 Social Skill<br/>+3 Pictures Taken';
            break;
        case 'ps4':
            grant.statExcitement += 20;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.picsTaken += 4;
            grant.render();
            text = '+20 Excitement<br/>+3 Social Skill<br/>+4 Pictures Taken';
            break;
        case 'ps5':
            grant.statExcitement += 25;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.picsTaken += 5;
            grant.render();
            text = '+25 Excitement<br/>+3 Social Skill<br/>+1 Picture Taken';
            break;
        case 'fg1':
            grant.statEuphoria += 5;
            grant.figsBought++;
            grant.render();
            text = '+5 Euphoria<br/>+1 Figurine';
            break;
        case 'fg2':
            grant.statEuphoria += 10;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.figsBought++;
            grant.render();
            text = '+10 Euphoria<br/>+1 Social Skill<br/>+1 Figurine';
            break;
        case 'fg3':
            grant.statEuphoria += 25;
            grant.timesSocialized += 2;
            grant.socialSkills += 2;
            grant.figsBought++;
            grant.render();
            text = '+25 Euphoria<br/>+2 Social Skill<br/>+1 Figurine';
            break;
        case 'fg4':
            grant.statEuphoria += 50;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.figsBought += 2;
            grant.render();
            text = '+50 Euphoria<br/>+3 Social Skill<br/>+2 Figurines';
            break;
        case 'fg5':
            grant.statEuphoria += 100;
            grant.timesSocialized += 5;
            grant.socialSkills += 5;
            grant.figsBought += 3;
            grant.render();
            text = '+100 Euphoria<br/>+5 Social Skill<br/>+3 Figurines';
            break;
        case 'qa1':
            grant.statExcitement += 5;
            grant.statEuphoria += 5;
            grant.render();
            text = '+5 Excitement<br/>+5 Euphoria';
            break;
        case 'qa2':
            grant.statExcitement += 10;
            grant.statEuphoria += 10;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+10 Excitement<br/>+10 Euphoria<br/>+1 Social Skill';
            break;
        case 'qa3':
            grant.statExcitement += 15;
            grant.statEuphoria += 25;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.render();
            text = '+15 Excitement<br/>+25 Euphoria<br/>+3 Social Skill';
            break;
        case 'qa4':
            grant.statExcitement += 20;
            grant.statAccomplishment += 5;
            grant.statEuphoria += 50;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.render();
            text = '+20 Excitement<br/>+5 Accomplishment<br/>+50 Euphoria<br/>+3 Social Skill';
            break;
        case 'qa5':
            grant.statExcitement += 25;
            grant.statAccomplishment += 10;
            grant.statEuphoria += 100;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.render();
            text = '+25 Excitement<br/>+10 Accomplishment<br/>+100 Euphoria<br/>+3 Social Skill';
            break;
        case 'mc1':
            grant.statExcitement += 5;
            grant.statStatus = 'Tweaked';
            grant.render();
            text = '+5 Excitement<br/>+Tweaked(+Energy)';
            break;
        case 'mc2':
            grant.statExcitement += 10;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.statStatus = 'Tweaked';
            grant.render();
            text = '+10 Excitement<br/>+1 Social Skill<br/>+Tweaked(+Energy)';
            break;
        case 'mc3':
            grant.statExcitement += 15;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.statStatus = 'Tweaked';
            grant.render();
            text = '+15 Excitement<br/>+3 Social Skill<br/>+Tweaked(+Energy)';
            break;
        case 'mc4':
            grant.statExcitement += 20;
            grant.timesSocialized += 4;
            grant.socialSkills += 4;
            grant.statStatus = 'Tweaked';
            grant.render();
            text = '+20 Excitement<br/>+3 Social Skill<br/>+Tweaked(+Energy)';
            break;
        case 'mc5':
            grant.statExcitement += 25;
            grant.timesSocialized += 5;
            grant.socialSkills += 5;
            grant.statStatus = 'Tweaked';
            grant.render();
            text = '+25 Excitement<br/>+3 Social Skill<br/>+Tweaked(+Energy)';
            break;
        case 'ak1':
            grant.statExcitement += 10;
            grant.render();
            text = '+10 Excitement';
            break;
        case 'ak2':
            grant.statExcitement += 15;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+15 Excitement<br/>+1 Social Skill';
            break;
        case 'ak3':
            grant.statExcitement += 20;
            grant.statAccomplishment += 5;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.statStatus = 'Content';
            grant.render();
            text = '+20 Excitement<br/>+5 Accomplishment<br/>+1 Social Skill<br/>+Content(+Energy, +Excitement, +Accomplishment)';
            break;
        case 'ak4':
            grant.statExcitement += 25;
            grant.statAccomplishment += 10;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.statStatus = 'Content';
            grant.render();
            text = '+25 Excitement<br/>+10 Accomplishment<br/>+1 Social Skill<br/>+Content(+Energy, +Excitement, +Accomplishment)';
            break;
        case 'ak5':
            grant.statExcitement += 30;
            grant.statAccomplishment += 15;
            grant.timesSocialized += 2;
            grant.socialSkills += 2;
            grant.statStatus = 'Confident';
            grant.render();
            text = '+30 Excitement<br/>+15 Accomplishment<br/>+2 Social Skill<br/>+Confident(+Excitement, ++Accomplishment)';
            break;
        case 'rv1':
            grant.statExcitement += 10;
            grant.render();
            text = '+10 Excitement';
            break;
        case 'rv2':
            grant.statExcitement += 20;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+20 Excitement<br/>+1 Social Skill';
            break;
        case 'rv3':
            grant.statExcitement += 30;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.render();
            text = '+30 Excitement<br/>+3 Social Skill';
            break;
        case 'rv4':
            grant.statExcitement += 40;
            grant.timesSocialized += 4;
            grant.socialSkills += 4;
            grant.render();
            text = '+40 Excitement<br/>+4 Social Skill';
            break;
        case 'rv5':
            grant.statExcitement += 50;
            grant.timesSocialized += 5;
            grant.socialSkills += 5;
            grant.render();
            text = '+50 Excitement<br/>+5 Social Skill';
            break;
        case 'cs1':
            grant.statExcitement += 5;
            grant.statEuphoria += 5;
            grant.render();
            text = '+5 Excitement<br/>+5 Euphoria';
            break;
        case 'cs2':
            grant.statExcitement += 10;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.statEuphoria += 10;
            grant.render();
            text = '+10 Excitement<br/>+10 Euphoria<br/>+1 Social Skill';
            break;
        case 'cs3':
            grant.statExcitement += 15;
            grant.statAccomplishment += 5;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.statEuphoria += 25;
            grant.render();
            text = '+15 Excitement<br/>+5 Accomplishment<br/>+25 Euphoria<br/>+1 Social Skill';
            break;
        case 'cs4':
            grant.statExcitement += 20;
            grant.statAccomplishment += 10;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.statEuphoria += 50;
            grant.render();
            text = '+20 Excitement<br/>+10 Accomplishment<br/>+50 Euphoria<br/>+1 Social Skill';
            break;
        case 'cs5':
            grant.statExcitement += 25;
            grant.statAccomplishment += 15;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.statEuphoria += 100;
            grant.render();
            text = '+25 Excitement<br/>+15 Accomplishment<br/>+100 Euphoria<br/>+1 Social Skill';
            break;
        case 'gd1':
            grant.statExcitement += 10;
            grant.render();
            text = '+10 Excitement';
            break;
        case 'gd2':
            grant.statExcitement += 20;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+15 Excitement<br/>+1 Social Skill';
            break;
        case 'gd3':
            grant.statExcitement += 30;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.render();
            text = '+20 Excitement<br/>+3 Social Skill';
            break;
        case 'gd4':
            grant.statExcitement += 40;
            grant.timesSocialized += 5;
            grant.socialSkills += 5;
            grant.render();
            text = '+25 Excitement<br/>+5 Social Skill';
            break;
        case 'gd5':
            grant.statExcitement += 50;
            grant.timesSocialized += 5;
            grant.socialSkills += 5;
            grant.render();
            text = '+30 Excitement<br/>+5 Social Skill';
            break;
        case 'ms1':
            grant.statExcitement += 10;
            grant.render();
            text = '+10 Excitement';
            break;
        case 'ms2':
            grant.statExcitement += 15;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+15 Excitement<br/>+1 Social Skill';
            break;
        case 'ms3':
            grant.statExcitement += 20;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.render();
            text = '+20 Excitement<br/>+3 Social Skill';
            break;
        case 'ms4':
            grant.statExcitement += 25;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.statEuphoria += 10;
            grant.statStatus = 'Content';
            grant.render();
            text = '+25 Excitement<br/>+3 Social Skill<br/>+10 Euphoria<br/>+Content(+Energy, +Excitement, +Accomplishment)';
            break;
        case 'ms5':
            grant.statExcitement += 30;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.statEuphoria += 25;
            grant.statStatus = 'Confident';
            grant.render();
            text = '+30 Excitement<br/>+3 Social Skill<br/>+25 Euphoria<br/>+Confident(+Excitement, ++Accomplishment)';
            break;
        case 'ic1':
            grant.statExcitement += 5;
            grant.statEuphoria += 5;
            grant.render();
            text = '+5 Excitement<br/>+5 Euphoria';
            break;
        case 'ic2':
            grant.statExcitement += 10;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.statEuphoria += 10;
            grant.render();
            text = '+10 Excitement<br/>+1 Social Skill<br/>+10 Euphoria';
            break;
        case 'ic3':
            grant.statExcitement += 15;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.statEuphoria += 25;
            grant.render();
            text = '+15 Excitement<br/>+3 Social Skill<br/>+25 Euphoria';
            break;
        case 'ic4':
            grant.statExcitement += 20;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.statEuphoria += 50;
            grant.render();
            text = '+20 Excitement<br/>+3 Social Skill<br/>+50 Euphoria';
            break;
        case 'ic5':
            grant.statExcitement += 25;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.statEuphoria += 100;
            grant.render();
            text = '+25 Excitement<br/>+3 Social Skill<br/>+100 Euphoria';
            break;
        case 'do1':
            grant.statExcitement += 10;
            grant.render();
            text = '+10 Excitement';
            break;
        case 'do2':
            grant.statExcitement += 15;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+15 Excitement<br/>+1 Social Skill';
            break;
        case 'do3':
            grant.statExcitement += 20;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.render();
            text = '+20 Excitement<br/>+3 Social Skill<br/>+Confident(+Excitement, ++Accomplishment)';
            break;
        case 'do4':
            grant.statExcitement += 25;
            grant.statAccomplishment += 5;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.statStatus = 'Confident';
            grant.render();
            text = '+25 Excitement<br/>+5 Accomplishment<br/>+3 Social Skill<br/>+Confident(+Excitement, ++Accomplishment)';
            break;
        case 'do5':
            grant.statExcitement += 30;
            grant.statAccomplishment += 10;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.statStatus = 'Confident';
            grant.render();
            text = '+30 Excitement<br/>+10 Accomplishment<br/>+3 Social Skill<br/>+Confident(+Excitement, ++Accomplishment)';
            break;
        case 'hc1':
            grant.statExcitement += 10;
            grant.render();
            text = '+10 Excitement';
            break;
        case 'hc2':
            grant.statExcitement += 15;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+15 Excitement<br/>+1 Social Skill';
            break;
        case 'hc3':
            grant.statExcitement += 20;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.render();
            text = '+20 Excitement<br/>+3 Social Skill';
            break;
        case 'hc4':
            grant.statExcitement += 25;
            grant.timesSocialized += 5;
            grant.socialSkills += 5;
            grant.render();
            text = '+25 Excitement<br/>+5 Social Skill';
            break;
        case 'hc5':
            grant.statExcitement += 30;
            grant.timesSocialized += 7;
            grant.socialSkills += 7;
            grant.statStatus = 'Euphoric';
            grant.render();
            text = '+30 Excitement<br/>+7 Social Skill<br/>+Euphoric(+Excitement, +Accomplishment)';
            break;
        case 'gn1':
            grant.statExcitement += 10;
            grant.render();
            text = '+10 Excitement';
            break;
        case 'gn2':
            grant.statExcitement += 15;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+15 Excitement<br/>+1 Social Skill';
            break;
        case 'gn3':
            grant.statExcitement += 20;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.render();
            text = '+20 Excitement<br/>+3 Social Skill';
            break;
        case 'gn4':
            grant.statExcitement += 25;
            grant.timesSocialized += 5;
            grant.socialSkills += 5;
            grant.render();
            text = '+25 Excitement<br/>+5 Social Skill';
            break;
        case 'gn5':
            grant.statExcitement += 30;
            grant.timesSocialized += 7;
            grant.socialSkills += 7;
            grant.statStatus = 'Content';
            grant.render();
            text = '+30 Excitement<br/>+7 Social Skill<br/>+Content(+Energy, +Excitement, +Accomplishment)';
            break;
        case 'qs1':
            grant.statExcitement += 10;
            grant.render();
            text = '+10 Excitement';
            break;
        case 'qs2':
            grant.statExcitement += 15;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+15 Excitement<br/>+1 Social Skill';
            break;
        case 'qs3':
            grant.statExcitement += 20;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.statStatus = 'Content';
            grant.render();
            text = '+20 Excitement<br/>+3 Social Skill<br/>+Content(+Energy, +Excitement, +Accomplishment)';
            break;
        case 'qs4':
            grant.statExcitement += 25;
            grant.statAccomplishment += 5;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.statStatus = 'Content';
            grant.render();
            text = '+25 Excitement<br/>+5 Accomplishment<br/>+3 Social Skill<br/>+Content(+Energy, +Excitement, +Accomplishment)';
            break;
        case 'qs5':
            grant.statExcitement += 30;
            grant.statAccomplishment += 10;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.statMoney += 50;
            grant.statStatus = 'Content';
            grant.render();
            text = '+30 Excitement<br/>+5 Accomplishment<br/>+3 Social Skill<br/>+Content(+Energy, +Excitement, +Accomplishment)';
            break;
        case 'om1':
            grant.statExcitement += 10;
            grant.render();
            text = '+10 Excitement';
            break;
        case 'om2':
            grant.statExcitement += 15;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+15 Excitement<br/>+1 Social Skill';
            break;
        case 'om3':
            grant.statExcitement += 20;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.statStatus = 'Content';
            grant.render();
            text = '+20 Excitement<br/>+3 Social Skill<br/>+Content(+Energy, +Excitement, +Accomplishment)';
            break;
        case 'om4':
            grant.statExcitement += 25;
            grant.timesSocialized += 5;
            grant.socialSkills += 5;
            grant.statStatus = 'Content';
            grant.render();
            text = '+25 Excitement<br/>+5 Social Skill<br/>+Content(+Energy, +Excitement, +Accomplishment)';
            break;
        case 'om5':
            grant.statExcitement += 30;
            grant.timesSocialized += 7;
            grant.socialSkills += 7;
            grant.statStatus = 'Confident';
            grant.render();
            text = '+30 Excitement<br/>+7 Social Skill<br/><br/>+Confident(+Excitement, ++Accomplishment)';
            break;
        case 'lb1':
            grant.statExcitement += 10;
            grant.render();
            text = '+10 Excitement';
            break;
        case 'lb2':
            grant.statExcitement += 15;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+15 Excitement<br/>+1 Social Skill';
            break;
        case 'lb3':
            grant.statExcitement += 20;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.render();
            text = '+20 Excitement<br/>+3 Social Skill';
            break;
        case 'lb4':
            grant.statExcitement += 25;
            grant.timesSocialized += 5;
            grant.socialSkills += 5;
            grant.render();
            text = '+25 Excitement<br/>+5 Social Skill';
            break;
        case 'lb5':
            grant.statExcitement += 30;
            grant.timesSocialized += 7;
            grant.socialSkills += 7;
            grant.render();
            text = '+30 Excitement<br/>+7 Social Skill';
            break;
        case 'tc1':
            grant.statExcitement += 5;
            grant.render();
            text = '+5 Excitement';
            break;
        case 'tc2':
            grant.statExcitement += 10;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+10 Excitement<br/>+1 Social Skill';
            break;
        case 'tc3':
            grant.statExcitement += 15;
            grant.statAccomplishment += 5;
            grant.timesSocialized += 2;
            grant.socialSkills += 2;
            grant.render();
            text = '+10 Excitement<br/>+5 Accomplishment<br/>+2 Social Skill';
            break;
        case 'tc4':
            grant.statExcitement += 20;
            grant.statAccomplishment += 10;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.render();
            text = '+10 Excitement<br/>+10 Accomplishment<br/>+3 Social Skill';
            break;
        case 'tc5':
            grant.statExcitement += 25;
            grant.statAccomplishment += 15;
            grant.timesSocialized += 4;
            grant.socialSkills += 4;
            grant.statMoney += 50;
            grant.render();
            text = '+10 Excitement<br/>+15 Accomplishment<br/>+4 Social Skill<br/>+50 Money';
            break;
        case 'pe1':
            grant.statExcitement += 5;
            grant.statAccomplishment += 2;
            grant.render();
            text = '+5 Excitement<br/>+2 Accomplishment';
            break;
        case 'pe2':
            grant.statExcitement += 10;
            grant.statAccomplishment += 4;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+10 Excitement<br/>+4 Accomplishment<br/>+1 Social Skill';
            break;
        case 'pe3':
            grant.statExcitement += 15;
            grant.statAccomplishment += 6;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+15 Excitement<br/>+6 Accomplishment<br/>+1 Social Skill';
            break;
        case 'pe4':
            grant.statExcitement += 20;
            grant.statAccomplishment += 8;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+20 Excitement<br/>+8 Accomplishment<br/>+1 Social Skill';
            break;
        case 'pe5':
            grant.statExcitement += 25;
            grant.statAccomplishment += 10;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+25 Excitement<br/>+10 Accomplishment<br/>+1 Social Skill';
            break;
        case 'tt1':
            grant.statExcitement += 10;
            grant.render();
            text = '+10 Excitement';
            break;
        case 'tt2':
            grant.statExcitement += 20;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+20 Excitement<br/>+1 Social Skill';
            break;
        case 'tt3':
            grant.statExcitement += 30;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.render();
            text = '+30 Excitement<br/>+3 Social Skill';
            break;
        case 'tt4':
            grant.statExcitement += 40;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.render();
            text = '+40 Excitement<br/>+3 Social Skill';
            break;
        case 'tt5':
            grant.statExcitement += 50;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.render();
            text = '+50 Excitement<br/>+3 Social Skill';
            break;
        case 'da1':
            grant.statExcitement += 10;
            grant.render();
            text = '+10 Excitement';
            break;
        case 'da2':
            grant.statExcitement += 15;
            grant.render();
            text = '+15 Excitement';
            break;
        case 'da3':
            grant.statExcitement += 20;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+20 Excitement<br/>+1 Social Skill';
            break;
        case 'da4':
            grant.statExcitement += 25;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.render();
            text = '+25 Excitement<br/>+3 Social Skill';
            break;
        case 'da5':
            grant.statExcitement += 30;
            grant.timesSocialized += 5;
            grant.socialSkills += 5;
            grant.statStatus = 'Confident';
            grant.render();
            text = '+30 Excitement<br/>+5 Social Skill<br/>+Confident(+Excitement, ++Accomplishment)';
            break;
        case 'bm1':
            grant.statExcitement += 10;
            grant.render();
            text = '+10 Excitement';
            break;
        case 'bm2':
            grant.statExcitement += 15;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+15 Excitement<br/>+1 Social Skill';
            break;
        case 'bm3':
            grant.statExcitement += 20;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.render();
            text = '+20 Excitement<br/>+3 Social Skill';
            break;
        case 'bm4':
            grant.statExcitement += 25;
            grant.timesSocialized += 5;
            grant.socialSkills += 5;
            grant.render();
            text = '+25 Excitement<br/>+5 Social Skill';
            break;
        case 'bm5':
            grant.statExcitement += 30;
            grant.timesSocialized += 7;
            grant.socialSkills += 7;
            grant.statStatus = 'Content';
            grant.render();
            text = '+30 Excitement<br/>+7 Social Skill<br/>+Content(+Energy, +Excitement, +Accomplishment)';
            break;
        case 'at1':
            grant.statExcitement += 5;
            grant.render();
            text = '+5 Excitement';
            break;
        case 'at2':
            grant.statExcitement += 10;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+10 Excitement<br/>+1 Social Skill';
            break;
        case 'at3':
            grant.statExcitement += 15;
            grant.timesSocialized += 2;
            grant.socialSkills += 2;
            grant.argsEntered += 1;
            grant.render();
            text = '+15 Excitement<br/>+2 Social Skill<br/>+1 Arguments Entered';
            break;
        case 'at4':
            grant.statExcitement += 20;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.argsEntered += 1;
            grant.argsWon += 1;
            grant.statStatus = 'Confident';
            grant.render();
            text = '+20 Excitement<br/>+3 Social Skill<br/>+1 Arguments Won<br/>+Confident(+Excitement, ++Accomplishment)';
            break;
        case 'at5':
            grant.statExcitement += 25;
            grant.timesSocialized += 4;
            grant.socialSkills += 4;
            grant.argsEntered += 1;
            grant.argsWon += 1;
            grant.statStatus = 'Confident';
            grant.render();
            text = '+25 Excitement<br/>+4 Social Skill<br/>+1 Arguments Won<br/>+Confident(+Excitement, ++Accomplishment)';
            break;
        case 'li1':
            grant.statExcitement += 5;
            grant.render();
            text = '+5 Excitement';
            break;
        case 'li2':
            grant.statExcitement += 10;
            grant.socialSkills += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+10 Excitement<br/>+1 Social Skill';
            break;
        case 'li3':
            grant.statExcitement += 10;
            grant.statAccomplishment += 5;
            grant.statEuphoria += 5;
            grant.socialSkills += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+10 Excitement<br/>+5 Accomplishment<br/>+5 Euphoria<br/>+1 Social Skill';
            break;
        case 'li4':
            grant.statExcitement += 10;
            grant.statAccomplishment += 10;
            grant.statEuphoria += 25;
            grant.socialSkills += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+10 Excitement<br/>+10 Accomplishment<br/>+25 Euphoria<br/>+1 Social Skill';
            break;
        case 'li5':
            grant.statExcitement += 10;
            grant.statAccomplishment += 15;
            grant.statEuphoria += 50;
            grant.socialSkills += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+10 Excitement<br/>+15 Accomplishment<br/>+50 Euphoria<br/>+1 Social Skill';
            break;
        case 'za1':
            grant.statExcitement += 10;
            grant.render();
            text = '+10 Excitement';
            break;
        case 'za2':
            grant.statExcitement += 15;
            grant.statAccomplishment += 2;
            grant.render();
            text = '+15 Excitement<br/>+2 Accomplishment<br/>';
            break;
        case 'za3':
            grant.statExcitement += 20;
            grant.statAccomplishment += 4;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+20 Excitement<br/>+4 Accomplishment<br/>+1 Social Skill';
            break;
        case 'za4':
            grant.statExcitement += 25;
            grant.statAccomplishment += 6;
            grant.timesSocialized += 2;
            grant.socialSkills += 2;
            grant.render();
            text = '+25 Excitement<br/>+6 Accomplishment<br/>+2 Social Skill';
            break;
        case 'za5':
            grant.statExcitement += 30;
            grant.statAccomplishment += 8;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.render();
            text = '+30 Excitement<br/>+8 Accomplishment<br/>+3 Social Skill';
            break;
        case 'sd1':
            grant.statExcitement += 5;
            grant.statAccomplishment += 2;
            grant.timesSocialized += 1;
            grant.socialSkills += 1;
            grant.render();
            text = '+5 Excitement<br/>+2 Accomplishment<br/>+1 Social Skill';
            break;
        case 'sd2':
            grant.statExcitement += 10;
            grant.statAccomplishment += 4;
            grant.timesSocialized += 2;
            grant.socialSkills += 2;
            grant.render();
            text = '+10 Excitement<br/>+4 Accomplishment<br/>+2 Social Skill';
            break;
        case 'sd3':
            grant.statExcitement += 15;
            grant.statAccomplishment += 6;
            grant.timesSocialized += 3;
            grant.socialSkills += 3;
            grant.render();
            text = '+15 Excitement<br/>+6 Accomplishment<br/>+3 Social Skill';
            break;
        case 'sd4':
            grant.statExcitement += 20;
            grant.statAccomplishment += 8;
            grant.timesSocialized += 4;
            grant.socialSkills += 4;
            grant.render();
            text = '+20 Excitement<br/>+8 Accomplishment<br/>+4 Social Skill';
            break;
        case 'sd5':
            grant.secretEvent = true;
            grant.statExcitement += 25;
            grant.statAccomplishment += 10;
            grant.timesSocialized += 5;
            grant.socialSkills += 5;
            text = "The two of you spent most of your time together at the convention...";
            break;
        default:
            break;
    }
    return text;
};

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