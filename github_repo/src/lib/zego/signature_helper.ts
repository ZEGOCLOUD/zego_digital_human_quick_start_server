import { generateSignatureNonce, generateZegoSignature } from "./token_helper";

export function generateSignature(AppId: string | number, ServerSecret: string) {
    const SignatureNonce = generateSignatureNonce();
    const Timestamp = Math.floor(Date.now() / 1000);
    const Signature = generateZegoSignature(AppId, SignatureNonce, ServerSecret, Timestamp);
    return { SignatureNonce, Timestamp, Signature };
}

export function generateQueryParams(Action: string, AppId: string | number, ServerSecret: string): Record<string, any> {
    const { SignatureNonce, Timestamp, Signature } = generateSignature(AppId, ServerSecret);
    return {
        Action,
        AppId,
        Signature,
        SignatureNonce,
        SignatureVersion: '2.0',
        Timestamp,
    };
}

export function generateQueryParamsString(Action: string, AppId: string | number, ServerSecret: string): string {
    const queryParams = generateQueryParams(Action, AppId, ServerSecret);
    return new URLSearchParams(queryParams).toString();
}
