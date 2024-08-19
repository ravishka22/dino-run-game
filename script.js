var runStart = 0;
function keyCheck(event){

    //Enter key
    if (event.which==13){
        if (runWorkerId==0){
           runWorkerId = setInterval(run,100);
           runSound.play();
           runStart = 1;
           backgroundWorkerId = setInterval(moveBackground,8);
           scoreWorkerId = setInterval(updateScore,100);
           createBlockId = setInterval(createBlock,100);
           moveBlockId = setInterval(moveBlocks,8);
           document.getElementById("score").style.visibility = "visible"
           document.getElementById("gameStart").style.visibility = "hidden"

        }
    }
    //Space Key
    if (event.which==32){
        if (runStart==1){
            if(deadWorkerId==0){
                if (jumpWorkerId==0){
                    clearInterval(runWorkerId);
                    runSound.pause();
                    jumpWorkerId = setInterval(jump,80);
                    jumpSound.play();
                }
            }
            
        }
        
    }
    //UP Arrow Key
    if (event.which==38){
        if (runStart==1){
            if(deadWorkerId==0){
                if (jumpWorkerId==0){
                    clearInterval(runWorkerId);
                    runSound.pause();
                    jumpWorkerId = setInterval(jump,80);
                    jumpSound.play();
                }
            }
            
        }
        
    }
    
}

//Run Animation
var runSound = new Audio ("sounds/run.mp3")
runSound.loop = true;
var runWorkerId =0;
var player = document.getElementById("player");
var runImageNumber = 1;

function run() {

    runImageNumber++;

    if(runImageNumber==9){
        runImageNumber= 1 ;
    }

    player.src = "images/Run ("+runImageNumber+").png"
}

//Jump Animation
var jumpSound = new Audio ("sounds/jump.mp3")
var jumpWorkerId = 0;
var jumpImageNumber = 1;
var playerMarginTop = 62;
function jump(){
    jumpImageNumber++;
    if(jumpImageNumber<=7){
        playerMarginTop = playerMarginTop -3;
        player.style.marginTop = playerMarginTop +"vh";
    }
    if(jumpImageNumber>=8){
        playerMarginTop = playerMarginTop +3;
        player.style.marginTop = playerMarginTop +"vh";
    }
    if(jumpImageNumber==13){
        jumpImageNumber= 1;
        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;
        runWorkerId = setInterval(run,100);
        runSound.play();
    }
    player.src = "images/Jump ("+jumpImageNumber+").png";
}

//Move Background
var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWorkerId =0;
function moveBackground(){
    backgroundX = backgroundX - 2;
    background.style.backgroundPositionX = backgroundX +"px";

}

//Update Score
var winSound = new Audio ("sounds/win.mp3")
var score = document.getElementById("score");
var newScore = 0;
var scoreWorkerId = 0;
function updateScore(){
    newScore++;
    score.innerHTML = newScore;
    if(newScore>500){
        document.getElementById("gameWin").style.visibility = "visible";
        winSound.play();
        clearInterval(runWorkerId);
        runSound.pause()
        clearInterval(jumpWorkerId);
        clearInterval(backgroundWorkerId);
        clearInterval(scoreWorkerId);
        clearInterval(createBlockId);
        clearInterval(moveBlockId);

    }

}


//Create Block
var createBlockId = 0;
var blockMarginLeft = 600;
var blockId = 1;

function createBlock(){
    var block = document.createElement("div");
    block.className = "block";

    block.id = "block"+blockId;
    blockId++;

    var gap = Math.random()*(1000-400)+400;
    blockMarginLeft = blockMarginLeft+gap;

    block.style.marginLeft = blockMarginLeft+"px";

    background.appendChild(block);
}

//Move Blocks
var moveBlockId = 0;
function moveBlocks(){
    for(var i = 1; i<=blockId; i++){
        var currentBlock = document.getElementById("block"+i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft)-2;
        currentBlock.style.marginLeft = newMarginLeft+"px";
        //223&143
        if(newMarginLeft <=200){
            if(newMarginLeft >=140){
                if(playerMarginTop<=62){
                    if(playerMarginTop>=58){
                        clearInterval(runWorkerId);
                        runSound.pause()
                        clearInterval(jumpWorkerId);
                        clearInterval(backgroundWorkerId);
                        clearInterval(scoreWorkerId);
                        clearInterval(createBlockId);
                        clearInterval(moveBlockId);

                        deadWorkerId = setInterval(dead,100);
                        deadSound.play();
                    }
                }
            }
        }
    }
}


var deadSound = new Audio("sounds/dead.mp3");
// Dead Funtion
var deadImageNumber = 1;
var deadWorkerId = 0;
function dead(){
    deadImageNumber++;
    if(deadImageNumber==9){
        deadImageNumber = 8;

        player.style.marginTop = "62vh";
        document.getElementById("endScore").innerHTML = newScore;
        document.getElementById("gameOver").style.visibility = "visible"
        document.getElementById("btn").style.visibility = "visible"
        document.getElementById("score").style.visibility = "hidden"
    }
    player.src = "images/Dead ("+deadImageNumber+").png";
}

function re(){
    location.reload();
}
