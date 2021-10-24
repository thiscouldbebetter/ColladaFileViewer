
class Globals
{
	// instance
 
	static Instance = new Globals();
 
	// methods
 
	initialize(scene)
	{
		this.scene = scene;
 
		var viewSize = this.scene.camera.viewSize;
		this.displayHelper = new DisplayHelper(viewSize);
		this.displayHelper.initialize();
		this.displayHelper.drawScene(this.scene);
 
		this.inputHelper = new InputHelper();
		this.inputHelper.initialize();
	}
}
