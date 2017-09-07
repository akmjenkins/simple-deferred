import Deferred from '../src/simple-deferred';

(() => {
	//use with existing promises
	let deferred = new Deferred();
	(new Promise((resolve,reject) => {
		resolve(deferred)
	})).then((value) => console.log(value));

	setTimeout(() => deferred.resolve(42),1000);
})();

(() => {
	//use on it's own
	let deferred = new Deferred();
	deferred.then((value) => {
		console.log(value);
	});
	setTimeout(() => deferred.resolve(42),1000);
})();