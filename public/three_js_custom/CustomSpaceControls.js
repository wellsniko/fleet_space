import { EventDispatcher, Quaternion, Vector3 } from '../three/build/three.module.js';

var CustomSpaceControls = function ( object, domElement ) {

	if ( domElement === undefined ) {

		console.warn( 'THREE.CustomSpaceControls: The second parameter "domElement" is now mandatory.' );
		domElement = document;

	}

	this.object = object;
	this.domElement = domElement;

	if ( domElement ) this.domElement.setAttribute( 'tabindex', - 1 );

	this.movementSpeed = 1.0;
	this.rollSpeed = 0.005;

	this.dragToLook = false;
	this.autoForward = false;

	var scope = this;
	var changeEvent = { type: 'change' };
	var EPS = 0.000001;

	this.tmpQuaternion = new Quaternion();

	this.mouseStatus = 0;

	this.moveState = { upDown: 0, leftRight: 0, forwardBack: 0, pitch: 0, yaw: 0, roll: 0 };
	this.moveVector = new Vector3( 0, 0, 0 );
	this.rotationVector = new Vector3( 0, 0, 0 );


		this.keydown = function ( event ) {

		if ( event.altKey ) {

			return;

		}

		switch ( event.keyCode ) {

			case 13: /*R*/ this.moveState.forwardBack += .5; break;
			case 16: /*F*/ this.moveState.forwardBack -= .5; break;

			case 65: /*A*/ this.moveState.leftRight += .5; break;
			case 68: /*D*/ this.moveState.leftRight -= .5; break;

			case 87: /*W*/ this.moveState.upDown += .5; break;
			case 83: /*S*/ this.moveState.upDown -= .5; break;

			case 38: /*up*/ this.moveState.pitch += .5; break;
			case 40: /*down*/ this.moveState.pitch -= .5; break;

			case 37: /*left*/ this.moveState.yaw += .5; break;
			case 39: /*right*/ this.moveState.yaw -= .5; break;

			case 81: /*Q*/ this.moveState.roll += .5; break;
			case 69: /*E*/ this.moveState.roll -= .5; break;

		}

		this.updateMovementVector();
		this.updateRotationVector();

	};


	this.update = function () {

		var lastQuaternion = new Quaternion();
		var lastPosition = new Vector3();

		return function ( delta ) {

			var moveMult = delta * scope.movementSpeed;
			var rotMult = delta * scope.rollSpeed;

			scope.object.translateX( scope.moveVector.x * moveMult );
			scope.object.translateY( scope.moveVector.y * moveMult );
			scope.object.translateZ( scope.moveVector.z * moveMult );

			scope.tmpQuaternion.set( scope.rotationVector.x * rotMult, scope.rotationVector.y * rotMult, scope.rotationVector.z * rotMult, 1 ).normalize();
			scope.object.quaternion.multiply( scope.tmpQuaternion );

			if (
				lastPosition.distanceToSquared( scope.object.position ) > EPS ||
				8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS
			) {

				scope.dispatchEvent( changeEvent );
				lastQuaternion.copy( scope.object.quaternion );
				lastPosition.copy( scope.object.position );

			}

		};

	}();


		this.updateMovementVector = function () {

		this.moveVector.x = ( - this.moveState.leftRight);
		this.moveVector.y = ( this.moveState.upDown);
		this.moveVector.z = ( - this.moveState.forwardBack);

	};

	this.updateRotationVector = function () {

		this.rotationVector.x = ( this.moveState.pitch);
		this.rotationVector.y = ( this.moveState.yaw);
		this.rotationVector.z = ( this.moveState.roll);

	};

	this.getContainerDimensions = function () {

		if ( this.domElement != document ) {

			return {
				size: [ this.domElement.offsetWidth, this.domElement.offsetHeight ],
				offset: [ this.domElement.offsetLeft, this.domElement.offsetTop ]
			};

		} else {

			return {
				size: [ window.innerWidth, window.innerHeight ],
				offset: [ 0, 0 ]
			};

		}

	};

	function bind( scope, fn ) {

		return function () {
			fn.apply( scope, arguments );
		};

	}

	function contextmenu( event ) {

		event.preventDefault();

	}

	this.dispose = function () {

		this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
		window.removeEventListener( 'keydown', _keydown, false );

	};

	var _keydown = bind( this, this.keydown );

	this.domElement.addEventListener( 'contextmenu', contextmenu, false );

	window.addEventListener( 'keydown', _keydown, false );
	

	this.updateMovementVector();
	this.updateRotationVector();

};

CustomSpaceControls.prototype = Object.create( EventDispatcher.prototype );
CustomSpaceControls.prototype.constructor = CustomSpaceControls;

export { CustomSpaceControls };
