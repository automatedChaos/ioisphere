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
    this.editor = new D3NE.NodeEditor('demo@0.1.0', this.container, this.nodeBuilder.componentList(), this.nodeBuilder.menu())

    /*
    // var nn = componentNum.newNode();
    // nn.data.num = 2;
    var n1 = this.nodeBuilder.number.builder(this.nodeBuilder.number.newNode())
    var n2 = this.nodeBuilder.number.builder(this.nodeBuilder.number.newNode())
    var add = this.nodeBuilder.add.builder(this.nodeBuilder.add.newNode())
    var num = this.nodeBuilder.number.builder(this.nodeBuilder.number.newNode())

    var loop = this.nodeBuilder.loop.builder(this.nodeBuilder.loop.newNode())
    var bool = this.nodeBuilder.bool.builder(this.nodeBuilder.bool.newNode())

    n1.position = [80, 200]
    n2.position = [80, 400]
    add.position = [500, 240]
    num.position = [600, 300]
    loop.position = [200, 200]
    bool.position = [10, 10]

    this.editor.connect(n1.outputs[0], add.inputs[0])
    this.editor.connect(n2.outputs[0], add.inputs[1])

    this.editor.addNode(n1)
    this.editor.addNode(n2)
    this.editor.addNode(add)
    this.editor.addNode(num)
    this.editor.addNode(loop)
    this.editor.addNode(bool)
    */

    // editor.selectNode(tnode);

    this.engine = new D3NE.Engine('demo@0.1.0', this.nodeBuilder.componentList())

    this.editor.eventListener.on('change', (_, persistent) => {
      // trigger after each of the first six events
      // console.log(EventBus)
      // console.log(self.editor.toJSON())

      EventBus.$emit('VisualEditorChange', self.editor.toJSON())
   })

    this.editor.view.zoomAt(this.editor.nodes)
    this.editor.eventListener.trigger("change")
    this.editor.view.resize()

  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      nodeBuilder: new NodeBuilder(),
      editor: null,
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
