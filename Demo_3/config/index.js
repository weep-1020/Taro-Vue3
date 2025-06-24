import { defineConfig } from '@tarojs/cli'

import devConfig from './dev'
import prodConfig from './prod'
import NutUIResolver from '@nutui/auto-import-resolver'

import Components from 'unplugin-vue-components/vite'

/**
 * Taro项目主配置文件
 * 详细配置参考: https://taro-docs.jd.com/docs/next/config
 * 
 * 本配置文件定义了项目的基本信息、构建选项和插件设置等
 */
export default defineConfig(async (merge, { command, mode }) => {
  // 基础配置，适用于所有环境
  const baseConfig = {
    // 项目名称
    projectName: 'Demo_3',
    // 项目创建日期
    date: '2025-6-24',
    // 设计稿尺寸配置
    designWidth (input) {
      // 配置 NutUI 375 尺寸，NutUI默认使用375设计稿
      if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
        return 375
      }
      // 全局使用 Taro 默认的 750 尺寸
      return 750
    },
    // 设备比例配置，用于计算rpx转px的比例
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    // 源代码目录
    sourceRoot: 'src',
    // 编译输出目录
    outputRoot: 'dist',
    // 使用的插件列表
    plugins: ['@tarojs/plugin-html'], // plugin-html用于支持HTML标签
    // 全局常量定义
    defineConstants: {
    },
    // 文件拷贝配置
    copy: {
      patterns: [
      ],
      options: {
      }
    },
    // 框架配置，使用Vue3
    framework: 'vue3',
    // 编译器配置
    compiler: {
      type: 'vite', // 使用vite作为构建工具
      vitePlugins: [
        // 自动导入NutUI组件的配置
        Components({
          resolvers: [NutUIResolver({taro: true})]
        })
      ]
    },
    // 小程序端特有配置
    mini: {
      postcss: {
        // px转换为rpx配置
        pxtransform: {
          enable: true,
          config: {
            selectorBlackList: [/nut-/] // 忽略NutUI组件的样式转换
          }
        },
        // CSS Modules配置
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    // H5端特有配置
    h5: {
      // 公共路径配置
      publicPath: '/',
      // 静态资源目录
      staticDirectory: 'static',
      // CSS提取插件配置
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        // 自动添加浏览器前缀
        autoprefixer: {
          enable: true,
          config: {}
        },
        // CSS Modules配置
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    // React Native配置
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }
  
  // 根据环境返回不同的配置
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
