/**
 * Babel配置文件
 * 
 * 用于配置JavaScript的编译选项，将ES6+语法转换为兼容性更好的代码
 * Taro使用babel-preset-taro预设来适配各端环境
 */
module.exports = {
  presets: [
    // babel-preset-taro 是一个预设集合，包含了Taro项目所需的Babel插件
    ['taro', {
      framework: 'vue3', // 指定使用Vue3框架
      ts: false         // 不使用TypeScript
    }]
  ]
}
