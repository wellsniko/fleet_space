import * as THREE from '/build/three.module.js';
import {OrbitControls, MapControls} from '/jsm/controls/OrbitControls.js';
// import {FlyControls} from '/jsm/controls/FlyControls.js'
import Stats from '/jsm/libs/stats.module.js';
import {FlyControls} from './three_js_config/FlyControls.js'
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';


			import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
			import { RenderPass } from './jsm/postprocessing/RenderPass.js';
			import { FilmPass } from './jsm/postprocessing/FilmPass.js';



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

				dirLight = new THREE.DirectionalLight( 0xffffff, 7 );
                dirLight.position.set( - 1, 0, 1 ).normalize();
                let dirLight2 = new THREE.DirectionalLight( 0xffffff, 3 );
                dirLight2.position.set( 20000, 1000, -50000 ).normalize();
                let dirLight3 = new THREE.DirectionalLight( 0xffffff, 4 );
                dirLight3.position.set( 10000, 20000, 0 ).normalize();
				scene.add( dirLight, dirLight2, dirLight3 );




                

                let loader = new GLTFLoader();     
                loader.load('./death_star/scene.gltf', function(gltf){
                    let deathStar = gltf.scene.children[0];
                    deathStar.scale.set(6,6,6)
                    scene.add(deathStar)
                    scene.add(gltf.scene);
                    renderer.render(scene, camera)
                })
                //     const textureLoader = new THREE.TextureLoader()


                //     const materialNormalMap = new THREE.MeshPhongMaterial( {

				// 	specular: 0x333333,
				// 	shininess: 0,
					
				// 	specularMap: textureLoader.load( "/death_star/textures/02_-_Default_normal.png" ),
				// 	normalMap: textureLoader.load( "/death_star/textures/03_-_Default_normal.png" ),

				// 	// y scale is negated to compensate for normal map handedness.
				// 	// normalScale: new THREE.Vector2( 0.85, - 0.85 )

				// } );

                // geometry = new THREE.SphereBufferGeometry(100, 100, 50)

                // let meshDeath = new THREE.Mesh(geometry, materialNormalMap, deathStar)
                // scene.add(meshDeath)


                // })
                // deathStar.add(scene)

                // const materialNormalMap = new THREE.MeshPhongMaterial( {

				// 	specular: 0x333333,
				// 	shininess: 0,
				// 	map: deathStar,
				// 	specularMap: textureLoader.load( "/death_star/textures/02_-_Default_normal.png" ),
				// 	normalMap: textureLoader.load( "/death_star/textures/03_-_Default_normal.png" ),

				// 	// y scale is negated to compensate for normal map handedness.
				// 	normalScale: new THREE.Vector2( 0.85, - 0.85 )

				// } );

           
                // scene.add(MaterialNormalMap)






                // let loader = new GLTFLoader();
                // loader.load('./death_star/scene.gltf', function(gltf){
                //     let deathStar = gltf.scene.children[0];
                //     deathStar.scale.set(8,8,8)
                //     scene.add(gltf.scene);
                //     renderer.render(scene, camera)
                // })
            

				// planet

				// geometry = new THREE.SphereBufferGeometry( radius, 100, 50 );

				// meshPlanet = new THREE.Mesh( geometry, materialNormalMap );
				// meshPlanet.rotation.y = 0;
				// meshPlanet.rotation.z = tilt;
				// scene.add( meshPlanet );

				// // clouds

				// const materialClouds = new THREE.MeshLambertMaterial( {

				// 	map: textureLoader.load( "textures/planets/earth_clouds_1024.png" ),
				// 	transparent: true

				// } );

				// meshClouds = new THREE.Mesh( geometry, materialClouds );
				// meshClouds.scale.set( cloudsScale, cloudsScale, cloudsScale );
				// meshClouds.rotation.z = tilt;
				// scene.add( meshClouds );

				// // moon

				// const materialMoon = new THREE.MeshPhongMaterial();

				// meshMoon = new THREE.Mesh( geometry, materialMoon );
				// meshMoon.position.set( radius * 5, 0, 0 );
				// meshMoon.scale.set( moonScale, moonScale, moonScale );
				// scene.add( meshMoon );

	
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

				// meshPlanet.rotation.y += rotationSpeed * delta;
				// meshClouds.rotation.y += 1.25 * rotationSpeed * delta;

				// // slow down as we approach the surface

				// dPlanet = camera.position.length();

				// dMoonVec.subVectors( camera.position, meshMoon.position );
				// dMoon = dMoonVec.length();

				// if ( dMoon < dPlanet ) 

				// 	d = ( dMoon - radius * moonScale * 1.01 );

				// } else {

				// 	d = ( dPlanet - radius * 1.01 );

				// }

				// controls.movementSpeed = 0.33 * d;
				controls.update( delta );

                composer.render( delta );
                renderer.render(scene, camera)
                
            }