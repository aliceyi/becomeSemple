function curring (fn) {
    var args = []
    function ccc() {
        if (arguments.length === 0) {
            return fn.apply(this, args)
        } else {
            debugger
            var currentArgs = Array.from(arguments)[0]
            console.log(`暂存${arguments[1] ? arguments[1] : ''}月，金额${arguments[0]}`)
            args.push(currentArgs)
            return ccc
        }
    } 
    return ccc
}

var count = (function() {
 let totalCost = 0 
 return function() {
     for(var i=0;i<arguments.length; i++) {
         totalCost += arguments[i]
     }
     console.log(`共消费：${totalCost}`)
     return totalCost
 }
})()

count = curring(count)
count(100,1)
count(100, 2)
count()