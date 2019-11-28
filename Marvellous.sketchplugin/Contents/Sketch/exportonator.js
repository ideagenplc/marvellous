@import 'common.js'

var onRun = function(context) {

  //reference the sketch document and layer(s)
	var sketch = require('sketch')
	var doc = context.document;
	var selection = context.selection;

	//make sure something is selected
	if(selection.count() == 0){

		alert("Nothing Selected","Please select an artboard to iconate");

	}else{

		var gotArtboards = 0;

		//loop through the selected layers
		for(var i = 0; i < selection.count(); i++){

			//checks to see if the layer is an artboard
			if(selection[i].class() == "MSArtboardGroup" || "MSSymbolInstance"){

				//get the artboard frame & dimensions
				var artboard = selection[i];
				var artboardFrame = artboard.frame();
				var artboardWidth = artboardFrame.width();
				var artboardHeight = artboardFrame.height();

				// create invisible rectangle and move to back
				let ShapePath = sketch.ShapePath
				let mySquare = new ShapePath({
				    parent: artboard,
				    frame: { x: 0, y: 0, width: artboardWidth, height: artboardHeight },
				    style: { fills: ['#ffffff00'], borders: [{color: '#ffffff00', thickness: 0}]}
				});
				mySquare.moveToBack();
				mySquare.hasClippingMask = true;
				mySquare.clippingMaskMode = 0;

				// group and remove the parent for each layer
				let Group = require('sketch').Group;
				var thisGroup = new Group({
					name: artboard.name(),
					layers: artboard.layers().slice(),
					parent: artboard,
					locked: false,
				});
				thisGroup.adjustToFit();

				//Export SVGs
				var sketchExport = require('sketch/dom');
					sketchExport.export(thisGroup, {
					formats: 'svg',
					scales: '1, 2, 3',
					trimmed: false,
					overwriting: true,
					output: '~/Desktop/Sketch Exports'
				})

				//put it all back where you found it
				mySquare.remove();
				thisGroup.ungroup();

				//send an alert message with the new values
				gotArtboards += 1;
			  doc.showMessage("Iconated " + gotArtboards + " Artboards");

			}
		}
		if(gotArtboards == 0){

			alert("No Artboard Selected","Please select something to iconate");

    }
	}
}
