const decoder = new TextDecoder();
const writer = new WritableStream({
	write(chunk) {
		return new Promise((resolve, reject)=>{
			console.log(decoder.decode(chunk));
			resolve();
		})
	}
});
(function(){
	const dest = document.getElementById('withoutWriter'); 
	fetch('/test')
		.then(response=> response.text())
		.then(text=> {
			console.log(text);
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
		.then(response=> response.body)
		.then(body=> body.pipeTo(writer))
		.catch(err=>console.log(err))
})();
//fetch('/HelloWorldStream')
//	.then(response=> response.text())
//	.then(text =>console.log(text)) 
//.then(function(response) {
//  var reader = response.body.getReader();
//  var bytesReceived = 0;
//
//  reader.read().then(function processResult(result) {
//    if (result.done) {
//      console.log("Fetch complete");
//      return;
//    }
//console.log(decoder.decode(result.value,{stream:true}));
//    return reader.read().then(processResult);
//  });
//})	
//	.then(response=>response.body)
//	.then(body=>{
//		const reader = body.getReader();
//		var interval;
//		return new ReadableStream({
//			start(controller) {
//				interval = setInterval(()=>{
//					reader.read().then(({done,value})=>{
//				 		if (done) {
//							controller.close();
//							clearInterval(interval);
//							return;
//						}	
//						controller.enqueue(value);
//					})	
//				},1000);
//			},
//			cancel() {
//				clearInterval(interval);
//			}
//		})
//	})
//.then(body=> body.pipeTo(writer))
//	.catch(err=>console.log(err))

//fetch('/HelloWorld')
//  .then(response=>response.text())
//	.then(text => console.log(text))
//	.catch(err=>console.log(err))
