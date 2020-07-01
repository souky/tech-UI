<template>
  <button v-if='shows' :class="{'zs-btn': true,'disabled': disabled}" :disabled='disabled' @click='clicks'>
    <div class='zs-btn-icon-div'>
      <i :class="[className,'btn-icon']" ></i>
    </div>
    <div class='zs-btn-text'><slot></slot></div>
  </button>
</template>

<script>
import '../tools.js'
export default {
  name: 'zsButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
      desc: '是否禁用'
    },
    type: {
      type: String,
      desc: '按钮类型'
    },
    iconClass: {
      type: String,
      desc: '对应图标class'
    },
    buscode: {
      type: String,
      desc: '按钮权限id',
      default: ''
    }
  },
  data() {
      return {
        typeRelation: {
          add: 'zs-icon-zengjia',
          save: 'zs-icon-baocun',
          submit: 'zs-icon-tijiao',
          appa: 'zs-icon-shenhe',
          show: 'zs-icon-chakan',
          delete: 'zs-icon-shanchu',
          edit: 'zs-icon-xiugai',
          back: 'zs-icon-fanhui',
          atta: 'zs-icon-fujian',
          change: 'zs-icon-biangeng',
          cancle: 'zs-icon-quxiao',
          download: 'zs-icon-xiazai',
          list: 'zs-icon-liebiao',
          look: 'zs-icon-chakandatu',
          print: 'zs-icon-dayin',
          revoke: 'zs-icon-chexiao'
        },
        className: '',
        shows: true
      }
  },
  mounted: function(){
    if(this.iconClass){
      this.className = 'twm ' + this.iconClass
      return
    }
    this.className = 'twm ' + this.typeRelation[this.type]
    if(this.buscode){
      let permissions = this.$getSessionData('permissions_'+this.buscode)
      if(permissions) {
        let type = this.$deepCopy(this.type)
        if(permissions.indexOf(type.toUpperCase()) > -1){
          this.shows = true
        } else {
          this.shows = false
        }
      } else {
        this.shows = true
      }
    }
  },
  methods: {
    clicks(){
      this.$emit('click')
    }
  },
  watch: {
    'disabled': {
      handler(newVal,oldVal){
        this.disabled = newVal
      }
    },
    'type':{
      handler(newVal,oldVal){
        this.className = 'zs-icon twm ' + this.typeRelation[this.type]
      }
    },
    'iconClass':{
      handler(newVal,oldVal){
        this.className = 'zs-icon twm ' + this.iconClass
      }
    }
  }
}
</script>
