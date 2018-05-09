<template>
    <transition name="slide">
        <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">

 import {mapGetters} from 'vuex'
 import {getSingerDetail} from 'api/singer'
 import {ERR_OK} from 'api/config'
 import {createSong} from 'common/js/song'
 
 import MusicList from 'components/music-list/music-list'


export default {
    data(){
        return {
            songs:[]
        }
    },
    computed:{
        title(){
            return this.singer.name
        },
        bgImage(){
            return this.singer.avatar
        },
        ...mapGetters([
            'singer'
        ])
    },
    created(){
        this._getDetail()
    },
    components:{
        MusicList
    },
    methods:{
        _getDetail(){
            getSingerDetail(this.singer.id).then((res) => {
                if(res.code ===  ERR_OK){
                   this.songs = this._nomalizeSongs(res.data.list)
                   console.log(this.songs)
                }
            })
        },
        _nomalizeSongs(list){
            let ret = []
            list.forEach((item) => {
                let {musicData} = item
                if(musicData.songid && musicData.albummid){
                    ret.push(createSong(musicData))
                }
            });
            return ret
        }
    }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
    @import '~common/stylus/variable'
    .slide-enter-active,.slider-leave-active
        transition all 0.3s
    .slide-enter,.slider-leave-to
        transform translate3d(100%,0,0)
</style>

