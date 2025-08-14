import { NextRequest } from 'next/server';
import { generateQueryParamsString } from '@/lib/zego/signature_helper';
import { getZegoConfig, validateZegoConfig } from '@/lib/zego/config_helper';

const ZEGO_API_HOST = process.env.ZEGO_API_HOST

/**
 * 获取数字人形象列表
 * Action: GetDigitalHumanList
 * 请求参数: Offset(Int, 可选), Limit(Int, 可选), FetchMode(Int, 可选)
 * 返回参数: DigitalHumans(Array), Total(Int)
 */
export async function POST(req: NextRequest) {
  try {
    const { Offset = 0, Limit = 2, FetchMode = 2 } = await req.json();
    const { appId, serverSecret, source } = getZegoConfig(req);
    console.log('AppId:', appId, 'ServerSecret:', serverSecret, 'Source:', source);

    if (!validateZegoConfig(appId, serverSecret)) {
      return Response.json({
        Code: 500,
        Message: '服务端配置缺失',
        Data: {},
      }, { status: 500 });
    }

    const queryString = generateQueryParamsString('GetDigitalHumanList', appId, serverSecret);
    const fullUrl = `https://${ZEGO_API_HOST}/?${queryString}`;
    console.log('完整请求URL:', fullUrl);

    // 业务参数放在 body
    const bodyParams = {
      Offset,
      Limit,
      FetchMode,
    };
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
