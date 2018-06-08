<template>
  <div class="tutorial-content-container">
    <div class="tutorial-body">
      <h2>Helter Skelter</h2>
      <p>
        Unsurprisingly, the iOiSphere looks a lot like a sphere! But, inside the sphere there is a giant ribbon of cables and LEDs spiralling up to the top of the sphere - kind of like a helter skelter. We think the iOiSphere would make a great helter skelter and so we are going to program it to behave like one.
      </p>
      <p>
        First, as the helter skelter will happen over time, let’s add a Tick Node. You know how to do this already, let's not repeat ourselves! Then, add a LED Toggle Node and join the two nodes together. So far, yours should look like the picture below. Hint: the interval has been changed to 100!
      </p>
      <img src="../../assets/tutorial-three-tick-toggle.png" />
      <p>
        We now need to add a Node to keep track of the position of the LED as it helter skelters around the iOiSphere. We do this using a Number Node. In the Node Menu, hover over the Variables option and select Number. Make a join between the Number Node’s read/write connector and the LED Toggle Node's read connector. Your program should look like the image below. Now, when you change the value of the number the LED Toggle number should change with it. Test it by changing the Number Node's value a few times. Hint: the nodes have been given more descriptive names so that the program is easier to understand.
      </p>
      <img src="../../assets/tutorial-three-number.png" />
      <p>
        We are almost there. Now all we need to do is modify the number every time the Tick Node is triggered and this will make the LEDs toggle around the iOiSphere in a helter skelter type behaviour. To do this, we need to add a Subtract One Node. In the Node Menu, hover over the Modifier option and select the Subtract One Node. Now, we need to connect the out connector of the LED Toggle  node to the in connector of the Subtract One node. This allows the program to flow from one node to another. Then we need to connect the read/write connector of the Number node to the write connector of the Subtract One node. Yours should look like the image below.
      </p>
      <img src="../../assets/tutorial-three-subtract.png" />
      <p>
        Congratulations! You now have an iOiSphere that thinks it is a helter skelter. Press the play button and watch what happens.
      </p>
      <p>
        <router-link class="next-tutorial" to="/tutorial3">Time to play! <br />Click here to go to the third tutorial. </router-link>

      </p>
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
