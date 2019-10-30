<template>
  <div class="modal-box">
    <div class="modal-content"></div>
  </div>
</template>

<script>
export default {
  name: 'tips'
}
</script>

<style lang="stylus">
.modal-box
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  background rgba(0,0,0,0.7)
  z-index 1000
  .modal-content
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%);
    width 600px
    height 300px
    background #fff
</style>
