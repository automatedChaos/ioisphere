/**
 * @Author: alcwynparker
 * @Date:   2018-02-21T21:15:17+00:00
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-05-03T00:02:41+01:00
 */

// TRIGGERS
import onPlay from './Components/Trigger/onPlay.js'
import tick from './Components/Trigger/Tick.js'

// LED
import LEDToggle from './Components/LED/LEDToggle.js'
import LEDWrite from './Components/LED/LEDWrite.js'

// Modifier
import AddOne from './Components/Modifier/AddOne.js'
import Random from './Components/Modifier/Random.js'

// DataTypes
import Number from './Components/DataTypes/Number.js'

class NodeBuilder {
  constructor () {

    this.tick = tick()
    this.onPlay = onPlay()

    this.LEDToggle = LEDToggle()
    this.LEDWrite = LEDWrite()

    this.AddOne = AddOne()
    this.Random = Random()

    this.number = Number()

    // TODO: Legacy ---- --- --- -- ---- -- -- -- ---
    this.anyTypeSocket = new D3NE.Socket('ny', 'Any type', 'hint')
    this.numSocket = new D3NE.Socket('number', 'Number value', 'hint')
    this.lessThan = this.createLessThanComponent()
    this.add = this.createAddComponent()

    this.bool = this.createBoolComponent()
    this.toggle = this.createToggleComponent()


    this.compareBool = this.createCompareBoolComponent()

    this.numSocket.combineWith(this.anyTypeSocket)


  }

  componentList () {
    return [
      this.onPlay,
      this.tick,

      this.LEDToggle,
      this.LEDWrite,

      this.AddOne,
      this.Random,

      this.number
    ]
  }

  menu () {
    return new D3NE.ContextMenu({
     Triggers: {
        ['On Play']: this.onPlay,
        ['Tick']: this.tick,
      },
      LEDs: {
        ['LED Toggle']: this.LEDToggle,
        ['LED Write']: this.LEDWrite,
      },
      Modifier: {
        ['Add One']: this.AddOne,
        ['Random']: this.Random,
      },
      Variables: {
        ['Number']: this.number
      }
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

  /**
   * createAddComponent - creates the comonent for a number
   *
   * @return {Coponent Object}
   */
    createTickComponent(){
      let self = this
      return new D3NE.Component("Tick", {
        builder(node) {

          let outSocket = new D3NE.Output("Start", self.anyTypeSocket)

          let nameTemplate = '<input type="text" placeholder="Unique name">'
          let nameControl = new D3NE.Control(nameTemplate, (element, control) => {
            control.putData('name', '')
            element.value = ''
            element.addEventListener('change',()=>{
              control.putData('name', element.value) // put data in the node under the key "num"
            });
          });

          var numTemplate = '<input type="number" placeholder="Interval">'
          var numControl = new D3NE.Control(numTemplate, (element, control) => {
            control.putData('interval', 1000)
            element.value = 1000
            element.addEventListener('change',()=>{
              control.putData('interval', element.value) // put data in the node under the key "num"
            });
          });

          return node
          .addControl(nameControl)
          .addControl(numControl)
          .addOutput(outSocket)

        },
        worker(node, inputs, outputs) {
          //var sum = inputs[0][0] + inputs[1][0]
          //editor.nodes.find(n => n.id == node.id).controls[0].setValue(sum);
          //outputs[0] = sum
        }
      });
    }

    /**
     * createAddComponent - creates the comonent for a number
     *
     * @return {Coponent Object}
     */
      createBoolComponent(){
        let self = this
        return new D3NE.Component("Boolean", {
          builder(node) {

            var refOut = new D3NE.Output("Reference", self.anyTypeSocket)

            var nameControl = new D3NE.Control(
              '<input type="text" placeholder="Unique name">',
              (el, control) => {
                control.setValue = val => {
                  el.value = val
                };
              }
            );

            var boolStateControl = new D3NE.Control(
              `<p>Initial Value:</p>
              <select>
                <option value="1">TRUE</option>
                <option value="0">FALSE</option>
              </select>`,
              (el, control) => {
                control.setValue = val => {
                  el.value = val
                };
              }
            );

            return node
            .addControl(nameControl)
            .addControl(boolStateControl)
            .addOutput(refOut);
          },
          worker(node, inputs, outputs) {
            //var sum = inputs[0][0] + inputs[1][0]
            //editor.nodes.find(n => n.id == node.id).controls[0].setValue(sum);
            //outputs[0] = sum
          }
        });
      }

    /**
     * createAddComponent - creates the comonent for a number
     *
     * @return {Coponent Object}
     */
      createToggleComponent(){
        let self = this
        return new D3NE.Component("Toggle", {
          builder(node) {

            var processOut = new D3NE.Output("ProcessOutgj", self.anyTypeSocket)
            var processIn = new D3NE.Input("ProcessInsadf", self.anyTypeSocket)
            var boolIn = new D3NE.Input("BoolInasdf", self.anyTypeSocket)
            return node
            .addInput(processIn)
            .addInput(boolIn)
            .addOutput(processOut)
          },
          worker(node, inputs, outputs) {
            //var sum = inputs[0][0] + inputs[1][0]
            //editor.nodes.find(n => n.id == node.id).controls[0].setValue(sum);
            //outputs[0] = sum
          }
        });
      }

      /**
       * createAddComponent - creates the comonent for a number
       *
       * @return {Coponent Object}
       */
      createLEDWriteComponent () {
        let self = this
        return new D3NE.Component("LED Write", {
          builder(node) {

            var processIn = new D3NE.Input("ProcessIn", self.anyTypeSocket)
            var processOut = new D3NE.Output("ProcessOut", self.anyTypeSocket)

            var ledStateControl = new D3NE.Control(
              `<select>
                <option value="1">HIGH</option>
                <option value="0">LOW</option>
              </select>`,
              (el, control) => {
                control.setValue = val => {
                  el.value = val
                };
              }
            );

            return node
            .addControl(ledStateControl)
            .addInput(processIn)
            .addOutput(processOut)
          },
          worker(node, inputs, outputs) {
            //var sum = inputs[0][0] + inputs[1][0]
            //editor.nodes.find(n => n.id == node.id).controls[0].setValue(sum);
            //outputs[0] = sum
          }
        });
      }


      /**
       * createAddComponent - creates the comonent for a number
       *
       * @return {Coponent Object}
       */
      createCompareBoolComponent () {
        let self = this
        return new D3NE.Component("Compare Boolean", {
          builder(node) {

            var boolIn = new D3NE.Input("BoolIn", self.anyTypeSocket)
            var processIn = new D3NE.Input("ProcessIn", self.anyTypeSocket)
            var processTrueOut = new D3NE.Output("ProcessTrueOut", self.anyTypeSocket)
            var processFalseOut = new D3NE.Output("ProcessFalseOut", self.anyTypeSocket)

            var boolStateControl = new D3NE.Control(
              `<select>
                <option value="1">TRUE</option>
                <option value="0">FALSE</option>
              </select>`,
              (el, control) => {
                control.setValue = val => {
                  el.value = val
                };
              }
            );

            return node
            .addControl(boolStateControl)
            .addInput(processIn)
            .addInput(boolIn)
            .addOutput(processTrueOut)
            .addOutput(processFalseOut)
          },
          worker(node, inputs, outputs) {
            //var sum = inputs[0][0] + inputs[1][0]
            //editor.nodes.find(n => n.id == node.id).controls[0].setValue(sum);
            //outputs[0] = sum
          }
        });
      }
}
export default NodeBuilder
