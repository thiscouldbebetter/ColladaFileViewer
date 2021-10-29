
class Transform
{
	static applyTransformToMesh(transform, mesh)
	{
		var vertices = mesh.vertices;
 
		for (var i = 0; i < vertices.length; i++)
		{
			var vertex = vertices[i];
			transform.applyToCoords(vertex.pos);
		}
	}
}
