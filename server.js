const express = require('express');
const app = express();
const path = require('path');
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
  	 	 	return null;
  	}	
  })
	readables.i = 0;

	//readables.push(message);
	//readables.push(null);
	//readables.on('readable', ()=>{
	//	let data;
	//	while (data=readables.read(2)) {
	//		console.log(data);
	//		res.write(data);
	//	}
	//});
		readables.on('data',(chunk)=>{
			console.log(chunk.length);
			res.write(chunk);
			readables.pause();
			setTimeout(()=> {
			readables.resume();	
			},500)
		})
		readables.on('end',()=>{
			res.end();
		})
	//readables.pipe(res);
});
app.get('/HelloWorld', (req,res)=>{
	res.send(message);
});
app.get('/test',(req,res)=>{
	var i=0;
	const interval = setInterval(()=>{
		if(i<message.length) {
			res.write(message[i++]);
		} else {
			clearInterval(interval);
			res.end();
		}
	},500)
});
app.listen(port, ()=>console.log(`App listening on port ${port}`));
