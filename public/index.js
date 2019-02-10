const decoder = new TextDecoder();

(function(){
	const dest = document.getElementById('withoutWriter'); 
	fetch('/HelloWorldStream')
		.then(response =>response.text())
	  .then(text=> {
	  	var node = document.createTextNode(text);
	  	dest.appendChild(node);
	  })
		.catch(err=>console.log(err))
})();

(function(){
	const dest = document.getElementById('withWriter'); 
	const writer = new WritableStream({
		write(chunk) {
			return new Promise((resolve, reject)=>{
				var node = document.createTextNode(decoder.decode(chunk));
				dest.appendChild(node);
				resolve();
			})
		}
	});
	fetch('/HelloWorldStream')
		.then(response=> response.body)// response body is a readable stream so can be piped to writable stream
		.then(body=> body.pipeTo(writer))
		.catch(err=>console.log(err))
})();
