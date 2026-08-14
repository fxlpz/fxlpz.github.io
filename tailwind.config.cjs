import { join } from 'node:path';

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,svelte,vue}',
  ],
  theme: {
    extend: {
      colors: {
        // Accent ciano cibersegurança
        accent: '#00BFFF',
        'accent-dark': '#008CDC',
        // cores de estado
        danger: '#FF4F4F',
        success: '#22C55E',
        warning: '#F59E0B',
      },
      fontFamily: {
        mono: ['"Source Code Pro"', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 10px rgba(0, 191, 255, 0.4)',
      },
    },
  },
  plugins: [],
};