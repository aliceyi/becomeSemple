function deepCopy(obj) {
  if(!(obj instanceof Object || typeof obj === 'function')) return obj;
  
  var newobj = {}

  if(obj instanceof Array) newobj = []

  for(var key in obj){
    newobj[key] = deepCopy(obj[key])
  }

  return newobj
}

var obj = {
  a:1,
  b:[1,3]
}

var newobj  = deepCopy(obj)
newobj.b.push(4)

obj.b