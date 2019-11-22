@import 'common.js'

var onRun = function(context) {

  //reference the Application
  var app = [NSApplication sharedApplication];

  //reference the Sketch Document
  var doc = context.document;

  //reference all the pages in the document in an array
  var pages = [doc pages];

  //loop through the pages of the document
  for (var i = 0; i < pages.count(); i++){
    //reference each page
    var page = pages[i];

    //get the name of the page
    var pageName = [page name];

    //show the page name in the console
    //log(pageName);
  }

  //show a message at the bottom of Sketch
  doc.showMessage("Tim is Awesome!");

  alert("Check out my alert box! Also, read the text at the bottom of the screen for important info.", "Oh Yeah, it's an Alert Box");

}
