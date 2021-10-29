
class DisplayHelper
{
	constructor(viewSize)
	{
		this.viewSize = viewSize;
	}

	clear()
	{
		this.graphics.fillStyle = "Black";
		this.graphics.fillRect
		(
			0,
			0,
			this.viewSize.x,
			this.viewSize.y
		);
 
		this.graphics.strokeStyle = "Gray";
		this.graphics.strokeRect
		(
			0,
			0,
			this.viewSize.x,
			this.viewSize.y
		);
	}
 
	drawMeshForCamera(mesh, camera)
	{
		this.graphics.strokeStyle = mesh.color;
 
		var drawPos = new Coords();
 
		var drawEdges = true;
		if (drawEdges == true)
		for (var e = 0; e < mesh.edges.length; e++)
		{
			var edge = mesh.edges[e];
 
			var vertexIndexStart = edge.vertexIndices[0];
			var vertexIndexEnd = edge.vertexIndices[1];
 
			var vertexStart = mesh.vertices[vertexIndexStart];
			var vertexEnd = mesh.vertices[vertexIndexEnd];
 
			var vertexStartPos = vertexStart.pos;
			var vertexEndPos = vertexEnd.pos;
 
			this.graphics.beginPath();
 
			drawPos.overwriteWith(vertexStartPos);
			camera.transformWorldToViewCoords(drawPos);
 
			this.graphics.moveTo(drawPos.x, drawPos.y);
 
			drawPos.overwriteWith(vertexEndPos);
			camera.transformWorldToViewCoords(drawPos);
			this.graphics.lineTo(drawPos.x, drawPos.y);
			this.graphics.stroke();
		}
 
		var drawVertices = true;
		if (drawVertices == true)
		{
			for (var v = 0; v < mesh.vertices.length; v++)
			{
				var vertex = mesh.vertices[v];
				var vertexPos = vertex.pos;
				drawPos.overwriteWith(vertexPos);
				camera.transformWorldToViewCoords(drawPos);
				this.graphics.beginPath();
				this.graphics.arc
				(
					drawPos.x, drawPos.y, // center
					3, // radius
					0, Math.PI * 2 // start and stop angles
				);
				this.graphics.stroke();
			}
		}
	}
 
	drawScene(scene)
	{
		this.clear();
 
		for (var m = 0; m < scene.meshes.length; m++)
		{
			var mesh = scene.meshes[m];
			this.drawMeshForCamera(mesh, scene.camera);
		}
	}
 
	initialize()
	{
		var canvas = document.createElement("canvas");
		canvas.width = this.viewSize.x;
		canvas.height = this.viewSize.y;
 
		this.graphics = canvas.getContext("2d");
 
		var divOutput = document.getElementById("divOutput");
		divOutput.innerHTML = "";
		divOutput.appendChild(canvas);
	}
}
