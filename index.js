var gamePattern = [];
var userClickedPattern=[];
var buttonColours = ["red","blue","green","yellow"];
var started = false;
var level = 0;

function nextSequence(){
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColour);
    level++;
    $('h1').text(`Level ${level}`);
}

function staretOver (){
    level=0;
    gamePattern=[];
    started = false;
}

function playAudio (name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function annimatePress (curentColour){
    $("#"+ curentColour).addClass("pressed");
    setTimeout(()=> $("#"+ curentColour).removeClass("pressed"), 100);
}

function checkAnswer (curentLevel){
    if(userClickedPattern[curentLevel]===gamePattern[curentLevel]){
        console.log('succes');
        if(userClickedPattern.length===gamePattern.length){
            setTimeout( function () {
                nextSequence();
            },1000);
        }
    } else {
        playAudio('wrong');
        $("body").addClass("game-over");
        setTimeout(()=> $("body").removeClass("game-over"), 200);
        $('h1').text('Game Over, Press Any Key to Restart');
        staretOver();
        console.log('wrong');
    }
}


$(".btn").on("click", function(){
    var userChosenColour =  $(this).attr("id");
    annimatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    playAudio(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).on("keydown", function(){
    if(!started){
    nextSequence();
    started=true;
}
});


