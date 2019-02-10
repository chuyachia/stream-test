const express = require('express');
const app = express();
const { Readable } = require('stream');
const port = 3000;

app.use(express.static('public'));

const message ='Hello World!'; 
app.get('/HelloWorldStream', (req,res)=> {
	var interval;
  const readables = new Readable({
  	read(size) {
			this.push(message[this.i++]);
  	 	if (this.i >= message.length)
  	 	 	this.push(null);
  	}	
  })
	readables.i = 0;

	readables.on('data',(chunk)=>{
		res.write(chunk);
		readables.pause();
		setTimeout(()=> {
			readables.resume();	
		},500)
	})
	readables.on('end',()=>{
		res.end();
	})
	// pipe equivalent on on('event')
	//readables.pipe(res);
});

app.listen(port, ()=>console.log(`App listening on port ${port}`));
