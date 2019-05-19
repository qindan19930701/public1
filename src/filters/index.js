import dateFormat from './data-format'

export default {
  install (Vue, options) {
    console.log(options)
    Vue.filter('dateFormat', dateFormat)
  }
}
