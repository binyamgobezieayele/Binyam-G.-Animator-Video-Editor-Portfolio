import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 }); // Start off-screen
    const [variant, setVariant] = useState('default');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            setPosition({ x: e.clientX, y: e.clientY });
            const target = e.target as HTMLElement;
            const newVariant = target.closest('[data-cursor-variant]')?.getAttribute('data-cursor-variant') || 'default';
            setVariant(newVariant);
        };
        
        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        document.documentElement.addEventListener('mousemove', handleMouseMove);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
            document.documentElement.removeEventListener('mousemove', handleMouseMove);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isVisible]);

    const followerClasses = [
        'fixed', 'top-0', 'left-0', 'w-8', 'h-8', 'rounded-full',
        'bg-accent-start/30', 'dark:bg-accent-start/50',
        'pointer-events-none', 'z-[9999]', 'transition-transform', 'duration-300', 'ease-out',
        '-translate-x-1/2', '-translate-y-1/2', 'grid', 'place-items-center', 'backdrop-blur-sm'
    ];

    const dotClasses = [
        'fixed', 'top-0', 'left-0', 'w-2', 'h-2', 'rounded-full',
        'bg-accent-end', 'pointer-events-none', 'z-[9999]',
        'transition-transform', 'duration-100', 'ease-out',
        '-translate-x-1/2', '-translate-y-1/2'
    ];
    
    // Add dynamic styles based on variant
    let followerStyle: React.CSSProperties = { transform: `translate(${position.x}px, ${position.y}px) scale(1)`, opacity: isVisible ? 1 : 0 };
    let dotStyle: React.CSSProperties = { transform: `translate(${position.x}px, ${position.y}px) scale(1)`, opacity: isVisible ? 1 : 0 };

    if (variant === 'link') {
        followerStyle.transform = `translate(${position.x}px, ${position.y}px) scale(2)`;
        dotStyle.transform = `translate(${position.x}px, ${position.y}px) scale(0.5)`;
    } else if (variant === 'project') {
        followerStyle.width = '96px';
        followerStyle.height = '96px';
        followerStyle.transform = `translate(${position.x}px, ${position.y}px) scale(1)`;
        followerStyle.border = '2px solid #DB2777';
        dotStyle.transform = `translate(${position.x}px, ${position.y}px) scale(0)`;
    }

    return (
        <div className="hidden md:block">
            <div
                className={followerClasses.join(' ')}
                style={followerStyle}
            >
                <span className={`text-white text-sm font-bold transition-opacity duration-200 ${variant === 'project' ? 'opacity-100' : 'opacity-0'}`}>
                    View
                </span>
            </div>
            <div
                className={dotClasses.join(' ')}
                style={dotStyle}
            />
        </div>
    );
};

export default CustomCursor;
