<template>
  <div class="sidebar">
    <h2>Tutorials</h2>
    <ul>
      <li>
        <router-link to="/">Welcome</router-link>
      </li>
      <li>
        <router-link to="/tutorial1">1. Hello, World!</router-link>
      </li>
      <li>
        <router-link to="/tutorial2">2. Helter Skelter</router-link>
      </li>
      <li>
        <router-link to="/tutorial3">3. Starry Night</router-link>
      </li>
      <li>
        <router-link to="/tutorial4">4. Catch Me</router-link>
      </li>
      <li>
        <router-link to="/tutorial5">5. Noise Machine</router-link>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      msg: 'Welcome to the iOi Sphere Simulator'
    }
  }
}
</script>
