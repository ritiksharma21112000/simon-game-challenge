// create an array of colors
var buttonColors = ["red", "blue", "yellow", "green"];
// create an array in in which we add colors randomly
var gamePattern = [];
// create an array in which we add color which is clicked by user
var userClickedPattern = [];

var level = 0; //Create a new variable called level and start at level 0.

//jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
var started = false;
$(document).keydown(function(event){
    if(!started){

        //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level)
        started = true; // set game as started 
        nextSequence();
    }
});

// Use jQuery to detect when any of buttons are clicked and trigger a handler funtion
$(".btn").click(function() {
    
    // Inside handler, create a new variable called userChosenColor to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");

    // Add the contents of the variable userChosenColor to the end of this new userClickedPattern( green,yello etc )
    userClickedPattern.push(userChosenColour);

    // Play sound on button clicking
    playSound(userChosenColour);
    // console.log(userChosenColour);

    // it will add a box shadow and changes the background colour to grey on user click.
    animatePress(userChosenColour);

    //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);

})

//Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel){

    //if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".   
    if(gamePattern[currentLevel]  === userClickedPattern[currentLevel]){
        console.log("sexes");

        //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if(userClickedPattern.length === gamePattern.length){

            //Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("nosex")

        // In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.

        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        //In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        
        //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart");  

        //Call startOver() if the user gets the sequence wrong.
        startOver();
    }

}

function nextSequence(){

    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour); // In this we Add contents of randomChosenColour to the gamePattern( blue,green etc..)

    // This is used for flash on button 
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    //it will add a box shadow and changes the background colour to grey.
    animatePress(randomChosenColour);

    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0". ncrease the level by 1 every time nextSequence() is called.
    $("h1").text("Level " + ++level);

}

//  Create a new function called playSound() that takes a single input parameter called name.

function playSound(name){
    
     // In this we attached audio with button 
     var audio = new Audio("sounds/" + name + ".mp3");
     audio.play();
}

//Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour){

    // it will add a box shadow and changes the background colour to grey.
    $("#" + currentColour).addClass("pressed");

    //Javascript to remove the pressed class after a 100 milliseconds.
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100)

}

//Create a new function called startOver().
function startOver(){

    //Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
}
