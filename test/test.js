import assert from 'assert';
import Deferred from '../src/simple-deferred';

//instance of Deferred
var deferred;

//before each test, create deferred
beforeEach(() => {
  deferred = new Deferred(); 
  return true 
});

describe('only settle once',() => {

  it('should not resolve more than once',() => {
    assert.throws(
      () => { 
        deferred.resolve(1); 
        deferred.resolve(2); 
      },
      (err) => {
        return /Deferred has already been resolved/.test(err);
      },
      'unexpected error'
    );
  })

  it('should not reject more than once',() => {
    assert.throws(
      () => { 
        deferred.reject(1).catch(function() { /* catch so node doesn't flip out about unhandle promise reject */ });
        deferred.reject(2); 
      },
      (err) => {
        return /Deferred has already been rejected/.test(err);
      },
      'unexpected error'
    );
  })

  it('should not resolve and then reject',() => {
    assert.throws(
      () => { 
        deferred.resolve(1); 
        deferred.reject(2); 
      },
      (err) => {
        return /Deferred has already been resolved/.test(err);
      },
      'unexpected error'
    );
  })

});

describe('settles with correct arguments',() => {

  it('should resolve with correct argument',(done) => {
    deferred.then((value) => done(assert.ok(value === 1)))
    deferred.resolve(1);
  });

  it('should reject with correct argument',(done) => {
    deferred.catch((value) => done(assert.ok(value === 1)))
    deferred.reject(1);
  });

});

describe('is chainable',() => {

  it('should immediately call then after resolve',(done) => {
    deferred.resolve().then(() => done(assert.ok(true)))
  });

  it('should immediately call catch after reject',(done) => {
    deferred.reject().catch(() => done(assert.ok(true)))
  });

  it('should call previously attached then when resolved',(done) => {
    deferred.then(() => done(assert.ok(true)))
    deferred.resolve();
  });

  it('should call previously attached catch when rejected',(done) => {
    deferred.catch(() => done(assert.ok(true)))
    deferred.reject();
  });

  it('should immediately call second argument to then after reject',(done) => {
    deferred.reject(1).then(
      () => {},
      () => done(assert.ok(true)) 
    )
  });

  it('should chain reject',(done) => {
    deferred
      .reject(1)
      .catch(() => { throw new Error('error')})
      .catch((err) => done(assert.ok(/error/.test(err))))
  })

});

describe('can be used in an existing promise chain',() => {

  it('should be able to resolve',(done) => {
    Promise.resolve()
      .then(() => deferred.resolve(1))
      .then((value) => done(assert.ok(value === 1)))
  })

  it('should be able to reject',(done) => {
    Promise.resolve()
      .then(() => deferred.reject(1))
      .catch((value) => done(assert.ok(value === 1)))
  })

  it('should be able to resolve using Promise.resolve',(done) => {
    Promise.resolve(deferred)
      .then((value) => done(assert.ok(value === 10)))
    deferred.resolve(10);
  })

});