/**
 * 首页配置文件
 * 
 * 该文件定义了首页的导航栏、标题等页面级配置，
 * Taro会根据此配置为页面生成特定的选项
 * 参考文档: https://taro-docs.jd.com/docs/page-config
 */
export default {
  /**
   * 导航栏标题
   * 
   * 展示在小程序顶部导航栏中心的文字
   */
  navigationBarTitleText: '场馆',
  
  /**
   * 导航栏背景颜色
   * 
   * 使用白色作为导航栏背景
   */
  navigationBarBackgroundColor: '#000000',
  
  /**
   * 导航栏标题颜色
   * 
   * 使用黑色文字以保证在白色背景上的可读性
   */
  navigationBarTextStyle: 'white',
  
  /**
   * 下拉刷新相关配置
   * 
   * 启用下拉刷新功能，并设置背景颜色
   */
  enablePullDownRefresh: true,
  backgroundColor: '#f7f8fa',
  
  /**
   * 窗口配置
   * 
   * 设置窗口背景色和文字样式
   */
  // backgroundTextStyle: 'light',
  
  /**
   * 页面分享配置
   * 
   * 可选，定义了页面的分享行为，包括标题和图片
   * 此处未设置，将使用全局默认配置
   */
  // 小程序分享设置可在页面组件中通过生命周期钩子配置
}
