<template>
  <div class="span1 center">
    <text>路由：推荐 (recommend)</text>
    <bui-button type="primary" value="返回" @click="jumpTo"></bui-button>
  </div>
</template>

<style lang="scss" src="src/css/dolphinweex.scss"></style>

<script>
const globalEvent = weex.requireModule('globalEvent')
import dolphinweex from 'src/js/dolphinweex.js'
module.exports = {
  data() {
    return {}
  },
  methods: {
    jumpTo() {
      this.$router.go(-1)
    }
  }
}
</script>
