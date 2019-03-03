
/**
 * 定义一个“依赖收集器”
 */
class Dep{
    constructor() {
        this.deps = []
    }
    depend() {
        if(Dep.target && this.deps.indexOf(Dep.target) === -1) {
            this.deps.push(Dep.target)
        }
    }
    notify() {
        this.deps.forEach(function(dep){
            dep()
        })
    }
} 
Dep.target = null


/**
 * 使一个对象转化成可观测对象
 * @param {*} obj 
 * @param {*} key 
 * @param {*} val 
 */
function defineReactive(obj, key, val) {
    var dep = new Dep()
    Object.defineProperty(obj,key, {
        get() {
            console.log(`我的${key}属性被读取了！`)
debugger
            dep.depend()
            return val
        },
        set(newval) {
            console.log(`我的${key}属性被修改了！`)
            val = newval
            dep.notify()
        }
    })
}
/**
 * 把一个对象的每一项都转化成可观测对象
 */

 function observable(obj) {
     const keys = Object.keys(obj)
     keys.forEach(function(key) {
        defineReactive(obj, key, obj[key])
     })
     return obj
 }
 /**
  * 当计算属性的值被更新时调用
  */
 function onComputedUpdate(val) {
     console.log(`我的类型是：${val}`);
 }


 /**
  * 观察者
  * @param {*} obj  被观测对象
  * @param {*} key 被观测对象 key
  * @param {*} cb 回调函数，返回“计算属性”的值
  */
 function watcher(obj, key ,cb) {
      // 定义一个被动触发函数，当这个“被观测对象”的依赖更新时调用
      const onDepUpdate = function() {
          debugger
          const val = cb()
          onComputedUpdate(val)
      }
    Object.defineProperty(obj,key, {
        get() {
            debugger
            Dep.target = onDepUpdate
            // 执行cb()的过程中会用到Dep.target，
            // 当cb()执行完了就重置Dep.target为null
            const val = cb()
            Dep.target = null
            return val
        },
        set() {
            console.log('计算属性不能被设置');
        }
    })
 }




var hero = observable({
    health: 3000,
    IQ: 150
})

watcher(hero, 'type', function() {
   return hero.health > 4000 ? '坦克': '脆皮'
})

hero.health
hero.health = 5000

hero.type