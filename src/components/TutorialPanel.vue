<template>
  <div class="tutorial-panel">
    <sidebar>

    </sidebar>
    <div class="tutorial-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'


export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to the iOi Sphere Simulator'
    }
  },
  components: {Sidebar}
}
</script>
