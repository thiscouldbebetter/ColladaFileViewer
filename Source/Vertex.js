
class Vertex
{
	constructor(pos)
	{
		this.pos = pos;
		this.edgeIndices = [];
		this.faceIndices = [];
	}

	static fromPos(pos)
	{
		return new Vertex(pos);
	}

	static manyFromPositions(positions)
	{
		var returnValues = [];
 
		for (var i = 0; i < positions.length; i++)
		{
			var position = positions[i];
			var vertex = new Vertex(position);
			returnValues.push(vertex);
		}
 
		return returnValues;
	}
}
