<template>
  <div id="app">
    <Split class="parent-split" :direction="'vertical'">
      <SplitArea>
          Visual Editor
      </SplitArea>
      <SplitArea>
        <Split style="height: 500px;">
          <SplitArea :size="25">
              <router-view/>
          </SplitArea>
          <SplitArea :size="75">
              Sphere
          </SplitArea>
        </Split>
      </SplitArea>
  </Split>

  <!--  -->
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted: function () {
    var parentPanel = document.getElementsByClassName('parent-split')
    parentPanel[0].style.height = `${window.innerHeight}px`;
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html, body {
    height: 100%;
  }
body {
  padding: 8px;
  background-color: #F6F6F6;
  box-sizing: border-box;
}



</style>
