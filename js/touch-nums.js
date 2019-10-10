
'use trict'
var gNums;
var gNextNum = 1;
var gEasy = 'Easy 16', gMedium = 'Medium 25', gHard = 'Hard 36';
var gLevel = gEasy;
var gMat;
var gInterval;

function init() {
    chooseLevel(gLevel);
    nextNum(gNextNum);
    renderbord();
}

function chooseLevel(gLevel) {
    if (gLevel === gEasy) {
        gMat = 4;
    } else if (gLevel === gMedium) {
        gMat = 5;
    } else {
        gMat = 6;
    }
    var elLevel = document.querySelector('.level');
    elLevel.innerText = 'Level:' + gLevel;
}


function renderbord() {
    resetNums();
    var strHTML = '';
    for (var i = 0; i < gMat; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gMat; j++) {
            var randomNum = drawNum();
            strHTML += `<td class="num" data-i="${randomNum}" onclick="cellClicked(${randomNum})">`;
            strHTML += randomNum;
            strHTML += '</td>';
        }
    }
    strHTML += '</tr>';
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}


function cellClicked(clickedNum) {
    console.log('clickedNum', clickedNum)
    if (clickedNum === gNextNum) {
        var elCell = document.querySelector(`[data-i="${clickedNum}"]`);
        elCell.classList.add('right');
        if (gNextNum === 1) {
            timeStart();
        }
        gNextNum++;
        nextNum(gNextNum);
    }

    if (clickedNum === gMat * gMat) {
        stopTimer()
        console.log('finish game')
    }

}

function nextNum(gNextNum) {
    var elgNext = document.querySelector('.nextnum');
    elgNext.innerText = 'The next number:' + gNextNum;
}

function resetNums() {
    gNums = []
    var gNum = gMat * gMat;
    for (var i = 0; i < gNum; i++) {
        gNums[i] = i + 1;
    }
    shuffle(gNums);
}
function drawNum() {
    return gNums.pop();
}

function shuffle(items) {
    var randIdx, keep;
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function timeStart() {
    var startTime = Date.now();
    gInterval = setInterval(function () {
        var elapsedTime = Date.now() - startTime;
        document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(3);
    }, 100);
}


function stopTimer() {
    clearInterval(gInterval);
}