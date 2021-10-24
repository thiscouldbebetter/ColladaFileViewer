
class Transform_Translate
{
	constructor(displacement)
	{
		this.displacement = displacement;
	}

	applyToCoords(coordsToTransform)
	{
		coordsToTransform.add(this.displacement);
	}
}
