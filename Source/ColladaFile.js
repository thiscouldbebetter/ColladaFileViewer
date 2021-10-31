
class ColladaFile
{
	static htmlCollectionToArray(htmlCollection)
	{
		var htmlCollectionAsArray = [];
		htmlCollectionAsArray.push(...htmlCollection);
		return htmlCollectionAsArray;
	}

	static sceneFromStringXML(colladaFileAsStringXML)
	{
		var parser = new DOMParser();
		var xmlDocument = parser.parseFromString
		(
			colladaFileAsStringXML, "text/xml"
		);
 
		var xmlElementRoot = xmlDocument.getElementsByTagName
		(
			"COLLADA"
		)[0];
 
		var xmlElementVisualScene = xmlDocument.getElementsByTagName
		(
			"library_visual_scenes"
		)[0].getElementsByTagName
		(
			"visual_scene"
		)[0];
 
		var camera = ColladaFile.sceneFromStringXML_Camera
		(
			xmlElementRoot,
			xmlElementVisualScene
		);
 
		var meshes = ColladaFile.sceneFromStringXML_Meshes
		(
			xmlElementRoot,
			xmlElementVisualScene
		);
 
		var scene = new Scene(camera, meshes);
 
		return scene;
	}
 
	static sceneFromStringXML_Camera
	(
		xmlElementRoot,
		xmlElementVisualScene
	)
	{
		var xmlElementCameraPerspective = xmlElementRoot.getElementsByTagName
		(
			"library_cameras"
		)[0].getElementsByTagName
		(
			"camera"
		)[0].getElementsByTagName
		(
			"optics"
		)[0].getElementsByTagName
		(
			"technique_common"
		)[0].getElementsByTagName
		(
			"perspective"
		)[0];
 
		var cameraViewSize = new Coords(200, 200, 0);
 
		var aspectRatioAsString = xmlElementCameraPerspective.getElementsByTagName
		(
			"aspect_ratio"
		)[0].innerHTML;
		var aspectRatio = parseFloat(aspectRatioAsString);
		cameraViewSize.x *= aspectRatio;
 
		var widthOfViewInDegreesAsString = xmlElementCameraPerspective.getElementsByTagName
		(
			"xfov"
		)[0].innerHTML;
		var widthOfViewInDegrees = parseFloat(widthOfViewInDegreesAsString);
		var radiansPerDegree = 2 * Math.PI / 360;
		var widthOfViewInRadians = widthOfViewInDegrees * radiansPerDegree;
		var widthOfViewInRadiansHalf = widthOfViewInRadians / 2;
		var cameraFocalLength =
			Math.cos(widthOfViewInRadiansHalf)
			* cameraViewSize.x / 2;
 
		var xmlElementsVisualSceneNode = ColladaFile.htmlCollectionToArray
		(
			xmlElementVisualScene.getElementsByTagName("node")
		);
 
		var xmlElementCamera = null;
 
		for (var i = 0; i < xmlElementsVisualSceneNode.length; i++)
		{
			var xmlElementNode = xmlElementsVisualSceneNode[i];
			var nodeName = xmlElementNode.getAttribute("name");
			if (nodeName == "Camera")
			{
				xmlElementCamera = xmlElementNode;
				break;
			}
		}
 
		var matrixForCameraTransformAsStrings = xmlElementCamera.getElementsByTagName
		(
			"matrix"
		)[0].innerHTML.split(" ");
		var matrixForCameraTransformAsNumbers = [];
		for (var i = 0; i < matrixForCameraTransformAsStrings.length; i++)
		{
			var valueAsString = matrixForCameraTransformAsStrings[i];
			matrixForCameraTransformAsNumbers[i] = parseFloat(valueAsString);
		}
		var matrixForCameraTransform = new Matrix
		(
			new Coords(4, 4), // size
			matrixForCameraTransformAsNumbers
		).transpose();
 
		var cameraPos = new Coords
		(
			matrixForCameraTransform.values[3],
			matrixForCameraTransform.values[7],
			matrixForCameraTransform.values[11]
		);
 
		var cameraForwardAndDown =
		[
			new Coords(0, 0, -1),
			new Coords(0, -1, 0)
		];
 
		for (var i = 0; i < cameraForwardAndDown.length; i++)
		{
			var coordsToTransform = cameraForwardAndDown[i];
			var matrixToTransform = Matrix.fromCoords
			(
				coordsToTransform
			);
			var matrixTransformed = matrixForCameraTransform.multiply(matrixToTransform);
			var coordsTransformed = matrixTransformed.toCoords();
			coordsToTransform.overwriteWith(coordsTransformed);
		}
 
		var cameraOrientation = new Orientation
		(
			cameraForwardAndDown[0],
			cameraForwardAndDown[1]
		);
 
		var camera = new Camera
		(
			cameraViewSize,
			cameraFocalLength,
			cameraPos,
			cameraOrientation
		);
 
		return camera;
	}
 
	static sceneFromStringXML_Meshes
	(
		xmlElementRoot,
		xmlElementVisualScene
	)
	{
		var meshes = [];
 
		var xmlElementsGeometry = xmlElementRoot.getElementsByTagName
		(
			"library_geometries"
		)[0].getElementsByTagName
		(
			"geometry"
		);
 
		for (var g = 0; g < xmlElementsGeometry.length; g++)
		{
			var xmlElementGeometry = xmlElementsGeometry[g];
 
			var mesh = ColladaFile.sceneFromStringXML_Meshes_Geometry
			(
				xmlElementGeometry
			);
 
			var xmlElementsVisualSceneNode = xmlElementVisualScene.getElementsByTagName
			(
				"node"
			);
 
			var xmlElementNodeForMesh = null;
 
			var meshNameEscaped = mesh.name.replace(/\./g, "_");
 
			for (var i = 0; i < xmlElementsVisualSceneNode.length; i++)
			{
				var xmlElementNode = xmlElementsVisualSceneNode[i];
				var nodeName = xmlElementNode.getAttribute("name");
				if (nodeName == meshNameEscaped)
				{
					xmlElementNodeForMesh = xmlElementNode;
					break;
				}
			}
 
			var matrixValuesAsStrings = xmlElementNodeForMesh.getElementsByTagName
			(
				"matrix"
			)[0].innerHTML.split(" ");
			var matrixValues = [];
			for (var mv = 0; mv < matrixValuesAsStrings.length; mv++)
			{
				var matrixValueAsString = matrixValuesAsStrings[mv];
				var matrixValue = parseFloat(matrixValueAsString);
				matrixValues.push(matrixValue);
			}
			var matrix = new Matrix
			(
				new Coords(4, 4), // size
				matrixValues
			).transpose();
			var meshPos = new Coords
			(
				matrixValues[3],
				matrixValues[7],
				matrixValues[11]
			);
			var transformTranslate = new Transform_Translate
			(
				meshPos
			);
			Transform.applyTransformToMesh(transformTranslate, mesh);
			// todo - Rotation.
 
			meshes.push(mesh);
		}
 
		return meshes;
	}
 
	static sceneFromStringXML_Meshes_Geometry(xmlElementGeometry)
	{
		var meshName = xmlElementGeometry.getAttribute("name");
 
		var vertices = ColladaFile.sceneFromStringXML_Meshes_Geometry_Vertices
		(
			xmlElementGeometry
		);
 
		var vertexIndicesForFaces = ColladaFile.sceneFromStringXML_Meshes_Geometry_Faces
		(
			xmlElementGeometry
		);
 
		var mesh = new Mesh
		(
			meshName,
			vertices,
			vertexIndicesForFaces
		);
 
		return mesh
	}
 
	static sceneFromStringXML_Meshes_Geometry_Vertices(xmlElementGeometry)
	{
		var vertices = [];
 
		var xmlElementsSource = xmlElementGeometry.getElementsByTagName
		(
			"mesh"
		)[0].getElementsByTagName
		(
			"source"
		);
 
		var geometryID = xmlElementGeometry.getAttribute("id");
		var sourceIDForVertexPositions = geometryID + "-positions";
		var xmlElementVertexPositions = null;
 
		for (var s = 0; s < xmlElementsSource.length; s++)
		{
			var xmlElementSource = xmlElementsSource[s];
			var sourceID = xmlElementSource.getAttribute("id");
			if (sourceID == sourceIDForVertexPositions)
			{
				xmlElementVertexPositions = xmlElementSource.getElementsByTagName
				(
					"float_array"
				)[0];
				break;
			}
		}
 
		var vertexPositionsAsString = xmlElementVertexPositions.innerHTML;
		var vertexPositionsAsStrings = vertexPositionsAsString.split(" ");
 
		for (var i = 0; i < vertexPositionsAsStrings.length; i += 3)
		{
			var vertexPos = new Coords
			(
				parseFloat(vertexPositionsAsStrings[i]),
				parseFloat(vertexPositionsAsStrings[i + 1]),
				parseFloat(vertexPositionsAsStrings[i + 2])
			);
 
			var vertex = new Vertex(vertexPos);
 
			vertices.push(vertex);
		}
 
		return vertices;
	}
 
	static sceneFromStringXML_Meshes_Geometry_Faces(xmlElementGeometry)
	{
		var xmlElementMesh = xmlElementGeometry.getElementsByTagName
		(
			"mesh"
		)[0];

		var xmlElementVertices = xmlElementMesh.getElementsByTagName
		(
			"vertices"
		)[0];

		var xmlElementSourceVertexPositionsId = ColladaFile.htmlCollectionToArray
		(
			xmlElementVertices.getElementsByTagName("input")
		).filter
		(
			x => x.getAttribute("semantic") == "POSITION"
		)[0].getAttribute
		(
			"source"
		);

		xmlElementSourceVertexPositionsId =
			xmlElementSourceVertexPositionsId.substring(1);

		var vertexCoordinates = ColladaFile.htmlCollectionToArray
		(
			xmlElementMesh.getElementsByTagName
			(
				"source"
			)
		).filter
		(
			x => x.id == xmlElementSourceVertexPositionsId
		)[0].getElementsByTagName
		(
			"float_array"
		)[0].innerHTML.split(" ").map
		(
			x => parseFloat(x)
		);
 
		var vertexPositions = [];
		var numberOfDimensions = 3;
		for (var i = 0; i < vertexCoordinates.length; i += numberOfDimensions)
		{
			var vertexPos = new Coords
			(
				vertexCoordinates[i],
				vertexCoordinates[i + 1],
				vertexCoordinates[i + 2]
			);

			vertexPositions.push(vertexPos);
		}

		var xmlElementTriangles = xmlElementMesh.getElementsByTagName
		(
			"triangles"
		)[0];

		var xmlElementTrianglesInputs =
			ColladaFile.htmlCollectionToArray
			(
				xmlElementTriangles.getElementsByTagName
				(
					"input"
				)
			);

		var numberOfInterleavedDataStreams =
			xmlElementTrianglesInputs.length;

		var offsetOfDataStreamForFaceVertexIndices = parseInt
		(
			xmlElementTrianglesInputs.filter
			(
				x => x.getAttribute("semantic") == "VERTEX"
			)[0].getAttribute
			(
				"offset"
			)
		);

		var dataStreamsForTrianglesInterleaved =
			xmlElementTriangles.getElementsByTagName
			(
				"p"
			)[0].innerHTML.split(" ").map
			(
				x => parseInt(x)
			);

		var verticesPerTriangle = 3;
		var numberOfDataPoints = dataStreamsForTrianglesInterleaved.length;
		var numberOfTriangles =
			numberOfDataPoints
			/ numberOfInterleavedDataStreams
			/ verticesPerTriangle;

		var vertexIndicesForFaces = [];

		for (var t = 0; t < numberOfTriangles; t++)
		{
			var vertexIndicesForFace = [];

			var triangleVertexIndex0Index =
				t
				* verticesPerTriangle
				* numberOfInterleavedDataStreams
				+ offsetOfDataStreamForFaceVertexIndices;

			for (var d = 0; d < verticesPerTriangle; d++)
			{
				var vertexIndexIndex =
					triangleVertexIndex0Index
					+ d * numberOfInterleavedDataStreams;

				var vertexIndex =
					dataStreamsForTrianglesInterleaved[vertexIndexIndex];

				vertexIndicesForFace.push(vertexIndex);
			}

			vertexIndicesForFaces.push(vertexIndicesForFace);
		}

		return vertexIndicesForFaces;
	}

	toStringXml()
	{
		var d = document;

		// Camera.

		// todo - More camera stuff.

		var elementAspectRatio = d.createElement("aspect_ratio");
		elementAspectRatio.innerHTML = "todo";

		var elementXfov = d.createElement("xfov");
		elementXfov.innerHTML = "[widthOfViewInDegreesAsString]";

		var elementPerspective = d.createElement("perspective");
		elementPerspective.appendChild(elementAspectRatio);
		elementPerspective.appendChild(elementXfov);

		var elementTechniqueCommon = d.createElement("technique_common");
		elementTechniqueCommon.appendChild(elementPerspective);
		var elementOptics = d.createElement("optics");
		elementOptics.appendChild(elementTechniqueCommon);
		var elementCamera = d.createElement("camera");
		elementCamera.appendChild(elementOptics);
		var elementLibraryCameras = d.createElement("library_cameras");
		elementLibraryCameras.appendChild();

		// Meshes.
		var elementLibraryGeometries = d.createElement("library_geometries");

		for (var m = 0; m < this.meshes.length; m++)
		{
			var elementGeometry = d.createElement("geometry");

			// todo - Mesh.

			elementLibraryGeometries.appendChild(elementGeometry);
		}
 
		// Scene.
		var elementVisualScene = d.createElement("visual_scene");
		elementVisualScene.appendChild(elementLibraryCameras);
		elementVisualScene.appendChild(elementLibraryGeometries);

		var elementLibraryVisualScenes =
			d.createElement("library_visual_scenes");
		elementLibraryVisualScenes.appendChild(elementVisualScene);

		var elementCOLLADA = d.createElement("COLLADA");
		elementCOLLADA.appendChild(elementLibraryVisualScenes);

		var sceneAsStringXml = elementCOLLADA.outerHTML;

		return sceneAsStringXml;
	}
}
