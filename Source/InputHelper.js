
class InputHelper
{
	initialize()
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
		document.body.onkeyup = this.handleEventKeyUp.bind(this);
	}
 
	// events
 
	handleEventKeyDown(event)
	{
		this.keyCodePressed = event.keyCode;
 
		var scene = Globals.Instance.scene;
		var camera = scene.camera;
		var distanceToMove = .1;
		var amountToTurn = .1;
 
		if (this.keyCodePressed == 65) // A
		{
			camera.pos.subtract
			(
				camera.orientation.right.clone().multiplyScalar
				(
					distanceToMove
				)
			);
		}
		else if (this.keyCodePressed == 67) // C
		{
			camera.orientation.forward.add
			(
				camera.orientation.right.clone().multiplyScalar
				(
					amountToTurn
				)
			);
 
			camera.orientation.orthogonalizeAxes();
		}
		else if (this.keyCodePressed == 68) // D
		{
			camera.pos.add
			(
				camera.orientation.right.clone().multiplyScalar
				(
					distanceToMove
				)
			);
		}
		else if (this.keyCodePressed == 69) // E
		{
			camera.orientation.down.add
			(
				camera.orientation.right.clone().multiplyScalar
				(
					amountToTurn
				)
			);
 
			camera.orientation.orthogonalizeAxes();
		}
		else if (this.keyCodePressed == 70) // F
		{
			camera.pos.add
			(
				camera.orientation.down.clone().multiplyScalar
				(
					distanceToMove
				)
			);
		}
		else if (this.keyCodePressed == 81) // Q
		{
			camera.orientation.down.subtract
			(
				camera.orientation.right.clone().multiplyScalar
				(
					amountToTurn
				)
			);
 
			camera.orientation.orthogonalizeAxes();
		}
		else if (this.keyCodePressed == 82) // R
		{
			camera.pos.subtract
			(
				camera.orientation.down.clone().multiplyScalar
				(
					distanceToMove
				)
			);
		}
		else if (this.keyCodePressed == 83) // S
		{
			camera.pos.subtract
			(
				camera.orientation.forward.clone().multiplyScalar
				(
					distanceToMove
				)
			);
		}
		else if (this.keyCodePressed == 87) // W
		{
			camera.pos.add
			(
				camera.orientation.forward.clone().multiplyScalar
				(
					distanceToMove
				)
			);
		}
		else if (this.keyCodePressed == 90) // Z
		{
			camera.orientation.forward.subtract
			(
				camera.orientation.right.clone().multiplyScalar
				(
					amountToTurn
				)
			);
 
			camera.orientation.orthogonalizeAxes();
		}
 
		Globals.Instance.displayHelper.drawScene(scene);
	}
 
	handleEventKeyUp(event)
	{
		this.keyCodePressed = null;
	}
}
