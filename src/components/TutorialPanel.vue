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
  watch:{
    $route (to, from){
        document.getElementsByClassName('tutorial-content')[0].scrollTo(0, 0)
    }
  },

  data () {
    return {
      msg: 'Welcome to the iOi Sphere Simulator'
    }
  },
  components: {Sidebar}
}
</script>
