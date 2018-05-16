<!--
@Author: alcwynparker
@Date:   2018-03-12T22:22:05+00:00
@Last modified by:   alcwynparker
@Last modified time: 2018-04-23T22:05:39+01:00
-->

<template>
  <div id="app">

    <Split class="parent-split" :direction="'vertical'">
      <SplitArea class="top-panel">
        <VisualEditor />
      </SplitArea>
      <SplitArea class="bottom-panel">
        <Split >
          <SplitArea :size="70">
            <TutorialPanel />
          </SplitArea>
          <SplitArea :size="30">
              <SphereSimulator />
          </SplitArea>
        </Split>
      </SplitArea>
  </Split>

  <!--  -->
  </div>
</template>

<script>
import VisualEditor from './components/VisualEditor'
import SphereSimulator from './components/SphereSimulator'
import TutorialPanel from './components/TutorialPanel'

export default {
  name: 'App',
  mounted: function () {
    var parentPanel = document.getElementsByClassName('parent-split')
    parentPanel[0].style.height = `${window.innerHeight}px`
  },
  components: {VisualEditor, SphereSimulator, TutorialPanel}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height:100%;
  overflow: hidden;
}
html, body {
    height: 100%;
    padding: 0px;
    margin:0px;
  }
body {
  background-color: #F6F6F6;
  box-sizing: border-box;
}
.bottom-panel{
  overflow:scroll;
}

</style>
