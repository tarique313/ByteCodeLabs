
import React from 'react';

interface LogoProps {
  className?: string;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10", light = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className} select-none`}>
      <div className="flex flex-col items-center">
        <span className={`text-4xl font-bold font-mono tracking-tighter ${light ? 'text-white' : 'text-black'}`}>
          &gt;
        </span>
        <div className={`w-6 h-1 bg-current ${light ? 'text-white' : 'text-black'} mt-[-8px] opacity-70 animate-pulse`}></div>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`text-2xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-black'}`}>ByteCode</span>
        <span className={`text-2xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-black'}`}>Labs</span>
      </div>
    </div>
  );
};

export default Logo;
