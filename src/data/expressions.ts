import { Expression } from '../types';

export const expressionsData: Expression[] = [
  {
    id: '1',
    name: 'Smooth Position Animation',
    category: 'Position',
    description: 'Creates smooth, eased movement between keyframes using bezier interpolation.',
    code: `// Smooth position with custom easing
ease(time, inPoint, outPoint, [0, 0], [thisComp.width, thisComp.height]);`,
    tags: ['smooth', 'easing', 'movement', 'keyframes'],
    examples: [
      'Logo entrance animations',
      'UI element transitions',
      'Character movement paths'
    ],
    difficulty: 'Beginner',
    lastModified: '2024-01-15'
  },
  {
    id: '2',
    name: 'Wiggle with Frequency Control',
    category: 'Animation',
    description: 'Advanced wiggle expression with separate frequency and amplitude controls.',
    code: `// Controllable wiggle animation
freq = 2; // Frequency in Hz
amp = 50; // Amplitude in pixels
wiggle(freq, amp);`,
    tags: ['wiggle', 'random', 'frequency', 'amplitude'],
    examples: [
      'Camera shake effects',
      'Organic motion',
      'Hand-drawn animation feel'
    ],
    difficulty: 'Intermediate',
    lastModified: '2024-01-14'
  },
  {
    id: '3',
    name: 'Scale Bounce with Overshoot',
    category: 'Scale',
    description: 'Creates a bouncy scale animation with customizable overshoot and decay.',
    code: `// Bouncy scale with overshoot
amplitude = 0.3;
frequency = 2;
decay = 5;

if (numKeys > 0) {
  n = nearestKey(time).index;
  if (key(n).time > time) n--;
}

if (n == 0) {
  t = 0;
} else {
  t = time - key(n).time;
}

if (n > 0 && t < 1) {
  v = velocityAtTime(key(n).time - thisComp.frameDuration/10);
  value + v*amplitude*Math.sin(frequency*t*2*Math.PI)/Math.exp(decay*t);
} else {
  value;
}`,
    tags: ['bounce', 'overshoot', 'elastic', 'spring'],
    examples: [
      'Button interactions',
      'Icon animations',
      'Popup animations'
    ],
    difficulty: 'Advanced',
    lastModified: '2024-01-13'
  },
  {
    id: '4',
    name: 'Color Temperature Shift',
    category: 'Color',
    description: 'Dynamically adjusts color temperature from warm to cool based on time of day.',
    code: `// Color temperature based on time
timeOfDay = (time % 24) / 24; // Normalize to 0-1
warmColor = [255, 200, 150, 255] / 255;
coolColor = [150, 200, 255, 255] / 255;

// Interpolate between warm and cool
linear(Math.sin(timeOfDay * Math.PI), 0, 1, warmColor, coolColor);`,
    tags: ['color', 'temperature', 'time', 'interpolation'],
    examples: [
      'Day/night transitions',
      'Mood lighting',
      'Atmospheric effects'
    ],
    difficulty: 'Intermediate',
    lastModified: '2024-01-12'
  },
  {
    id: '5',
    name: 'Auto-Rotate to Motion Path',
    category: 'Rotation',
    description: 'Automatically rotates layer to face the direction of movement along a path.',
    code: `// Auto-rotate to face movement direction
lookAhead = 0.1; // Time in seconds to look ahead

try {
  p1 = thisProperty.valueAtTime(time);
  p2 = thisProperty.valueAtTime(time + lookAhead);
  
  delta = p2 - p1;
  Math.atan2(delta[1], delta[0]) * 180 / Math.PI;
} catch(e) {
  value;
}`,
    tags: ['rotation', 'path', 'auto-orient', 'direction'],
    examples: [
      'Vehicle animations',
      'Character facing direction',
      'Arrow pointing along path'
    ],
    difficulty: 'Advanced',
    lastModified: '2024-01-11'
  },
  {
    id: '6',
    name: 'Text Counter with Formatting',
    category: 'Text',
    description: 'Creates animated number counter with comma formatting and decimal precision.',
    code: `// Animated counter with formatting
startValue = 0;
endValue = 1000000;
duration = 3; // Duration in seconds

currentValue = linear(time, inPoint, inPoint + duration, startValue, endValue);
Math.floor(currentValue).toLocaleString();`,
    tags: ['counter', 'numbers', 'formatting', 'animation'],
    examples: [
      'Statistics display',
      'Revenue counters',
      'Progress indicators'
    ],
    difficulty: 'Beginner',
    lastModified: '2024-01-10'
  },
  {
    id: '7',
    name: 'Random Shape Generation',
    category: 'Shape',
    description: 'Generates random polygon shapes with customizable complexity and smoothness.',
    code: `// Random polygon generator
seedRandom(1, true); // Use layer index as seed
numPoints = 8;
radius = 100;
centerX = thisComp.width / 2;
centerY = thisComp.height / 2;

points = [];
for (i = 0; i < numPoints; i++) {
  angle = (i / numPoints) * Math.PI * 2;
  r = radius * (0.7 + random() * 0.6); // Vary radius
  x = centerX + Math.cos(angle) * r;
  y = centerY + Math.sin(angle) * r;
  points.push([x, y]);
}

createPath(points, [], [], true);`,
    tags: ['random', 'polygon', 'procedural', 'shapes'],
    examples: [
      'Abstract backgrounds',
      'Organic shapes',
      'Procedural graphics'
    ],
    difficulty: 'Advanced',
    lastModified: '2024-01-09'
  },
  {
    id: '8',
    name: 'Time-Based Scale Pulse',
    category: 'Time',
    description: 'Creates rhythmic pulsing animation synchronized to composition timeline.',
    code: `// Rhythmic pulse based on time
bpm = 120; // Beats per minute
beatDuration = 60 / bpm;
beatTime = time % beatDuration;
normalizedBeat = beatTime / beatDuration;

// Create pulse curve
pulseStrength = 0.2;
baseScale = [100, 100];
pulse = Math.sin(normalizedBeat * Math.PI * 2) * pulseStrength;

baseScale * (1 + pulse);`,
    tags: ['time', 'rhythm', 'pulse', 'beat'],
    examples: [
      'Music visualization',
      'Rhythmic animations',
      'Beat-synced graphics'
    ],
    difficulty: 'Intermediate',
    lastModified: '2024-01-08'
  }
];