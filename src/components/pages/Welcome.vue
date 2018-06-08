<template>
  <div class="tutorial-content-container">

    <div class="tutorial-body">
      <h2>Welcome</h2>
      <p>
      Hello and welcome to the iOiSphere simulator and visual programming environment. Here you can experiment with programming the Sphere. You can write programs that make it flash, dash, beep and boop. You can harness the power of the hundreds of toggle switches and create games that friends and family can play.
      </p>
      <h3>Node Menu</h3>

      <p>
      First, we have to learn how everything works! Let’s start with the visual editor above. When you click on the square grid, a Node Menu will pop up. This is where you find all the nodes that you can use to program the sphere. When you hover over items in the menu, more options will appear. You can select one of these options and it will appear in the visual editor.
      </p>
      <img src="../../assets/node-menu.png" />


      <p>
        Let's have a go at creating an onPlay Node. Click on the square grid in the Visual Editor above. When the Node Menu pops up, hover over Triggers and then click Tick.
      </p>
      <img src="../../assets/welcome-create-tick.png" />

      <p>
        That’s great, well done! Now let's create a LED Write Node. That way we can start joining things up. Click the square grid in the Visual Editor and this time, hover over the LED option. Now select the LED Write option and it will appear in the visual editor.
      </p>
      <img src="../../assets/welcome-create-ledwrite.png" />
      <p>
        We have two nodes now so let’s make them talk to each other. We can do this by clicking the black circle on the side of the onPlay Node and a line will start following the mouse. Click on the LED Write Node’s black circle to join the nodes like in the picture below.
      </p>
      <img src="../../assets/welcome-create-join.png" />
      <p>
        Congratulations, we have now created our first program. Are you ready to test it? In the bottom left hand corner you can click the play button and the iOiSphere will begin to turn. Eventually, you will see one of the LEDs along the bottom ring will be red. Or, if you are a little impatient then you can drag the sphere around to see it quicker.
      </p>
      <img src="../../assets/welcome-test.png" />
      <p >
      <router-link class="next-tutorial" to="/tutorial1">Time to play! <br />Click here to go to the first tutorial. </router-link>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Welcome',
  methods: {
    scroll: function () {
      console.log("boop");
    }
  },
  data () {
    return {
      msg: 'Welcome to the iOi Sphere Simulator'
    }
  }
}
</script>
