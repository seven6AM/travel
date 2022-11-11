import { Swipe, SwipeItem,Tab, Tabs} from 'wot-design'

const UIComponents = [ Swipe, SwipeItem,Tab, Tabs]


const WotUIPlugin = {};

WotUIPlugin.install = function (Vue) {

    UIComponents.forEach(Component => {

        Vue.use(Component)

    })

}

export default WotUIPlugin