/**
 * @Author: alcwynparker
 * @Date:   2018-03-12T22:22:05+00:00
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-03-13T20:26:38+00:00
 */
import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/pages/Welcome'
import Tutorial1 from '@/components/pages/Tutorial1'
import Tutorial2 from '@/components/pages/Tutorial2'
import Tutorial3 from '@/components/pages/Tutorial3'
import Tutorial4 from '@/components/pages/Tutorial4'
import Tutorial5 from '@/components/pages/Tutorial5'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/tutorial1',
      name: 'Tutorial1',
      component: Tutorial1
    },
    {
      path: '/tutorial2',
      name: 'Tutorial2',
      component: Tutorial2
    },
    {
      path: '/tutorial3',
      name: 'Tutorial3',
      component: Tutorial3
    },
    {
      path: '/tutorial4',
      name: 'Tutorial4',
      component: Tutorial4
    },
    {
      path: '/tutorial5',
      name: 'Tutorial5',
      component: Tutorial5
    }

  ]
})
