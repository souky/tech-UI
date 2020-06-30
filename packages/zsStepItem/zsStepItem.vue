<template lang="html">
<div :class="['zs-step-items',{'active':active_,'done':done_},className]" @click="clickStep">
  <div class="z-s-item-text">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  props:{
    className:String
  },
  data(){
    return{
      active_:false,
      done_:false
    }
  },
  computed: {
      active:{
        set:function(val){
          this.active_ = val
        },
        get:function(){
          return this.active_
        }
      },
      done:{
        set:function(val){
          this.done_ = val
        },
        get:function(){
          return this.done_
        }
      }
  },
  methods:{
    clickStep(){
      this.$emit('click')
    }
  }
}
</script>
