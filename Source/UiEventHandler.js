
class UiEventHandler
{
	static inputFileToLoad_Changed(inputFileToLoad)
	{
		var file = inputFileToLoad.files[0];
		var fileReader = new FileReader();
		fileReader.onload = UiEventHandler.inputFileToLoad_Changed_2;
		fileReader.readAsText(file, "UTF-8");
	}

	static inputFileToLoad_Changed_2(event)
	{
		var fileReader = event.target;
		var fileContentsAsString = fileReader.result;
	 
		var scene =
			ColladaFile.sceneFromStringXML(fileContentsAsString);

		Globals.Instance.initialize(scene);
	}
}
