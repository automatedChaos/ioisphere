/**
 * @Author: alcwynparker
 * @Date:   2018-03-12T22:22:05+00:00
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-03-13T20:26:38+00:00
 */
import Vue from 'vue'
import Router from 'vue-router'
import TutorialPanel from '@/components/TutorialPanel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TutorialPanel',
      component: TutorialPanel
    }
  ]
})
