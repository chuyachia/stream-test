const axios = require('axios');
const fetch = require('node-fetch');
const {Writable, Transform} = require('stream');

const writables = new Writable({
	write(chunk,encoding, callback) {
		console.log(chunk.toString());
		callback();
	}
})

const transform = new Transform({
	transform(chunk, encoding, callback) {
		setTimeout(()=>{
			this.push(chunk);
			callback();
		},1000);
	}
})
axios.get('http://localhost:3000/HelloWorld')
	.then(response=> {
		console.log(response.data);
	})
	.catch(err => console.log(err));

//axios.get('http://localhost:3000/HelloWorldStream',{responseType:'stream'})
//	.then(response=>
//  	response.data.pipe(writables)
//	)
//	.catch(err => console.log(err));
fetch('http://localhost:3000/HelloWorldStream')
	.then(response=>response.body)
	.then(body=> body.pipe(transform).pipe(writables))
	.catch(err=>console.log(err))
