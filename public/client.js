import * as THREE from '/build/three.module.js';
import {OrbitControls, MapControls} from '/jsm/controls/OrbitControls.js';
// import {FlyControls} from '/jsm/controls/FlyControls.js'
import Stats from '/jsm/libs/stats.module.js';
import {FlyControls} from './three_js_config/FlyControls.js'


			import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
			import { RenderPass } from './jsm/postprocessing/RenderPass.js';
			import { FilmPass } from './jsm/postprocessing/FilmPass.js';



// const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
// // camera.position.z = 2;
// // camera.position.x = 2
// // camera.position.y = 2
// camera.position.set(0, 0, 5)

// const renderer = new THREE.WebGLRenderer({antialias: true});
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // const controls = new OrbitControls(camera, renderer.domElement);
// const controls = new FlyControls(camera, renderer.domElement)
// // controls.enableDamping = true
// // controls.enableKeys = true
// // controls.update()
// const scene = new THREE.Scene();
// scene.add(camera)

// //cube background
// let materialArray = [];
// let texture_ft = new THREE.TextureLoader().load('corona_ft.png');
// let texture_bk = new THREE.TextureLoader().load('corona_bk.png');
// let texture_up = new THREE.TextureLoader().load('corona_up.png');
// let texture_dn = new THREE.TextureLoader().load('corona_dn.png');
// let texture_rt = new THREE.TextureLoader().load('corona_rt.png');
// let texture_lf = new THREE.TextureLoader().load('corona_lf.png');
// materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}))
// materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}))
// materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}))
// materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}))
// materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}))
// materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}))
// for(let i=0;i<6;i++)
//     materialArray[i].side=THREE.BackSide;
// const geometry = new THREE.BoxGeometry(10000, 10000, 10000);
// const cube = new THREE.Mesh(geometry, materialArray);
// //


// scene.add(cube);

// const circleGeometry = new THREE.CircleGeometry( 5, 32 );
// const circleMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
// const circle = new THREE.Mesh( circleGeometry, circleMaterial );
// circle.position.set(200,500,300)


// scene.add( circle );



// window.addEventListener('chagne', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     render();
// }, false);



// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     render();
// }, false);

// const stats = Stats();
// document.body.appendChild(stats.dom);





// var animate = function () {
//     requestAnimationFrame(animate);
//     // cube.rotation.x += 0.01;
//     // cube.rotation.y += 0.01;
//     // controls.update();

//     render();
//     stats.update();
// };



// function render() {
//     renderer.render(scene, camera);
//     // controls.update()
// }

// animate();

const radius = 6371;
			const tilt = 0.41;
			const rotationSpeed = 0.02;

			const cloudsScale = 1.005;
			const moonScale = 0.23;

			const MARGIN = 0;
			let SCREEN_HEIGHT = window.innerHeight - MARGIN * 2;
			let SCREEN_WIDTH = window.innerWidth;

			let camera, controls, scene, renderer, stats;
			let geometry, meshPlanet, meshClouds, meshMoon;
			let dirLight;

			let composer;

			const textureLoader = new THREE.TextureLoader();

			let d, dPlanet, dMoon;
			const dMoonVec = new THREE.Vector3();

			const clock = new THREE.Clock();

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 25, SCREEN_WIDTH / SCREEN_HEIGHT, 50, 1e7 );
				camera.position.z = radius * 5;

				scene = new THREE.Scene();
				scene.fog = new THREE.FogExp2( 0x000000, 0.00000025 );

				dirLight = new THREE.DirectionalLight( 0xffffff );
				dirLight.position.set( - 1, 0, 1 ).normalize();
				scene.add( dirLight );

				const materialNormalMap = new THREE.MeshPhongMaterial( {

					specular: 0x333333,
					shininess: 15,
					// map: textureLoader.load( "textures/planets/earth_atmos_2048.jpg" ),
					// specularMap: textureLoader.load( "textures/planets/earth_specular_2048.jpg" ),
					// normalMap: textureLoader.load( "textures/planets/earth_normal_2048.jpg" ),

					// y scale is negated to compensate for normal map handedness.
					normalScale: new THREE.Vector2( 0.85, - 0.85 )

				} );

				// planet

				geometry = new THREE.SphereBufferGeometry( radius, 100, 50 );

				meshPlanet = new THREE.Mesh( geometry, materialNormalMap );
				meshPlanet.rotation.y = 0;
				meshPlanet.rotation.z = tilt;
				scene.add( meshPlanet );

				// clouds

				const materialClouds = new THREE.MeshLambertMaterial( {

					map: textureLoader.load( "textures/planets/earth_clouds_1024.png" ),
					transparent: true

				} );

				meshClouds = new THREE.Mesh( geometry, materialClouds );
				meshClouds.scale.set( cloudsScale, cloudsScale, cloudsScale );
				meshClouds.rotation.z = tilt;
				scene.add( meshClouds );

				// moon

				const materialMoon = new THREE.MeshPhongMaterial( {

					map: textureLoader.load( "textures/planets/moon_1024.jpg" )

				} );

				meshMoon = new THREE.Mesh( geometry, materialMoon );
				meshMoon.position.set( radius * 5, 0, 0 );
				meshMoon.scale.set( moonScale, moonScale, moonScale );
				scene.add( meshMoon );

				// stars

				// const r = radius, starsGeometry = [ new THREE.BufferGeometry(), new THREE.BufferGeometry() ];

				// const vertices1 = [];
				// const vertices2 = [];

				// const vertex = new THREE.Vector3();

				// for ( let i = 0; i < 250; i ++ ) {

				// 	vertex.x = Math.random() * 2 - 1;
				// 	vertex.y = Math.random() * 2 - 1;
				// 	vertex.z = Math.random() * 2 - 1;
				// 	vertex.multiplyScalar( r );

				// 	vertices1.push( vertex.x, vertex.y, vertex.z );

				// }

				// for ( let i = 0; i < 1500; i ++ ) {

				// 	vertex.x = Math.random() * 2 - 1;
				// 	vertex.y = Math.random() * 2 - 1;
				// 	vertex.z = Math.random() * 2 - 1;
				// 	vertex.multiplyScalar( r );

				// 	vertices2.push( vertex.x, vertex.y, vertex.z );

				// }

				// starsGeometry[ 0 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices1, 3 ) );
				// starsGeometry[ 1 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices2, 3 ) );

				// const starsMaterials = [
				// 	new THREE.PointsMaterial( { color: 0x555555, size: 2, sizeAttenuation: false } ),
				// 	new THREE.PointsMaterial( { color: 0x555555, size: 1, sizeAttenuation: false } ),
				// 	new THREE.PointsMaterial( { color: 0x333333, size: 2, sizeAttenuation: false } ),
				// 	new THREE.PointsMaterial( { color: 0x3a3a3a, size: 1, sizeAttenuation: false } ),
				// 	new THREE.PointsMaterial( { color: 0x1a1a1a, size: 2, sizeAttenuation: false } ),
				// 	new THREE.PointsMaterial( { color: 0x1a1a1a, size: 1, sizeAttenuation: false } )
				// ];

				// for ( let i = 10; i < 30; i ++ ) {

				// 	const stars = new THREE.Points( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );

				// 	stars.rotation.x = Math.random() * 6;
				// 	stars.rotation.y = Math.random() * 6;
				// 	stars.rotation.z = Math.random() * 6;
				// 	stars.scale.setScalar( i * 10 );

				// 	stars.matrixAutoUpdate = false;
				// 	stars.updateMatrix();

				// 	scene.add( stars );

                // }
                // //cube background
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load('corona_ft.png');
let texture_bk = new THREE.TextureLoader().load('corona_bk.png');
let texture_up = new THREE.TextureLoader().load('corona_up.png');
let texture_dn = new THREE.TextureLoader().load('corona_dn.png');
let texture_rt = new THREE.TextureLoader().load('corona_rt.png');
let texture_lf = new THREE.TextureLoader().load('corona_lf.png');
materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}))
materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}))
materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}))
materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}))
materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}))
materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}))
for(let i=0;i<6;i++)
    materialArray[i].side=THREE.BackSide;
const backgroundGeometry = new THREE.BoxGeometry(100000, 100000, 100000);
const cube = new THREE.Mesh(backgroundGeometry, materialArray);
//


scene.add(cube);


				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
				document.body.appendChild( renderer.domElement );

				//

				controls = new FlyControls( camera, renderer.domElement );
                // controls.mousemove = function(){
                //     return null
                // }
                controls.dispose.mousemove
				controls.movementSpeed = 1000;
				controls.domElement = renderer.domElement;
				controls.rollSpeed = Math.PI / 24;
				controls.autoForward = false;
				controls.dragToLook = true;


        FlyControls.keydown = function ( event ) {

		if ( event.altKey ) {

			return;

		}

		//event.preventDefault();

		switch ( event.keyCode ) {

			case 16: /* shift */ this.movementSpeedMultiplier = .1; break;

			case 87: /*W*/ this.moveState.forward = 1; break;
			case 83: /*S*/ this.moveState.back = 1; break;

			case 65: /*A*/ this.moveState.left = 1; break;
			case 68: /*D*/ this.moveState.right = 1; break;

			case 82: /*R*/ this.moveState.up = 1; break;
			case 70: /*F*/ this.moveState.down = 1; break;

			case 40: /*up*/ this.moveState.pitchUp = 1; break;
			case 38: /*down*/ this.moveState.pitchDown = 1; break;

			case 37: /*left*/ this.moveState.yawLeft = 1; break;
			case 39: /*right*/ this.moveState.yawRight = 1; break;

			case 81: /*Q*/ this.moveState.rollLeft = 1; break;
			case 69: /*E*/ this.moveState.rollRight = 1; break;

		}

		this.updateMovementVector();
		this.updateRotationVector();

	};
				//

				stats = new Stats();
				document.body.appendChild( stats.dom );

				window.addEventListener( 'resize', onWindowResize, false );

				// postprocessing

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
				stats.update();

			}

			function render() {

				// rotate the planet and clouds

				const delta = clock.getDelta();

				meshPlanet.rotation.y += rotationSpeed * delta;
				meshClouds.rotation.y += 1.25 * rotationSpeed * delta;

				// slow down as we approach the surface

				dPlanet = camera.position.length();

				dMoonVec.subVectors( camera.position, meshMoon.position );
				dMoon = dMoonVec.length();

				if ( dMoon < dPlanet ) {

					d = ( dMoon - radius * moonScale * 1.01 );

				} else {

					d = ( dPlanet - radius * 1.01 );

				}

				controls.movementSpeed = 0.33 * d;
				controls.update( delta );

                composer.render( delta );
                
            }