
class Orientation
{
	constructor(forward, down)
	{
		this.forward = forward.clone().normalize();
		this.down = down.clone().normalize();
		this.right = new Coords();
		this.orthogonalizeAxes();
	}

	orthogonalizeAxes()
	{
		this.right.overwriteWith
		(
			this.down
		).normalize().crossProduct
		(
			this.forward
		).normalize();
 
		this.down.overwriteWith
		(
			this.forward
		).crossProduct
		(
			this.right
		).normalize();
	}
}
