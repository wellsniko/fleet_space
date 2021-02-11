import * as CLIENT from './client.js'

var modal = document.getElementById("myModal");
var loseModal = document.getElementById("lose-game");
var btn = document.getElementById("play-btn");
let mySong = document.getElementById("my-audio")
// var span = document.getElementsByClassName("close")[0];
var loseBtn = document.getElementById("lose-play-btn");
var winBtn = document.getElementById('win-play-btn')
var winModal = document.getElementById('win-game')



btn.onclick = function() {
  CLIENT.init()
  CLIENT.animate()
  mySong.play() 
  mySong.volume = 0.10;
  // modal.style.display = "none";
      var fadeEffect = setInterval(function () {
          
        if (!modal.style.opacity) {
            modal.style.opacity = 1;
        }
        if (modal.style.opacity > 0) {
            
            modal.style.opacity -= 0.1;
        } else {
            
            clearInterval(fadeEffect);
            modal.style.display = "none";
        }
    }, 200);
}



loseBtn.onclick = function() {
  
      var fadeEffect = setInterval(function () {
          
        if (!loseModal.style.opacity) {
            loseModal.style.opacity = 1;
        }
        if (loseModal.style.opacity > 0) {
            
            loseModal.style.opacity -= 0.1;
        } else {
            
            clearInterval(fadeEffect);
            loseModal.style.display = "none";
        }
    }, 200);
}



winBtn.onclick = function() {
  
      var fadeEffect = setInterval(function () {
          
        if (!winModal.style.opacity) {
            winModal.style.opacity = 1;
        }
        if (winModal.style.opacity > 0) {
            
            winModal.style.opacity -= 0.1;
        } else {
            
            clearInterval(fadeEffect);
            winModal.style.display = "none";
        }
    }, 200);
}


// window.onclick = function(event) {
//   if (event.target == modal) {

//     modal.style.display = "none";
//     let mySong = document.getElementById("my-audio")
// 	  mySong.volume = 0.15;
//     mySong.play()

//   }
// }

// window.addEventListener('mousemove', movePlaySong);


// function movePlaySong(event){

//     let mySong = document.getElementById("my-audio")
	 
//     mySong.play() 
//     mySong.muted = false
//     mySong.volume = 0.10;
//     window.removeEventListener( 'mousemove', movePlaySong, false );
// }



window.addEventListener( 'keydown', flashControlDirections, false );

	

		function flashControlDirections(event, text) {

      let pressedKey 
        switch ( event.keyCode ) {


        case 82: /*R*/ pressedKey = "r-key-2"; break; 
        case 70: /*F*/ pressedKey = "f-key-2"; break; 

        case 65: /*A*/ pressedKey = "a-key-2"; break; 
        case 68: /*D*/ pressedKey = "d-key-2"; break; 

        case 87: /*W*/ pressedKey = "w-key-2"; break; 
        case 83: /*S*/ pressedKey = "s-key-2"; break; 

        case 38: /*up*/ pressedKey = "up-key-2"; break; 
        case 40: /*down*/ pressedKey = "down-key-2"; break; 

        case 37: /*left*/ pressedKey = "left-key-2"; break; 
        case 39: /*right*/ pressedKey = "right-key-2"; break; 

        case 81: /*Q*/ pressedKey = "q-key-2"; break; 
        case 69: /*E*/ pressedKey = "e-key-2"; break; 
      }

      if (pressedKey){
        document.getElementById(pressedKey).style.background = "white";
        document.getElementById(pressedKey).style.color = "black";
        setTimeout(function() {
          document.getElementById(pressedKey).style.background = null;   
          document.getElementById(pressedKey).style.color = null; 
        }, 100);
      }

    
    }


// document.removeEventListener('keydown', function(e) {
//   let allowedKeys = {
//     37: 'left',
//     38: 'up',
//     39: 'right',
//     40: 'down'
//   };

//   player.handleInput(allowedKeys[e.keyCode]);
// });