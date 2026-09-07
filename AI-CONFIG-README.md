# AI API 配置完成

## 已配置的API

| 配置项 | 值 |
|--------|-----|
| API Key | `sk-Es8LFgeeyXtNIxCiKnLZ10JQmb80gGnu7hhT7psd8JyK7t4c` |
| Base URL | `https://api.agnes-ai.cn/v1` |
| 文本模型 | `agnes-2.0-flash` |
| 图片模型 | `agnes-image-2.5-flash` |

---

## 环境变量文件

已创建 `server/.env` 文件，包含以下配置：

```env
AI_API_KEY=sk-Es8LFgeeyXtNIxCiKnLZ10JQmb80gGnu7hhT7psd8JyK7t4c
AI_BASE_URL=https://api.agnes-ai.cn/v1
AI_TEXT_MODEL=agnes-2.0-flash
AI_IMAGE_MODEL=agnes-image-2.5-flash
```

---

## 测试API

### 方法1: 运行测试脚本
```bash
cd server
npx ts-node test-api.ts
```

### 方法2: 手动测试
```bash
cd server
npm run dev

# 在另一个终端测试
curl -X POST http://localhost:3000/api/guides \
  -H "Content-Type: application/json" \
  -d '{
    "questionnaireData": {
      "city": "shanghai",
      "medicalType": "dental",
      "budgetRange": "moderate",
      "travelDates": {
        "arrival": "2026-10-01",
        "departure": "2026-10-15"
      },
      "languagePreference": "english"
    }
  }'
```

---

## API功能

### 1. 文本生成 (agnes-2.0-flash)
- 生成个性化医疗攻略
- 包含医院推荐、费用估算、流程指南等

### 2. 图片生成 (agnes-image-2.5-flash)
- 生成医院图片
- 生成城市风光图片
- 生成攻略配图

---

## 启动服务

```bash
cd server
npm run dev
```

服务启动后，所有API调题将使用配置的Agnes AI服务。
