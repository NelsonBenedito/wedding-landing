import React, { useState } from 'react';
import { X, CreditCard, QrCode } from 'lucide-react';

const GiftModal = ({ gift, onClose }) => {
    const [activeTab, setActiveTab] = useState('pix'); // 'pix' or 'card'
    const [customAmount, setCustomAmount] = useState('');
    const [copied, setCopied] = useState(false);

    const pixKey = "15679686783";

    const handleCopy = () => {
        navigator.clipboard.writeText(pixKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const finalPrice = (gift.price || customAmount || '0').toString();

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-md rounded-sm overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-champagne-gold/10 p-6 flex justify-between items-center border-b border-champagne-gold/20">
                    <div>
                        <h3 className="font-serif text-xl text-text-dark text-left">Presentear com {gift.title}</h3>
                        {gift.price ? (
                            <p className="text-champagne-gold font-bold text-left">R${gift.price}</p>
                        ) : (
                            <div className="mt-2 flex items-center gap-1">
                                <span className="text-champagne-gold font-bold">R$</span>
                                <input
                                    type="number"
                                    value={customAmount}
                                    onChange={(e) => setCustomAmount(e.target.value)}
                                    placeholder="0,00"
                                    className="bg-transparent border-b border-champagne-gold focus:outline-none text-champagne-gold font-bold w-24 placeholder:text-champagne-gold/50"
                                    autoFocus
                                />
                            </div>
                        )}
                    </div>
                    <button onClick={onClose} className="text-text-muted hover:text-text-dark">
                        <X size={24} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100">
                    <button
                        type="button"
                        className={`flex-1 py-4 text-sm font-medium uppercase tracking-wide flex items-center justify-center gap-2 transition-colors ${activeTab === 'pix' ? 'text-champagne-gold border-b-2 border-champagne-gold bg-champagne-gold/5' : 'text-text-muted hover:bg-gray-50'}`}
                        onClick={() => setActiveTab('pix')}
                    >
                        <QrCode size={18} /> PIX
                    </button>
                    <button
                        type="button"
                        className={`flex-1 py-4 text-sm font-medium uppercase tracking-wide flex items-center justify-center gap-2 transition-colors ${activeTab === 'card' ? 'text-champagne-gold border-b-2 border-champagne-gold bg-champagne-gold/5' : 'text-text-muted hover:bg-gray-50'}`}
                        onClick={() => setActiveTab('card')}
                    >
                        <CreditCard size={18} /> Cartão
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 min-h-[300px] flex items-center justify-center">
                    {activeTab === 'pix' && (
                        <div className="text-center w-full">
                            <div className="w-48 h-48 bg-white mx-auto mb-6 flex items-center justify-center border border-gray-200 p-2">
                                <img src="/pix-qrcode.png" alt="PIX QR Code" className="w-full h-full object-contain" />
                            </div>
                            <p className="text-sm text-text-muted mb-4">Escaneie o QR Code com o app do seu banco</p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={pixKey}
                                    readOnly
                                    className="flex-1 bg-gray-50 text-xs p-2 border border-gray-200 text-text-muted"
                                />
                                <button
                                    onClick={handleCopy}
                                    className={`text-white text-xs px-4 py-2 transition-all min-w-[80px] ${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-800 hover:bg-black'}`}
                                >
                                    {copied ? "Copiado!" : "Copiar"}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'card' && (
                        <div className="text-center w-full">
                            <CreditCard size={48} className="mx-auto mb-4 text-champagne-gold" />
                            <p className="text-text-muted mb-8">Pagamento seguro via InfinitePay</p>
                            <a
                                href={`https://link.infinitepay.io/nelson-benedito-jose/VC1DLUMtSQ-ipqRfGTZt-${finalPrice.replace(',', '.')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block w-full text-white py-3 font-medium transition-colors rounded-sm shadow-md ${finalPrice === '0' || finalPrice === '' ? 'bg-gray-300 cursor-not-allowed pointer-events-none' : 'bg-champagne-gold hover:bg-[#B8860B]'}`}
                            >
                                Pagar com InfinitePay (R${finalPrice})
                            </a>
                            <p className="text-[10px] text-text-muted mt-4 flex items-center justify-center gap-2">
                                <span>🔒 Conexão Segura SSL</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GiftModal;
