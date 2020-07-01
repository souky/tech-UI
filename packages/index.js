import './theme/index.scss'

import zsButton from './zsButton'
import zsDialog from './zsDialog'
import zsImgview from './zsImgview'

const components = [
  zsButton,
  zsDialog,
  zsImgview
]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

export default {
  install,
  zsButton,
  zsDialog,
  zsImgview
}
