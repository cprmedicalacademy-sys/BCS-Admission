import React from 'react';

interface CprLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'compact';
}

export const CprLogo: React.FC<CprLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
}) => {
  const iconSize = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Precision Medical Caduceus / ECG Shield SVG */}
      <div
        className="relative shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 via-blue-950 to-cyan-900 p-2 shadow-sm shadow-cyan-900/20 border border-cyan-500/30 text-white"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Shield Outline */}
          <path
            d="M32 6L10 14V30C10 44.5 19.5 54.5 32 58C44.5 54.5 54 44.5 54 30V14L32 6Z"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeLinejoin="round"
            fill="rgba(15, 23, 42, 0.4)"
          />
          {/* Medical Rod of Asclepius */}
          <line
            x1="32"
            y1="16"
            x2="32"
            y2="48"
            stroke="#f8fafc"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Serpent Coil */}
          <path
            d="M26 22C26 20 32 19 32 23C32 27 24 28 24 33C24 37 38 36 38 40C38 44 32 45 32 47"
            stroke="#06b6d4"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Vital ECG Pulse Line in Crimson Red */}
          <path
            d="M18 36H24L27 30L31 43L35 28L38 38H46"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-display font-extrabold text-base md:text-lg tracking-tight text-slate-900">
            CPR MEDICAL ACADEMY
          </span>
        </div>
        {variant === 'full' && (
          <span className="text-[10px] md:text-[11px] font-semibold tracking-wider text-cyan-800 uppercase mt-0.5">
            Special BCS Wing · Bangladesh
          </span>
        )}
      </div>
    </div>
  );
};
