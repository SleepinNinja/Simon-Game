var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePatterns = [];
var userClickedPatterns = [];
var level = 0;
var userClickCount = 0;

function nextColor() {
    return Math.floor(Math.random() * 4);
}

function playSound(soundName) {
    var audio = new Audio(`sounds/${soundName}.mp3`);
    audio.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass('pressed');
    setTimeout(function() {
        $(`#${currentColor}`).removeClass('pressed');
    }, 100);
}

function updateLevel(level) {
    console.log(level);
    $('h1').text(`Level ${level}`);
}

function checkAnswer() {
    for (var i = 0; i < userClickedPatterns.length; i++) {
        if (userClickedPatterns[i] != gamePatterns[i]) {
            return false;
        }
    }

    userClickCount = 0;
    userClickedPatterns = [];
    return true;
}

function nextSequence() {
    level += 1;
    updateLevel(level);
    var randomNumber = nextColor();
    var randomChooseColor = buttonColors[randomNumber];
    gamePatterns.push(randomChooseColor);
    $(`#${randomChooseColor}`).fadeOut(100).fadeIn(100); 
    playSound(randomChooseColor);
}

$(document).keypress(function(event) {
    $('h1').text('Press a key to Start');
    nextSequence();
});

$('div.btn').click(function() {
    var userChoosenColor = this.id;
    userClickedPatterns.push(userChoosenColor);
    userClickCount += 1;
    playSound(userChoosenColor);
    animatePress(userChoosenColor);


    if (userClickCount == gamePatterns.length) {
        var result = checkAnswer();

        if (!result) {
            $('h1').text('Wrong pattern guessed! \n Your Score :' + level);
            var audio = new Audio('sounds/wrong.mp3');
            audio.play();
            setTimeout(function() {
                $('h1').text('Press a key to Start');
            }, 3000);

           	gamePatterns = [];
           	userClickedPatterns = [];
           	level = 0;
           	userClickCount = 0;

        } else {
            setTimeout(function() {
                nextSequence();
            }, 500);
        }
    }
});
