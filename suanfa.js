// 数组去重

var arr = [1,2,3,1,11,3]

function unique(arr) {
    const data = []
    const hashTable = {}
    for (let i=0;i<arr.length; i++) {
        if(!hashTable[arr[i]]){
            hashTable[arr[i]] = true
            data.push(arr[i])
        }
    }
    return data
}