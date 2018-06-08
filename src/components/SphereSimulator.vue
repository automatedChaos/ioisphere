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
    <a v-on:click="exportSimulation" download="program.ino" id="downloadlink" class="button export"><img src="../assets/arrow.svg"/></a>
    <div id="renderer"></div>
    <div id="logo">
      <img class="logo" src="../assets/ioi.jpg">
    </div>
  </div>
</template>

<script>
import Simulation from '../ThreeJS/Simulation.js'
import Export from '../ThreeJS/Export.js'
import EventBus from '@/components/utils/EventBus.js'

let simulation = null;
let e = null

export default {
  name: 'SphereSimulator',
  mounted: function () {
    simulation = new Simulation(window, document)

    window.requestAnimationFrame(this.loop)

    // Listen for the i-got-clicked event and its payload.
    EventBus.$on('VisualEditorChange', payload => {
      // process tree
      simulation.syntaxTree.processSyntaxTree(payload.nodes)
      //console.log(payload.nodes)
      //
    })
  },
  methods: {

    loop: function (timestamp) {

      simulation.render(this.isPlaying)

      // throttle the flow
      if (this.isPlaying){

        if (timestamp - this.updatePrev > this.updateDelay){
          simulation.syntaxTree.update(timestamp)
          simulation.arduino.updateLEDs() // always the second to last call on loop
          simulation.arduino.clearSwitchStates()
          this.updatePrev = timestamp
        }
      }

      window.requestAnimationFrame(this.loop) // chec whether to carry on
    },

    playSimulation: function () {
      //let newValue = Number(this.$editor.instance.nodes.find(n => n.id == 1).data.LEDNum) + 1
      //let originalValue = this.$editor.instance.nodes.find(n => n.id === 1).controls[0].getData().LEDNum
      //this.$editor.instance.nodes.find(n => n.id === 1).controls[0].setValue(newValue)
      console.log('PLAY')
      EventBus.$emit('play')
      simulation.syntaxTree.setup()
      this.isPlaying = true
      this.prevUpdate = window.window.performance.now()

    },

    stopSimulation: function () {
      console.log('STOP')
      EventBus.$emit('stop')

      // reset the sphere
      simulation.arduino.clear()
      simulation.arduino.updateLEDs()

      // hide the overlay from the editor

      // mark as not playing
      this.isPlaying = false
    },

    exportSimulation: function () {


    }

  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isPlaying: false,
      updatePrev: null,
      updateDelay: 100
    }
  }
}
</script>
