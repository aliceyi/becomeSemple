Function.prototype.aopBefore = function (fn) {
    var _this = this; // 保存原函数的引用
    //返回包括原函数和新函数的“代理”函数
    return function() {
        fn.apply(this, arguments) // 调用回调函数
        return _this.apply(this, arguments) // 调用原函数
    }
}

Function.prototype.aopAfter = function (fn) {
    var _this = this // 保存原函数的引用
    return function () {
       var current = _this.apply(this, arguments) // 调用原函数
       fn.apply(this, arguments) //调用新函数回调函数
       return current
    }
}

var aopFun = function () {
    console.log('aop')
}
aopFun = aopFun.aopBefore(function() {
    console.log('before')
}).aopAfter(function() {
    console.log('after')
})

aopFun()