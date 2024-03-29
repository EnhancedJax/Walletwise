/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // or 'media' or 'class
  mode: "jit",
  theme: {
    extend: {
      colors: {
        cbg: "#FAFAFA",
        cfg: "#FFF",
        cpg: "#001135",
        cpg2: "#818181",
        csub: "#C8C8C8",
        cbalneg: "#FF2E3E",
        cbalpos: "#35B661",
        cprimary: "#207BFF",
        dbg: "#242424",
        dfg: "#303030",
        dpg: "#FEFEFE",
        dpg2: "#818181",
        dsub: "#F2F2F2",
        dbalneg: "#FF2E3E",
        dbalpos: "#35B661",
        dprimary: "#207BFF",
      },
    },
    fontFamily: {
      il: ["InterLight"],
      ir: ["InterRegular"],
      im: ["InterMedium"],
      isb: ["InterSemiBold"],
      ib: ["InterBold"],
    },
    fontSize: {
      xs: "10px",
      sm: "13px",
      default: "15px",
      lg: "18px",
      xl: "20px",
      "2xl": "22px",
      "3xl": "48px",
    },
    borderRadius: {
      md: "30px",
      lg: "40px",
    },
  },
  plugins: [],
};

// (text|bg)-c(bg|fg|pg|pg2|sub|balneg|balpos|primary)
// $1-c$2 dark:$1-d$2
