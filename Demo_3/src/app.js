/**
 * 应用程序入口文件
 * 
 * 这个文件是Taro应用的主入口，负责初始化Vue应用实例，
 * 注册全局组件，并导出App实例供框架使用
 */
import { createApp } from 'vue'
import { 
  Button, // 按钮组件
  Toast,  // 轻提示组件
  Input,  // 输入框组件
  Cell,   // 单元格组件
  CellGroup // 单元格分组组件
} from '@nutui/nutui-taro'

// 导入全局样式文件
import './app.css'
// 导入NutUI组件库的样式
import '@nutui/nutui-taro/dist/style.css'

/**
 * 创建Vue应用实例
 * 
 * 在Taro中，App组件是整个应用的入口，
 * 可以在onShow等钩子中处理全局逻辑
 */
const App = createApp({
  // 应用显示时的钩子函数，可用于处理打开场景、参数等
  onShow(options) {
    // options包含场景值、启动参数等信息
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

/**
 * 注册全局组件
 * 
 * 使用Vue的use方法全局注册NutUI组件，
 * 注册后可在任意组件中直接使用，无需单独导入
 */
App.use(Button)  // 注册按钮组件
App.use(Toast)   // 注册轻提示组件
App.use(Input)   // 注册输入框组件
App.use(Cell)    // 注册单元格组件
App.use(CellGroup) // 注册单元格分组组件

// 导出App实例供Taro框架使用
export default App
