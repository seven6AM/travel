//饿了么公司组件
import {Search, Swipe, SwipeItem} from 'mint-ui'

const UIComponents = [Search.name, Search,Swipe.name, Swipe,SwipeItem.name, SwipeItem]


const mintUiPlugin = {};

mintUiPlugin.install = function (Vue) {

    UIComponents.forEach(Component => {

        Vue.use(Component)

    })

}

export default mintUiPlugin