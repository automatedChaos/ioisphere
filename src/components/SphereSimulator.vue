<!--
@Author: alcwynparker
@Date:   2018-03-13T20:23:39+00:00
@Last modified by:   alcwynparker
@Last modified time: 2018-04-23T22:48:31+01:00
-->
<template>
  <div class="sphere-simulator">
    <h1>Simulator</h1>
    <a v-on:click="playSimulation" class="button play"></a>
    <a v-on:click="stopSimulation" class="button stop"></a>
    <div id="renderer"></div>
    <div id="logo">
      <img class="logo" src="../assets/ioi.jpg">
    </div>
  </div>
</template>

<script>
import ThreeEnv from '../ThreeJS/ThreeEnv.js'
import EventBus from '@/components/utils/EventBus.js'
import TickManager from '../ThreeJS/TickManager.js'
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
  methods: {
    loop: function () {
      console.log('tick')
      if (this.isPlaying) window.requestAnimationFrame(this.loop)
    },
    playSimulation: function () {
      console.log('PLAY')
      this.isPlaying = true
      window.requestAnimationFrame(this.loop)
    },
    stopSimulation: function () {
      console.log('STOP')
      this.isPlaying = false
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isPlaying: false
    }
  }
}
</script>
