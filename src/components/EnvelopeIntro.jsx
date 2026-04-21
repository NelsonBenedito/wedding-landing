import React, { useState, useCallback, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Particle = memo(({ p }) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
            width: p.size,
            height: p.size,
            background: '#0F4C81',
            left: p.left,
            top: p.top,
            opacity: 0.15,
            willChange: 'transform, opacity'
        }}
        animate={{ y: [0, -150, 0], opacity: [0.05, 0.4, 0.05] }}
        transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
    />
));

const EnvelopeIntro = ({ onComplete }) => {
    const [stage, setStage] = useState('idle'); // idle | opening | extracting | presenting | exit
    const [isCardLeading, setIsCardLeading] = useState(false); // Controls if card is in front of pocket
    const [assetsLoaded, setAssetsLoaded] = useState(false);
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

    useEffect(() => {
        const imagesToLoad = [
            '/TexturaPapel.png',
            '/SeloSn.png',
            '/TexturaConvite.jpg',
            '/DetalheConvite.png',
            '/BrasaoSN.png'
        ];

        let loadedCount = 0;
        const checkDone = () => {
            loadedCount++;
            if (loadedCount === imagesToLoad.length) {
                setAssetsLoaded(true);
            }
        };

        imagesToLoad.forEach(src => {
            const img = new Image();
            img.onload = checkDone;
            img.onerror = checkDone;
            img.src = src;
        });
    }, []);

    const handleOpen = useCallback(() => {
        if (stage !== 'idle') return;
        setStage('opening');

        setTimeout(() => {
            setStage('extracting');
        }, 1400);

        setTimeout(() => {
            setIsCardLeading(true);
            setStage('presenting');
        }, 3200);

    }, [stage]);

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

    const W = isMobile ? w : 600;
    const H = isMobile ? h : 400;
    const FX = W / 2;
    const FY = isMobile ? H * 0.40 : 225;
    const R = isMobile ? 0 : 12;

    const particles = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
        id: i,
        size: i % 3 === 0 ? 3 : 2,
        left: `${5 + (i * 8) % 90}%`,
        top: `${5 + (i * 7) % 90}%`,
        dur: 6 + (i % 4),
        delay: i * 0.2,
    })), []);

    const roundedRectPath = useMemo(() => isMobile
        ? `M 0,0 H ${W} V ${H} H 0 Z`
        : `M ${R},0 h ${W - 2 * R} a ${R},${R} 0 0 1 ${R},${R} v ${H - 2 * R} a ${R},${R} 0 0 1 -${R},${R} h -${W - 2 * R} a ${R},${R} 0 0 1 -${R},-${R} v -${H - 2 * R} a ${R},${R} 0 0 1 ${R},-${R} z`, 
    [isMobile, W, H, R]);

    const flapPath = useMemo(() => isMobile
        ? `M 0,0 H ${W} L ${FX},${FY} L 0,0 Z`
        : `M ${R},0 H ${W - R} A ${R},${R} 0 0 1 ${W},${R} L ${FX},${FY} L 0,${R} A ${R},${R} 0 0 1 ${R},0 Z`,
    [isMobile, W, FX, FY, R]);

    return (
        <AnimatePresence>
            {stage !== 'done' && (
                <motion.div
                    key="envelope-overlay"
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05080f] w-full h-full m-0 p-0 overflow-hidden"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                    style={{ shadow: 'none', willChange: 'opacity' }}
                >
                    {/* Background decor */}
                    <div className="absolute inset-0 pointer-events-none" style={{ backgroundSize: '60px 60px', backgroundImage: 'linear-gradient(rgba(100,150,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(100,150,255,0.01) 1px, transparent 1px)' }} />

                    {/* Drifting particles */}
                    {particles.map(p => (
                        <Particle key={p.id} p={p} />
                    ))}

                    {/* Loader */}
                    <AnimatePresence>
                        {!assetsLoaded && (
                            <motion.div
                                key="loader"
                                className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <img src="/favicon.svg" alt="Carregando" className="w-20 h-20 md:w-24 md:h-24 object-contain brightness-0 invert opacity-80" />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        className="relative flex flex-col items-center justify-center w-full max-w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: assetsLoaded ? 1 : 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            perspective: '2000px',
                            width: isMobile ? '100vw' : '92vw',
                            height: isMobile ? '100dvh' : 'auto',
                            maxHeight: '100dvh',
                            maxWidth: isMobile ? '100%' : '1100px',
                            willChange: 'opacity, transform'
                        }}>
                        <svg width="0" height="0" className="absolute pointer-events-none">
                            <defs>
                                <pattern id="paper-tex" patternUnits="userSpaceOnUse" width={W} height={H}>
                                    <image href="/TexturaPapel.png" width={W} height={H} preserveAspectRatio="xMidYMid slice" opacity="0.4" />
                                </pattern>
                            </defs>
                        </svg>

                        <div className="relative" style={{
                            width: '100%',
                            height: '100%',
                            aspectRatio: isMobile ? 'none' : '3/2'
                        }}>

                            {/* Layer 1: BACK */}
                            <div className="absolute inset-0" style={{ zIndex: 10 }}>
                                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
                                    <path d={roundedRectPath} fill="#ffffff" />
                                    <path d={roundedRectPath} fill="url(#paper-tex)" style={{ mixBlendMode: 'multiply' }} />
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
                                    willChange: 'transform'
                                }}
                                animate={isOpen ? { rotateX: -170 } : { rotateX: 0 }}
                                transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                    <path d={flapPath} fill="#ffffff" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
                                    <path d={flapPath} fill="url(#paper-tex)" stroke="none" style={{ mixBlendMode: 'multiply' }} />
                                    <motion.g
                                        style={{ transformOrigin: `${FX}px ${FY}px`, willChange: 'transform' }}
                                        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                                        transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
                                    >
                                        <image
                                            x={FX - (isMobile ? 45 : 55)}
                                            y={FY - (isMobile ? 45 : 55)}
                                            width={isMobile ? 90 : 110}
                                            height={isMobile ? 90 : 110}
                                            href="/SeloSn.png"
                                            preserveAspectRatio="xMidYMid meet"
                                        />
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
                                            background: '#fffefc', borderRadius: '4px',
                                            boxShadow: isCardLeading ? '0 30px 90px rgba(0,0,0,0.3)' : '0 12px 60px rgba(0,0,0,0.15)',
                                            padding: isMobile ? '50px 8%' : '40px',
                                            display: 'flex', flexDirection: 'column',
                                            alignItems: 'center', justifyContent: 'center', border: '1px solid #f2f2f2',
                                            boxSizing: 'border-box',
                                            willChange: 'transform, opacity'
                                        }}
                                        initial={{ y: 0, opacity: 0 }}
                                        animate={{
                                            y: stage === 'extracting' ? '-115%' : (stage === 'presenting' || stage === 'exit') ? (isMobile ? '2%' : '-10%') : 0,
                                            scale: (stage === 'presenting' || stage === 'exit') ? (isMobile ? 1.05 : 1.15) : 1,
                                            opacity: 1
                                        }}
                                        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <div style={{ position: 'absolute', inset: 'clamp(10px, 3%, 20px)', border: '1px solid rgba(15,36,71,0.06)', borderRadius: '2px', pointerEvents: 'none' }} />

                                        <div style={{ position: 'absolute', inset: 'clamp(5px, 2%, 15px)', border: '2px solid rgba(15,36,71,0.4)', borderRadius: '30px', pointerEvents: 'none' }} />

                                        {/* Textura do Convite (Papel) */}
                                        <div style={{ position: 'absolute', inset: '0', backgroundImage: 'url(/TexturaConvite.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', pointerEvents: 'none', borderRadius: '4px', mixBlendMode: 'multiply', opacity: 0.5 }} />

                                        {/* Detalhe Folha Translucida */}
                                        <div style={{ position: 'absolute', inset: '0', backgroundImage: 'url(/DetalheConvite.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, pointerEvents: 'none', borderRadius: '4px' }} />

                                        {/* Logo Brasão Substituto */}
                                        <div style={{ position: 'absolute', top: isMobile ? '5px' : '10px', left: '50%', transform: 'translateX(-50%)', width: isMobile ? '65px' : '90px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', background: 'transparent', padding: '0 10px' }}>
                                            <img src="/BrasaoSN.png" alt="Brasão Sarah e Nelson" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                                        </div>

                                        <p style={{
                                            fontFamily: '"Cinzel", serif',
                                            fontSize: isMobile ? '8px' : 'clamp(9px, 1vw, 12px)',
                                            color: '#0F2447',
                                            marginTop: 'clamp(35px, 8vw, 60px)',
                                            marginBottom: 'clamp(15px, 2.5vw, 30px)',
                                            textAlign: 'center',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px'
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
                                                Jolli Nara de Morais H.
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
                                                flexWrap: 'wrap',
                                                justifyContent: 'center',
                                                gap: isMobile ? '6px' : '15px',
                                                zIndex: 100,
                                                pointerEvents: stage === 'presenting' ? 'auto' : 'none'
                                            }}
                                        >
                                            <button
                                                onClick={handleVerSite}
                                                style={{
                                                    padding: isMobile ? '8px 10px' : '12px 24px',
                                                    backgroundColor: 'transparent',
                                                    color: '#0F4C81',
                                                    border: '1px solid rgba(15,76,129,0.3)',
                                                    borderRadius: '2px',
                                                    fontFamily: 'sans-serif',
                                                    fontSize: isMobile ? '8px' : '11px',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                Confirmar Presença
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

                                        <path d={`M 0,0 L ${FX},${FY} L 0,${H} Z M ${W},0 L ${FX},${FY} L ${W},${H} Z M 0,${H} L ${FX},${FY} L ${W},${H} Z`} fill="url(#paper-tex)" style={{ mixBlendMode: 'multiply' }} />

                                        <line x1="0" y1="0" x2={FX} y2={FY} stroke="rgba(0,0,0,0.025)" strokeWidth="1.5" />
                                        <line x1={W} y1="0" x2={FX} y2={FY} stroke="rgba(0,0,0,0.025)" strokeWidth="1.5" />
                                    </g>
                                </svg>
                            </div>
                        </div>

                        {/* HINT */}
                        <AnimatePresence>
                            {stage === 'idle' && assetsLoaded && (
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
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EnvelopeIntro;
