<template lang="html">
  <div class="opt-btns">
    <el-popover popper-class="transparent" placement="left" trigger="click">
      <div class="opt-btn">
        <slot></slot>
      </div>
      <el-button icon="el-icon-s-tools" title="操作" size="mini" circle slot="reference"></el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
      return {
      }
  },
  computed: {
  },
  mounted:function(){
  },
  methods: {

  },
}
</script>
