var entity = require("./mongoEntity");

function test() {
	entity.insert('testcollection',[{"naveen":2,"panwar":3}]).then(function(result){
		console.log(result.result.ok);
		entity.update('testcollection',{"naveen":2,"panwar":3}, {"panwar":4}).then(function(result){
			console.log(result.result.ok);
			entity.read('testcollection',{"naveen":2,"panwar":4}).then(function(result){
				console.log(result.length);
				entity.remove('testcollection',{"naveen":2,"panwar":4}).then(function(result){
					console.log(result.result.ok);
					return;
				}).catch(function(error){
					console.log("Here is the error");
					console.log(error);
				});
			}).catch(function(error){
				console.log("Here is the error");
				console.log(error);
			});
		}).catch(function(error){
			console.log("Here is the error");
			console.log(error);
		});
	}).catch(function(error){
		console.log(error);
	});
}

test();
