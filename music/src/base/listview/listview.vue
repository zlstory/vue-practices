<template>
    <scroll @scroll="scroll" class="listview" :data="data" :listenScroll="listenScroll" :probeType="probeType" ref="listview">
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
                        <!-- 将:src换成v-lazy即可实现懒加载 -->
                        <img v-lazy="item.avatar" alt="" class="avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- 右侧滚动 -->
        <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li v-for="(item,index) in shortcutList" :data-index="index" class="item" :class="{'current':currentIndex==index}">{{item}}</li>
            </ul>
        </div>
        <div class="list-fixed" v-show="fixedTitle" ref="fixed">
            <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>
        <div v-show="!data.length" class="loading-container">
            <loading></loading>
        </div>
    </scroll>
</template>
<script type = "text/ecmascript-6">
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'    
    import { getData } from 'common/js/dom'

    const ANCHOR_HEIGHT = 18 //右侧导航条每个字母之间的高度
    const TITLE_HEIGHT = 30

    export default {
        props: {
            data: {
                type: Array,
                default: []               
            }
        },
        created() {
            this.touch = {}
            this.listenScroll = true
            this.listHeight = []
            this.probeType = 3
        },
        components: {
            Scroll,
            Loading
        },
        data() {
            return {
                scrollY: -1,
                currentIndex: 0 ,//高亮
                diff: -1
            }
        },
        computed: {
            shortcutList() {
                return this.data.map((group) => {
                    return group.title.substr(0, 1) //因为只有一个"热"字
                })
            },
            fixedTitle() {
                if (this.scrollY > 0) {
                    return ''
                }
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
            }
        },
        methods: {
            selectItem(item){
                this.$emit('select',item)
            },
            onShortcutTouchStart(e) {
                // console.log(e.target)//<li data-v-046b9814 data-index="11" class="item">M</li>
                let anchorIndex = getData(e.target, 'index')
                let firstTouch = e.touches[0] //获取第一个触摸的位置
                this.touch.y1 = firstTouch.pageY
                this.touch.anchorIndex = anchorIndex // 当前点击索引
                this._scrollTo(anchorIndex)
            },
            onShortcutTouchMove(e) {
                let firstTouch = e.touches[0]
                this.touch.y2 = firstTouch.pageY
                let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0 //得到右侧导航条每次移动几个元素
                let anchorIndex = parseInt(this.touch.anchorIndex) + delta
                //console.log(anchorIndex)
                this._scrollTo(anchorIndex)
            },
            scroll(pos) {
                this.scrollY = pos.y //实时获取到scroll y轴滚动的距离
            },
            _scrollTo(index) { //建议私有方法放在下面
                if (!index && index !== 0) {
                    return
                }
                if (index < 0) { //边界处理
                    index = 0
                } else if (index > this.listHeight - 2) {
                    index = this.listHeight - 2
                }
                this.scrollY = -this.listHeight[index]
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0) //这个0表示的是动画时间
            },
            _calculateHeight() {
                this.listHeight = []
                const list = this.$refs.listGroup
                // console.log(list)
                let height = 0 //第一组的length是0
                this.listHeight.push(height)
                for (let i = 0; i < list.length; i++) { //然后进行遍历
                    let item = list[i]
                    height += item.clientHeight
                    this.listHeight.push(height)
                }
            }
        },
        watch: {
            data() {
                setTimeout(() => { //数据变化到dom变化有延时
                    this._calculateHeight()
                }, 20)
            },
            scrollY(newY) {
                const listHeight = this.listHeight
                //当滚动到顶部的时候
                if (newY > 0) {
                    this.currentIndex = 0
                    return
                }
                //滚动在两字之间                
                for (let i = 0; i < listHeight.length - 1; i++) {
                    let height1 = listHeight[i]
                    let height2 = listHeight[i + 1]
                    if (-newY >= height1 && -newY < height2) {
                        this.currentIndex = i
                        this.diff = height2 + newY
                        return
                    }
                }
                //当滚动到底部
                this.currentIndex = listHeight.length - 2
            },
            diff(newVal) {
                let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
                if (this.fixedTop === fixedTop) {
                    return
                }
                this.fixedTop = fixedTop
                this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
   @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0px
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
