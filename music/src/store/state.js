import {playMode} from 'common/js/config'

const state = {
    singer:{},
    playing:false,
    fullScreen:false, //全屏
    playlist:[], //歌单列表
    sequenceList:[],  //顺序播放
    mode:playMode.sequence,
    currentIndex:-1

}
export default state