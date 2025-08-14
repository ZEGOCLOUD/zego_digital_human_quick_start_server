import { NextRequest } from 'next/server';
import { generateQueryParamsString } from '@/lib/zego/signature_helper';
import { getZegoConfig, validateZegoConfig } from '@/lib/zego/config_helper';

const ZEGO_API_HOST = process.env.ZEGO_API_HOST || 'aigc-digital-human-api.zegotech.cn';

/**
 * 创建数字人视频流任务
 * Action: CreateDigitalHumanStreamTask
 * 业务参数: 见 API 文档
 */
export async function POST(req: NextRequest) {
  try {
    const bodyParams = await req.json();
    const { appId, serverSecret, source } = getZegoConfig(req);
    console.log('AppId:', appId, 'ServerSecret:', serverSecret, 'Source:', source);

    if (!validateZegoConfig(appId, serverSecret)) {
      return Response.json({
        Code: 500,
        Message: '服务端配置缺失',
        Data: {},
      }, { status: 500 });
    }

    const queryString = generateQueryParamsString('CreateDigitalHumanStreamTask', appId, serverSecret);
    const fullUrl = `https://${ZEGO_API_HOST}/?${queryString}`;
    console.log('完整请求URL:', fullUrl);
    console.log('POST body:', bodyParams);

    const apiRes = await fetch(fullUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyParams),
    });
    const text = await apiRes.text();
    console.log('ZEGO原始响应:', text, '状态码:', apiRes.status);
    let apiData;
    try {
      apiData = JSON.parse(text);
    } catch {
      apiData = { raw: text };
    }
    return Response.json(apiData, { status: apiRes.status });
  } catch (error) {
    console.error('代理异常:', error);
    return Response.json({
      Code: 500,
      Message: '服务端代理请求失败',
      Data: {},
    }, { status: 500 });
  }
}
