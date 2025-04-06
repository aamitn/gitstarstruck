// tailwind.config.ts
export default {
  theme: {
    extend: {
      animation: {
        scroll: 'scrollTicker linear infinite',
      },
      keyframes: {
        scrollTicker: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
};
