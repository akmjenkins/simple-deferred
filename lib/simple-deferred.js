'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleDeferred = function () {
	function SimpleDeferred() {
		var _this = this;

		_classCallCheck(this, SimpleDeferred);

		var isResolved = false;
		var isRejected = false;
		var resolvor;
		var rejector;

		var tryToSettle = function tryToSettle() {
			if (isResolved) {
				throw new Error('Deferred has already been resolved');
			}

			if (isRejected) {
				throw new Error('Deferred has already been rejected');
			}

			return true;
		};

		this.resolve = function (value) {
			tryToSettle();
			isResolved = true;
			resolvor.call(_this.promise, value);
			return _this.promise;
		};

		this.reject = function (value) {
			tryToSettle();
			isRejected = true;
			rejector.call(_this.promise, value);
			return _this.promise;
		};

		this.promise = new Promise(function (res, rej) {
			resolvor = res, rejector = rej;
		});
	}

	_createClass(SimpleDeferred, [{
		key: 'then',
		value: function then() {
			return this.promise.then.apply(this.promise, arguments);
		}
	}, {
		key: 'catch',
		value: function _catch() {
			return this.promise.catch.apply(this.promise, arguments);
		}
	}]);

	return SimpleDeferred;
}();

exports.default = SimpleDeferred;