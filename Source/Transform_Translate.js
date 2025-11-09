
class Transform_Translate
{
	constructor(displacement)
	{
		this.displacement = displacement;
	}

	static fromDisplacement(displacement)
	{
		return new Transform_Translate(displacement);
	}

	applyToCoords(coordsToTransform)
	{
		coordsToTransform.add(this.displacement);
	}
}
