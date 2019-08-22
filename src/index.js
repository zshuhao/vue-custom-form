
import DesignForm from './views/workspace/Bench.vue'
import GenerateForm from './views/preview/GenerateForm.vue'
import HelloWorld from './components/HelloWorld.vue'

DesignForm.install = function (Vue) {
    Vue.component(DesignForm.name, DesignForm)
}

GenerateForm.install = function (Vue) {
    Vue.component(GenerateForm.name, GenerateForm)
}

HelloWorld.install = function (Vue) {
    Vue.component(HelloWorld.name, HelloWorld)
}

const components = [ DesignForm, GenerateForm, HelloWorld ]

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
    DesignForm,
    GenerateForm
}

export default {
    install,
    DesignForm,
    GenerateForm
}
