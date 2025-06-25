/**
 * 应用全局配置文件
 * 
 * 该文件是Taro应用的全局配置，用于设置页面路由、窗口样式等全局属性
 * 参考文档: https://taro-docs.jd.com/docs/app-config
 */
export default {
  /**
   * 页面路由配置
   * 
   * 数组中的每个路径对应src目录下的一个页面组件
   * 数组的第一项为小程序的首页
   */
  pages: [
    'pages/index/index' // 主页面路径，对应 src/pages/index/index.vue
  ],
  
  /**
   * 全局窗口配置
   * 
   * 用于设置小程序所有页面的通用样式
   * 可在页面配置中覆盖
   */
  window: {
    backgroundTextStyle: 'light', // 下拉背景字体、loading 图的样式，仅支持 'dark'/'light'
    navigationBarBackgroundColor: '#ffffff', // 导航栏背景颜色
    navigationBarTitleText: '场馆', // 导航栏标题文字
    navigationBarTextStyle: 'black' // 导航栏标题颜色，仅支持 'black'/'white'
  }
}
