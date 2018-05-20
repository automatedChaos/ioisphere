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
import Simulation from '../ThreeJS/Simulation.js'
import EventBus from '@/components/utils/EventBus.js'
let simulation = null;

export default {
  name: 'SphereSimulator',
  mounted: function () {
    simulation = new Simulation(window, document)

    // Listen for the i-got-clicked event and its payload.
    EventBus.$on('VisualEditorChange', payload => {
      // process tree
      simulation.syntaxTree.processSyntaxTree(payload.nodes)
      console.log(payload.nodes)
    })
  },
  methods: {

    loop: function (timestamp) {
      simulation.syntaxTree.update(timestamp)
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
