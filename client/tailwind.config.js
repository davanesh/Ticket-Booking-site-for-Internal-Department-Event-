/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        night: "#05010d",
        neonPurple: "#a855f7",
        royalPurple: "#6d28d9",
        electricPink: "#ec4899"
      },
      boxShadow: {
        glow: "0 0 30px rgba(168, 85, 247, 0.35)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(168, 85, 247, 0.25)" },
          "50%": { boxShadow: "0 0 35px rgba(236, 72, 153, 0.35)" }
        }
      }
    }
  },
  plugins: []
};
