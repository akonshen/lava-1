# LAVA App Store 发布指南

## 准备工作

### 1. Apple Developer Account
- 访问 https://developer.apple.com 注册
- 年费：$99/年
- 需要：Apple ID、信用卡、身份证件

### 2. Google Play Developer Account
- 访问 https://play.google.com/console 注册
- 费用：$25（一次性）
- 需要：Google 账号、信用卡

---

## iOS App Store 发布

### 步骤 1: 配置 App 信息

#### 在 App Store Connect 创建 App
1. 登录 https://appstoreconnect.apple.com
2. 点击 "我的 App" > "+" > "新建 App"
3. 填写信息：
   - 平台：iOS
   - 名称：LAVA - Medical Travel Guide
   - 主要语言：English
   - Bundle ID：com.yourcompany.lava
   - SKU：lava-app
   - 用户访问权限：完全访问

### 步骤 2: App 信息

#### 基本信息
- **名称**: LAVA - Medical Travel Guide
- **副标题**: Your Medical Companion in China
- **描述**: 
```
LAVA helps Western tourists navigate China's healthcare system with personalized medical travel guides.

Features:
• AI-powered personalized guides
• Hospital recommendations with JCI certification
• Cost estimates and comparisons
• Step-by-step process guides
• Transportation and accommodation suggestions

Perfect for travelers who want peace of mind during their China trip.
```

- **关键词**: medical travel, china hospital, healthcare guide, travel guide, TCM, dental china

#### 图片资源
- **App图标**: 1024x1024px PNG
- **截图**: 
  - iPhone 6.7": 1290 x 844 px (至少2张)
  - iPhone 6.5": 1242 x 828 px
  - iPhone 5.5": 1242 x 2208 px
  - iPad 12.9": 2048 x 2732 px

### 步骤 3: 构建版本

#### 使用 EAS Build
```bash
# 安装 EAS CLI
npm install -g eas-cli

# 登录
eas login

# 配置
eas build:configure

# 构建 iOS 版本
eas build --platform ios

# 提交到 App Store
eas submit --platform ios
```

#### 使用 Xcode
```bash
cd lava-app/ios
pod install
open LavaApp.xcarchive
```

1. 在 Xcode 中选择 "Any iOS Device"
2. Product > Archive
3. Upload to App Store Connect

### 步骤 4: 审核准备

#### 审核信息
- **联系人姓名**: Your Name
- **联系人电话**: +86 xxx xxxx xxxx
- **联系人邮箱**: your@email.com
- **演示账户**: (如有需要)

#### 审核说明
```
This app provides medical travel information for tourists visiting China.

IMPORTANT: This app does NOT provide medical advice, diagnosis, or treatment recommendations. All content is for informational purposes only.

The app uses AI to generate travel guides based on user input. Users should always consult qualified healthcare professionals for medical decisions.
```

### 步骤 5: 提交审核
1. 在 App Store Connect 选择构建版本
2. 填写所有必填信息
3. 点击 "提交以供审核"

### 审核时间
- 首次提交：24-48小时
- 更新：24小时

---

## Google Play Store 发布

### 步骤 1: 创建应用

1. 登录 https://play.google.com/console
2. 点击 "创建应用"
3. 填写信息：
   - 应用名称：LAVA - Medical Travel Guide
   - 默认语言：English
   - 应用类型：应用
   - 免费

### 步骤 2: 商店 listing

#### 简短描述
```
Your medical travel companion in China
```

#### 完整描述
```
LAVA helps Western tourists navigate China's healthcare system with personalized medical travel guides.

Features:
• AI-powered personalized guides
• Hospital recommendations with JCI certification  
• Cost estimates and comparisons
• Step-by-step process guides
• Transportation and accommodation suggestions

Perfect for travelers who want peace of mind during their China trip.

DISCLAIMER: This app provides general travel and healthcare information only. It should not be considered medical advice, diagnosis, or treatment recommendations.
```

#### 图片资源
- **图标**: 512x512px PNG
- **功能图片**: 1024x500px
- **截图**: 
  - 手机: 16:9 比例 (至少2张)
  - 7英寸平板: 16:9 比例
  - 10英寸平板: 16:9 比例

### 步骤 3: 构建版本

#### 使用 EAS Build
```bash
# 构建 Android 版本
eas build --platform android

# 提交到 Play Store
eas submit --platform android
```

#### 使用 Android Studio
```bash
cd lava-app/android
./gradlew assembleRelease
```

### 步骤 4: 内容分级

完成 IARC 内容分级问卷：
- 是否涉及医疗内容？是
- 是否提供医疗建议？否
- 分级：Everyone (所有人)

### 步骤 5: 隐私政策

创建隐私政策页面，包含：
- 数据收集说明
- 数据使用说明
- 数据共享说明
- 用户权利
- 联系方式

### 步骤 6: 提交审核
1. 完成所有必填信息
2. 上传构建版本
3. 提交审核

### 审核时间
- 首次提交：3-7天
- 更新：1-3天

---

## 发布后工作

### 1. 监控
- 查看用户评价
- 监控崩溃报告
- 跟踪下载量和收入

### 2. 更新
- 定期更新内容
- 修复用户反馈的bug
- 添加新功能

### 3. 推广
- 社交媒体宣传
- 博客文章
- 旅行论坛推广

---

## 费用估算

### Apple
- 开发者账号：$99/年

### Google
- 开发者账号：$25（一次性）

### 总计
- 第一年：$124
- 之后每年：$99
