/**
 * @Author: alcwynparker
 * @Date:   2018-02-21T21:15:17+00:00
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-05-03T00:02:41+01:00
 */

// TRIGGERS
import onPlay from './Components/Trigger/onPlay.js'
import tick from './Components/Trigger/Tick.js'
import Switch from './Components/Trigger/Switch.js'

// LED
import LEDToggle from './Components/LED/LEDToggle.js'
import LEDWrite from './Components/LED/LEDWrite.js'

// Modifier
import AddOne from './Components/Modifier/AddOne.js'
import SubtractOne from './Components/Modifier/SubtractOne.js'
import Random from './Components/Modifier/Random.js'
import ToggleBoolean from './Components/Modifier/ToggleBoolean.js'

// DataTypes
import Number from './Components/DataTypes/Number.js'
import Boolean from './Components/DataTypes/Boolean.js'

// Sound
import Sound from './Components/Sound/Sound.js'

class NodeBuilder {
  constructor () {

    this.tick = tick()
    this.onPlay = onPlay()
    this.Switch = Switch()

    this.LEDToggle = LEDToggle()
    this.LEDWrite = LEDWrite()

    this.AddOne = AddOne()
    this.SubtractOne = SubtractOne()
    this.Random = Random()
    this.ToggleBoolean = ToggleBoolean()

    this.number = Number()
    this.Boolean = Boolean()

    this.Sound = Sound()

  }

  componentList () {
    return [
      this.onPlay,
      this.tick,
      this.Switch,

      this.LEDToggle,
      this.LEDWrite,

      this.AddOne,
      this.SubtractOne,
      this.Random,
      this.ToggleBoolean,

      this.number,
      this.Boolean,

      this.Sound
    ]
  }

  menu () {
    return new D3NE.ContextMenu({
     Triggers: {
        ['On Play']: this.onPlay,
        ['Tick']: this.tick,
        ['Switch']: this.Switch,
      },
      LEDs: {
        ['LED Toggle']: this.LEDToggle,
        ['LED Write']: this.LEDWrite,
      },
      Modifier: {
        ['Add One']: this.AddOne,
        ['Subtract One']: this.SubtractOne,
        ['Random']: this.Random,
        ['Toggle Boolean']: this.ToggleBoolean,
      },
      Variables: {
        ['Number']: this.number,
        ['Boolean']: this.Boolean
      },
      Sound: {
        ['Sound']: this.Sound
      }
    });
  }
}
export default NodeBuilder
