<template>
  <div class="tutorial-content-container">

    <div class="tutorial-body">
      <h2>Starry Night</h2>
      <p>
      So far, it has all been quite predictable. We think making things should include a little bit of chaos. In this tutorial, we are going to add some randomness to the sphere. The LEDs are going to turn on and off randomly so that the iOiSphere looks a bit like a starry night.
      </p>
      <p>
      We are going to start by creating a very similar program to the Helter Skelter tutorial but instead of using the Subtract node we are going to use the Random node. You can find this in the Node Menu under the Modifier option. Build a program that looks like the one below.
      </p>
      <img src="../../assets/tutorial-four-one.png" />
      <p>
        Now, if you press play one LED at a time will either turn of or on in a random manner. This is okay but it is not very exciting and we can definitely do something more fun. Let's repeat this loop by copying the first one and link them like the picture below.
      </p>
      <img src="../../assets/tutorial-four-two.png" />
      <p>
        Do this again, so that it looks like the image below. Hopefullu, you are beginning to understand how to chain bahaviours together.
      </p>

      <img src="../../assets/tutorial-four-three.png" />
      <h2>Challenge:</h2>
      <p>
        How many times can you repeat this pattern? Try and add three more repeats. Hint: You can drag and zoom the Visual Editor if you are running out of space.
      </p>

      <router-link class="next-tutorial" to="/tutorial2">Time to play! <br />Click here to go to the fourth tutorial. </router-link>

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
