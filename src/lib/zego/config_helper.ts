import { NextRequest } from 'next/server';

/**
 * 从请求头或环境变量获取ZEGO配置
 * 优先级：请求头 > 环境变量
 * 如果请求头中的appId为空或与环境变量相同，则使用环境变量
 * 注意：从前端传递 ServerSecret 不安全，该方式仅用于演示与测试，请勿用于生产环境！
 */
export function getZegoConfig(req: NextRequest): {
  appId: string;
  serverSecret: string;
  source: 'header' | 'env';
} {
  const headerAppId = req.headers.get('X-App-Id');
  const headerServerSecret = req.headers.get('X-Server-Secret');
  const envAppId = process.env.NEXT_PUBLIC_ZEGO_APP_ID;
  const envServerSecret = process.env.ZEGO_SERVER_SECRET;

  // 如果请求头中的appId为空或与环境变量相同，则使用环境变量
  if (!headerAppId || headerAppId === envAppId) {
    return {
      appId: envAppId || '',
      serverSecret: envServerSecret || '',
      source: 'env'
    };
  }

  // 否则使用请求头中的值
  return {
    appId: headerAppId,
    serverSecret: headerServerSecret || '',
    source: 'header'
  };
}

/**
 * 验证ZEGO配置是否完整
 */
export function validateZegoConfig(appId: string, serverSecret: string): boolean {
  return !!(appId && serverSecret);
}
