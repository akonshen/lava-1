# LAVA 部署指南

## 快速部署到 Railway (推荐)

### 步骤 1: 准备代码
```bash
cd server
git init
git add .
git commit -m "Initial commit"
```

### 步骤 2: 推送到 GitHub
1. 在 GitHub 创建新仓库 `lava-server`
2. 推送代码：
```bash
git remote add origin https://github.com/yourusername/lava-server.git
git push -u origin main
```

### 步骤 3: 部署到 Railway
1. 访问 https://railway.app 登录
2. 点击 "New Project" > "Deploy from GitHub repo"
3. 选择 `lava-server` 仓库
4. Railway 会自动检测并部署

### 步骤 4: 配置环境变量
在 Railway Dashboard 的 Variables 标签页添加：

```
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
OPENAI_API_KEY=sk-xxxxx
OPENAI_MODEL=gpt-4
JWT_SECRET=your_random_secret
CORS_ORIGIN=https://your-web-domain.com
```

### 步骤 5: 获取部署 URL
Railway 会提供一个 URL，如：`https://lava-server.up.railway.app`

---

## 备选方案: 部署到 Vercel

### 安装 Vercel CLI
```bash
npm i -g vercel
```

### 配置 vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.ts"
    }
  ]
}
```

### 部署
```bash
cd server
vercel
```

---

## 部署到 AWS (高级)

### 使用 AWS Elastic Beanstalk
1. 安装 EB CLI: `pip install awsebcli`
2. 初始化: `eb init`
3. 创建环境: `eb create lava-production`
4. 部署: `eb deploy`

### 使用 AWS Lambda + API Gateway
1. 使用 Serverless Framework
2. 配置 serverless.yml
3. 部署: `sls deploy`

---

## 部署后配置

### 1. 更新 Stripe Webhook URL
在 Stripe Dashboard 中更新 webhook URL 为你的生产地址：
```
https://your-domain.com/api/payments/webhook
```

### 2. 更新 CORS 配置
确保 `CORS_ORIGIN` 设置为你的前端域名。

### 3. 测试 API
```bash
# 健康检查
curl https://your-domain.com/health

# 获取城市列表
curl https://your-domain.com/api/cities
```

---

## 监控和日志

### Railway
- Dashboard 自带日志查看
- 支持实时日志流

### Vercel
```bash
vercel logs
```

### AWS
```bash
eb logs
```

---

## 常见问题

### Q: 部署后 API 返回 CORS 错误
A: 检查 `CORS_ORIGIN` 环境变量是否设置正确。

### Q: Stripe 支付不工作
A: 确保使用正确的 API 密钥（生产环境用 Live 密钥）。

### Q: AI 生成失败
A: 检查 OpenAI API 密钥是否有效，余额是否充足。
