var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

// var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "none";
      let mySong = document.getElementById("my-audio")
	mySong.volume = 0.15;
	// document.body.addEventListener("mousemove", function () {
    mySong.play()
// })
}

// span.onclick = function() {
//   modal.style.display = "none";
// }
// let mysong
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    let mySong = document.getElementById("my-audio")
	mySong.volume = 0.15;
	// document.body.addEventListener("mousemove", function () {
    mySong.play()
// })
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