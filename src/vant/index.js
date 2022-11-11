//Vant 2.0组件
import {Tab, Tabs,PullRefresh,Toast,List } from 'vant'

const UIComponents = [Tab, Tabs,PullRefresh,Toast,List ]


const mintUiPlugin = {};

mintUiPlugin.install = function (Vue) {

    UIComponents.forEach(Component => {

        Vue.use(Component)

    })

}

export default mintUiPlugin