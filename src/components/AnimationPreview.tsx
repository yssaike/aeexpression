import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimationPreviewProps {
  expressionType: string;
  isDarkMode: boolean;
}

export const AnimationPreview: React.FC<AnimationPreviewProps> = ({
  expressionType,
  isDarkMode
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    let animationId: number;
    let startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000; // Convert to seconds

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Set colors based on theme
      const primaryColor = isDarkMode ? '#A855F7' : '#6C5CE7';
      const secondaryColor = isDarkMode ? '#10B981' : '#00B894';

      switch (expressionType) {
        case 'Position':
          // Smooth position animation
          const x = width * 0.2 + (width * 0.6) * (0.5 + 0.5 * Math.sin(elapsed * 2));
          const y = height / 2;
          
          ctx.fillStyle = primaryColor;
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.fill();
          
          // Trail effect
          ctx.strokeStyle = primaryColor + '40';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(width * 0.2, height / 2);
          ctx.lineTo(width * 0.8, height / 2);
          ctx.stroke();
          break;

        case 'Animation':
        case 'Wiggle':
          // Wiggle animation
          const wiggleX = width / 2 + Math.sin(elapsed * 8) * 15 + Math.sin(elapsed * 12) * 8;
          const wiggleY = height / 2 + Math.cos(elapsed * 6) * 12 + Math.cos(elapsed * 10) * 6;
          
          ctx.fillStyle = primaryColor;
          ctx.beginPath();
          ctx.arc(wiggleX, wiggleY, 8, 0, Math.PI * 2);
          ctx.fill();
          
          // Center reference
          ctx.strokeStyle = isDarkMode ? '#374151' : '#D1D5DB';
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, 6, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
          break;

        case 'Scale':
          // Scale bounce animation
          const scale = 1 + 0.4 * Math.sin(elapsed * 3);
          const radius = 8 * scale;
          
          ctx.fillStyle = primaryColor;
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
          ctx.fill();
          
          // Reference circle
          ctx.strokeStyle = isDarkMode ? '#374151' : '#D1D5DB';
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, 8, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
          break;

        case 'Rotation':
          // Rotation animation
          const angle = elapsed * 2;
          const centerX = width / 2;
          const centerY = height / 2;
          const rotRadius = 15;
          
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(angle);
          
          // Rotating element
          ctx.fillStyle = primaryColor;
          ctx.fillRect(-8, -rotRadius, 16, 6);
          ctx.fillRect(-8, rotRadius - 6, 16, 6);
          
          ctx.restore();
          
          // Center dot
          ctx.fillStyle = secondaryColor;
          ctx.beginPath();
          ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'Color':
          // Color transition animation
          const hue = (elapsed * 60) % 360;
          const color = `hsl(${hue}, 70%, 60%)`;
          
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, 12, 0, Math.PI * 2);
          ctx.fill();
          
          // Color ring
          ctx.strokeStyle = color + '40';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, 20, 0, Math.PI * 2);
          ctx.stroke();
          break;

        case 'Text':
          // Text counter animation
          const counter = Math.floor(elapsed * 10) % 100;
          ctx.fillStyle = primaryColor;
          ctx.font = '14px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(counter.toString().padStart(2, '0'), width / 2, height / 2 + 5);
          break;

        case 'Shape':
          // Shape morphing
          const sides = 3 + Math.floor((Math.sin(elapsed) + 1) * 2); // 3-6 sides
          const shapeRadius = 12;
          
          ctx.fillStyle = primaryColor;
          ctx.beginPath();
          for (let i = 0; i < sides; i++) {
            const shapeAngle = (i / sides) * Math.PI * 2 - Math.PI / 2;
            const x = width / 2 + Math.cos(shapeAngle) * shapeRadius;
            const y = height / 2 + Math.sin(shapeAngle) * shapeRadius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          break;

        case 'Time':
          // Time-based pulse
          const pulse = 0.5 + 0.5 * Math.sin(elapsed * 4);
          const pulseRadius = 6 + pulse * 8;
          
          ctx.fillStyle = primaryColor + Math.floor(pulse * 255).toString(16).padStart(2, '0');
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, pulseRadius, 0, Math.PI * 2);
          ctx.fill();
          
          // Pulse rings
          for (let i = 1; i <= 3; i++) {
            const ringRadius = pulseRadius + i * 8;
            const ringAlpha = Math.max(0, pulse - i * 0.2);
            ctx.strokeStyle = primaryColor + Math.floor(ringAlpha * 100).toString(16).padStart(2, '0');
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, ringRadius, 0, Math.PI * 2);
            ctx.stroke();
          }
          break;

        case 'Math':
          // Mathematical wave
          ctx.strokeStyle = primaryColor;
          ctx.lineWidth = 2;
          ctx.beginPath();
          
          for (let x = 0; x < width; x++) {
            const y = height / 2 + Math.sin((x / width) * Math.PI * 4 + elapsed * 3) * 15;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          
          // Moving dot
          const dotX = (elapsed * 20) % width;
          const dotY = height / 2 + Math.sin((dotX / width) * Math.PI * 4 + elapsed * 3) * 15;
          ctx.fillStyle = secondaryColor;
          ctx.beginPath();
          ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
          ctx.fill();
          break;

        default:
          // Default animation - simple bounce
          const bounceY = height / 2 + Math.sin(elapsed * 4) * 10;
          ctx.fillStyle = primaryColor;
          ctx.beginPath();
          ctx.arc(width / 2, bounceY, 8, 0, Math.PI * 2);
          ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [expressionType, isDarkMode]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative w-20 h-16 rounded-lg border overflow-hidden ${
        isDarkMode 
          ? 'bg-gray-800/30 border-gray-700/50' 
          : 'bg-white/30 border-gray-200/50'
      }`}
    >
      <canvas
        ref={canvasRef}
        width={80}
        height={64}
        className="w-full h-full"
        aria-label={`Animation preview for ${expressionType} expression`}
      />
      <div className={`absolute bottom-1 right-1 text-xs font-mono ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {expressionType.slice(0, 3).toUpperCase()}
      </div>
    </motion.div>
  );
};