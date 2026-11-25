import React, { useState, useEffect } from 'react';
import { ToolCard, DownloadButton } from '@/components/devtools/ToolCard';
import { generateQrDataUrl, generateQrSvg, buildWifiQrText, buildVCardQrText } from '@/lib/devtools/qrTools';
import { FiGrid, FiDownload, FiWifi, FiUser, FiGlobe } from 'react-icons/fi';

export const QrCodeTool: React.FC = () => {
    const [qrType, setQrType] = useState<'text' | 'wifi' | 'vcard'>('text');
    const [textInput, setTextInput] = useState<string>('https://tools.iarty.biz.id');

    // WiFi
    const [ssid, setSsid] = useState<string>('MyHomeNetwork');
    const [wifiPass, setWifiPass] = useState<string>('');
    const [wifiEnc] = useState<string>('WPA');

    // vCard
    const [vcardName, setVcardName] = useState<string>('John Doe');
    const [vcardPhone, setVcardPhone] = useState<string>('+628123456789');
    const [vcardEmail, setVcardEmail] = useState<string>('john@example.com');

    // Customization
    const [size, setSize] = useState<number>(300);
    const [colorDark, setColorDark] = useState<string>('#000000');
    const [colorLight, setColorLight] = useState<string>('#ffffff');
    const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M');

    const [dataUrl, setDataUrl] = useState<string>('');
    const [svgString, setSvgString] = useState<string>('');

    useEffect(() => {
        let cancelled = false;
        const payload =
            qrType === 'wifi'
                ? buildWifiQrText(ssid, wifiPass, wifiEnc)
                : qrType === 'vcard'
                  ? buildVCardQrText({ name: vcardName, phone: vcardPhone, email: vcardEmail })
                  : textInput;
        if (!payload) return;
        Promise.all([
            generateQrDataUrl({
                text: payload,
                width: size,
                colorDark,
                colorLight,
                errorCorrectionLevel: errorCorrection,
            }),
            generateQrSvg({
                text: payload,
                width: size,
                colorDark,
                colorLight,
                errorCorrectionLevel: errorCorrection,
            }),
        ])
            .then(([url, svg]) => {
                if (!cancelled) {
                    setDataUrl(url);
                    setSvgString(svg);
                }
            })
            .catch((e) => console.error(e));
        return () => {
            cancelled = true;
        };
    }, [qrType, textInput, ssid, wifiPass, wifiEnc, vcardName, vcardPhone, vcardEmail, size, colorDark, colorLight, errorCorrection]);

    return (
        <ToolCard
            title="QR Code Generator & Styler"
            description="Create custom QR codes for URLs, text, Wi-Fi configuration, and vCard with SVG & PNG download."
            icon={<FiGrid className="w-5 h-5" />}
            onReset={() => {
                setQrType('text');
                setTextInput('https://tools.iarty.biz.id');
                setColorDark('#000000');
                setColorLight('#ffffff');
            }}
        >
            <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-black/5 dark:border-white/10">
                <button
                    onClick={() => setQrType('text')}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        qrType === 'text' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300'
                    }`}
                >
                    <FiGlobe /> URL / Text
                </button>
                <button
                    onClick={() => setQrType('wifi')}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        qrType === 'wifi' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300'
                    }`}
                >
                    <FiWifi /> Wi-Fi
                </button>
                <button
                    onClick={() => setQrType('vcard')}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        qrType === 'vcard' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300'
                    }`}
                >
                    <FiUser /> vCard Contact
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form configuration */}
                <div className="lg:col-span-2 space-y-4">
                    {qrType === 'text' && (
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                                Text or URL
                            </label>
                            <textarea
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                                rows={3}
                                className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-2xl"
                                placeholder="https://example.com"
                            />
                        </div>
                    )}

                    {qrType === 'wifi' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Network SSID</label>
                                <input
                                    type="text"
                                    value={ssid}
                                    onChange={(e) => setSsid(e.target.value)}
                                    className="w-full p-2.5 bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Password</label>
                                <input
                                    type="password"
                                    value={wifiPass}
                                    onChange={(e) => setWifiPass(e.target.value)}
                                    className="w-full p-2.5 bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-xs"
                                />
                            </div>
                        </div>
                    )}

                    {qrType === 'vcard' && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={vcardName}
                                    onChange={(e) => setVcardName(e.target.value)}
                                    className="w-full p-2.5 bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Phone</label>
                                <input
                                    type="text"
                                    value={vcardPhone}
                                    onChange={(e) => setVcardPhone(e.target.value)}
                                    className="w-full p-2.5 bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={vcardEmail}
                                    onChange={(e) => setVcardEmail(e.target.value)}
                                    className="w-full p-2.5 bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-xs"
                                />
                            </div>
                        </div>
                    )}

                    {/* Styling controls */}
                    <div className="pt-4 border-t border-black/5 dark:border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div>
                            <label className="block font-bold text-gray-500 mb-1">Foreground</label>
                            <input
                                type="color"
                                value={colorDark}
                                onChange={(e) => setColorDark(e.target.value)}
                                className="w-full h-9 rounded-xl cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-500 mb-1">Background</label>
                            <input
                                type="color"
                                value={colorLight}
                                onChange={(e) => setColorLight(e.target.value)}
                                className="w-full h-9 rounded-xl cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-500 mb-1">Size ({size}px)</label>
                            <input
                                type="range"
                                min={150}
                                max={600}
                                value={size}
                                onChange={(e) => setSize(parseInt(e.target.value))}
                                className="w-full mt-2 accent-purple-600"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-500 mb-1">Error Correction</label>
                            <select
                                value={errorCorrection}
                                onChange={(e) => setErrorCorrection(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                                className="w-full p-2 bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl font-bold"
                            >
                                <option value="L">L (7%)</option>
                                <option value="M">M (15%)</option>
                                <option value="Q">Q (25%)</option>
                                <option value="H">H (30%)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* QR Preview & Download */}
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-black/20 rounded-3xl border border-black/5 dark:border-white/10">
                    {dataUrl && (
                        <img
                            src={dataUrl}
                            alt="QR Code"
                            className="w-48 h-48 rounded-2xl shadow-md border border-black/5 dark:border-white/10 object-contain"
                        />
                    )}
                    <div className="flex items-center gap-2 mt-4">
                        <a
                            href={dataUrl}
                            download="qrcode.png"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-sm"
                        >
                            <FiDownload /> Download PNG
                        </a>
                        {svgString && (
                            <DownloadButton
                                filename="qrcode.svg"
                                content={svgString}
                                mimeType="image/svg+xml"
                                label="Download SVG"
                            />
                        )}
                    </div>
                </div>
            </div>
        </ToolCard>
    );
};
