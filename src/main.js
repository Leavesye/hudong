import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/styles/index.styl'
import 'lib-flexible'
import zh from 'vee-validate/dist/locale/zh_CN' // 引入中文文件
import Calendar from 'vue2-datepick'

const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fieldBags', // 报冲突时 可自定义修改字段名称
  delay: 0, // 错误提示的延迟时间
  strict: true, // 没有设置规则的表单不进行校验，
  enableAutoClasses: false,
  locale: 'zh_CN', // 对语言（中文）的配置
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input', //* *input|blur** 在用户输入和表单失去焦点时都进行校验 可单独写  blur或input
  inject: true
}
Vue.use(Calendar)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
window.alert = function(name) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", 'data:text/plain');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
  }
  // document.body.addEventListener('focusout', () => {
  //   //软键盘收起的事件处理
  //   // if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0) { //键盘收齐页面空白问题
  //       document.body.scrollTop = document.body.scrollHeight;
  //   // }
  // })
var u = navigator.userAgent,
  app = navigator.appVersion
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
document.body.addEventListener('focusout', () => {
    //软键盘收起的事件处理
    // if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0) { //键盘收齐页面空白问题
    //     document.body.scrollTop = document.body.scrollHeight;
    // }
    if (isIOS) {
      blurAdjust()
    }
  })
  // 解决苹果不回弹页面
function blurAdjust(e) {
  setTimeout(() => {
    if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
      return
    }
    let result = 'pc';
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
      result = 'ios'
    } else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
      result = 'android'
    }

    if (result = 'ios') {
      document.activeElement.scrollIntoViewIfNeeded(true);
    }
  }, 100)
}
