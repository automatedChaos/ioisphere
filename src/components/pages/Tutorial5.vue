<template>
  <div class="tutorial-content-container">

    <div class="tutorial-body">
      <h2>Noise Machine</h2>
      <p>
        The fifth and final tutorial is time for you to play and make some noise. It is an extremely simple program so we encourage you to add some bells and whistles by add some of the things you have learnt from these tutorials. Experiment and have fun!
      </p>
      <p>
        So how do we make noise? Add a Switch node and a Toggle LED node and connect them together through their in and outs. Now add a Sound node through the Sound option in the Node Menu. Connect this to the Toggle LED node and thats it. The number inside the sound node selects the sound that will be played. There are only 60 sounds so be careful. You program should look like this:
      </p>
      <img src="../../assets/tutorial-six-sound.png" />
      <p>
        Now that you have one sound playing, add as many as you have the patients to do. Create a monster of a sound sphere for you and your friends to play with!
      </p>


      <h1>Thank you for playing along. We hope you had fun!</h1>
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
