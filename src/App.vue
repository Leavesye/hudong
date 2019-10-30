<template>
  <div :class="[isIos ? 'xn-ios':'']"
       style="height:100%;">
    <!-- <div class="Offline">
      <div class="end">
        本活动已结束<br>
        更多活动敬请期待</div>
    </div> -->
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isIos: false,
      transitionName: ''
    }
  },
  mounted () {
    this.getDevice()
  },
  methods: {
    getDevice () {
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        this.isIos = true
      }
    }
  },
  watch: {// 使用watch 监听$router的变化
    $route (to, from) {
      // 如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > 0) {
        if (to.meta.index < from.meta.index) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
      } else if (to.meta.index === 0 && from.meta.index > 0) {
        this.transitionName = 'slide-right'
      }
    }
  }
}
</script>
<style lang="stylus">
.Offline
  background-color rgba(0, 0, 0, 0.5)
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index 1000
  line-height 100%
  text-align center
  display flex
  align-items center
  justify-content center
  font-size 24px
  .end
    display flex
    align-items center
    justify-content center
    width 500px
    height 200px
    line-height 2
    text-align center
    color #333
    background-color #fff
    border 1px solid #fff
    margin auto
body
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  height 100%
  color #232323
  .xn-ios
    height 100%
a
  color #d91760
.slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active
  will-change transform
  transition all 0.8s
  position absolute
  width 100%
  left 0
.slide-right-enter
  // transform translateX(-100%)
  opacity 1
.slide-right-leave-active
  // transform translateX(100%)
  opacity 0
.slide-left-enter
  // transform translateX(100%)
  opacity 1
.slide-left-leave-active
  // transform translateX(-100%)
  opacity 0
</style>
