import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  description?: string;
  className?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  label,
  description,
  className = ''
}) => {
  const sizeClasses = {
    sm: {
      track: 'w-10 h-6',
      thumb: 'w-4 h-4',
      icon: 'w-3 h-3',
      translate: 'translate-x-4'
    },
    md: {
      track: 'w-12 h-7',
      thumb: 'w-5 h-5',
      icon: 'w-3.5 h-3.5',
      translate: 'translate-x-5'
    },
    lg: {
      track: 'w-14 h-8',
      thumb: 'w-6 h-6',
      icon: 'w-4 h-4',
      translate: 'translate-x-6'
    }
  };

  const currentSize = sizeClasses[size];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled) {
        onChange();
      }
    }
  };

  const trackId = React.useId();
  const labelId = label ? `${trackId}-label` : undefined;
  const descriptionId = description ? `${trackId}-description` : undefined;

  return (
    <div className={`inline-flex items-center ${className}`}>
      {label && (
        <label
          id={labelId}
          htmlFor={trackId}
          className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-3 cursor-pointer"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Hidden checkbox for form compatibility and accessibility */}
        <input
          id={trackId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          aria-labelledby={labelId}
          aria-describedby={descriptionId}
        />
        
        {/* Toggle track */}
        <motion.div
          role="switch"
          aria-checked={checked}
          aria-labelledby={labelId}
          aria-describedby={descriptionId}
          tabIndex={disabled ? -1 : 0}
          onClick={disabled ? undefined : onChange}
          onKeyDown={handleKeyDown}
          className={`
            relative inline-flex items-center rounded-full transition-all duration-300 ease-in-out cursor-pointer
            ${currentSize.track}
            ${disabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-500/20'
            }
            ${checked 
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 shadow-purple-500/25' 
              : 'bg-gray-300 dark:bg-gray-600 shadow-gray-300/25 dark:shadow-gray-600/25'
            }
          `}
          whileHover={disabled ? {} : { scale: 1.02 }}
          whileTap={disabled ? {} : { scale: 0.98 }}
          initial={false}
          animate={{
            backgroundColor: checked 
              ? 'rgb(147 51 234)' // purple-600
              : 'rgb(156 163 175)' // gray-400
          }}
        >
          {/* Toggle thumb */}
          <motion.div
            className={`
              absolute left-1 top-1 bg-white rounded-full shadow-lg flex items-center justify-center
              ${currentSize.thumb}
              ${disabled ? '' : 'hover:shadow-xl'}
            `}
            initial={false}
            animate={{
              x: checked ? `calc(100% + 0.25rem)` : 0,
              rotate: checked ? 180 : 0
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              duration: 0.3
            }}
          >
            {/* Icon inside thumb */}
            <motion.div
              initial={false}
              animate={{
                scale: checked ? 1 : 0,
                opacity: checked ? 1 : 0
              }}
              transition={{ duration: 0.2, delay: checked ? 0.1 : 0 }}
              className="absolute"
            >
              <Moon className={`${currentSize.icon} text-purple-600`} />
            </motion.div>
            
            <motion.div
              initial={false}
              animate={{
                scale: checked ? 0 : 1,
                opacity: checked ? 0 : 1
              }}
              transition={{ duration: 0.2, delay: checked ? 0 : 0.1 }}
              className="absolute"
            >
              <Sun className={`${currentSize.icon} text-yellow-500`} />
            </motion.div>
          </motion.div>
          
          {/* Track icons (optional background icons) */}
          <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
            <motion.div
              initial={false}
              animate={{
                opacity: checked ? 0 : 0.3,
                scale: checked ? 0.8 : 1
              }}
              transition={{ duration: 0.2 }}
            >
              <Sun className={`${currentSize.icon} text-white`} />
            </motion.div>
            
            <motion.div
              initial={false}
              animate={{
                opacity: checked ? 0.3 : 0,
                scale: checked ? 1 : 0.8
              }}
              transition={{ duration: 0.2 }}
            >
              <Moon className={`${currentSize.icon} text-white`} />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {description && (
        <p
          id={descriptionId}
          className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-3"
        >
          {description}
        </p>
      )}
    </div>
  );
};