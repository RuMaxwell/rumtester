/** File compiled from TypeScript */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var TestSuccess = (function () {
    function TestSuccess() {
    }
    Object.defineProperty(TestSuccess.prototype, "message", {
        get: function () { return 'All tests passed.'; },
        enumerable: true,
        configurable: true
    });
    TestSuccess.prototype.combine = function (result) {
        return result;
    };
    return TestSuccess;
}());
var TestFailed = (function () {
    function TestFailed(caseName, detailMessage) {
        this.caseName = caseName;
        this.caseMessage = "Test failed in " + caseName + ":";
        this.msg = detailMessage;
    }
    Object.defineProperty(TestFailed.prototype, "message", {
        get: function () { return this.caseMessage + "\n    " + this.msg; },
        enumerable: true,
        configurable: true
    });
    TestFailed.prototype.combine = function (result) {
        if (result instanceof TestSuccess) {
            return this;
        }
        else if (result.caseName === result.caseName) {
            this.msg += "\n    " + result.msg;
            return this;
        }
        else {
            throw new Error('Combining test results with distinct case names is not allowed');
        }
    };
    return TestFailed;
}());
var TestHandler = (function () {
    function TestHandler(caseName, actualValue) {
        this.caseName = caseName;
        this.actualValue = actualValue;
        this.equalityPredicate = function (e, a) { return e === a; };
        this.testResult = new TestSuccess();
        this.failPredicate = function (e, a) { return "Expected " + e + ", got " + a; };
    }
    TestHandler.prototype.equalBy = function (predicate) {
        this.equalityPredicate = predicate;
        return this;
    };
    TestHandler.prototype.whenFail = function (predicate) {
        this.failPredicate = predicate;
        return this;
    };
    TestHandler.prototype.expect = function (value) {
        if (!this.equalityPredicate(this.actualValue, value)) {
            this.testResult = this.testResult.combine(new TestFailed(this.caseName, this.failPredicate(value, this.actualValue)));
        }
        return this;
    };
    TestHandler.prototype.andHaving = function (value) {
        this.equalityPredicate = TestHandler.defaultEqualityPredicate;
        this.failPredicate = TestHandler.defaultFailPredicate;
        this.actualValue = value;
        return this;
    };
    TestHandler.prototype.result = function () {
        return this.testResult;
    };
    TestHandler.defaultEqualityPredicate = function (e, a) { return e === a; };
    TestHandler.defaultFailPredicate = function (e, a) { return "Expected " + e + ", got " + a; };
    return TestHandler;
}());
function Having(caseName, value) {
    return new TestHandler(caseName, value);
}
exports.Having = Having;
//# sourceMappingURL=test_header.js.map