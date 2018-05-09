import * as types from './mutation-types'

const matutations = {
    [types.SET_SINGER](state,singer){
        state.singer = singer
    },
    [types.SET_PLAYING_STATE](state,flag){
        state.playing = flag
    },
    [types.SET_FULL_SCREEN](state,flag){
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state,list){
        state.playlist = list
    },
    [types.SET_SEQUENCE_LIST](state,list){
        state.sequenceList = list
    },
    [types.SET_PLAY_MODE](state,mode){
        state.playMode = mode
    },
    [types.SET_CURRENT_INDEX](state,index){
        state.playMode = index
    }

}

export default matutations