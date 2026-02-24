import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EnvelopeIntro = ({ onComplete }) => {
    const [stage, setStage] = useState('idle'); // idle | opening | revealing | exit

    const handleOpen = useCallback(() => {
        if (stage !== 'idle') return;
        setStage('opening');
        setTimeout(() => setStage('revealing'), 1300);
        setTimeout(() => setStage('exit'), 5500);
        setTimeout(() => onComplete(), 7200);
    }, [stage, onComplete]);

    const isOpen = stage === 'opening' || stage === 'revealing' || stage === 'exit';

    // Coordination constants
    const W = 600, H = 400;
    const FX = 300, FY = 225; // Fold center point
    const R = 12; // Radius

    const particles = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
        left: `${5 + (i * 4.1) % 90}%`,
        top: `${5 + (i * 5.9) % 90}%`,
        dur: 5 + (i % 6) * 0.5,
        delay: i * 0.1,
    }));

    // Reusable path for the rounded envelope shape
    const roundedRectPath = `M ${R},0 h ${W - 2 * R} a ${R},${R} 0 0 1 ${R},${R} v ${H - 2 * R} a ${R},${R} 0 0 1 -${R},${R} h -${W - 2 * R} a ${R},${R} 0 0 1 -${R},-${R} v -${H - 2 * R} a ${R},${R} 0 0 1 ${R},-${R} z`;

    // Path for the flap that follows the rounded corners
    const flapCurvePath = `M 0,${R} a ${R},${R} 0 0 1 ${R},-${R} h ${W - 2 * R} a ${R},${R} 0 0 1 ${R},${R} L ${FX},${FY} L 0,${R} Z`;

    return (
        <AnimatePresence>
            {stage !== 'done' && (
                <motion.div
                    key="envelope-overlay"
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
                    style={{ background: 'linear-gradient(160deg, #0a0e1a 0%, #152033 50%, #05080f 100%)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                >
                    {/* Background decor */}
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundSize: '60px 60px', backgroundImage: 'linear-gradient(rgba(100,150,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(100,150,255,0.01) 1px, transparent 1px)' }} />

                    {/* Drifting particles */}
                    {particles.map(p => (
                        <motion.div key={p.id} className="absolute rounded-full pointer-events-none"
                            style={{ width: p.size, height: p.size, background: '#0F4C81', left: p.left, top: p.top, opacity: 0.12 }}
                            animate={{ y: [0, -50, 0], opacity: [0.05, 0.35, 0.05] }}
                            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
                        />
                    ))}

                    <div className="relative flex flex-col items-center justify-center" style={{ perspective: '2000px', width: '85vw', maxWidth: 640 }}>

                        <div className="relative" style={{ width: '100%', aspectRatio: '600/400' }}>

                            {/* Layer 1: ENVELOPE BACK */}
                            <div className="absolute inset-0" style={{ zIndex: 10 }}>
                                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ display: 'block' }}>
                                    <path d={roundedRectPath} fill="#ffffff" />
                                    <path d={roundedRectPath} fill="rgba(0,0,0,0.03)" />
                                </svg>
                            </div>

                            {/* Layer 2: ENVELOPE FLAP (The animated "lingua") */}
                            <motion.div
                                onClick={handleOpen}
                                style={{
                                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                    transformOrigin: 'top center', transformStyle: 'preserve-3d',
                                    zIndex: (stage === 'revealing' || stage === 'exit') ? 20 : 50,
                                    cursor: stage === 'idle' ? 'pointer' : 'default',
                                }}
                                animate={isOpen ? { rotateX: -170 } : { rotateX: 0 }}
                                transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full overflow-visible" style={{ display: 'block' }}>
                                    {/* Flap with rounded corners at the hinge */}
                                    <path d={flapCurvePath} fill="#ffffff" />
                                    {/* Flap edge shadow */}
                                    <path d={flapCurvePath} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />

                                    {/* Wax Seal - Pantone Classic Blue #0F4C81 */}
                                    <g style={{ transform: `translate(${FX}px, ${FY}px)` }}>
                                        <circle r="42" fill="rgba(0,0,0,0.1)" />
                                        <circle r="38" fill="#0F4C81" />
                                        <circle r="34" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                                        <text y="7" textAnchor="middle" fontFamily="serif" fontSize="19" fill="white" fontWeight="bold" opacity="0.95">S&amp;N</text>
                                    </g>
                                </svg>
                            </motion.div>

                            {/* Layer 3: THE CARD (The Middle) */}
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        key="inner-card"
                                        style={{
                                            position: 'absolute', top: '15%', left: '50%', translateX: '-50%',
                                            width: '88%', height: '80%', zIndex: 30,
                                            background: '#fffefc', borderRadius: 4,
                                            boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                                            padding: '40px', display: 'flex', flexDirection: 'column',
                                            alignItems: 'center', justifyContent: 'center', border: '1px solid #f2f2f2'
                                        }}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={(stage === 'revealing' || stage === 'exit') ? { y: '-62%', opacity: 1, scale: 1.05 } : { y: 10, opacity: 0.5 }}
                                        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: stage === 'revealing' ? 0.3 : 0 }}
                                    >
                                        <div style={{ position: 'absolute', inset: '15px', border: '1px solid rgba(15,36,71,0.06)', borderRadius: '2px' }} />
                                        <p style={{ fontFamily: 'serif', fontSize: '11px', color: '#0F2447', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '15px', opacity: 0.5 }}>Convite de Casamento</p>
                                        <h2 style={{ fontFamily: 'serif', fontSize: 'clamp(30px, 6vw, 45px)', color: '#0F2447', textAlign: 'center', fontWeight: 'normal', margin: 0 }}>
                                            Sarah <span style={{ color: '#0F4C81', fontStyle: 'italic', fontWeight: '300' }}>&</span> Nelson
                                        </h2>
                                        <div style={{ width: '50px', height: '1px', background: 'rgba(0,0,0,0.1)', margin: '25px 0' }} />
                                        <p style={{ fontFamily: 'serif', fontSize: '18px', color: '#1a3a6e', fontStyle: 'italic', margin: 0 }}>22 de Agosto de 2026</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Layer 4: ENVELOPE POCKET (Front Folds) */}
                            <div className="absolute inset-0" style={{ zIndex: 40, pointerEvents: 'none' }}>
                                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ display: 'block' }}>
                                    <defs>
                                        <clipPath id="pocketBodyClip">
                                            <path d={roundedRectPath} />
                                        </clipPath>
                                    </defs>

                                    <g clipPath="url(#pocketBodyClip)">
                                        {/* Overlapping polygons to avoid white hairlines at joins */}
                                        <polygon points={`-2,-2 ${FX + 2},${FY + 2} -2,${H + 2}`} fill="#fcfcfc" />
                                        <polygon points={`${W + 2},-2 ${FX - 2},${FY + 2} ${W + 2},${H + 2}`} fill="#f9f9f9" />
                                        <polygon points={`-2,${H + 2} ${FX},${FY - 5} ${W + 2},${H + 2}`} fill="#f4f4f4" shadow="0 0 10px black" />

                                        {/* Fold Crease Shadows */}
                                        <line x1="0" y1="0" x2={FX} y2={FY} stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                                        <line x1={W} y1="0" x2={FX} y2={FY} stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                                    </g>

                                    {/* Subtle outer border stroke to clean up edges */}
                                    <path d={roundedRectPath} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
                                </svg>
                            </div>

                            {/* Outer Ambient Shadow */}
                            <div className="absolute inset-x-8 -bottom-12 h-10 bg-black/20 blur-3xl rounded-full -z-1" />
                        </div>

                        {/* HINT ICON & TEXT */}
                        <AnimatePresence>
                            {stage === 'idle' && (
                                <motion.div key="hint" className="mt-16 flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
                                        <svg width="24" height="15" viewBox="0 0 24 15"><path d="M2 2L12 12L22 2" stroke="#0F4C81" strokeWidth="2.5" strokeLinecap="round" fill="none" /></svg>
                                    </motion.div>
                                    <p style={{ fontFamily: 'serif', color: '#0F4C81', fontSize: '11px', letterSpacing: '5px', textTransform: 'uppercase', opacity: 0.7 }}>Toque para abrir</p>
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
