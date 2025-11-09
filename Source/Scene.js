
class Scene
{
	constructor(camera, meshes)
	{
		this.camera = camera;
		this.meshes = meshes;
	}

	static fromCameraAndMeshes(camera, meshes)
	{
		return new Scene(camera, meshes);
	}
}
