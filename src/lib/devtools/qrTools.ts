import QRCode from 'qrcode';

export interface QrOptions {
    text: string;
    width?: number;
    margin?: number;
    colorDark?: string;
    colorLight?: string;
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
}

export async function generateQrDataUrl(options: QrOptions): Promise<string> {
    return QRCode.toDataURL(options.text, {
        width: options.width || 300,
        margin: options.margin !== undefined ? options.margin : 2,
        color: {
            dark: options.colorDark || '#000000',
            light: options.colorLight || '#ffffff'
        },
        errorCorrectionLevel: options.errorCorrectionLevel || 'M'
    });
}

export async function generateQrSvg(options: QrOptions): Promise<string> {
    return QRCode.toString(options.text, {
        type: 'svg',
        width: options.width || 300,
        margin: options.margin !== undefined ? options.margin : 2,
        color: {
            dark: options.colorDark || '#000000',
            light: options.colorLight || '#ffffff'
        },
        errorCorrectionLevel: options.errorCorrectionLevel || 'M'
    });
}

export function buildWifiQrText(ssid: string, password = '', encryption = 'WPA'): string {
    return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
}

export function buildVCardQrText(data: {
    name: string;
    phone?: string;
    email?: string;
    org?: string;
    url?: string;
}): string {
    return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${data.name}`,
        data.phone ? `TEL:${data.phone}` : '',
        data.email ? `EMAIL:${data.email}` : '',
        data.org ? `ORG:${data.org}` : '',
        data.url ? `URL:${data.url}` : '',
        'END:VCARD'
    ].filter(Boolean).join('\n');
}

