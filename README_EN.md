# ZEGO Digital Human Quick Start Server

A Next.js-based digital human quick start server that integrates ZEGO Digital Human API services, providing comprehensive digital human driving and management capabilities.

## 🚀 Features

### Digital Human Management
- **Get Digital Human List** - Support paginated query of digital human avatars
- **Get Digital Human Info** - Get detailed information of specified digital humans
- **Get Timbre List** - Get available timbre options

### Digital Human Driving
- **Text Driving** - Drive digital humans to speak through text content
- **Audio Driving** - Drive digital humans through audio files
- **RTC Stream Driving** - Drive digital humans through real-time audio/video streams
- **Action Control** - Execute preset digital human actions

### Stream Task Management
- **Create Stream Task** - Create digital human live streaming tasks
- **Query Stream Tasks** - Query status of currently running stream tasks
- **Stop Stream Task** - Stop specified stream tasks
- **Interrupt Drive Task** - Interrupt currently executing drive tasks

### Other Features
- **Token Generation** - Generate ZEGO server-side tokens
- **Proxy Requests** - Provide API request proxy services

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.0
- **Language**: TypeScript
- **UI Components**: React 19 + DaisyUI
- **Styling**: Tailwind CSS 4.1.7
- **Deployment**: PM2 (Production)

## 📦 Installation and Setup

### Requirements
- Node.js 18+
- pnpm or npm

### Install Dependencies
```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### Environment Configuration
Create a `.env.local` file and configure the following environment variables:

```env
# ZEGO API Configuration
ZEGO_API_HOST=aigc-digital-human-api.zegotech.cn
ZEGO_APP_ID=your_app_id
ZEGO_SERVER_SECRET=your_server_secret

# Other Configuration
NODE_ENV=development
```

### Development Environment
```bash
# Start development server
pnpm dev

# Or
npm run dev
```

### Production Deployment
```bash
# Build project
pnpm build

# Start production server
pnpm start

# Deploy with PM2 (recommended)
pm2 start ecosystem.config.js
```

## 📚 API Endpoints

### Digital Human Management APIs

#### Get Digital Human List
```
POST /api/GetDigitalHumanList
```
Parameters:
- `Offset` (optional): Offset, default 0
- `Limit` (optional): Limit count, default 2
- `FetchMode` (optional): Fetch mode, default 2

#### Get Digital Human Info
```
POST /api/GetDigitalHumanInfo
```

#### Get Timbre List
```
POST /api/GetTimbreList
```

### Digital Human Driving APIs

#### Text Driving
```
POST /api/DriveByText
```

#### Audio Driving
```
POST /api/DriveByAudio
```

#### RTC Stream Driving
```
POST /api/DriveByRTCStream
```

#### Execute Action
```
POST /api/DoAction
```

### Stream Task Management APIs

#### Create Stream Task
```
POST /api/CreateDigitalHumanStreamTask
```

#### Query Stream Tasks
```
POST /api/QueryDigitalHumanStreamTasks
```

#### Stop Stream Task
```
POST /api/StopDigitalHumanStreamTask
```

#### Interrupt Drive Task
```
POST /api/InterruptDriveTask
```

### Other APIs

#### Generate Token
```
POST /api/ZegoToken
```

#### Proxy Request
```
POST /api/passthrough-request
```

## 🔧 Development Guide

### Project Structure
```
src/
├── app/
│   ├── api/           # API routes
│   ├── globals.css    # Global styles
│   └── layout.tsx     # Root layout
├── lib/
│   └── zego/          # ZEGO utility functions
└── ...
```

### Adding New API Endpoints
1. Create new route files in `src/app/api/` directory
2. Use `generateQueryParamsString` to generate signatures
3. Use `getZegoConfig` to get configuration
4. Implement corresponding business logic

### Code Standards
- Use TypeScript for type checking
- Follow ESLint rules
- Use Prettier for code formatting

## 🚀 Deployment

### Deploy with PM2
```bash
# Install PM2
npm install -g pm2

# Build project
pnpm build

# Start service
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs
```

### Docker Deployment
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

## 📝 Important Notes

1. **Configuration Security**: Please keep ZEGO_APP_ID and ZEGO_SERVER_SECRET secure and do not commit them to version control
2. **API Limits**: Be aware of ZEGO API call frequency limits
3. **Error Handling**: All APIs include comprehensive error handling mechanisms
4. **Logging**: Production environments should configure logging

## 🤝 Contributing

We welcome Issues and Pull Requests to improve this project.

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues, please contact ZEGO technical support or refer to the [ZEGO Official Documentation](https://doc.zego.im/).
