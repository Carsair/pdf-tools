var pdfreader = require('pdfreader');
var fs = require('fs');

var inFileName = 'sample.pdf'
var file = [];
var page = 0;

new pdfreader.PdfReader().parseFileItems(inFileName, function(err, item){
	if (!item) {
		handleParsedFile(file);
	} else if (item.page) {
		page = item.page;
		file[page] = [];
	} else if (item.text) {
		file[page].push.apply(file[page], item.text.split(/\s/));
	}
});

var handleParsedFile = (file) => {
	if (file[6] && file[6][20]) {
		outFileName = `${file[6][20]}.pdf`
		fs.copyFileSync(inFileName, outFileName);
		console.log(`CREATED FILE ${outFileName} from the contents of ${inFileName}!`);
	}
}
