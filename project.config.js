const projectConfig = {
  'yxw': {
    // 额度申请首次跳转页面
    'firstPageName': 'Light Theme',
    // 主题配置路径
    'themeVariables': './src/scss/theme-config-variables/default',
    // 页面信息配置路径
    'pageApplyInfoUrl': './src/project-config/yxw/apply',
    // 平台logo配置路径
    'logoURL': 'https://www.example.com/imgs/light.jpg'
  },
  'slw': {
    'firstPageName': 'Dark Theme',
    'themeVariables': './src/scss/theme-config-variables/dark',
    'pageApplyInfoUrl': './src/project-config/slw/apply/',
    'logoURL': 'https://www.example.com/imgs/dark.jpg'
  }
}

module.exports = projectConfig
