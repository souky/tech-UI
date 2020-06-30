<template lang="html">
  <div class="zs-step">
    <zs-step-item v-if="showStrat" className="step-start" @click="srcoll('top')">开始</zs-step-item>
    <div :class="['zs-step-body twm',{'has-start':showStrat,'has-end':showEnd,
    'has-all':showStrat && showEnd}]">
      <slot></slot>
    </div>
    <zs-step-item v-if="showEnd" className="step-end" @click="srcoll('end')">结束</zs-step-item>
  </div>
</template>

<script>
import zsStepItem from '@/components/zsStepItem/zsStepItem.vue'
export default {
  props:{
    showStrat:{
      type:Boolean,
      default:true,
      desc:'是否展示开始标签'
    },
    showEnd:{
      type:Boolean,
      default:true,
      desc:'是否展示结束标签'
    },
    activeIndex:{
      type:Number,
      default:1,
      desc:'当前标签'
    },
    allDone:{
      type:Boolean,
      default:false,
      desc:'是否全部结束'
    }
  },
  components:{
    zsStepItem
  },
  data(){
    return{
    }
  },
  mounted:function(){
    this.changeStatus()
  },
  watch:{
    'activeIndex':{
      handler(){
        this.changeStatus()
      }
    },
    'allDone':{
      handler(){
        this.changeStatus()
      }
    }
  },
  methods:{
    srcoll(type){
      this.srcollEle(this.$el.querySelector('.zs-step-body'),type)
    },
    srcollEle(ele,type){
      if(type == 'top'){
        if(ele.scrollTop != 0){
          ele.scrollTop -= 10
          setTimeout(()=>{
            this.srcollEle(ele,type)
          },8)
        }
      }else{
        if(ele.scrollHeight - ele.scrollTop != ele.clientHeight){
          ele.scrollTop += 10
          setTimeout(()=>{
            this.srcollEle(ele,type)
          },8)
        }
      }
    },
    changeStatus(){
      let index_ = parseInt(this.activeIndex)
      let length = this.$children.length
      this.$children.forEach((e,index)=>{
        if(this.allDone){
          e.done = true
        }else{
          if(this.showStrat && index == 0){
            e.done = true
            index_ += 1
          }else if(this.showEnd && index_ == length && index == length - 1){
            e.done = true
          }else{
            e.done = false
            e.active = false
            if(index+1 < index_) e.done = true
            if(index+1 == index_) e.active = true
          }
        }
      })
    }
  }
}
</script>
