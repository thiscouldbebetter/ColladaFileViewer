
class Mesh
{
	constructor(name, vertices, vertexIndicesForFaces)
	{
		this.name = name;
		this.vertices = vertices;
	 
		this.color = "Blue";
	 
		this.faces = [];
	 
		this.edges = [];
		var vertexIndicesMinMaxToEdgeIndexLookup = [];
	 
		for (var f = 0; f < vertexIndicesForFaces.length; f++)
		{
			var vertexIndicesForFace = vertexIndicesForFaces[f];
			var numberOfVerticesInFace = vertexIndicesForFace.length; 
	 
			var face = new Face(vertexIndicesForFace);
	 
			for (var vi = 0; vi < numberOfVerticesInFace; vi++)
			{
				var viNext = (vi + 1) % numberOfVerticesInFace;
	 
				var vertexIndex = vertexIndicesForFace[vi];
				var vertexIndexNext = vertexIndicesForFace[viNext];
	 
				var vertex = this.vertices[vertexIndex];
				var vertexNext = this.vertices[vertexIndexNext];
	 
				vertex.faceIndices.push(f);
	 
				var vertexIndexMin = Math.min(vertexIndex, vertexIndexNext);
				var vertexIndexMax = Math.max(vertexIndex, vertexIndexNext);
	 
				var vertexIndexMaxToEdgeIndexLookup =
					vertexIndicesMinMaxToEdgeIndexLookup[vertexIndexMin];
	 
				if (vertexIndexMaxToEdgeIndexLookup == null)
				{
					vertexIndexMaxToEdgeIndexLookup = [];
					vertexIndicesMinMaxToEdgeIndexLookup[vertexIndexMin] =
						vertexIndexMaxToEdgeIndexLookup;
				}
	 
				var edgeIndex = vertexIndexMaxToEdgeIndexLookup[vertexIndexMax];
	 
				if (edgeIndex == null)
				{
					var edge = new Edge([vertexIndexMin, vertexIndexMax]);
					edgeIndex = this.edges.length;
					this.edges.push(edge);
				}
	 
				vertexIndexMaxToEdgeIndexLookup[vertexIndexMax] = edgeIndex;
	 
				// hack
				// Is there away to avoid this indexOf call?
	 
				if (face.edgeIndices.indexOf(edgeIndex) == -1)
				{
					face.edgeIndices.push(edgeIndex);
				}
			}
	 
			for (var ei = 0; ei < face.edgeIndices.length; ei++)
			{
				var edgeIndex = face.edgeIndices[ei];
				var edge = this.edges[edgeIndex];
				edge.faceIndices.push(f);
	 
				for (var vi = 0; vi < edge.vertexIndices.length; vi++)
				{
					var vertexIndex = edge.vertexIndices[vi];
					var vertex = this.vertices[vertexIndex];
	 
					// hack
					// Is there away to avoid this indexOf call?
					if (face.edgeIndices.indexOf(edgeIndex) == -1)
					{
						face.edgeIndices.push(edgeIndex);
					}
				}
			}
	 
			this.faces.push(face);
		}
	 
	} // end Mesh constructor
}
