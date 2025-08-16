let counter;
let oldTime;
let newTime;
let timeoutTime;
let myTimeout;
let isWorking = false;

//let maxError = 0;

function initialisation(inputBPM = 120){
	counter = 0;
	oldTime = Date.now();
	newTime = oldTime;
	timeoutTime = 1000 * 60 / inputBPM;
	isWorking = true;
	myTimeout = setTimeout(metronom, 10);
}

function stopMetronom(){
	isWorking = false;
}

function metronom(){
	
	if(isWorking === true){
		
		newTime = Date.now();
		
		if(newTime - oldTime >= timeoutTime) {
			//console.log(maxError)
			
			//if(newTime - oldTime > maxError) maxError = newTime - oldTime;

			oldTime += timeoutTime;
			while(newTime - oldTime >= timeoutTime){
				oldTime += timeoutTime;
				counter++;
			}
			
			self.postMessage(counter);

			counter++;
		}
		
		myTimeout = setTimeout(metronom, 10);
		
	}
	
}


self.onmessage = function(e) {
	
	let inputMessage = e.data;

	if(typeof inputMessage === "number"){
		if(inputMessage > 600) inputMessage = 600;
		if(inputMessage < 20) inputMessage = 20;
		initialisation(inputMessage);
	}
	else{
		if(inputMessage === "stop"){
			stopMetronom();
		}
		else{
			console.log("Metronom error");
		}
	}

};

