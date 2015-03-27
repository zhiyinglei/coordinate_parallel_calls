module.exports = function composedCall(args, cb){

	var pending = 0;
	var results =[];
	var calledback = false;


	call1(args, handlingResult());
	call2(args, handlingResult());
	call3(args, handlingResult());

	function handlingResult(){
		var order = pending;
		pending ++;
		return function(err, result){
			pending--
			if(err){
				callback(err);
			}
			else{
				results[order] = result;
				if(! pending){
					callback(null, results)
				}
			}
		};
	};

	function callback(err, value){
		if (! calledback){
			calledback = true;
			cb(err, value);
		}
	}




};




///  Calls

function call1(args, cb){
	//console.log("in call 1");
	setTimeout(cb, randomTimeout(), null, randomValue());
};

function call2(args, cb){
	//console.log("in call 2");
	setTimeout(cb, randomTimeout(), null, randomValue());
};

function call3(args, cb){
	//console.log("in call 3");
	setTimeout(cb, randomTimeout(), null, randomValue());
};

//  Utils

function randomTimeout(){
	return Math.floor(Math.random() * 1e3);
};

function randomValue(){
	return Math.floor(Math.random() * 1e10);
};

