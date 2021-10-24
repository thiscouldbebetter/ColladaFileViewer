
class Edge
{
	constructor(vertexIndices)
	{
		this.vertexIndices = vertexIndices;
		this.faceIndices = [];
	}

	midpoint(mesh)
	{
		var returnValue = mesh.vertices[this.vertexIndices[0]].pos.clone().add
		(
			mesh.vertices[this.vertexIndices[1]].pos
		).divideScalar(2);
 
		return returnValue;
	}
 
	vertexPositions(mesh)
	{
		var returnValue =
		[
			mesh.vertices[this.vertexIndices[0]].pos,
			mesh.vertices[this.vertexIndices[1]].pos,
		];
 
		return returnValue;
	}
}
