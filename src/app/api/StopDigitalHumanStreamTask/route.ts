import { NextRequest } from 'next/server';
import { generateQueryParamsString } from '@/lib/zego/signature_helper';
import { getZegoConfig, validateZegoConfig } from '@/lib/zego/config_helper';

const ZEGO_API_HOST = process.env.ZEGO_API_HOST || 'aigc-digital-human-api.zegotech.cn';

/**
 * 停止数字人视频流任务
 * Action: StopDigitalHumanStreamTask
 * 参数: TaskId (String)
 */
export async function POST(req: NextRequest) {
  try {
    const bodyParams = await req.json();
    const { TaskId } = bodyParams;
    if (!TaskId) {
      return Response.json({
        Code: 400,
        Message: '缺少 TaskId 参数',
        Data: {},
      }, { status: 400 });
    }

    const { appId, serverSecret, source } = getZegoConfig(req);
    console.log('AppId:', appId, 'ServerSecret:', serverSecret, 'Source:', source);

    if (!validateZegoConfig(appId, serverSecret)) {
      return Response.json({
        Code: 500,
        Message: '服务端配置缺失',
        Data: {},
      }, { status: 500 });
    }

    const queryString = generateQueryParamsString('StopDigitalHumanStreamTask', appId, serverSecret);
    const fullUrl = `https://${ZEGO_API_HOST}/?${queryString}`;
    console.log('完整请求URL:', fullUrl);
    console.log('POST body:', { TaskId });

    const apiRes = await fetch(fullUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ TaskId }),
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
