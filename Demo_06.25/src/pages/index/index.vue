<!--
  场馆预订小程序首页
  
  本页面实现了一个场馆预订小程序的主页面，包含以下功能模块：
  1. 顶部搜索框：用于搜索课程、场馆、教练或活动
  2. 运动类型导航：提供8种不同类型的场馆快速入口
  3. 实时成交展示：显示最近的订单交易信息
  4. 精选课程推荐：展示热门课程和教练信息
  5. 推荐场馆列表：展示附近的场馆信息和距离
  6. 底部导航栏：提供场馆、更多、我的三个主要功能入口
-->
<template>
  <!-- 整个页面容器 -->
  <view class="venue-page">
    <!-- 顶部搜索框区域 -->
    <view class="search-box">
      <view class="search-wrapper">
        <!-- 使用NutUI的Input组件实现搜索输入框 -->
        <nut-input class="search-input" v-model="searchValue" placeholder="课程/场馆/教练/活动项目" :border="true">
          <!-- 自定义搜索图标插槽，使用本地图片替代SVG -->
          <template #left>
            <view class="search-icon">
              <!-- 使用本地图片作为搜索图标 -->
              <image class="search-icon-img" src="../../images/A01.png" mode="aspectFit"></image>
            </view>
          </template>
        </nut-input>
      </view>
    </view>

    <!-- 八类运动图标导航区 -->
    <view class="sport-icons">
      <!-- 使用v-for循环渲染8种运动类型 -->
      <view class="sport-item" v-for="(item, index) in sportTypes" :key="index">
        <!-- 圆形背景 + 图标，动态设置背景颜色 -->
        <view class="icon-wrapper" :style="{ backgroundColor: item.bgColor }">
          <text class="icon-text">{{ item.icon }}</text>
        </view>
        <!-- 运动类型名称 -->
        <text class="sport-name">{{ item.name }}</text>
      </view>
    </view>

    <!-- 实时成交订单展示区 -->
    <view class="section">
      <!-- 带下划线的标题 -->
      <view class="section-title">
        <text>实时成交</text>
        <!-- 标题下方的红色下划线 -->
        <view class="title-line"></view>
      </view>
      <!-- 订单列表 -->
      <view class="order-list">
        <!-- 使用v-for循环渲染订单项 -->
        <view class="order-item" v-for="(item, index) in orderList" :key="index">
          <!-- 用户头像 -->
          <view class="user-avatar">
            <image :src="item.avatar" mode="aspectFill"></image>
          </view>
          <!-- 订单信息：用户名和订单描述 -->
          <view class="order-info">
            <view class="user-name">{{ item.name }}</view>
            <view class="order-desc">{{ item.desc }}</view>
          </view>
          <!-- 订单时间和价格区域，调整顺序 -->
          <view class="order-right">
            <!-- 订单时间移到价格上方 -->
            <view class="order-time">{{ new Date().toLocaleString() }}</view>
            <!-- 订单价格 -->
            <view class="order-price">{{ item.price }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 精选课程推荐区 -->
    <view class="section">
      <!-- 区域标题 -->
      <view class="section-title">
        <text>精选课程</text>
      </view>
      <!-- 课程列表 -->
      <view class="course-list">
        <!-- 使用v-for循环渲染课程项 -->
        <view class="course-item" v-for="(item, index) in courseList" :key="index">
          <!-- 课程左侧：教练头像和课程信息 -->
          <view class="course-left">
            <!-- 教练头像 -->
            <view class="coach-avatar">
              <image :src="item.avatar" mode="aspectFill"></image>
            </view>
            <!-- 课程信息：教练名称和课程描述 -->
            <view class="course-info">
              <view class="coach-name">{{ item.name }}</view>
              <view class="course-desc">{{ item.desc }}</view>
            </view>
          </view>
          <!-- 课程右侧：价格和预约按钮 -->
          <view class="course-right">
            <!-- 课程价格 -->
            <view class="course-price">{{ item.price }}</view>
            <!-- 预约按钮，使用自定义按钮替代NutUI按钮，保持风格统一 -->
            <view class="book-btn" @click="handleBookCourse(item)">预约</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 推荐场馆展示区 -->
    <view class="section">
      <!-- 带"更多"按钮的标题区域 -->
      <view class="section-header">
        <text>推荐场馆</text>
        <!-- "更多"文本链接 -->
        <text class="more-text">更多</text>
      </view>

      <!-- 场馆列表 -->
      <view class="venue-list">
        <!-- 使用v-for循环渲染场馆项 -->
        <view class="venue-item" v-for="(item, index) in venueList" :key="index">
          <!-- 场馆图片，使用aspectFill保持比例填充 -->
          <image class="venue-image" :src="item.image" mode="aspectFill"></image>
          <!-- 场馆信息区域 -->
          <view class="venue-info">
            <!-- 场馆名称 -->
            <view class="venue-name">{{ item.name }}</view>
            <!-- 场馆地址和距离信息 -->
            <view class="venue-address">
              <!-- 地址文本，使用flex:1占据大部分空间 -->
              <text class="address-text">{{ item.address }}</text>
              <!-- 距离信息，显示在右侧 -->
              <text class="distance">{{ item.distance }}</text>
            </view>
            <!-- 场馆营业时间和预约按钮区域 -->
            <view class="venue-bottom">
              <view class="venue-time">营业中 {{ item.businessHours }}</view>
              <!-- 使用与课程相同风格的预约按钮 -->
              <!-- <view class="book-btn" @click="handleBookVenue(item)">预约</view> -->
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航栏 -->
    <view class="tab-bar">
      <!-- 场馆标签（当前激活） -->
      <view class="tab-item active">
        <!-- 位置图标 -->
        <view class="tab-icon"></view>
        <text>场馆</text>
      </view>
      <!-- 更多标签 -->
      <view class="tab-item">
        <!-- 列表图标 -->
        <view class="tab-icon"></view>
        <text>更多</text>
      </view>
      <!-- 我的标签 -->
      <view class="tab-item">
        <!-- 用户图标 -->
        <view class="tab-icon"></view>
        <text>我的</text>
      </view>
    </view>
  </view>
</template>

<script setup>
/**
 * 首页组件
 * 
 * 本脚本定义了场馆预订首页所需的各种数据和交互逻辑
 */

// 导入Vue的响应式API和组件定义函数
import { ref, onMounted } from 'vue'
import { defineComponent } from 'vue'
import Taro from '@tarojs/taro'

// 定义组件名称
defineComponent({
  name: 'VenuePage'
})

/**
 * 页面状态管理
 */

// 搜索框输入值，用于双向绑定搜索框内容
const searchValue = ref('')

// 顶部导航栏状态
const navBarHeight = ref(0)
const statusBarHeight = ref(0)

// 获取设备信息，用于适配不同机型
onMounted(() => {
  const systemInfo = Taro.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 20
  // 根据不同平台设置导航栏高度
  navBarHeight.value = systemInfo.platform === 'ios' ? 44 : 48
})

/**
 * 页面交互处理函数
 */

// 处理课程预约按钮点击
const handleBookCourse = (course) => {
  Taro.showToast({
    title: `已预约${course.name}课程`,
    icon: 'success',
    duration: 2000
  })
  // 这里可以添加导航到预约详情页的逻辑
  // Taro.navigateTo({ url: `/pages/booking/course?id=${course.id}` })
}

// 处理场馆预约按钮点击
const handleBookVenue = (venue) => {
  Taro.showToast({
    title: `已预约${venue.name}`,
    icon: 'success',
    duration: 2000
  })
  // 这里可以添加导航到预约详情页的逻辑
  // Taro.navigateTo({ url: `/pages/booking/venue?id=${venue.id}` })
}

/**
 * 数据模型定义
 */

// 运动类型数据：包含8种不同的运动场馆类型
// 每种类型包含名称、图标和背景颜色
const sportTypes = ref([
  { name: '健身房', icon: '💪', bgColor: '#e54d42' },  // 红色背景
  { name: '羽毛球馆', icon: '🏸', bgColor: '#f37b1d' }, // 橙色背景
  { name: '篮球馆', icon: '🏀', bgColor: '#0081ff' },  // 蓝色背景
  { name: '乒乓球', icon: '🏓', bgColor: '#e03997' },  // 粉色背景
  { name: '游泳馆', icon: '🏊', bgColor: '#1cbbb4' },  // 青色背景
  { name: '足球场', icon: '⚽', bgColor: '#39b54a' },  // 绿色背景
  { name: '网球馆', icon: '🎾', bgColor: '#9c26b0' },  // 紫色背景
  { name: '查看更多', icon: '⋯', bgColor: '#8799a3' }  // 灰色背景
])

// 实时成交数据：展示最近的订单信息
// 包含用户姓名、头像、订单描述和价格
const orderList = ref([
  {
    name: 'Mr.张',
    desc: '购买羽毛球馆2小时',
    price: '¥180',
    avatar: 'https://img2.baidu.com/it/u=260211041,2937866588&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
  },
  {
    name: '李小姐',
    desc: '购买网球馆2小时',
    price: '¥360',
    avatar: 'https://img1.baidu.com/it/u=1817951587,699502366&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
  },
  {
    name: 'Tsu',
    desc: '购买私教课程10节',
    price: '¥6000',
    avatar: 'https://img0.baidu.com/it/u=1715735205,2620103435&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
  }
])

// 精选课程数据：展示热门课程信息
// 包含教练姓名、头像、课程描述和价格
const courseList = ref([
  {
    name: '哈恩MAX',
    desc: '全身增肌 打造好身材',
    price: '¥500',
    avatar: 'https://img0.baidu.com/it/u=337089605,3920077321&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
  },
  {
    name: '冯迪索形体拉伸',
    desc: '减少赘肉 美出高度',
    price: '¥600',
    avatar: 'https://img1.baidu.com/it/u=3518708233,2673327863&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
  },
  {
    name: '活力课堂',
    desc: '防止损伤 和正动健康',
    price: '¥300',
    avatar: 'https://img2.baidu.com/it/u=2863121171,1642511594&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
  }
])

// 推荐场馆数据：展示附近的场馆信息
// 包含场馆名称、地址、距离、营业时间和图片
const venueList = ref([
  {
    name: '豪宇空间健身体验馆',
    address: '天河区体育西07号福通商务中心A座4楼',
    distance: '439m', // 距离当前位置
    businessHours: '09:00-22:00',  // 营业时间
    image: 'https://img0.baidu.com/it/u=2221721989,3518905710&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333'
  },
  {
    name: '名湾羽毛球馆',
    address: '海珠区赤岗西20-22号长城小区2楼',
    distance: '1.2km',
    businessHours: '09:00-22:00',
    image: 'https://img2.baidu.com/it/u=4141739192,3211743969&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333'
  },
  {
    name: '华景会所欧式健身游泳池',
    address: '天河区华新路190号综合楼一楼',
    distance: '2.4km',
    businessHours: '09:00-22:00',
    image: 'https://img2.baidu.com/it/u=667703241,3382320226&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333'
  }
])

// 这里可以添加更多页面交互函数，如搜索处理、类别点击、预约处理等
</script>

<style>
/**
 * 页面样式表
 * 
 * 定义了首页各个组件和元素的样式，包括布局、颜色、字体等
 */

/* 页面整体样式 */
.venue-page {
  background-color: #f7f8fa;
  /* 浅灰色背景 */
  padding-bottom: 100px;
  /* 底部留出空间，避免被底部导航栏遮挡 */
}

/**
 * 顶部导航栏样式
 */

/* 导航栏容器 */
/* .nav-bar {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #fff;
  padding-top: env(safe-area-inset-top); /* 适配刘海屏等异形屏幕 */
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); */
/* } */

/* 导航栏内容区域 */
.nav-bar-content {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

/* 导航栏标题 */
.nav-title {
  font-size: 34px;
  font-weight: bold;
  color: #333;
}

/* 导航栏图标区域 */
.nav-icons {
  display: flex;
  align-items: center;
}

/* 导航栏单个图标 */
.nav-icon {
  font-size: 28px;
  margin-left: 20px;
  color: #333;
}

/**
 * 搜索框相关样式
 */

/* 搜索框区域样式 */
.search-box {
  top: 10px;
  padding: 0 16px;
  padding-top: 12px;  /* 增加顶部内边距 */
  margin-top: 8px;    /* 添加顶部外边距 */
  background-color: #fff;
  border-top: 1px solid #f0f0f0;  /* 添加一个浅色的顶部边框作为分隔线 */
}

/* 搜索框外层容器样式 */
.search-wrapper {
  background-color: #f5f5f5;
  border-radius: 40px;
  /* 圆角边框 */
  height: 50px;  /* 进一步减小高度，从60px改为50px */
  display: flex;
  align-items: center;
  padding: 0 16px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

/* 搜索框激活/聚焦状态样式 */
.search-wrapper:active,
.search-wrapper:focus-within {
  border-color: #e54d42;
  /* 恢复为红色边框 */
  border-width: 1px;
  /* 确保激活状态边框粗细一致 */
  box-shadow: 0 4px 12px rgba(229, 77, 66, 0.1);
  /* 更明显的阴影 */
}
.nut-input{
  padding: 0 16px;
}

/* 搜索框输入区域样式 */
.search-input {
  flex: 1;
  /* 恢复为flex: 1，使输入框占据剩余空间 */
  background-color: transparent;
  height: auto;
  /* 恢复为自动高度 */
  border: none;
}

/* 搜索框输入文本样式 - 使用深度选择器修改NutUI组件内部样式 */
.search-input :deep(.nut-input-value) {
  font-size: 25px;
  color: #333;
}

/* 搜索框占位符样式 */
.search-input :deep(.nut-input-placeholder) {
  color: #999;
  font-size: 28px;
}

/* 搜索图标样式 */
.search-icon {
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 搜索图标图片样式 */
.search-icon-img {
  width: 30px;
  height: 30px;
  /* 减小图标尺寸，从36px改为30px */
  vertical-align: middle;
}

/**
 * 运动类型导航样式
 */

/* 运动类型图标区域样式 */
.sport-icons {
  display: flex;
  flex-wrap: wrap;
  /* 允许换行显示 */
  padding: 20px;
  background-color: #fff;
  margin-bottom: 20px;
}

/* 单个运动类型样式 */
.sport-item {
  width: 25%;
  /* 每行四个图标 */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

/* 图标圆形背景样式 */
.icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  /* 圆形 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

/* 图标文本样式 */
.icon-text {
  font-size: 32px;
}

/* 运动类型名称样式 */
.sport-name {
  font-size: 24px;
  color: #333;
}

/**
 * 内容区域通用样式
 */

/* 各部分内容区域通用样式 */
.section {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 20px;
}

/* 内容区域标题样式 */
.section-title {
  font-size: 30px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  position: relative;
  /* 用于定位下方的红线 */
}

/* 标题下方的红色短线 */
.title-line {
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 50px;
  height: 4px;
  background-color: #e54d42;
  /* 红色 */
}

/**
 * 实时成交区域样式
 */

/* 订单列表样式 */
.order-list {
  padding: 10px 0;
}

/* 单个订单项样式 */
.order-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

/* 用户头像样式 */
.user-avatar image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  /* 圆形头像 */
}

/* 订单信息区域样式 */
.order-info {
  flex: 1;
  padding: 0 20px;
}

/* 订单右侧区域（时间和价格）样式 */
.order-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

/* 用户名样式 */
.user-name {
  font-size: 28px;
  color: #333;
  margin-bottom: 5px;
}

/* 订单描述样式 */
.order-desc {
  font-size: 24px;
  color: #999;
  /* 灰色文本 */
}

/* 订单价格样式 */
.order-price {
  font-size: 30px;
  color: #e54d42;
  /* 红色价格 */
  font-weight: bold;
  margin-top: 5px; /* 添加上边距，与时间分隔 */
}

/* 订单时间样式 */
.order-time {
  font-size: 24px;
  color: #999;
  /* 灰色文本 */
}

/**
 * 精选课程区域样式
 */

/* 课程列表样式 */
.course-list {
  padding: 10px 0;
}

/* 单个课程项样式 */
.course-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

/* 课程左侧区域样式 */
.course-left {
  display: flex;
  align-items: center;
}

/* 教练头像样式 */
.coach-avatar image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  /* 圆形头像 */
}

/* 课程信息区域样式 */
.course-info {
  padding: 0 20px;
}

/* 教练名称样式 */
.coach-name {
  font-size: 28px;
  color: #333;
  margin-bottom: 5px;
}

/* 课程描述样式 */
.course-desc {
  font-size: 24px;
  color: #999;
  /* 灰色文本 */
}

/* 课程右侧区域样式 */
.course-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

/* 课程价格样式 */
.course-price {
  font-size: 30px;
  color: #e54d42;
  /* 红色价格 */
  font-weight: bold;
  margin-bottom: 10px;
}

/**
 * 预约按钮通用样式
 */
.book-btn {
  padding: 8px 20px;
  background-color: #e54d42;
  color: #fff;
  font-size: 24px;
  border-radius: 5px;
  font-weight: 500;
  box-shadow: 0 4px 8px rgba(229, 77, 66, 0.2);
  transition: all 0.3s ease;
}

/* 按钮点击效果 */
.book-btn:active {
  transform: scale(0.95);
  box-shadow: 0 2px 4px rgba(229, 77, 66, 0.15);
  background-color: #d03b31;
}

/**
 * 推荐场馆区域样式
 */

/* 带有"更多"按钮的区域标题样式 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

/* "更多"文本样式 */
.more-text {
  font-size: 24px;
  color: #999;
  /* 灰色文本 */
  font-weight: normal;
}

/* 场馆列表样式 */
.venue-list {
  padding: 10px 0;
}

/* 单个场馆项样式 */
.venue-item {
  margin-bottom: 30px;
}

/* 场馆图片样式 */
.venue-image {
  width: 100%;
  height: 300px;
  border-radius: 8px;
  /* 圆角图片 */
  margin-bottom: 10px;
}

/* 场馆名称样式 */
.venue-name {
  font-size: 30px;
  color: #333;
  font-weight: bold;
  margin-bottom: 5px;
}

/* 场馆地址和距离区域样式 */
.venue-address {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

/* 地址文本样式 */
.address-text {
  font-size: 24px;
  color: #999;
  /* 灰色文本 */
  flex: 1;
}

/* 距离文本样式 */
.distance {
  font-size: 24px;
  color: #999;
  /* 灰色文本 */
}

/* 场馆底部区域样式 */
.venue-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

/* 营业时间样式 */
.venue-time {
  font-size: 24px;
  color: #999;
  /* 灰色文本 */
}

/**
 * 底部导航栏样式
 */

/* 底部导航栏样式 */
.tab-bar {
  position: fixed;
  /* 固定在底部 */
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  display: flex;
  background-color: #fff;
  border-top: 1px solid #eee;
  /* 顶部边框 */
  padding-bottom: env(safe-area-inset-bottom); /* 适配底部安全区域，如iPhone X等 */
}

/* 单个导航项样式 */
.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #999;
  /* 灰色文本 */
  position: relative; /* 添加相对定位，用于放置下划线 */
  transition: all 0.3s ease; /* 添加过渡效果 */
}

/* 激活状态的导航项样式 */
.tab-item.active {
  color: #e54d42;
  /* 红色文本 */
}

/* 添加选中状态下划线 */
.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px; /* 下划线宽度 */
  height: 3px; /* 下划线高度 */
  background-color: #e54d42; /* 红色下划线 */
  border-radius: 2px; /* 圆角下划线 */
}

/* 导航图标样式 */
.tab-icon {
  font-size: 32px;
  margin-bottom: 5px;
}

/* 导航文本样式 */
.tab-item text {
  margin-top: 5px;
}

/* 适配不同屏幕尺寸的媒体查询 */
@media screen and (max-width: 320px) {
  .nav-title {
    font-size: 30px;
  }
  
  .search-icon-img {
    width: 32px;
    height: 32px;
  }
  
  .search-input :deep(.nut-input-value),
  .search-input :deep(.nut-input-placeholder) {
    font-size: 24px;
  }
}

@media screen and (min-width: 768px) {
  .nav-title {
    font-size: 38px;
  }
  
  .search-wrapper {
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>
