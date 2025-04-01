/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: [
          "Poppins",
          "-apple-system",
          "Roboto",
          "Helvetica",
          "sans-serif",
        ],
        inter: ["Inter", "-apple-system", "Roboto", "Helvetica", "sans-serif"],
      },
      colors: {
        primary: "rgba(21, 44, 91, 1)",
        accent: "rgba(50, 82, 223, 1)",
      },
      boxShadow: {
        md: "0px 0px 16px -1px rgba(0, 0, 0, 0.25)",
        lg: "0px 0px 18px 1px rgba(0, 0, 0, 0.25)",
      },
      zIndex: {
        100: "100",
      },
    },
  },
  plugins: [],
};
