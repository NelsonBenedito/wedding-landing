import React, { useState } from 'react';
import { X, CreditCard, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-[var(--card-bg)] w-full max-w-md rounded-sm overflow-hidden shadow-2xl dark:shadow-none transition-colors duration-300"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-champagne-gold/5 dark:bg-champagne-gold/10 p-8 flex justify-between items-center border-b border-champagne-gold/20">
                        <div>
                            <h3 className="font-serif text-2xl text-text-primary text-left">Presentear</h3>
                            <p className="text-text-secondary text-sm text-left italic font-serif">{gift.title}</p>
                            {gift.price ? (
                                <p className="text-champagne-gold font-bold text-left text-xl mt-1">R$ {gift.price}</p>
                            ) : (
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="text-champagne-gold font-bold text-lg">R$</span>
                                    <input
                                        type="number"
                                        value={customAmount}
                                        onChange={(e) => setCustomAmount(e.target.value)}
                                        placeholder="0,00"
                                        className="bg-transparent border-b border-champagne-gold focus:outline-none text-champagne-gold font-bold w-28 placeholder:text-champagne-gold/30 text-lg"
                                        autoFocus
                                    />
                                </div>
                            )}
                        </div>
                        <button onClick={onClose} className="text-text-secondary hover:text-champagne-gold transition-colors p-2">
                            <X size={28} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-100 dark:border-white/5">
                        <button
                            type="button"
                            className={`flex-1 py-5 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeTab === 'pix' ? 'text-champagne-gold border-b-2 border-champagne-gold bg-champagne-gold/5' : 'text-text-secondary hover:bg-gray-50 dark:hover:bg-white/5'}`}
                            onClick={() => setActiveTab('pix')}
                        >
                            <QrCode size={16} /> PIX
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-5 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeTab === 'card' ? 'text-champagne-gold border-b-2 border-champagne-gold bg-champagne-gold/5' : 'text-text-secondary hover:bg-gray-50 dark:hover:bg-white/5'}`}
                            onClick={() => setActiveTab('card')}
                        >
                            <CreditCard size={16} /> Cartão
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-10 min-h-[350px] flex items-center justify-center">
                        {activeTab === 'pix' && (
                            <div className="text-center w-full">
                                <div className="w-56 h-56 bg-white mx-auto mb-8 flex items-center justify-center border-4 border-champagne-gold/20 p-4 rounded-sm shadow-sm">
                                    <img src="/pix-qrcode.png" alt="PIX QR Code" className="w-full h-full object-contain" />
                                </div>
                                <p className="text-xs text-text-secondary mb-6 font-bold uppercase tracking-widest">Escaneie com o app do seu banco</p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={pixKey}
                                        readOnly
                                        className="flex-1 bg-gray-50 dark:bg-white/5 text-[10px] font-mono p-3 border border-gray-200 dark:border-white/10 text-text-secondary select-all"
                                    />
                                    <button
                                        onClick={handleCopy}
                                        className={`text-white text-[10px] font-bold uppercase tracking-widest px-6 py-3 transition-all min-w-[100px] shadow-sm ${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-800 dark:bg-white/10 dark:hover:bg-white/20 hover:bg-black'}`}
                                    >
                                        {copied ? "Copiado!" : "Copiar Chave"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'card' && (
                            <div className="text-center w-full">
                                <div className="w-20 h-20 bg-champagne-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CreditCard size={40} className="text-champagne-gold" />
                                </div>
                                <p className="text-text-primary font-serif text-xl mb-2">Pagamento Seguro</p>
                                <p className="text-text-secondary text-sm mb-10 italic">Processado via InfinitePay</p>
                                <a
                                    href={`https://link.infinitepay.io/nelson-benedito-jose/VC1DLUMtSQ-ipqRfGTZt-${finalPrice.replace(',', '.')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`block w-full text-white py-4 font-bold uppercase tracking-widest transition-all duration-300 rounded-sm shadow-lg shadow-champagne-gold/20 text-xs ${finalPrice === '0' || finalPrice === '' ? 'bg-gray-300 cursor-not-allowed pointer-events-none' : 'bg-champagne-gold hover:bg-[#B8860B]'}`}
                                >
                                    Pagar com Cartão (R$ {finalPrice})
                                </a>
                                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5 flex items-center justify-center gap-4 text-[10px] text-text-secondary font-bold uppercase tracking-widest">
                                    <span className="flex items-center gap-1 opacity-50">🔒 SSL</span>
                                    <span className="flex items-center gap-1 opacity-50">🛡️ Seguro</span>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default GiftModal;
