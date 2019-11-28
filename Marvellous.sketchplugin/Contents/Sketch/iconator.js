@import 'common.js'

var onRun = function(context) {

  //reference the sketch document and layer(s)
	var sketch = require('sketch')
	var doc = context.document;
	var selection = context.selection;

	//make sure something is selected
	if(selection.count() == 0){

		alert("Nothing Selected","Please select an icon to iconate");

	}else{

		var gotIcons = 0;

		//loop through the selected layers
		for(var i = 0; i < selection.count(); i++){

			//checks to see if the layer is an Icon
			if(selection[i].class() == "MSSymbolInstance"){

				//get the Icon frame & dimensions
				var icon = selection[i];
				var iconFrame = icon.frame();
				var iconNameParts = icon.name().split("/");
				var iconName = iconNameParts[iconNameParts.length - 1];

				// create invisible rectangle and move to back
				let ShapePath = sketch.ShapePath
				let mySquare = new ShapePath({
				    parent: icon.parentGroup(),
				    frame: { x: iconFrame.x(), y: iconFrame.y(), width: iconFrame.width(), height: iconFrame.height() },
				    style: { fills: ['#f00fff00'], borders: [{color: '#f00fff00', thickness: 0}]}
				});
				mySquare.moveBackward();
				mySquare.hasClippingMask = true;
				mySquare.clippingMaskMode = 0;

				// group and remove the parent for each layer
				let Group = require('sketch').Group;
				var thisGroup = new Group({
					name: iconName,
					layers: [mySquare,icon].slice(),
					parent: icon.parentGroup(),
					locked: false,
				});
				thisGroup.adjustToFit();

				//Slice SVGs
				thisGroup.exportFormats = [
				    //{fileFormat: 'png',size: '2x',suffix: '@2x'},
				    {fileFormat: 'svg', size: '1x'}
				]
				gotIcons += 1;
			}
		}
		if(gotIcons == 0){

			alert("No Icons Selected","Please select something to iconate");

    } else {

			// You will need to reload the inspector to see the changes appear there
			doc.sketchObject.inspectorController().reload();

			//send an alert message with the new values
			doc.showMessage("Iconated " + gotIcons + " Icons");
		}
	}
}
