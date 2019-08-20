/**
*
* 定义两个存取localStorage的方法
*
*/
const saveToLocal = (storageType, id, key, value) => {
    let store = storageType === 'localStorage' ? window.localStorage : window.sessionStorage
    let formEngineStore = store.__formEngineStore__
    if (!formEngineStore) {
        formEngineStore = {}
        formEngineStore[id] = {}
        formEngineStore[id][key] = value
    } else {
        formEngineStore = JSON.parse(formEngineStore)
        if (!formEngineStore[id]) {
            formEngineStore[id] = {}
        }
    }
    formEngineStore[id][key] = value
    store.__formEngineStore__ = JSON.stringify(formEngineStore)
}
const getFromLocal = (storageType, id, key, def) => {
    let store = storageType === 'localStorage' ? window.localStorage : window.sessionStorage
    let formEngineStore = store.__formEngineStore__
    if (!formEngineStore) {
        return def
    }
    formEngineStore = JSON.parse(formEngineStore)[id]
    if (!formEngineStore) {
        return def
    }
    if (formEngineStore[key] === 'undefined') {
        return def
    }
    return formEngineStore[key] || def
}
export {
    saveToLocal,
    getFromLocal
}
