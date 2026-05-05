/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7C3AED",
          50: "#F4EEFE",
          100: "#E5D6FC",
          200: "#CAAEF9",
          300: "#A77BF3",
          400: "#7C3AED",
          500: "#6B21D6",
          600: "#5616B0",
          700: "#3F0F87",
        },
        secondary: {
          DEFAULT: "#A78BFA",
          50: "#F4F0FE",
          100: "#E8DFFD",
          200: "#D2BFFB",
          300: "#A78BFA",
          400: "#8B6CF5",
          500: "#6D4DE3",
          600: "#523BB6",
          700: "#3D2B85",
        },
        accent: {
          DEFAULT: "#DC2626",
          50: "#FBE9E9",
          100: "#F6CACA",
          200: "#EF9494",
          300: "#E55E5E",
          400: "#DC2626",
          500: "#B91C1C",
          600: "#911414",
          700: "#5F0D0D",
        },
        ink: {
          DEFAULT: "#1A0F2E",
          soft: "#2D2244",
          muted: "#6B5F87",
          subtle: "#9C92B5",
        },
        cream: {
          DEFAULT: "#F5F1EB",
          50: "#FBF9F5",
          100: "#F5F1EB",
          200: "#EDE5DA",
          300: "#DDD0BF",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        body: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(26, 15, 46, 0.18), 0 4px 12px -4px rgba(26, 15, 46, 0.08)",
        "soft-lg": "0 25px 50px -16px rgba(26, 15, 46, 0.25), 0 10px 20px -8px rgba(26, 15, 46, 0.12)",
        "soft-xl": "0 40px 80px -20px rgba(26, 15, 46, 0.32), 0 20px 40px -12px rgba(26, 15, 46, 0.16)",
        inner3d: "inset 4px 4px 12px rgba(124, 58, 237, 0.14), inset -4px -4px 12px rgba(255, 255, 255, 0.7)",
        glow: "0 0 40px rgba(220, 38, 38, 0.4)",
        "glow-primary": "0 0 60px rgba(124, 58, 237, 0.45)",
      },
      backgroundImage: {
        "soft-radial": "radial-gradient(circle at 25% 15%, #EDE5DA 0%, #F5F1EB 50%, #FBF9F5 100%)",
        "luxury-fade": "linear-gradient(135deg, rgba(124, 58, 237, 0.07) 0%, rgba(167, 139, 250, 0.05) 50%, rgba(220, 38, 38, 0.05) 100%)",
        grain: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 6s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "gradient-x": "gradientX 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.16, 1, 0.3, 1)",
        soft: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      perspective: {
        500: "500px",
        1000: "1000px",
        1500: "1500px",
        2000: "2000px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".perspective-1000": { perspective: "1000px" },
        ".perspective-1500": { perspective: "1500px" },
        ".preserve-3d": { transformStyle: "preserve-3d" },
        ".backface-hidden": { backfaceVisibility: "hidden" },
        ".no-cursor": { cursor: "none" },
      });
    },
  ],
};
