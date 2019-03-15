import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import {getStore} from '../utils/storage'
import {setTitle} from '../utils/util'

Vue.use(Router)
const demo = r => require.ensure([], () => r(require('@/views/demo')), 'chunk-demo')
const FormGeneratorPape = r => require.ensure([], () => r(require('@/views/FormGeneratorPape')), 'chunk-formGenerator')
const HelloWord = r => require.ensure([], () => r(require('@/views/HelloWord')), 'chunk-helloWord')
const EnterpriseInfo = r => require.ensure([], () => r(require('@/views/applyLoan/enterpriseInfo')), 'chunk-enterpriseInfo')

const router = new Router({
  routes: [
    {name: 'helloWord', path: '/helloWord', component: HelloWord, meta: {auth: false, title: 'demo', transitionName: `slide`}},
    {name: 'enterpriseInfo', path: '/first', component: EnterpriseInfo, meta: {auth: false, title: '企业信息', transitionName: `slide`}},
    {name: 'demo', path: '/demo', component: demo, meta: {auth: false, title: 'demo', transitionName: `slide`}},
    {name: 'formGenerator', path: '/formgenerator', component: FormGeneratorPape, meta: {auth: false, title: '自定义表单', transitionName: `zoom`}}
  ]
})

router.beforeEach((to, from, next) => {
  const {path} = to
  const {title, along} = to.meta
  setTitle(to.meta.title)
  store.commit('changeRouterInfo', {title, along})
  if (to.meta.auth) {
    const token = getStore('token')
    store.commit('changeFullPath', to.fullPath)
    if (token) {
      next()
    } else if (path !== 'login') {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

/**
 * 加载异步组件
 * @param {String}} url
 */
const asyncGetComponent = (url = '@/views/notFound') => {
  return (resolve) => require([`@/views${url}`], resolve)
}

/**
 * 组合路由数据
 * @param {Array} navList
 * @param {String}} url
 */
export const composeRouter = () => {
  const routerList = []
  const recursiveArr = (arr, level = '') => {
    console.log(level)
    arr.map(({menuName, url, childTree}, index) => {
      if (Array.isArray(childTree)) {
        recursiveArr(childTree, level === '' ? `${index + 1}` : `${level}-${index}`)
      } else {
        console.log(`${level}-${index}`)
      }
      if (url && url !== 'null') {
        const routerItem = Object.assign({}, {path: url, component: asyncGetComponent(url), meta: {auth: true, title: menuName}})
        routerList.push(routerItem)
      }
    })
    return routerList
  }
  return recursiveArr
}
export default router
