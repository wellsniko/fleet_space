import * as THREE from '/build/three.module.js';
import {OrbitControls, MapControls} from '/jsm/controls/OrbitControls.js';
// import {FlyControls} from '/jsm/controls/FlyControls.js'
import Stats from '/jsm/libs/stats.module.js';
import {FlyControls} from './three_js_config/FlyControls.js'
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { FilmPass } from './jsm/postprocessing/FilmPass.js';
// import {renderShipControls} from '/ship_controls.js'
	


    // const radius = 6371;
	// const tilt = 0.5;
	const targetX= -20
	const targetY= 530
	const targetZ= -24040
	const targetXRotation = (-26 * Math.PI/180)
	
	// var shipStats= document.createElement('div')
	// shipStats.id = "ship-stats"
	
	let SCREEN_HEIGHT = window.innerHeight
	let SCREEN_WIDTH = window.innerWidth;

	let camera, controls, scene, renderer, stats;
	// let geometry,
	let dirLight, dirLight2, dirLight3;
	let composer;
	const textureLoader = new THREE.TextureLoader();
	// const aPlanet = new THREE.Vector3();
	const clock = new THREE.Clock();
	let loader = new GLTFLoader();  

	let shipUpdateCounter = 0
	init();
	animate();
	// renderShipStats()

	function init() {
		scene = new THREE.Scene();
		
		camera = new THREE.PerspectiveCamera( 25, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000000 );
		camera.position.set(-9000,40000,90000)
		camera.rotation.x = 345 * Math.PI/180
		// scene.fog = new THREE.FogExp2( 0x000000, 0.00000025 );
		dirLight = new THREE.DirectionalLight( 0xffffff, 7 );
        dirLight.position.set( - 1, 0, 1 ).normalize();
        dirLight2 = new THREE.DirectionalLight( 0xffffff, 3 );
        dirLight2.position.set( 20000, 1000, -50000 ).normalize();
        dirLight3 = new THREE.DirectionalLight( 0xffffff, 4 );
		dirLight3.position.set( 10000, 20000, 0 ).normalize();
		
		scene.add( dirLight, dirLight2, dirLight3 );

        loader.load('./death_star/scene.gltf', function(gltf){
            let deathStar = gltf.scene.children[0]
			deathStar.position.set(0,0,-25000)
			deathStar.scale.set(3,3,3)
            scene.add(deathStar)
            // scene.add(gltf.scene);
            renderer.render(scene, camera)
		});
// 		var spriteText = new THREE.SpriteText({ text: 'Hello world!' });
// scene.add( spriteText );


					
		let circleMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
		let circleGeometry = new THREE.CircleGeometry( 250, 64 );
		circleGeometry.vertices.shift();
		let deathCircle = new THREE.LineLoop( circleGeometry, circleMaterial ) 
		deathCircle.position.set(-20,530,-24040)
		deathCircle.rotation.x = -26 * Math.PI/180

    	let circle2Material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
		let circle2Geometry = new THREE.CircleGeometry( 250, 64 );
		circle2Geometry.vertices.shift();
		let death2Circle = new THREE.LineLoop( circle2Geometry, circle2Material ) 
		death2Circle.position.set(-20,2968.663,-19040)
		death2Circle.rotation.x = -26 * Math.PI/180

		let circle3Material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
		let circle3Geometry = new THREE.CircleGeometry( 500, 64 );
		circle3Geometry.vertices.shift();
		let death3Circle = new THREE.LineLoop( circle3Geometry, circle3Material ) 
		death3Circle.position.set(-20,7845.989,-9040)
		death3Circle.rotation.x = -26 * Math.PI/180
	
		let circle4Material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
		let circle4Geometry = new THREE.CircleGeometry( 1000, 64 );
		circle4Geometry.vertices.shift();
		let death4Circle = new THREE.LineLoop( circle4Geometry, circle4Material ) 
		death4Circle.position.set(-20,12723.315,960)
		death4Circle.rotation.x = -26 * Math.PI/180
		scene.add(deathCircle, death2Circle, death3Circle, death4Circle);

	
        let materialArray = [];
        let texture_ft = new THREE.TextureLoader().load('./skybox/front.png');
        let texture_bk = new THREE.TextureLoader().load('./skybox/back.png');
        let texture_up = new THREE.TextureLoader().load('./skybox/top.png');
        let texture_dn = new THREE.TextureLoader().load('./skybox/bot.png');
        let texture_rt = new THREE.TextureLoader().load('./skybox/left.png');
        let texture_lf = new THREE.TextureLoader().load('./skybox/right.png');
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

		
		controls = new FlyControls( camera, renderer.domElement );
        controls.dispose.mousemove
		controls.movementSpeed = 10000;
		controls.domElement = renderer.domElement;
		controls.rollSpeed = Math.PI / 24;
		controls.autoForward = false;
		controls.dragToLook = true;


			
		// var element1 = document.createElement( 'div' );
        //     /*element1.className = 'element1';*/
        //     /*element1.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';*/
        //     element1.style.backgroundColor = 'rgb(255, 0, 0)';
        //     element1.style.width = '150px';
        //     element1.style.height = '150px';

        //     var object1 = new THREE.CSS3DObject( element1 );
        //     object1.position.x = positions[i][0]
        //     object1.position.y = positions[i][1]
        //     object1.position.z = positions[i][2]
        //     object1.lookAt(camera.position);
        //     scene.add( object1 );
			
		// stats = new Stats();
		// document.body.appendChild( stats.dom );
		// let helloThere = "hello there"
		// helloThere.domElement = renderer.domElement
		// // document.body.appendChild(helloThere.dom)

		window.addEventListener( 'resize', onWindowResize, false );

		const renderModel = new RenderPass( scene, camera );
		const effectFilm = new FilmPass( 0.35, 0.75, 2048, false );
		composer = new EffectComposer( renderer );
		composer.addPass( renderModel );
		composer.addPass( effectFilm );
	}

	function onWindowResize() {
		SCREEN_HEIGHT = window.innerHeight;
		SCREEN_WIDTH = window.innerWidth;

		camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
		camera.updateProjectionMatrix();

		renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
		composer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	}
	

	function animate() {
		requestAnimationFrame( animate );
		render();
		// stats.update();
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
		document.getElementById("x").innerHTML = "X-axis delta:" + (targetX-camera.position.x)
		document.getElementById("y").innerHTML = "Y-axis delta:" + (targetY-camera.position.y)
		document.getElementById("z").innerHTML = "Z-axis delta:" + (targetZ-camera.position.z)
		// statX.innerHTML = "X-axis delta:" + (targetX-camera.position.x)
		// console.log(statX)
		
	}

		// let xStat = document.getElementById("x").innerHTML 
		// if (xStat.innerHTML !== "X-axis delta:" + (targetX-camera.position.x)) xStat.innerHTML = "X-axis delta:" + (targetX-camera.position.x)

		// let yStat = document.getElementById("y")
		// if (yStat.innerHTML !== "Y-axis delta:" + (targetY-camera.position.y)) yStat.innerHTML = "Y-axis delta:" + (targetY-camera.position.y)

		// let zStat = document.getElementById("z")
		// if (zStat.innerHTML !== "Z-axis delta:" + (targetZ-camera.position.z)) zStat.innerHTML = "Z-axis delta:" + (targetZ-camera.position.z)


	