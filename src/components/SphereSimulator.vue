<template>
  <div class="sphere-simulator">
    <div id="renderer"></div>
  </div>
</template>

<script>
import ThreeEnv from '../ThreeJS/ThreeEnv.js'

export default {
  name: 'SphereSimulator',
  mounted: function () {
    this.simulation = new ThreeEnv(window, document)
  },
  data () {
    return {
      simulation: null,
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sphere-simulator{
  width:100%;
  height:100%;

}
.renderer{
  width:100%;
  height:100%;
  background: white;
}
canvas{
  width:100%;
  height:100%;
}

</style>
