/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Fira Sans", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      colors: {
        primary: "#F59E0B",
        secondary: "#FBBF24",
        cta: "#8B5CF6",
        background: "#0F172A",
        text: "#F8FAFC",
        cyan: {
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
        },
        blue: {
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
        }
      },
      animation: {
        float: "float 12s ease-in-out infinite",
        "float-delayed": "float-delayed 15s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-in-left": "slideInLeft 0.6s ease forwards",
        "slide-in-right": "slideInRight 0.6s ease forwards",
        "scale-in": "scaleIn 0.5s ease forwards",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "33%": { transform: "translate(-25px, -30px) rotate(5deg)" },
          "66%": { transform: "translate(20px, 15px) rotate(-5deg)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "33%": { transform: "translate(30px, 20px) rotate(-5deg)" },
          "66%": { transform: "translate(-20px, -25px) rotate(5deg)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
