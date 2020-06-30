<template lang="html">
  <div class="zs-dialog" v-show.sync="visible" @click="close">
    <div class="zs-dialog-main" @click="stop" :style="style">
      <div class="zs-dialog-title">
        {{title}}
        <div class="zs-dialog-close" @click="close">
          <i class="zs-icon icon-quxiao"></i>
        </div>
      </div>
      <div class="zs-dialog-body" >
        <slot></slot>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    visible:{
      type:Boolean,
      desc: '是否显示'
    },
    title:{
      type:String,
      desc:'弹框标题'
    },
    width:{
      type:String,
      desc:'弹框宽度'
    },
  },
  data() {
      return {
        style:''
      }
  },
  mounted:function(){
    let style = "";
    if(this.width){
      style += "width:"+this.width+";"
    }
    this.$set(this,'style',style);
  },
  methods: {
    close(){
      this.$emit('update:visible', false);
    },
    stop(){
      event.stopPropagation();
    }
  }
}
</script>
