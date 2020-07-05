let userClickedPattern =[];
let gamePattern = [];
let level = 0;
let buttonColors = ['red','blue','green','yellow'];
let isGameStarted =false;
let offset = 0;
function nextSequence() {
    isGameStarted = true;
    level++;
    $('#level-title').text(`Level ${level}`);
    let randomNum = Math.floor(Math.random()*4);

    let randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);
    $('#' + randomChosenColor).fadeToggle('fast').fadeToggle('fast');
    playSound(randomChosenColor);
}

function playSound(name) {
    let audio = new Audio('sounds/' + name + '.mp3')
    audio.play();
}
function animatePress(color) {
    $('#'+color).toggleClass('pressed')
    setTimeout( function() {$('#'+color).toggleClass('pressed')},300)
}

function gameOver() {
    playSound('wrong');
    $('body').toggleClass('game-over');
    setTimeout(function () {
        $('body').toggleClass('game-over')
    },500);
    $('#level-title').text('Game Over')
}

function startOver() {
    level = 0;
    isGameStarted = false;
    gamePattern = [];
    userClickedPattern = [];
    offset = 0;
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[offset]){
        offset++;
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence()
            },1000);
            offset = 0;
            userClickedPattern = [];
        }
    }
    else {
        gameOver();
    }


}

$('.btn').on('click', function (event) {
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

$(document).keydown(function () {
    if (!isGameStarted) {
        $('#level-title').text(`Level ${level}`)
        nextSequence();
    }
})

$('#reset').click(function () {
 startOver();
 setTimeout(function () {
    nextSequence();
 },1000)
})
