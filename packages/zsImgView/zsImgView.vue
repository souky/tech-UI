<template lang="html">
  <transition name="el-fade-in-linear">
    <div :class="{'zs-img-view':true,'is-dialog':isDialog}" v-show.sync="visible"
    :style="{'margin-left':diaLogLeft,'margin-top':diaLogTop}">

      <div class="img-close" @click="close" v-if="!isDialog">
        <i class="zs-icon icon-quxiao"></i>
      </div>

      <div class="img-body" v-if="!isDialog">
        <img class="ib-imgs" :src="e" v-for="e,index in imgList" :key="index+1"
        v-if="index == imgIndex" @mousedown="imgMousedown" @mouseup="imgMouseup"
        :style="{'width':'100%','transform':'scale('+zoom+') rotate('+rotate+'deg)','margin-left':'0px','margin-top':'0px'}"/>

        <div class="ib-opt ib-pres" @click="changeImg('pres')"><i class="el-icon-arrow-left"></i></div>
        <div class="ib-opt ib-next" @click="changeImg('next')"><i class="el-icon-arrow-right"></i></div>

        <div class="ib-mark" v-if="showMark">
          <div v-for="e,index in imgList" :style="{'width':markSize+'px','height':markSize+'px'}"
          :class="{'ib-mark-items twm':true,'active':index == imgIndex}" :key="index+1"
          @click="changeImg('jump',index)"></div>
        </div>
      </div>

      <div class="img-dia-body" v-if="isDialog"
        :style="{'width':diaWidth+'px','height':diaHeight+'px','margin-left':'0px','margin-top':'0px'}">
        <div class="dia-header" @mousedown="dialogMousedown" @mouseup="dialogMouseup">
          {{diaTitle}}
          <i class="zs-icon icon-quxiao dia-close" @click="close"></i>
        </div>
        <div class="dia-img" :style="{'width':'100%','height':'calc('+diaHeight+'px - 40px)'}">
          <img class="ib-imgs" :src="e" v-for="e,index in imgList" :key="index+1"
          v-if="index == imgIndex" @mousedown="imgMousedown" @mouseup="imgMouseup"
          :style="{'width':'100%','transform':'scale('+zoom+') rotate('+rotate+'deg)','margin-left':'0px','margin-top':'0px'}"/>

          <div class="ib-opt ib-pres" @click="changeImg('pres')"><i class="el-icon-arrow-left"></i></div>
          <div class="ib-opt ib-next" @click="changeImg('next')"><i class="el-icon-arrow-right"></i></div>

          <div class="ib-mark" v-if="showMark">
            <div v-for="e,index in imgList" :style="{'width':markSize+'px','height':markSize+'px'}"
            :class="{'ib-mark-items twm':true,'active':index == imgIndex}" :key="index+1"
            @click="changeImg('jump',index)"></div>
          </div>

          <div class="img-tools" v-if="showTools">
            <div class="it-body">
              <div class="it-items" @click='changeZoom(false)'>
                <i class="el-icon-minus"></i>
              </div>
              <div class="it-items"  @click='changeZoom(true)'>
                <i class="el-icon-plus"></i>
              </div>
              <div class="it-items" @click='changeRotate(false)'>
                <i class="el-icon-refresh-left"></i>
              </div>
              <div class="it-items" style="border:none" @click='changeRotate(true)'>
                <i class="el-icon-refresh-right"></i>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="img-tools" v-if="showTools && !isDialog">
        <div class="it-body">
          <div class="it-items" @click='changeZoom(false)'>
            <i class="el-icon-minus"></i>
          </div>
          <div class="it-items"  @click='changeZoom(true)'>
            <i class="el-icon-plus"></i>
          </div>
          <div class="it-items" @click='changeRotate(false)'>
            <i class="el-icon-refresh-left"></i>
          </div>
          <div class="it-items" style="border:none" @click='changeRotate(true)'>
            <i class="el-icon-refresh-right"></i>
          </div>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible:{
      type:Boolean,
      desc: '是否显示'
    },
    loop:{
      type:Boolean,
      default:true,
      desc: '是否循环切换图片'
    },
    canZoom:{
      type:Boolean,
      default:true,
      desc: '图片是否可以缩放'
    },
    canDrags:{
      type:Boolean,
      default:true,
      desc: '图片是否可以拖拽'
    },
    showMark:{
      type:Boolean,
      default:true,
      desc: '是否显示图片mark'
    },
    markSize:{
      type:Number,
      default:14,
      desc: '图片mark大小'
    },
    showTools:{
      type:Boolean,
      default:true,
      desc: '是否显示工具条'
    },
    imgList:{
      type:Array,
      desc:'图片列表',
      default:()=>[]
    },
    isDialog:{
      type:Boolean,
      default:false,
      desc: '是否采用弹框模式'
    },
    diaWidth:{
      type:Number,
      default:800,
      desc: '弹框宽度'
    },
    diaHeight:{
      type:Number,
      default:500,
      desc: '弹框高度'
    },
    diaTitle:{
      type:String,
      default:'图片查看',
      desc: '弹框标题'
    },
    activeIndex: {
      type: Number,
      desc: '激活展示的图片下标',
      default:0
    }
  },
  data() {
    return {
      // img max length
      imgIndex:0,
      imgMaxLength:0,

      // img zoom
      zoom:0.8,
      rotate:0,
      targetX:0,
      targetY:0,

      // img move
      tempX:0,
      tempY:0,
      canMove:false,
      targetImg:'',

      targetDialog:'',
      dialogCanMove:false,
      diaLogLeft:'0px',
      diaLogTop:'0px',
    }
  },
  mounted:function(){
    this.$nextTick(() => {
      const body = document.querySelector("body");
      if (body.append) {
        body.append(this.$el);
      } else {
        body.appendChild(this.$el);
      }
    });
    if(this.imgList.length != 0) this.imgMaxLength = this.imgList.length - 1;
    this.imgIndex = this.activeIndex;
    if(this.isDialog) this.initDialog();
  },
  methods: {
    // 关闭组件
    close(){
      this.$emit('update:visible', false);
    },
    initKeyDown(){
      window.onkeydown = event=>{
        if(event.keyCode === 37){
          this.changeImg('pres')
        }
        if(event.keyCode === 39){
          this.changeImg('next')
        }
      }
    },
    initImgMove(){
      if(this.canDrags){
        window.onmousemove = event=>{
          event.preventDefault();
          if(this.canMove){
            let tempX = event.clientX;
            let tempY = event.clientY;

            let moveX = this.targetX - (this.tempX - tempX );
            let moveY = this.targetY - (this.tempY - tempY);

            this.targetImg.style.marginLeft = moveX + 'px';
            this.targetImg.style.marginTop = moveY + 'px';
          }
          if(this.dialogCanMove){
            let tempX = event.clientX;
            let tempY = event.clientY;

            let moveX = this.targetX - (this.tempX - tempX );
            let moveY = this.targetY - (this.tempY - tempY);

            this.targetDialog.style.marginLeft = moveX + 'px';
            this.targetDialog.style.marginTop = moveY + 'px';
          }
        }

        window.onmouseup = event=>{
          this.canMove = false;
          this.dialogCanMove = false;
        }
      }
    },
    initImgZoom(){
      if(this.canZoom){
        if(this.isDialog){
          this.$el.querySelector('.dia-img').onmousewheel = event=>{
            event.stopPropagation();
            event.preventDefault();
            let zoom_ = this.$deepCopy(this.zoom)
            if(event.wheelDelta){
              if(event.wheelDelta > 0)zoom_ += 0.1
              else zoom_ -= 0.1
            }else if(event.detail){
              if(event.detail > 0) zoom_ += 0.1
              else zoom_ -= 0.1
            }
            if(zoom_ < 0.3) zoom_ = 0.3
            if(zoom_ > 2) zoom_ = 2
            this.zoom = zoom_
          }
        }else{
          window.onmousewheel = event=>{
            let zoom_ = this.$deepCopy(this.zoom)
            if(event.wheelDelta){
              if(event.wheelDelta > 0)zoom_ += 0.1
              else zoom_ -= 0.1
            }else if(event.detail){
              if(event.detail > 0) zoom_ += 0.1
              else zoom_ -= 0.1
            }
            if(zoom_ < 0.3) zoom_ = 0.3
            if(zoom_ > 2) zoom_ = 2
            this.zoom = zoom_
          }
        }

      }
    },
    initDialog(){
      this.zoom = 1
      let totalHeight = window.innerHeight;
      let totalWidth = window.innerWidth;
      this.diaLogLeft = (totalWidth - this.diaWidth)/2 + 'px';
      this.diaLogTop = (totalHeight - this.diaHeight)/2 + 'px';
    },
    changeImg(e,index){
      // 重置缩放和位置
      if(this.isDialog) this.$set(this,'zoom',1);
      else this.$set(this,'zoom',0.8);
      this.$set(this,'rotate',0);
      if(e == 'jump'){
        this.$set(this,'imgIndex',index);
        return;
      }
      let imgIndex = this.$deepCopy(this.imgIndex);
      let imgMaxLength = this.$deepCopy(this.imgMaxLength);
      if(e == 'pres'){
        imgIndex -= 1;
      }else{
        imgIndex += 1;
      }
      // loop
      if(imgIndex < 0){
        imgIndex = this.loop?imgMaxLength:0
      }
      if(imgIndex > imgMaxLength){
        imgIndex = this.loop?0:imgMaxLength
      }
      this.$set(this,'imgIndex',imgIndex);
    },
    // 图片平移相关
    imgMousedown(event){
      this.tempX = event.clientX;
      this.tempY = event.clientY;
      this.canMove = true;
      this.targetImg = event.target
      this.targetX = parseInt(this.targetImg.style.marginLeft)
      this.targetY = parseInt(this.targetImg.style.marginTop)
      event.preventDefault();
    },
    imgMouseup(event){
      this.tempX = 0;
      this.tempY = 0;
      this.canMove = false;
      this.targetImg = null
    },

    // dialog 平移相关
    dialogMousedown(event){
      this.tempX = event.clientX;
      this.tempY = event.clientY;
      this.dialogCanMove = true;
      this.targetDialog = event.target.parentNode.parentNode
      this.targetX = parseInt(this.targetDialog.style.marginLeft)
      this.targetY = parseInt(this.targetDialog.style.marginTop)
      event.preventDefault();
    },
    dialogMouseup(event){
      this.tempX = 0;
      this.tempY = 0;
      this.dialogCanMove = false;
      this.targetDialog = null
    },

    // tools function
    changeZoom(e){
      if(!this.canZoom){
        return
      }
      let zoom_ = this.$deepCopy(this.zoom)
      if(e){
        zoom_ += 0.3
      }else{
        zoom_ -= 0.3
      }
      if(zoom_ < 0.3) zoom_ = 0.3
      if(zoom_ > 2) zoom_ = 2
      this.zoom = zoom_
    },

    changeRotate(e){
      let rotate_ = this.$deepCopy(this.rotate)
      if(e){
        rotate_ += 90
      }else{
        rotate_ -= 90
      }
      this.rotate = rotate_
    },



  },
  watch:{
    'visible':{
      handler(val){
        if(val){
          if(this.imgList.length == 0){
            this.$emit('update:visible', false);
            this.$notify_warning("图片走丢了");
          }else{
            this.imgMaxLength = this.imgList.length - 1;
            this.initImgMove();
            this.initImgZoom();
            this.initKeyDown();
            if(this.isDialog) this.initDialog();
          }
        }else{
          window.onmousemove = e=>{
            return
          }
          window.onmousewheel = e=>{
            return
          }
          window.onkeydown = e=>{
            return
          }
        }
      }
    },
    'activeIndex':{
      handler(val) {
        this.imgIndex = val;
      }
    }
  }
}
</script>
