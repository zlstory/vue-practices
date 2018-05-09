<template>
    <div class="singer">
        <list-view @select="selectSinger" :data="singers"></list-view>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import {
        getSingerList
    } from 'api/singer'
    import {
        ERR_OK
    } from 'api/config'
    import Singer from 'common/js/singer'    
    import ListView from 'base/listview/listview'
    //vuex的语法糖
    import {mapMutations} from "vuex"

    const HOT_NAME = "热门"
    const HOT_SINGER_LEN = 10
    export default {
        components:{
            ListView
        },
        data() {
            return {
                singers: []
            }
        },
        created() {
            this._getSingerList()
        },
        methods: {
            selectSinger(singer){
                this.$router.push({
                    path:`/singer/${singer.id}`
                })
                this.setSinger(singer)  //mutations的提交，修改了state，那么mutations.js中的state就有值了
            },
            _getSingerList() {
                getSingerList().then((res) => {
                    if (res.code === ERR_OK) {                       
                        this.singers = this._nomalizeSinger(res.data.list)
                        //console.log(this.singers)//一个数组包含0-22个对象的title与items，items中又包括不同数组 内容是avatar id name
                    }
                })
            },
            _nomalizeSinger(list) {
                let map = {
                    hot: {
                        title: HOT_NAME,
                        items: []
                    }
                }
                list.forEach((item, index) => {
                    if (index < HOT_SINGER_LEN) {
                        map.hot.items.push(new Singer({
                            id: item.Fsinger_mid,
                            name: item.Fsinger_name
                        }))
                    }
                    const key = item.Findex//大写字母                  
                    if (!map[key]) {
                        map[key] = {
                            title: key,
                            items: []
                        }
                    }
                    map[key].items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name
                    }))
                })
               
                /*  console.log(map); */
                //为了得到有序列表，现在处理map对象
                let hot = []
                let ret = []
                for (let key in map){
                    let val = map[key]
                    if(val.title.match(/[a-zA-Z]/)){
                        ret.push(val)//得到a-z的数据
                    }else if(val.title === HOT_NAME){//得到热门数据
                        hot.push(val)
                    }
                }
                ret.sort((a,b) => {//处理a-z的数据
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })
                return hot.concat(ret)//为了得到一维数组
            },
            ...mapMutations({
                setSinger:"SET_SINGER"  //对象映射
            })
        }
    }
</script>

<style scoped="scoped" lang="stylus" rel="stylesheet/stylus">
    .singer
        position fixed
        top 88px
        bottom 0
        width 100%
</style>
