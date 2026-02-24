import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EnvelopeIntro = ({ onComplete }) => {
    const [stage, setStage] = useState('idle'); // idle | opening | extracting | presenting | exit
    const [isCardLeading, setIsCardLeading] = useState(false); // Controls if card is in front of pocket
    const [dimensions, setDimensions] = useState({
        w: typeof window !== 'undefined' ? window.innerWidth : 600,
        h: typeof window !== 'undefined' ? window.innerHeight : 400,
        isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                w: window.innerWidth,
                h: window.innerHeight,
                isMobile: window.innerWidth < 768
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleOpen = useCallback(() => {
        if (stage !== 'idle') return;
        setStage('opening');

        setTimeout(() => {
            setStage('extracting');
        }, 1400); // Wait for flap to open

        setTimeout(() => {
            setIsCardLeading(true);
            setStage('presenting');
        }, 3200); // Fully extracted, now bring to front and present

    }, [stage]);

    const handleConfirmar = useCallback((e) => {
        if (e) e.stopPropagation();
        setStage('exit');
        setTimeout(() => {
            onComplete();
            setTimeout(() => {
                const rsvpSection = document.getElementById('rsvp');
                if (rsvpSection) {
                    rsvpSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.location.hash = 'rsvp';
                }
            }, 100);
        }, 1800);
    }, [onComplete]);

    const handleVerSite = useCallback((e) => {
        if (e) e.stopPropagation();
        setStage('exit');
        setTimeout(() => {
            onComplete();
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        }, 1800);
    }, [onComplete]);

    const isOpen = stage !== 'idle';

    const { w, h, isMobile } = dimensions;

    // Geometry Constants
    const W = isMobile ? w : 600;
    const H = isMobile ? h : 400;
    const FX = W / 2;
    const FY = isMobile ? H * 0.40 : 225; // Meeting point of folds
    const R = isMobile ? 0 : 12;

    const particles = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
        left: `${5 + (i * 4.1) % 90}%`,
        top: `${5 + (i * 5.9) % 90}%`,
        dur: 5 + (i % 6) * 0.5,
        delay: i * 0.1,
    }));

    const roundedRectPath = isMobile
        ? `M 0,0 H ${W} V ${H} H 0 Z`
        : `M ${R},0 h ${W - 2 * R} a ${R},${R} 0 0 1 ${R},${R} v ${H - 2 * R} a ${R},${R} 0 0 1 -${R},${R} h -${W - 2 * R} a ${R},${R} 0 0 1 -${R},-${R} v -${H - 2 * R} a ${R},${R} 0 0 1 ${R},-${R} z`;

    const flapPath = isMobile
        ? `M 0,0 H ${W} L ${FX},${FY} L 0,0 Z`
        : `M ${R},0 H ${W - R} A ${R},${R} 0 0 1 ${W},${R} L ${FX},${FY} L 0,${R} A ${R},${R} 0 0 1 ${R},0 Z`;

    return (
        <AnimatePresence>
            {stage !== 'done' && (
                <motion.div
                    key="envelope-overlay"
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05080f] w-full h-full m-0 p-0 overflow-hidden"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                >
                    {/* Background decor */}
                    <div className="absolute inset-0 pointer-events-none" style={{ backgroundSize: '60px 60px', backgroundImage: 'linear-gradient(rgba(100,150,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(100,150,255,0.01) 1px, transparent 1px)' }} />

                    {/* Drifting particles */}
                    {particles.map(p => (
                        <motion.div key={p.id} className="absolute rounded-full pointer-events-none"
                            style={{ width: p.size, height: p.size, background: '#0F4C81', left: p.left, top: p.top, opacity: 0.15 }}
                            animate={{ y: [0, -150, 0], opacity: [0.05, 0.4, 0.05] }}
                            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
                        />
                    ))}

                    <div className="relative flex flex-col items-center justify-center w-full max-w-full"
                        style={{
                            perspective: '2000px',
                            width: isMobile ? '100%' : '92vw',
                            height: isMobile ? '100%' : 'auto',
                            maxHeight: '100dvh',
                            maxWidth: isMobile ? '100%' : '1100px',
                        }}>

                        <div className="relative" style={{
                            width: '100%',
                            height: '100%',
                            aspectRatio: isMobile ? 'none' : '3/2'
                        }}>

                            {/* Layer 1: BACK */}
                            <div className="absolute inset-0" style={{ zIndex: 10 }}>
                                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
                                    <path d={roundedRectPath} fill="#ffffff" />
                                    <path d={roundedRectPath} fill="rgba(0,0,0,0.05)" />
                                </svg>
                            </div>

                            {/* Layer 2: FLAP */}
                            <motion.div
                                onClick={handleOpen}
                                style={{
                                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                    transformOrigin: 'top center', transformStyle: 'preserve-3d',
                                    zIndex: (stage === 'extracting' || stage === 'presenting' || stage === 'exit' || isCardLeading) ? 20 : 55,
                                    cursor: stage === 'idle' ? 'pointer' : 'default',
                                }}
                                animate={isOpen ? { rotateX: -170 } : { rotateX: 0 }}
                                transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                    <path d={flapPath} fill="#ffffff" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
                                    <motion.g
                                        style={{ transformOrigin: `${FX}px ${FY}px` }}
                                        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                                        transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
                                    >
                                        <circle cx={FX} cy={FY} r={isMobile ? 36 : 42} fill="rgba(0,0,0,0.1)" />
                                        <circle cx={FX} cy={FY} r={isMobile ? 32 : 38} fill="#0F4C81" />
                                        <circle cx={FX} cy={FY} r={isMobile ? 28 : 34} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                                        <text x={FX} y={FY + (isMobile ? 6 : 8)} textAnchor="middle" fontFamily="serif" fontSize={isMobile ? 16 : 20} fill="white" fontWeight="bold">S&amp;N</text>
                                    </motion.g>
                                </svg>
                            </motion.div>

                            {/* Layer 3: THE CARD */}
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        key="inner-card"
                                        style={{
                                            position: 'absolute',
                                            top: isMobile ? '5%' : '15%',
                                            left: '50%', translateX: '-50%',
                                            width: isMobile ? '90%' : '88%',
                                            height: isMobile ? '88%' : '80%',
                                            zIndex: isCardLeading ? 60 : 30,
                                            background: '#fffefc', borderRadius: isMobile ? 4 : 4,
                                            boxShadow: isCardLeading ? '0 30px 90px rgba(0,0,0,0.3)' : '0 12px 60px rgba(0,0,0,0.15)',
                                            padding: isMobile ? '50px 8%' : '40px',
                                            display: 'flex', flexDirection: 'column',
                                            alignItems: 'center', justifyContent: 'center', border: '1px solid #f2f2f2',
                                            boxSizing: 'border-box',
                                        }}
                                        initial={{ y: 80, opacity: 0 }}
                                        animate={{
                                            y: stage === 'extracting' ? '-115%' : (stage === 'presenting' || stage === 'exit') ? (isMobile ? '2%' : '-10%') : 20,
                                            scale: (stage === 'presenting' || stage === 'exit') ? (isMobile ? 1.05 : 1.15) : 1,
                                            opacity: (stage === 'extracting' || stage === 'presenting' || stage === 'exit') ? 1 : 0.5
                                        }}
                                        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <div style={{ position: 'absolute', inset: 'clamp(10px, 3%, 20px)', border: '1px solid rgba(15,36,71,0.06)', borderRadius: '2px', pointerEvents: 'none' }} />

                                        <div style={{ position: 'absolute', inset: 'clamp(5px, 2%, 15px)', border: '2px solid rgba(15,36,71,0.4)', borderRadius: '30px', pointerEvents: 'none' }} />

                                        {/* Detalhe Folha Translucida */}
                                        <div style={{ position: 'absolute', inset: '0', backgroundImage: 'url(/DetalheConvite.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, pointerEvents: 'none', borderRadius: '4px' }} />

                                        {/* Logo Brasão Substituto */}
                                        <div style={{ position: 'absolute', top: isMobile ? '5px' : '10px', left: '50%', transform: 'translateX(-50%)', width: isMobile ? '65px' : '90px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', background: '#fffefc', padding: '0 10px' }}>
                                            <img src="/BrasaoSN.png" alt="Brasão Sarah e Nelson" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                                        </div>

                                        <p style={{
                                            fontFamily: 'sans-serif',
                                            fontSize: isMobile ? '8px' : 'clamp(9px, 1vw, 12px)',
                                            color: '#0F2447',
                                            marginTop: 'clamp(35px, 8vw, 60px)',
                                            marginBottom: 'clamp(15px, 2.5vw, 30px)',
                                            textAlign: 'center',
                                            fontStyle: 'italic',
                                            letterSpacing: '1px'
                                        }}>
                                            Com a benção de Deus e de seus pais
                                        </p>

                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '85%',
                                            fontFamily: '"Pinyon Script", "Great Vibes", cursive',
                                            fontSize: isMobile ? '12px' : 'clamp(14px, 1.8vw, 18px)',
                                            color: '#555',
                                            marginBottom: 'clamp(20px, 4vw, 40px)'
                                        }}>
                                            <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                                                Tiago Hell<br />
                                                Jolli Mara Hell
                                            </div>
                                            <div style={{ textAlign: 'right', lineHeight: 1.2 }}>
                                                Robson José M.<br />
                                                Francelia Benedito José M.
                                            </div>
                                        </div>

                                        <h2 style={{
                                            fontFamily: '"Pinyon Script", "Great Vibes", cursive',
                                            fontSize: isMobile ? '32px' : 'clamp(36px, 5.5vw, 52px)',
                                            color: '#0F2447',
                                            textAlign: 'center',
                                            fontWeight: 'normal',
                                            margin: 0,
                                            lineHeight: 1,
                                        }}>
                                            Sarah Luiza de Morais Hell
                                        </h2>

                                        <div style={{
                                            fontFamily: '"Pinyon Script", "Great Vibes", cursive',
                                            fontSize: isMobile ? '28px' : 'clamp(32px, 4vw, 42px)',
                                            color: '#0F2447',
                                            margin: '-5px 0'
                                        }}>&amp;</div>

                                        <h2 style={{
                                            fontFamily: '"Pinyon Script", "Great Vibes", cursive',
                                            fontSize: isMobile ? '32px' : 'clamp(36px, 5.5vw, 52px)',
                                            color: '#0F2447',
                                            textAlign: 'center',
                                            fontWeight: 'normal',
                                            margin: 0,
                                            lineHeight: 1,
                                            marginBottom: 'clamp(30px, 5vw, 50px)'
                                        }}>
                                            Nelson Benedito José Maria
                                        </h2>

                                        <p style={{
                                            fontFamily: '"Cinzel", serif',
                                            fontSize: isMobile ? '9px' : 'clamp(10px, 1.2vw, 13px)',
                                            color: '#0F2447',
                                            margin: 0,
                                            textAlign: 'center',
                                            letterSpacing: '2px',
                                            textTransform: 'uppercase',
                                            marginBottom: 'clamp(15px, 4vw, 30px)'
                                        }}>
                                            O convidam para a cerimônia do seu casamento
                                        </p>

                                        {/* Botoes de Ação */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: stage === 'presenting' ? 1 : 0, y: stage === 'presenting' ? 0 : 10 }}
                                            transition={{ duration: 0.8, delay: stage === 'presenting' ? 1.5 : 0 }}
                                            style={{
                                                display: 'flex',
                                                gap: isMobile ? '10px' : '15px',
                                                zIndex: 100,
                                                pointerEvents: stage === 'presenting' ? 'auto' : 'none'
                                            }}
                                        >
                                            <button
                                                onClick={handleConfirmar}
                                                style={{
                                                    padding: isMobile ? '10px 16px' : '12px 24px',
                                                    backgroundColor: '#0F4C81',
                                                    color: 'white',
                                                    border: '1px solid #0F4C81',
                                                    borderRadius: '2px',
                                                    fontFamily: 'sans-serif',
                                                    fontSize: isMobile ? '9px' : '11px',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px',
                                                    cursor: 'pointer',
                                                    boxShadow: '0 4px 12px rgba(15,76,129,0.3)',
                                                }}
                                            >
                                                Confirmar Presença
                                            </button>
                                            <button
                                                onClick={handleVerSite}
                                                style={{
                                                    padding: isMobile ? '10px 16px' : '12px 24px',
                                                    backgroundColor: 'transparent',
                                                    color: '#0F4C81',
                                                    border: '1px solid rgba(15,76,129,0.3)',
                                                    borderRadius: '2px',
                                                    fontFamily: 'sans-serif',
                                                    fontSize: isMobile ? '9px' : '11px',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                Explorar o Site
                                            </button>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Layer 4: POCKET */}
                            <div className="absolute inset-0" style={{ zIndex: 40, pointerEvents: 'none' }}>
                                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
                                    <defs>
                                        <clipPath id="pocketBodyClip">
                                            <path d={roundedRectPath} />
                                        </clipPath>
                                    </defs>

                                    <g clipPath="url(#pocketBodyClip)">
                                        <polygon points={`0,0 ${FX},${FY} 0,${H}`} fill="#ffffff" />
                                        <polygon points={`${W},0 ${FX},${FY} ${W},${H}`} fill="#fcfcfc" />
                                        <polygon points={`0,${H} ${FX},${FY} ${W},${H}`} fill="#fafafa" />
                                        <line x1="0" y1="0" x2={FX} y2={FY} stroke="rgba(0,0,0,0.015)" strokeWidth="1" />
                                        <line x1={W} y1="0" x2={FX} y2={FY} stroke="rgba(0,0,0,0.015)" strokeWidth="1" />
                                    </g>
                                </svg>
                            </div>
                        </div>

                        {/* HINT */}
                        <AnimatePresence>
                            {stage === 'idle' && (
                                <motion.div key="hint"
                                    className="absolute bottom-10 flex flex-col items-center gap-2 pointer-events-none"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    style={{ zIndex: 100 }}
                                >
                                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
                                        <svg width="24" height="15" viewBox="0 0 24 15"><path d="M2 2L12 12L22 2" stroke="#0F4C81" strokeWidth="2.5" strokeLinecap="round" fill="none" /></svg>
                                    </motion.div>
                                    <p style={{ fontFamily: 'serif', color: '#0F4C81', fontSize: '10px', letterSpacing: '5px', textTransform: 'uppercase', opacity: 0.7 }}>Tocar</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EnvelopeIntro;
