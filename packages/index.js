import './theme/index.scss'

import zsButton from './zsButton'

const components = [
  zsButton
]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

export default {
  install,
  zsButton
}
