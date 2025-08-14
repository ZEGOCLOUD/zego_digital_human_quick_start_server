import { NextResponse } from 'next/server';
import { generateToken04 } from '@/lib/zego/token_helper';
import { getZegoConfig, validateZegoConfig } from '@/lib/zego/config_helper';

export async function GET(request: Request) {
  try {
    // 获取URL参数
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    console.log('Request parameters:', {
      url: request.url,
      userId,
    });

    // 验证必要参数
    if (!userId) {
      console.log('Error: userId is missing');
      return NextResponse.json(
        {
          code: 400,
          message: 'userId is required'
        },
        { status: 400 }
      );
    }

    // 将Request转换为NextRequest以使用getZegoConfig
    const req = new Request(request.url, {
      method: request.method,
      headers: request.headers,
    });

    const { appId, serverSecret, source } = getZegoConfig(req as any);
    const appID = Number(appId);

    console.log('AppId:', appId, 'ServerSecret:', serverSecret, 'Source:', source);

    if (!validateZegoConfig(appId, serverSecret)) {
      console.log('Error: Server configuration missing:', {
        hasAppID: !!appID,
        hasServerSecret: !!serverSecret,
      });
      return NextResponse.json(
        {
          code: 500,
          message: 'Server configuration error'
        },
        { status: 500 }
      );
    }

    // 设置token有效期（1小时）
    const effectiveTimeInSeconds = 3600;

    console.log('Generating token with parameters:', {
      appID,
      userId,
      effectiveTimeInSeconds,
    });

    // 生成token
    const token = generateToken04(
      appID,
      userId,
      serverSecret,
      effectiveTimeInSeconds,
      '' // payload为空字符串
    );

    console.log('Token generated successfully');

    // 返回token
    const response = {
      code: 0,
      message: 'Generate token success',
      token,
      user_id: userId,
      expire_time: Date.now() + effectiveTimeInSeconds * 1000
    };

    console.log('Sending response:', {
      hasToken: !!token,
      userId,
      expireTime: response.expire_time,
    });

    return NextResponse.json(response);

  } catch (error) {
    // 详细打印错误信息
    console.error('Token generation error:', {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        code: 500,
        message: 'Failed to generate token'
      },
      { status: 500 }
    );
  }
}
