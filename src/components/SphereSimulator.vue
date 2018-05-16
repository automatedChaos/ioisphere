<!--
@Author: alcwynparker
@Date:   2018-03-13T20:23:39+00:00
@Last modified by:   alcwynparker
@Last modified time: 2018-04-23T22:48:31+01:00
-->
<template>
  <div class="sphere-simulator">
    <div id="renderer"></div>
  </div>
</template>

<script>
import ThreeEnv from '../ThreeJS/ThreeEnv.js'
import EventBus from '@/components/utils/EventBus.js'
let simulation = null;


export default {
  name: 'SphereSimulator',
  mounted: function () {
    simulation = new ThreeEnv(window, document)

    // Listen for the i-got-clicked event and its payload.
    EventBus.$on('VisualEditorChange', payload => {
      console.log(payload)
    })
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
