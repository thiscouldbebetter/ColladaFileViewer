ColladaFileViewer
=================

The JavaScript code in this repository partially implements a rudimentary
Collada file viewer.  To see it in action, open the file
Source/ColladaFileViewer.html in a web browser that runs JavaScript,
then specify a Collada file to display.  You can then use the W, A, S, D
and surrounding keys to move the camera around to view the scene from
different angles.

A Collada file encodes a scene composed of three-dimensional models.
Its standard file extension is .dae.

A sample .dae file, generated from the default single-cube scene in
Blender3D, is provided in the Samples directory.  This program will
successfully open it and render it, though the rendering code still
needs some improvement.

<img src="Screenshot.png" />
