# LAVA API Keys Setup Guide

## 1. Stripe (支付系统)

### 获取API密钥
1. 访问 https://dashboard.stripe.com/register 注册账号
2. 完成账户验证（需要身份证件）
3. 进入 Developers > API keys
4. 复制 Test mode 的密钥：
   - `sk_test_xxxxx` (Secret key)
   - `pk_test_xxxxx` (Publishable key)

### 配置Webhook
1. 进入 Developers > Webhooks
2. 点击 "Add endpoint"
3. 输入你的后端URL: `https://your-domain.com/api/payments/webhook`
4. 选择事件: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. 复制 Webhook signing secret: `whsec_xxxxx`

---

## 2. OpenAI (AI攻略生成)

### 获取API密钥
1. 访问 https://platform.openai.com/signup 注册账号
2. 进入 API keys 页面
3. 点击 "Create new secret key"
4. 复制密钥: `sk-xxxxx`

### 设置用量限制
1. 进入 Settings > Limits
2. 设置每月预算限制（建议：$50/月）
3. 这可以防止意外的大额消费

---

## 3. 环境变量配置

将以下内容复制到 `server/.env` 文件：

```env
# Server
PORT=3000
NODE_ENV=production

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# OpenAI
OPENAI_API_KEY=sk-your_openai_key_here
OPENAI_MODEL=gpt-4

# Security
JWT_SECRET=your_random_secret_key_here
CORS_ORIGIN=https://your-domain.com
```

---

## 4. 测试支付

### Stripe测试卡号
- 成功支付: `4242 4242 4242 4242`
- 需要验证: `4000 0025 0000 3155`
- 支付失败: `4000 0000 0000 0002`

### 测试流程
1. 启动后端: `cd server && npm run dev`
2. 使用测试卡号完成支付
3. 在 Stripe Dashboard 查看交易记录

---

## 5. 生产环境配置

### 切换到Live模式
1. 在 Stripe Dashboard 点击 "View test data" 关闭测试模式
2. 获取 Live mode 的密钥
3. 更新 `.env` 文件中的密钥

### 安全提醒
- 永远不要将 API 密钥提交到 Git
- 使用环境变量管理敏感信息
- 定期轮换密钥
