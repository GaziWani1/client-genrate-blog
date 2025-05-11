import type React from 'react';

const Button = ({
  onClick,
  className,
  children,
}: {
  onClick?: () => void;
  className: string;
  children: React.ReactNode | string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} text-white font-semibold hover:scale-105 transition-all px-6 py-2 rounded cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default Button;
