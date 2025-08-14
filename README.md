# ZEGO 数字人快速启动服务器

这是一个基于 Next.js 构建的数字人快速启动服务器，集成了 ZEGO 数字人 API 服务，提供完整的数字人驱动和管理功能。

## 🚀 功能特性

### 数字人管理
- **获取数字人列表** - 支持分页查询数字人形象
- **获取数字人信息** - 获取指定数字人的详细信息
- **获取音色列表** - 获取可用的音色选项

### 数字人驱动
- **文本驱动** - 通过文本内容驱动数字人说话
- **音频驱动** - 通过音频文件驱动数字人
- **RTC流驱动** - 通过实时音视频流驱动数字人
- **动作控制** - 执行预设的数字人动作

### 流任务管理
- **创建流任务** - 创建数字人直播流任务
- **查询流任务** - 查询当前运行的流任务状态
- **停止流任务** - 停止指定的流任务
- **中断驱动任务** - 中断正在执行的驱动任务

### 其他功能
- **Token生成** - 生成ZEGO服务端Token
- **代理请求** - 提供API请求代理服务

## 🛠️ 技术栈

- **框架**: Next.js 15.3.0
- **语言**: TypeScript
- **UI组件**: React 19 + DaisyUI
- **样式**: Tailwind CSS 4.1.7
- **部署**: PM2 (生产环境)

## 📦 安装和运行

### 环境要求
- Node.js 18+
- pnpm 或 npm

### 安装依赖
```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 环境配置
创建 `.env.local` 文件并配置以下环境变量：

```env
# ZEGO API 配置
ZEGO_API_HOST=aigc-digital-human-api.zegotech.cn
ZEGO_APP_ID=your_app_id
ZEGO_SERVER_SECRET=your_server_secret

# 其他配置
NODE_ENV=development
```

### 开发环境运行
```bash
# 启动开发服务器
pnpm dev

# 或
npm run dev
```

### 生产环境部署
```bash
# 构建项目
pnpm build

# 启动生产服务器
pnpm start

# 使用 PM2 部署 (推荐)
pm2 start ecosystem.config.js
```

## 📚 API 接口

### 数字人管理接口

#### 获取数字人列表
```
POST /api/GetDigitalHumanList
```
参数：
- `Offset` (可选): 偏移量，默认 0
- `Limit` (可选): 限制数量，默认 2
- `FetchMode` (可选): 获取模式，默认 2

#### 获取数字人信息
```
POST /api/GetDigitalHumanInfo
```

#### 获取音色列表
```
POST /api/GetTimbreList
```

### 数字人驱动接口

#### 文本驱动
```
POST /api/DriveByText
```

#### 音频驱动
```
POST /api/DriveByAudio
```

#### RTC流驱动
```
POST /api/DriveByRTCStream
```

#### 执行动作
```
POST /api/DoAction
```

### 流任务管理接口

#### 创建流任务
```
POST /api/CreateDigitalHumanStreamTask
```

#### 查询流任务
```
POST /api/QueryDigitalHumanStreamTasks
```

#### 停止流任务
```
POST /api/StopDigitalHumanStreamTask
```

#### 中断驱动任务
```
POST /api/InterruptDriveTask
```

### 其他接口

#### 生成Token
```
POST /api/ZegoToken
```

#### 代理请求
```
POST /api/passthrough-request
```

## 🔧 开发指南

### 项目结构
```
src/
├── app/
│   ├── api/           # API 路由
│   ├── globals.css    # 全局样式
│   └── layout.tsx     # 根布局
├── lib/
│   └── zego/          # ZEGO 相关工具函数
└── ...
```

### 添加新的API接口
1. 在 `src/app/api/` 目录下创建新的路由文件
2. 使用 `generateQueryParamsString` 生成签名
3. 使用 `getZegoConfig` 获取配置
4. 实现相应的业务逻辑

### 代码规范
- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码

## 🚀 部署

### 使用 PM2 部署
```bash
# 安装 PM2
npm install -g pm2

# 构建项目
pnpm build

# 启动服务
pm2 start ecosystem.config.js

# 查看状态
pm2 status

# 查看日志
pm2 logs
```

### Docker 部署
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## 📝 注意事项

1. **配置安全**: 请妥善保管 ZEGO_APP_ID 和 ZEGO_SERVER_SECRET，不要提交到版本控制系统
2. **API限制**: 注意 ZEGO API 的调用频率限制
3. **错误处理**: 所有API都包含完整的错误处理机制
4. **日志记录**: 生产环境建议配置日志记录

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 📄 许可证

本项目采用 MIT 许可证。

## 📞 支持

如有问题，请联系 ZEGO 技术支持或查看 [ZEGO 官方文档](https://doc.zego.im/)。
