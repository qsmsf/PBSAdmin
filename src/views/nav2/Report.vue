<template>
  <div class="hello">
    <h1 style="text-align: center;">sort拖动排序</h1>
    <draggable v-model="tags" :move="getdata" @update="datadragEnd">
      <transition-group>
        <div class="testdiv" v-for="element in tags" :key="element.id">
          {{element.id}}
        </div>
      </transition-group>
    </draggable>
  </div>
</template>
<script>
  import draggable from 'vuedraggable'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        tags: [{
          id: 1
        }, {
          id: 2
        }]
      }
    },
    methods: {
      getdata(evt) {
        console.log(evt.draggedContext.element.id)
      },
      datadragEnd(evt) {
        console.log('拖动前的索引 :' + evt.oldIndex)
        console.log('拖动后的索引 :' + evt.newIndex)
        console.log(this.tags)
      }
    },
    components: {　　
      draggable
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
  
  .testdiv {
    background: pink;
    margin-top: 10px;
    font-size: 30px;
    text-align: center;
  }
</style>
