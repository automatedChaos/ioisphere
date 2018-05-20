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
      this.processSyntaxTree(payload.nodes)
    })
  },
  methods: {

    /**
     * processSyntaxTree - fired by the EventBus. Process the changes to the
     * syntax tree.
     *
     * @param  {object} nodes list of objects that represent nodes
     */
    processSyntaxTree: function (nodes) {

      // loop through each node
      for (let node in nodes) {
        if (nodes.hasOwnProperty(node)) {

          // get node type so that we can process it
          let type = nodes[node].title

          switch(type){
            case 'Tick':
              // add the tick to the stack
              TickManager.processTick(nodes[node])
              break;
            default:
              console.log('Node Unrecognised')
              break;
          }
        }
      }
    },
    loop: function (timestamp) {
      TickManager.update(timestamp)
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
      TickManager.deactivateTicks()
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
