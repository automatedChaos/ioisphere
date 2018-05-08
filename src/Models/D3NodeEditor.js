/**
 * @Author: alcwynparker
 * @Date:   2018-02-21T21:15:17+00:00
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-05-03T00:02:41+01:00
 * Wrapper class for instantiating the D3 Node Editor
 */

// TODO: This should be broken into distinct types
import NodeBuilder from '@/Models/NodeBuilder'

class D3NodeEditor {

  /**
   * [constructor]
   * @method constructor
   * @param  {[type]}    elm [the raw component used to contain the editor]
   */
  constructor (elm) {
                   // document.getElementById('nodeEditor')
    this.container = elm // the DOM object to contain visual editor
    this.editor = new D3NE.NodeEditor('demo@0.1.0', this.container, this.nodeBuilder.componentList(), this.nodeBuilder.menu())
    this.engine = new D3NE.Engine('demo@0.1.0', NodeBuilder.componentList())

    this.editor.view.zoomAt(this.editor.nodes)
    this.editor.eventListener.trigger("change")
    this.editor.view.resize()

    this.initEvents()
  }

  /**
   * [initEvents attach all event handlers]
   * @method initEvents
   */
  initEvents(){
    this.editor.eventListener.on('change', this.onChange)
  }

  /**
   * [onChange update component when the node editor changes]
   * @method onChange
   * @param  {[type]} _          [description]
   * @param  {[type]} persistent [description]
   * @return {[type]}            [description]
   */
  onChange(_, persistent){
    // trigger after each of the first six events
    // console.log(EventBus)
    // console.log(self.editor.toJSON())

    EventBus.$emit('VisualEditorChange', self.editor.toJSON())
  }
}
export default NodeBuilder
