/**
 * @Author: alcwynparker
 * @Date:   2018-02-21T21:15:17+00:00
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-05-03T00:02:41+01:00
 */
 import anySocket from '../Socket/Any.js'

/**
* toggleLED
*
* @return {Coponent Object}
*/
function Switch(){

  return new D3NE.Component('Switch', {
    builder(node) {

      let outSocket = new D3NE.Output('Switch', anySocket)


      let nameTemplate = '<input type="text" placeholder="Unique name">'
      let nameControl = new D3NE.Control(nameTemplate, (element, control) => {
        control.putData('name', '')
        element.value = ''
        element.addEventListener('change',()=>{
          control.putData('name', element.value) // put data in the node under the key "num"
        });
      });

      var numTemplate = '<input type="number" placeholder="Switch Number">'
      var numControl = new D3NE.Control(numTemplate, (element, control) => {
        control.putData('interval', 0)
        element.value = 0
        element.addEventListener('change',()=>{
          control.putData('switch', element.value) // put data in the node under the key "num"
        });
      });

      return node
      .addControl(nameControl)
      .addControl(numControl)
      .addOutput(outSocket)

    },
    worker(node, inputs, outputs) {

    }
  });
}

export default Switch
