@import 'common.js'

var onRun = function(context) {

    //reference the sketch document
	var doc = context.document;
	//reference what is selected
	var selection = context.selection;

	//make sure something is selected
	if(selection.count() == 0){

		doc.showMessage("Please select something.");

	}else{
    
		//loop through the selected layers
		for(var i = 0; i < selection.count(); i++){

			//checks to see if the layer is an artboard
			if(selection[i].class() == "MSArtboardGroup"){

				//reference the selection
				var artboard = selection[i];

				//get the artboard frame for dimensions
				var artboardFrame = artboard.frame();
				//get the width
				var artboardWidth = artboardFrame.width();
				//get the height
				var artboardHeight = artboardFrame.height();

				//set a new width variable to the old height
				var newArtboardWidth = artboardHeight;
				//set a new height variable to the old width
				var newArtboardHeight = artboardWidth;

				//set the artboard frame with the new dimensions
				artboardFrame.setWidth(newArtboardWidth);
				artboardFrame.setHeight(newArtboardHeight);

				//send an alert message with the new values
				var alertMessage = "New Height: "+newArtboardHeight+ " | New Width: "+newArtboardWidth;
				alert("Artboard Rotated!", alertMessage);

			}else{

				doc.showMessage("Please select an artboard.");

      }
		}
	}
}
