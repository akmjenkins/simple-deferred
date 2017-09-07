# Simple Deferred
---

Simple Deferred is a class backed by an underlying [promise][p] that has publicly exposed the promise's `resolve` and `reject` methods.

  [p]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

### Usage
---
```js
import Deferred from 'simple-deferred';

let def = new Deferred();

def.then(function(value) {
	console.log(value);
})

//do some long running operation

def.resolve(42);
//logs 42
```

### API
---

#### .resolve([value])
Resolve the underlying promise. See [Promise.resolve][promise-resolve]. 
Attempting to `resolve` an instance of `Deferred` that has already been settled (i.e. resolved or rejected) will result in an error.

  [promise-resolve]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve

#### .reject([value])
Reject the underlying promise. See [Promise.reject][promise-reject].
Attempting to `resolve` an instance of `Deferred` that has already been settled (i.e. resolved or rejected) will result in an error.

  [promise-reject]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject

#### .then(fn)
Attach a callback to the underlying promise to be fired when the Deferred is resolved. See [Promise.prototype.then][promise-then].

  [promise-then]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then


#### .catch(fn)
Attach a callback to the underlying promise to be fired when the Deferred is rejected. See [Promise.prototype.catch][promise-catch].

  [promise-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch

### Properties
---

#### promise
The underlying promise of the deferred object