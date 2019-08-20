// import Vue from 'vue'
// import 'normalize.css/normalize.css'

// import MakingForm from './components/Container.vue'
// import GenerateForm from './components/GenerateForm.vue'
import MakingForm from './views/edit/WorkBench.vue'
import GenerateForm from './views/preview/GenerateForm.vue'
import HelloWorld from './components/HelloWorld.vue'
// import './iconfont/iconfont.css'
// import './styles/cover.scss'
// import './styles/index.scss'

MakingForm.install = function (Vue) {
    Vue.component(MakingForm.name, MakingForm)
}

GenerateForm.install = function (Vue) {
    Vue.component(GenerateForm.name, GenerateForm)
}

HelloWorld.install = function (Vue) {
    Vue.component(HelloWorld.name, HelloWorld)
}

const components = [
    MakingForm,
    GenerateForm,
    HelloWorld
]

const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export {
    install,
    MakingForm,
    GenerateForm
}

export default {
    install,
    MakingForm,
    GenerateForm
}
