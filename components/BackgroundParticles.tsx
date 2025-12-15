import React, { useMemo, useState, useEffect } from 'react';

const BackgroundParticles: React.FC = () => {
    const [particleCount, setParticleCount] = useState(30);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setParticleCount(15);
            } else {
                setParticleCount(30);
            }
        };
        handleResize(); // Set initial count
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const particles = useMemo(() => {
        return Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: `${Math.random() * 2 + 1}px`, // size between 1px and 3px
            animationDuration: `${Math.random() * 20 + 20}s`, // duration between 20s and 40s
            animationDelay: `-${Math.random() * 20}s`, // use negative delay to start animations at random points
        }));
    }, [particleCount]);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-[5] pointer-events-none">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute rounded-full bg-accent-start/50 animate-particle-move"
                    style={{
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                        animationDuration: p.animationDuration,
                        animationDelay: p.animationDelay,
                    }}
                />
            ))}
        </div>
    );
};

export default BackgroundParticles;
