/*global Vue*/
import Router from 'vue-router'
import HOME from 'src/widgets/T0x13/views/router/home.vue'
import FOCUS from 'src/widgets/T0x13/views/router/focus.vue'
import RECOMMEND from 'src/widgets/T0x13/views/router/recommend.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
        path: '/',
        name: 'home',
        component: HOME
    },{
        //传参
        path: '/focus/:id',
        name: 'focus',
        component: FOCUS
    },{
        path: '/recommend',
        name: 'recommend',
        component: RECOMMEND
    }
  ]
})
