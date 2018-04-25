/**
 * @Author: alcwynparker
 * @Date:   2018-02-21T21:15:17+00:00
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-04-24T20:15:08+01:00
 */
// import axios from 'axios'
// axios.defaults.withCredentials = true

class NodeBuilder {
  constructor () {

    this.numSocket = new D3NE.Socket('number', 'Number value', 'hint')
    this.lessThan = this.createLessThanComponent()
    this.number = this.createNumberComponent()
    this.add = this.createAddComponent()

  }

  componentList () {
    return [
      this.lessThan,
      this.number,
      this.add
    ]
  }

  menu () {
    return new D3NE.ContextMenu({
     Values: {
        Value: this.number,
        Action: function() {
           alert("ok")
        }
     },
     Add: this.add
    });
  }

  /**
   * add - creates a node that adds two inputs
   *
   * @return {Node Object}
   */
  createLessThanComponent () {
    let self = this
    return new D3NE.Component('Number',{
    builder(node) {

        var out = new D3NE.Output('Number', self.numSocket)

        var numControl = new D3NE.Control('<input type="number">',(element, control)=>{
            control.putData('num', 1)
         });

        return node
                  .addControl(numControl)
                  .addOutput(out);
    },
    worker(node, inputs, outputs){
        outputs[0] = node.data.num;
      }
    });
  }

  /**
   * createNumberComponent - creates the comonent for a number
   *
   * @return {Coponent Object}
   */
  createNumberComponent () {
    let self = this
    return new D3NE.Component("Number", {
      builder(node) {
      var out1 = new D3NE.Output("Number", self.numSocket)
      var numControl = new D3NE.Control('<input type="number">',
      (el, c) => {
      el.value = c.getData('num') || 1

      function upd() {
      c.putData("num", parseFloat(el.value));
      }

      el.addEventListener("input", ()=>{
      upd();
      editor.eventListener.trigger("change")
      });
      el.addEventListener("mousedown", function(e){e.stopPropagation()})// prevent node movement when selecting text in the input field
      upd()
      }
      );

      return node.addControl(numControl).addOutput(out1);
      },
      worker(node, inputs, outputs) {
      outputs[0] = node.data.num
      }
      });


  }

  /**
   * createAddComponent - creates the comonent for a number
   *
   * @return {Coponent Object}
   */
    createAddComponent(){
      let self = this
      return new D3NE.Component("Add", {
        builder(node) {
          var inp1 = new D3NE.Input("Number", self.numSocket)
          var inp2 = new D3NE.Input("Number", self.numSocket)
          var out = new D3NE.Output("Number", self.numSocket)

          var numControl = new D3NE.Control(
            '<input readonly type="number">',
            (el, control) => {
              control.setValue = val => {
                el.value = val
              };
            }
          );

          return node
          .addInput(inp1)
          .addInput(inp2)
          .addControl(numControl)
          .addOutput(out);
        },
        worker(node, inputs, outputs) {
          var sum = inputs[0][0] + inputs[1][0]
          //editor.nodes.find(n => n.id == node.id).controls[0].setValue(sum);
          outputs[0] = sum
        }
      });
    }
}
export default NodeBuilder
