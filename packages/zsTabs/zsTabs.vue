<template>
<div :class="['tabs',{'mini':mini}]">
  <div class="tabs-title" v-if="title">{{title}}</div>
  <slot name="header" v-if="!mini"></slot>
  <div class="tabs-bar">
    <div :class="tabCls(item)"
          v-for="(item,index) in navList"
        @click = "handleChange(index)" :key="item.name">
      {{item.label}}

      <svg v-if="index != '0'" width="20px" height="30px" class="tab-s-svg svg-left">
        <path :d="pathL" stroke='#53bbe6' stroke-width='2px'
        :fill="item.name == currentValue?'#fff':'#54c2f0'"></path>
      </svg>
      <svg  width="20px" height="31px" class="tab-s-svg svg-right">
        <path :d="pathR" stroke='#53bbe6' stroke-width='1.2px'
         :fill="item.name == currentValue?'#fff':'#54c2f0'"></path>
      </svg>
    </div>
    <slot name="header" v-if="mini"></slot>
    <i class="el-icon-d-caret fixed-right" title="收起" @click="hideContent" v-if="tabHide"></i>
  </div>
  <div :class="['tabs-content thm',{'tabs-hide':contentHide,'over-flow':tabHide,'full-height':fullHight}]">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    value: [String, Number],
    title:[String],
    tabHide:[Boolean],
    fullHight:[Boolean],
    mini:[Boolean],
    required: false
  },
  data () {
    return {
      currentValue: this.value,
      navList: [],
      // 0267d0
      // pathL:'M0,0 C22,0 0,30 20,34 L0,34',
      // pathR:'M0,0 C22,0 0,30 20,34 L0,35'

      pathL:'M0,0 C8,8 9,20 15,30 L0,30',
      pathR:'M0,0 C10,12 8,20 18,31 L0,31',
      contentHide:false

    }
  },
  methods: {
    tabCls (item) {
      return [
        'tabs-tab',
        {
          'tabs-tab-active': item.name === this.currentValue
        }
      ]
    },
    hideContent(){
      this.contentHide = !this.contentHide
    },
    getTabs () {
    //获取pane
      return this.$children.filter(function (item) {
        return item.$options.name === 'pane'
      })
    },
    updateNav () {
    //获取标题，name,并放置到navList数组中
      this.navList = []
      let _this = this
      this.getTabs().forEach(function (pane, index) {
        _this.navList.push({
          label: pane.label,
          name: pane.name || index

        })
        if (!pane.name) pane.name = index
        if (index === 0) {
          if (!_this.currentValue) {
            _this.currentValue = pane.name || index
          }
        }
      })
      this.updateStatus()
    },
    updateStatus () {
      let tabs = this.getTabs()
      let _this = this
      tabs.forEach(function (tab) {
        let b = tab.name === _this.currentValue
        tab.show = b
        return tab.show
      })
    },
    handleChange (index) {
      let nav = this.navList[index]
      let name = nav.name
      this.currentValue = name
      this.$emit('input', name)
      this.$emit('tab-click', name)
    }
  },
  watch: {
    value: function (val) {
      this.currentValue = val
    },
    currentValue () {
      this.updateStatus()
    }
  }
}
</script>
