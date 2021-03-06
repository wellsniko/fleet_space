import * as THREE from './three/build/three.module.js';
import {CustomSpaceControls} from './three_js_custom/CustomSpaceControls.js'
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from './three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './three/examples/jsm/postprocessing/RenderPass.js';
import { FilmPass } from './three/examples/jsm/postprocessing/FilmPass.js';
	
	let pivot
	let pivot2
	let pivot3
	let pivot4
	const targetX= -180
	const targetY= 530
	const targetZ= -24040
	const targetXRotation = 0
	
	let SCREEN_HEIGHT = window.innerHeight
	let SCREEN_WIDTH = window.innerWidth;

	let camera, controls, scene, renderer, stats;
	let dirLight, dirLight2, dirLight3;
	let composer;
	const textureLoader = new THREE.TextureLoader();
	const clock = new THREE.Clock();
	let loader = new GLTFLoader();   
	
	let shipUpdateCounter = 0
	
	export const init = ()=> {


		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera( 25, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000000 );
		camera.position.set(-9000,-14000,90000) //-9000,40000,90000 0, +4370, -500
		camera.rotation.x = 9 * Math.PI/180
		camera.rotation.y = -4 * Math.PI/180
		camera.rotation.z = 23 * Math.PI/180
		dirLight = new THREE.DirectionalLight( 0xffffff, 1.8 );
        dirLight.position.set( - 1, 0, 1 ).normalize();
        dirLight2 = new THREE.DirectionalLight( 0xffffff, 1.8 );
        dirLight2.position.set( 20000, 1000, -50000 ).normalize();
        dirLight3 = new THREE.DirectionalLight( 0xffffff, 1.8 );
		dirLight3.position.set( 10000, 20000, 0 ).normalize();
		
		scene.add( dirLight, dirLight2, dirLight3 );

		Number.prototype.between = function(a, b) {
			var min = Math.min(a, b),
			max = Math.max(a, b);

			return this >= min && this <= max;
		};

        loader.load('./public/low-star-destroyer/scene.gltf', function(gltf){
            let lowDestroyer = gltf.scene.children[0]
			lowDestroyer.position.set(-5000,-2000,-2000) //(-5000,9000,1000) 0, +4370, -500
			lowDestroyer.scale.set(30,30,30)
			lowDestroyer.rotation.z = 15 * Math.PI/180
			lowDestroyer.rotation.x = -64 * Math.PI/180
            scene.add(lowDestroyer)
            renderer.render(scene, camera)
		});

		

		loader.load('./public/old_executor/scene.gltf', function(gltf){
            let oldExecutor = gltf.scene.children[0]
			oldExecutor.position.set(-9000, -12000, 77600)   //(-9000,36000,77100)  0, +4370, -500
			oldExecutor.scale.set(100,100,100)
			oldExecutor.rotation.x = -64 * Math.PI/180
            scene.add(oldExecutor)
            renderer.render(scene, camera)
		});

		loader.load('./public/star_wars_tie_fighter/scene.gltf', function(gltf){
			let tieFighter = gltf.scene.children[0]
			tieFighter.position.set(15200,4370, -500)//(15200, 0, 0) 0, +4370, -500
			tieFighter.scale.set(80, 80, 80)
			pivot = new THREE.Object3D();
			pivot.position.set(0, -330, -33700)
			pivot.rotation.x = 26 * Math.PI/180 //(0,-4700,-33200) 0, +4370, -500
			pivot.add(tieFighter);
			scene.add(pivot)
			renderer.render(scene, camera, pivot.domElement)
		});

		loader.load('./public/star_wars_tie_fighter/scene.gltf', function(gltf){
			let tieFighter2 = gltf.scene.children[0]
			tieFighter2.position.set(11500,6870,6500) //(11500, 2500,7000) (0, +4370, -500)
			tieFighter2.scale.set(80, 80, 80)
			pivot.add(tieFighter2);
		})

		loader.load('./public/star_wars_tie_fighter/scene.gltf', function(gltf){
			let tieFighter3 = gltf.scene.children[0]
			tieFighter3.position.set(7900, 14870, -500) //(7900, 10500, 0) 0, +4370, -500
			tieFighter3.scale.set(80, 80, 80)
			pivot2 = new THREE.Object3D();
			pivot2.position.set(0, -330, -33700)
			pivot2.rotation.x = 26 * Math.PI/180 //(0,-4700,-33200) 0, +4370, -500
			pivot2.add(tieFighter3);
			scene.add(pivot2)
		});

		loader.load('./public/star_wars_imperial_ii_star_destroyer/scene.gltf', function(gltf){
			let starDestroyer = gltf.scene.children[0]
			starDestroyer.position.set(12000, 14370, -10500) //(12000, 20000, -10000) 0, +4370, -500
			starDestroyer.scale.set(18, 18, 18)
			starDestroyer.rotation.z = 45 * Math.PI/180
			pivot3 = new THREE.Object3D();
			pivot3.position.set(0,-330,-33700)
			pivot3.rotation.x = 26 * Math.PI/180 //(0,-4700,-37200)
			pivot3.add(starDestroyer);
			scene.add(pivot3)
			renderer.render(scene, camera, pivot3.domElement)
		});

		loader.load('./public/star_wars_imperial_ii_star_destroyer/scene.gltf', function(gltf){
			let starDestroyer2 = gltf.scene.children[0]
			starDestroyer2.position.set(-22000, 5370, 22500) //(-22000, 1000, 22000)0, +4370, -500
			starDestroyer2.scale.set(11, 11, 11)
			starDestroyer2.rotation.z = 45 * Math.PI/180
			pivot4 = new THREE.Object3D();
			pivot4.position.set(0, -330, -33700)
			pivot4.rotation.x = 26 * Math.PI/180 //(0,-4700,-37200)0, +4370, -500
			pivot4.add(starDestroyer2);
			scene.add(pivot4)
			renderer.render(scene, camera, pivot4.domElement)
		});

		loader.load('./public/death_star/scene.gltf', function(gltf){
            let deathStar = gltf.scene.children[0]
			deathStar.position.set(0,-180,-33700) //(0,-4550,-33200)  diff = 0, +4370, -500
			deathStar.scale.set(30,30,30)
			deathStar.rotation.x = -64 * Math.PI/180
            scene.add(deathStar)
            renderer.render(scene, camera)
		});
					
		let circleMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00, opacity: 0.5 } );
		let circleGeometry = new THREE.CircleGeometry( 150, 64 );
		circleGeometry.vertices.shift();
		let deathCircle = new THREE.LineLoop( circleGeometry, circleMaterial ) 
		deathCircle.position.set(-180,530,-24040)

    	let circle2Material = new THREE.MeshBasicMaterial( { color: 0xffff00, opacity: 0.5 } );
		let circle2Geometry = new THREE.CircleGeometry( 250, 64 );
		circle2Geometry.vertices.shift();
		let death2Circle = new THREE.LineLoop( circle2Geometry, circle2Material ) 
		death2Circle.position.set(-180,530,-17040)

		let circle3Material = new THREE.MeshBasicMaterial( { color: 0xffff00, opacity: 0.5 } );
		let circle3Geometry = new THREE.CircleGeometry( 500, 64 );
		circle3Geometry.vertices.shift();
		let death3Circle = new THREE.LineLoop( circle3Geometry, circle3Material ) 
		death3Circle.position.set(-180,530,-9040)
	
		let circle4Material = new THREE.MeshBasicMaterial( { color: 0xffff00,  opacity: 0.5 } );
		let circle4Geometry = new THREE.CircleGeometry( 1000, 64 );
		circle4Geometry.vertices.shift();
		let death4Circle = new THREE.LineLoop( circle4Geometry, circle4Material ) 
		
		death4Circle.position.set(-180,530,960)
		scene.add(deathCircle, death2Circle, death3Circle, death4Circle);
		
        let materialArray = [];
        let texture_ft = new THREE.TextureLoader().load('./public/skybox/front.png');
        let texture_bk = new THREE.TextureLoader().load('./public/skybox/back.png');
        let texture_up = new THREE.TextureLoader().load('./public/skybox/top.png');
        let texture_dn = new THREE.TextureLoader().load('./public/skybox/bot.png');
        let texture_rt = new THREE.TextureLoader().load('./public/skybox/left.png');
        let texture_lf = new THREE.TextureLoader().load('./public/skybox/right.png');
        materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}))
        materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}))
        materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}))
        materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}))
        materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}))
		materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}))
		
        for(let i=0;i<6;i++)
			materialArray[i].side=THREE.BackSide;
			
        const backgroundGeometry = new THREE.BoxGeometry(400000, 400000, 400000);
		const cube = new THREE.Mesh(backgroundGeometry, materialArray);
		scene.add(cube);

		renderer = new THREE.WebGLRenderer( );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
		document.body.appendChild( renderer.domElement );
		controls = new CustomSpaceControls( camera, renderer.domElement );
		controls.movementSpeed = 50;  //25
		controls.domElement = renderer.domElement;
		controls.rollSpeed = Math.PI / 8000; //10000
		controls.autoForward = false;

		var audioButton = document.getElementById("audio-button");

		audioButton.onclick = function() {
			let mySong = document.getElementById("my-audio")
			if (mySong.muted === false){
				mySong.muted = true
				audioButton.innerHTML = "&#128263;"
			} else {
				mySong.muted = false
				audioButton.innerHTML = "&#128266;"
			}		
		}
		
		window.addEventListener( 'keydown', flashControls, false );
		window.addEventListener( 'resize', onWindowResize, false );

		const renderModel = new RenderPass( scene, camera );
		const effectFilm = new FilmPass( 0.35, 0.75, 2048, false );
		composer = new EffectComposer( renderer );
		composer.addPass( renderModel );
		composer.addPass( effectFilm );
	}


		function flashControls(event, text) {

		let pressedKey 
			switch ( event.keyCode ) {

			case 82: /*R*/ pressedKey = "r-key"; break; 
			case 70: /*F*/ pressedKey = "f-key"; break; 

			case 65: /*A*/ pressedKey = "a-key"; break; 
			case 68: /*D*/ pressedKey = "d-key"; break; 

			case 87: /*W*/ pressedKey = "w-key"; break; 
			case 83: /*S*/ pressedKey = "s-key"; break; 

			case 38: /*up*/ pressedKey = "up-key"; break; 
			case 40: /*down*/ pressedKey = "down-key"; break; 

			case 37: /*left*/ pressedKey = "left-key"; break; 
			case 39: /*right*/ pressedKey = "right-key"; break; 

			case 81: /*Q*/ pressedKey = "q-key"; break; 
			case 69: /*E*/ pressedKey = "e-key"; break; 
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


	function onWindowResize() {
		SCREEN_HEIGHT = window.innerHeight;
		SCREEN_WIDTH = window.innerWidth;
		camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
		camera.updateProjectionMatrix();
		renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
		composer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	}
	

	export const animate = ()=> {

		if ((targetZ-camera.position.z).between(-100, 100)  //between 1.0 m or 10.m for now, probably do 10 m for y and z axis cuz the circle width
			&& (targetY-camera.position.y).between(-100, 100)
			&& (targetX-camera.position.x).between(-100, 100)
			&& 	(camera.rotation.x - targetXRotation).between(-0.00355, 0.00355) //this is .2 now, should it be .02?
			&& (camera.rotation.y).between(-0.00355, 0.00355) 
			&& (camera.rotation.z).between(-0.00355, 0.00355)
			&& (controls.moveState.forwardBack).between(-1, 1) //this is less than 3 m/s
			&& (controls.moveState.upDown).between(-1, 1)
			&& (controls.moveState.leftRight).between(-1, 1)){
			
			document.getElementById("win-game").style.display = 'block'
			document.getElementById("win-game").style.opacity = '1'
			camera.position.set(-9000,-14000,90000) //-9000,40000,90000 0, +4370, -500
			camera.rotation.x = 9 * Math.PI/180
			camera.rotation.y = -4 * Math.PI/180
			camera.rotation.z = -12 * Math.PI/180
			controls.moveState = { upDown: 0, leftRight: 0, forwardBack: 0, pitch: 0, yaw: 0, roll: 0 };
			controls.updateMovementVector()
		} 

		if (!(camera.position.y).between(-55600, 50000) || !(camera.position.x).between(-52600, 50000) || !(camera.position.z).between(-24600, 100000) || (camera.position.z < -2310 && !(camera.position.x).between(-2600, 2400)) && !(camera.position.y).between(-2600, 2400)) {
			document.getElementById("lose-game").style.display = 'block'
			document.getElementById("lose-game").style.opacity = '1'
			camera.position.set(-9000,-14000,90000) //-9000,40000,90000 0, +4370, -500
			camera.rotation.x = 9 * Math.PI/180
			camera.rotation.y = -4 * Math.PI/180
			camera.rotation.z = -12 * Math.PI/180
			controls.moveState = { upDown: 0, leftRight: 0, forwardBack: 0, pitch: 0, yaw: 0, roll: 0 };
			controls.updateMovementVector()
		} 

		requestAnimationFrame( animate );
			
		if (pivot) pivot.rotation.y += -.015
			if (pivot2) {
				pivot2.rotation.y += -.006
				pivot2.rotation.z += .0015
			}
			if (pivot3) {
				pivot3.rotation.y -= .0002
			}
			if (pivot4) pivot4.rotation.y += .0003
			
			
			
		render();
			
		shipUpdateCounter += 1
		if (shipUpdateCounter === 10){
			updateShipStats()
			shipUpdateCounter = 0
				
		}	 	
		
	}

	function render() {
		const delta = clock.getDelta();
		controls.update( delta );
		composer.render( delta );
		renderer.render(scene, camera)
	}

	function updateShipStats(){
		let speedKeys = []
		let slowKeys = []

		let xColor = "rgb(211, 46, 46)"
		let xDisplay = "x: " + ((targetX-camera.position.x)/-10).toFixed(1) + " m"
		if ((targetX-camera.position.x).between(-100, 100)) xColor = "rgb(92, 209, 255)"
		let xKey = document.getElementById("x")
		xKey.innerHTML = xDisplay
		xKey.style.color = xColor

		let yColor = "rgb(211, 46, 46)"
		let yDisplay = "y: " + ((targetY-camera.position.y)/-10).toFixed(1) + " m"
		if ((targetY-camera.position.y).between(-100, 100)) yColor = "rgb(92, 209, 255)"
		let yKey = document.getElementById("y")
		yKey.innerHTML = yDisplay
		yKey.style.color = yColor

		let zColor = "rgb(211, 46, 46)"
		let zDisplay = "z: " + ((targetZ-camera.position.z)/-10).toFixed(1) + " m"
		if ((targetZ-camera.position.z).between(-100, 100)) zColor = "rgb(92, 209, 255)"
		let zKey = document.getElementById("z")
		zKey.innerHTML = zDisplay
		zKey.style.color = zColor

		let pitchColor = "rgb(211, 46, 46)"
		let xTargetDisplay = (camera.rotation.x - targetXRotation > Math.PI) ? ((Math.PI + (Math.PI - (camera.rotation.x - targetXRotation))) * -(180/Math.PI)).toFixed(2)+ "&#176" : ((camera.rotation.x - targetXRotation) * (180/Math.PI)).toFixed(2) + "&#176;" // opposite
		if ((camera.rotation.x - targetXRotation).between(-0.00355, 0.00355)) pitchColor = "rgb(92, 209, 255)"
		let pitchRotation = document.getElementById("pitch-rotation")
		pitchRotation.innerHTML = "&theta;-delta: " + xTargetDisplay
		pitchRotation.style.color = pitchColor

		let rollColor = "rgb(211, 46, 46)"
		let zTargetDisplay = (camera.rotation.z  > Math.PI) ? ((Math.PI + (Math.PI - (camera.rotation.z))) * -(180/Math.PI)).toFixed(2)+ "&#176" : ((camera.rotation.z ) * (180/Math.PI)).toFixed(2) + "&#176;" // opposite
		if ((camera.rotation.z).between(-0.00355, 0.00355)) rollColor = "rgb(92, 209, 255)"
		let rollRotation = document.getElementById("roll-rotation")
		rollRotation.innerHTML = "&phi;-delta: " + zTargetDisplay
		rollRotation.style.color = rollColor

		let yawColor = "rgb(211, 46, 46)"
		let yTargetDisplay = (camera.rotation.y > Math.PI/2) ? ((Math.PI + (Math.PI - (camera.rotation.y))) * -(180/Math.PI)).toFixed(2)+ "&#176" : ((camera.rotation.y) * (180/Math.PI)).toFixed(2) + "&#176;" // opposite
		if ((camera.rotation.y).between(-0.00355, 0.00355)) yawColor = "rgb(92, 209, 255)"
		let yawRotation = document.getElementById("yaw-rotation")
		yawRotation.innerHTML = "&psi;-delta: " + yTargetDisplay
		yawRotation.style.color = yawColor
	
		let pitchSpeed = document.getElementById("pitch-speed")
		pitchSpeed.innerHTML = "Pitch: " + (controls.moveState.pitch / 21).toFixed(3) + " &#176/s"
		if (controls.moveState.pitch > 0 ) {speedKeys.push("up-key")} else {slowKeys.push("up-key")}
		if (controls.moveState.pitch < 0 ) {speedKeys.push("down-key")} else {slowKeys.push('down-key')}

		let rollSpeed = document.getElementById("roll-speed")
		rollSpeed.innerHTML = "Roll: " + (controls.moveState.roll / 21).toFixed(3) + " &#176/s"
		if (controls.moveState.roll > 0 ) {speedKeys.push("q-key")} else {slowKeys.push('q-key')}
		if (controls.moveState.roll < 0 ) {speedKeys.push("e-key")} else {slowKeys.push('e-key')}

		let yawSpeed = document.getElementById("yaw-speed")
		yawSpeed.innerHTML = "Yaw: " + (controls.moveState.yaw / 21).toFixed(3) + " &#176/s"
		if (controls.moveState.yaw > 0 ) {speedKeys.push("left-key")} else {slowKeys.push('left-key')}
		if (controls.moveState.yaw < 0 ) {speedKeys.push("right-key")} else {slowKeys.push('right-key')}

		let forwardColor = "rgb(211, 46, 46)"
		if ((controls.moveState.forwardBack).between(-1, 1)) forwardColor = "rgb(92, 209, 255)"
		let forwardSpeed = document.getElementById("forward-speed")
		forwardSpeed.innerHTML = "Forward-speed: " + (controls.moveState.forwardBack /.46).toFixed(2)+ " m/s"
		forwardSpeed.style.color = forwardColor;
		if (controls.moveState.forwardBack > 0 ) {speedKeys.push("r-key")} else {slowKeys.push('r-key')}
		if (controls.moveState.forwardBack < 0 ) {speedKeys.push("f-key")} else {slowKeys.push('f-key')}

		let leftRightColor = "rgb(211, 46, 46)"
		if ((controls.moveState.leftRight).between(-1, 1)) leftRightColor = "rgb(92, 209, 255)"
		let leftRightSpeed = document.getElementById("left-right-speed")
		leftRightSpeed.innerHTML = "Left-Right-speed: " + (controls.moveState.leftRight /.46).toFixed(2)+ " m/s"
		leftRightSpeed.style.color = leftRightColor;
		if (controls.moveState.leftRight > 0 ) {speedKeys.push("a-key")} else {slowKeys.push('a-key')}
		if (controls.moveState.leftRight < 0 ) {speedKeys.push("d-key")} else {slowKeys.push('d-key')}

		let upDownColor = "rgb(211, 46, 46)"
		if ((controls.moveState.upDown).between(-1, 1)) upDownColor = "rgb(92, 209, 255)"
		let upDownSpeed = document.getElementById("up-down-speed")
		upDownSpeed.innerHTML = "Up-Down-speed: " + (controls.moveState.upDown /.46).toFixed(2)+ " m/s"
		upDownSpeed.style.color = upDownColor;
		if (controls.moveState.upDown > 0 ) {speedKeys.push("w-key")} else {slowKeys.push('w-key')}
		if (controls.moveState.upDown < 0 ) {speedKeys.push("s-key")} else {slowKeys.push('s-key')}

		speedKeys.forEach(id => {
			document.getElementById(id).style.color = 'rgb(80, 130, 255)'
		})

		slowKeys.forEach(id => {
			document.getElementById(id).style.color = 'white'
		})
	
	}
