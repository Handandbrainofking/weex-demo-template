import App from 'src/widgets/demo/views/welcome'
import dolphinweex from 'src/js/dolphinweex.js'
import globalMixin from 'src/mixins/global.js'

Vue.use(dolphinweex)

//全局混入
Vue.mixin({
  mixins: [globalMixin]
})
