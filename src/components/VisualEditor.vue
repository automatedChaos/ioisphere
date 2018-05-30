<!--
@Author: alcwynparker
@Date:   2018-03-13T00:42:25+00:00
@Last modified by:   alcwynparker
@Last modified time: 2018-05-02T22:48:46+01:00
-->

<template>
  <div class="visual-editor">
    <h1>Visual Code Editor</h1>
    <div id="nodeEditor" class="node-editor"></div>
    <div class="overlay"> </div>
  </div>
</template>

<script>
import D3NodeEditor from '@/D3NodeEditor/D3NodeEditor'
import NodeBuilder from '@/D3NodeEditor/NodeBuilder'
import EventBus from '@/components/utils/EventBus.js'

export default {
  name: 'VisualEditor',
  mounted: function () {
    let self = this

    this.container = document.getElementById('nodeEditor')
    this.$editor.instance = new D3NE.NodeEditor('demo@0.1.0', this.container, this.nodeBuilder.componentList(), this.nodeBuilder.menu())

    this.engine = new D3NE.Engine('demo@0.1.0', this.nodeBuilder.componentList())

    this.$editor.instance.eventListener.on('change', async (_, persistent) => {
      EventBus.$emit('VisualEditorChange', self.$editor.instance.toJSON())

      await self.engine.abort();
      await self.engine.process(self.$editor.instance.toJSON());

    });


    this.$editor.instance.view.zoomAt(this.$editor.instance.nodes)
    this.$editor.instance.eventListener.trigger('change')
    this.$editor.instance.view.resize()

    // control buttons
    EventBus.$on('play', payload => {
      document.getElementsByClassName('overlay')[0].style.display = 'block';
    })

    EventBus.$on('stop', payload => {
      document.getElementsByClassName('overlay')[0].style.display = 'none';
    })

  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      nodeBuilder: new NodeBuilder(),
      container: null,
      engine: null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#d3ne{
  width:100%;
  height:100%;
}
#nodeEditor{
   position: relative;
  height: 100%
}
.visual-editor{
  width:100%;
  height:100%;
}
.socket.number{
    background: #96b38a
}
.visual-editor{
  position:relative;
}


</style>
