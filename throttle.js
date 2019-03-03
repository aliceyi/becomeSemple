function throttle(fn, interval) {
    var isfirst = true;
    var timer = null;
    return function() {
        var self = this, args = arguments
        if (isfirst) {
            fn.apply(self, args)
            return isfirst = false
        }
        if(timer){
            return false
        }
        timer = setTimeout(() => {
            window.clearTimeout(timer)
            timer = null
            fn.apply(self, args)
        }, interval);
    }
}

window.onresize = throttle(function() {
    console.log('throttle')
}, 600)