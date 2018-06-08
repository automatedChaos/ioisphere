<template>
  <div class="tutorial-content-container">

    <div class="tutorial-body">
      <h2>Catch Me</h2>
      <p>
        So far the iOiSphere has not been very interactive which is weird as it is covered in switches. Let's create an interactive game of catch that you can play with your friends. The rules are simple. An LED runs fast around the bottom ring of the iOiSphere. One switch is chosen as the catcher and when toggled, the LED will stop running. The aim is to catch the LED as close as you can to the catcher switch. Who ever gets the closest to catching the LED wins a prize (we don't actually have a prize, but hopefully the great feeling of learning to program the iOiSphere is prize enough!)
      </p>
      <p>
        To begin, we create a marker that shows where the catcher is on the bottom ring. We do this straight after the tick, using an LEDWrite node. Create a program that looks like the picture below.
      </p>
      <img src="../../assets/tutorial-five-led.png" />
      <p>
        Now let's add the running LED. This is quite fiddly, but the end result is great. First, we need to add an LEDWrite node, an Add One Node and a Number Node. Connect them up like the image below and then press play. You should see the whole bottom row of LEDs light up one by one.
      </p>
      <img src="../../assets/tutorial-five-ring.png" />
      <p>
        This is cool, but we want a running LED, not just a ring of lit LEDs. We do this by turning the previous LED off every tick. Using the same components as the previous step, create another LEDWrite run that turns the LEDs off. This is where the program starts to look complicated, but it is just a repeat of the previous step. Your program should look like the image below.
      </p>
      <img src="../../assets/tutorial-five-run.png" />
      <p>
        Now all we need is a way to catch the sneaky LED. We do this by adding a Switch Node from the Trigger option in the Node Menu. Then we attach a ToggleBoolean node to the Switch node. Then we need a Boolean node to toggle. A boolean is a computer term for a value that can only be true or false. Often in electronics this is represented by a switch being turned off or on. Here we are going to use the boolean to stop and start the Tick. Connect the Boolean to the write of the Boolean Toggle Node and to the read of the Tick. Check your program against the image below.
      </p>
      <img src="../../assets/tutorial-five-switch.png" /><br />
      <router-link class="next-tutorial" to="/tutorial5">Time to play! <br />Click here to go to the fifth and final tutorial. </router-link>
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
