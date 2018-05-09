<template>
  <div class="player">
      <div class="nomal-player">
          播放器
      </div>
      <div class="mini-player"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

    @import "~common/stylus/variable";
    @import "~common/stylus/mixin";

    .player
        .nomal-player
            position fixed
            left 0
            right 0
            top 0
            bottom 0
            z-index 150
            background $color-background
            .background
                position absolute
                left 0
                top 0
                width 100%
                height 100%
                z-index -1
                opacity 0.6
                filter blur(20px)
            .top
                position relative
                margin-bottom 25px
                .back
                    position absolute
                    top 0
                    left 6px
                    z-index 60px
                    .icon-back
                        display block
                        padding 9px
                        font-size $font-size-large-x
                        color $theme-color
                        transform rotate(-90deg)
                    .title 
                        width 70%
                        margin 0 auto
                        line-height 40px
                        text-align center
                        no-wrap()
                        font-size $font-size-large
                        color $color-text
                    .subtitle
                        line-height 20px
                        text-align center
                        font-size $font-size-medium
                        color $color-text
                    .middle
                        position fixed
                        width 100%
                        top 80px
                        bottom 170px
                        white-space nowrap
                        font-size 0
                        .middle-l
                            display inline-block
                            vertical-align top
                            position relative
                            width 100%
                            height 0
                            paddint-top 80%
                            .cd-wrapper
                                position absolute
                                left 10%
                                top 0
                                width 80%
                                height 100%
                                .cd
                                    width 100%
                                    height 100%
                                    box-sizing border-box
                                    










           




</style>
