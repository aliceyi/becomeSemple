/**
 * 一个依赖收集器
 */
class Dep {
    constructor() {
        this.deps = []
    }
    /**
     * 依赖收集
     */
    depend() {
        if(Dep.target && this.deps.indexOf(Dep.target) === -1){
            this.deps.push(Dep.target)
        }
    }
    /**
     * 通知每个依赖
     */
    notify() {
        this.deps.forEach(function(dep) {
            dep()
        })
    }
}
/**
 * 将每个对象都转化成，可监听对象
 */
class Observable{
    constructor(obj) {
       return this.walk(obj)
    }
    walk(obj) {
        debugger
        const self = this
        const keys = Object.keys(obj)
        keys.forEach(function(key){
            self.defineReactive(obj,key, obj[key])
        })
        return obj
    }
    defineReactive (obj,key, val) {
        const dep = new Dep()
        Object.defineProperty(obj,key,{
            get() {
                // 依赖收集
                dep.depend()
                return val
            },
            set(newval) {
                val = newval
                // 通知相关依赖
                dep.notify()
            }
        })
    }
}
/**
 * 观察者
 * @param {Object} obj  被观测对象
 * @param {string} key 被观测对象 key
 * @param {function} cb 回调函数，返回“计算属性”的值
 * @param {function} onComputedUpdata  当计算属性的值被更新时调用
 */

class Watcher{
    constructor(obj, key, cb, onComputedUpdata) {
        this.obj = obj
        this.key = key
        this.cb = cb
        this.onComputedUpdata = onComputedUpdata
        return this.definComputed()
    }
    definComputed() {
        const self = this
        const onDepUpdate = function() {
            const val = self.cb()
            self.onComputedUpdata(val)
        }
        Object.defineProperty(self.obj, self.key, {
            get() {
                Dep.target = onDepUpdate
                const val = self.cb()
                Dep.target = null
                return val
            },
            set() {
                console.error('计算属性无法被赋值！')
            }
        })
    }
}

var hero = new Observable({
    health: 3000,
    IQ:160
})

new Watcher(hero, 'type', function() {
    return hero.health > 3000 ? 'tanke': 'cuipi'
}, function(val) {
    console.log('我的类型是'+ val)
})

hero.type
hero.health = 300
hero.type