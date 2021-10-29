
class Camera
{
	constructor(viewSize, focalLength, pos, orientation)
	{
		this.viewSize = viewSize;
		this.focalLength = focalLength;
		this.pos = pos;
		this.orientation = orientation;
	 
		this.viewSizeHalf = this.viewSize.clone().divideScalar(2);
	}

	transformWorldToViewCoords(coordsToTransform)
	{
		coordsToTransform.subtract
		(
			this.pos
		).overwriteWithXYZ
		(
			coordsToTransform.dotProduct(this.orientation.right),
			coordsToTransform.dotProduct(this.orientation.down),
			coordsToTransform.dotProduct(this.orientation.forward)
		);
 
		var depth = coordsToTransform.z;
 
		coordsToTransform.multiplyScalar
		(
			this.focalLength
		).divideScalar
		(
			depth
		).add
		(
			this.viewSizeHalf
		);
 
		return coordsToTransform;
	}
}
