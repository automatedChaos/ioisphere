<template>
  <div class="tutorial-content-container">

    <div class="tutorial-body">
      <h2>Hello, World!</h2>
      <p>
        It is a great tradition that when someone learns a new programming language the first thing they write is a, 'Hello, World!' program (more info). Usually, this very short program that consists of getting the computer to output the words 'Hello, World!' to the screen somewhere. The iOiSphere does not have a screen, but it does have hundreds of LEDs. Instead of words all we have is flashing LEDs so that is what our 'Hello, World!' program will do.
      </p>
      <p>
        When you begin writing a program for the iOiSphere, you will first need to consider the trigger that will begin the program. There are several triggers to choose from:

        <ul class="info-list">
          <li> On Play - Happens once everytime you press play </li>
          <li> Tick - Repeats over and over again </li>
          <li> Switch - Only happens when a chosen switch has been used </li>
        </ul>
      </p>
      <p>
        If we want an LED to flash, then we need it to happen more than once when we press play, so an 'On Play' trigger is not right. We don't want to wait for a human to toggle the switch either, so a 'Switch' trigger won't work. This leaves us with the 'Tick' trigger, so let's add one of those. Click on the squared grid in the visual editor above to bring up the Node Menu. Hover over ‘Triggers’ and select 'Tick'. Now give it a unique name like in the picture below.
      </p>
      <img src="../../assets/tutorial-two-tick.png" />
      <p>
        Great. Now we want to select an LED to flash. Bring up the Node Menu once more. This time, hover over the LED option and select 'LED Toggle'. Just as in the Welcome tutorial, link the Tick node to the LED Toggle Node just like the picture below.
      </p>
      <img src="../../assets/tutorial-two-toggle.png" />
      <p>
        Before we test the program, let’s make some changes to the Node properties. First, let’s set the tick interval to 500 in the Tick Node. This means that the LED will flash at double the speed. Then let’s change the LED number in the LED Toggle Node to 100. This changes which LED is going to flash. The final program should look like the picture below.
      </p>
      <img src="../../assets/tutorial-two-properties.png" />
      <p>
      <p>
        That is the 'Hello, World!' program finished. Press the play button in the Sphere Simulator on the right to test the program. You may have to drag the sphere around to see the flashing LED.
      </p>
      <h2>Challenge:</h2>
      <p>
        Now that you can make one LED flash, we think you can probably make as many of them as you like flash. Why don't you try and make 4 LEDs next to each other flash? Use the picture below as a guide. Here you can see we have changed how quick each one flashes as well!
      </p>
      <img src="../../assets/tutorial-two-challenge.png" />  <br />
      <router-link class="next-tutorial" to="/tutorial2">Time to play! <br />Click here to go to the second tutorial. </router-link>


    </div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to the iOi Sphere Simulator'
    }
  }
}
</script>
