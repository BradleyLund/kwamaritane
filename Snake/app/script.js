
// Requiring fs module in which 
// readFile function is defined. 
const fs = require('fs') 
const http = require('http')

http.createServer(function (req, res) {
	fs.readFile('Scores.txt', (err, data) => { 
		if (err) throw err; 

		console.log(data.toString()); 
	});
}).listen(8080);
 
