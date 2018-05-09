import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import *　as getters from './getters'
import state from './state'
import  mutations from './mutations'
//vuex 的插件：查看日志
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

//调试工具

const debug = process.env.NODE_ENV !== 'production'

export default  new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict:debug,    //开发模式
    plugins: debug ? [createLogger()] : []
})
