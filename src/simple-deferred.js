export default class SimpleDeferred {

	constructor()
	{
		var isResolved = false;
		var isRejected = false;
		var resolvor;
		var rejector;

		var tryToSettle = () => {
			if(isResolved) {
				throw new Error('Deferred has already been resolved');
			}

			if(isRejected) {
				throw new Error('Deferred has already been rejected');
			}

			return true;
		}

		this.resolve = (value) => {
			tryToSettle();
			isResolved = true;		
			resolvor.call(this.promise,value);
			return this.promise;
		};

		this.reject = (value) => {
			tryToSettle();
			isRejected = true;
			rejector.call(this.promise,value);
			return this.promise;
		};

		this.promise = new Promise((res,rej) => { resolvor = res,rejector = rej; });

	}

	then()
	{
		return this.promise.then.apply(this.promise,arguments);
	}

	catch()
	{
		return this.promise.catch.apply(this.promise,arguments);
	}

}