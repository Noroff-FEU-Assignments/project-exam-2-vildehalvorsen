const brandFont = "gill-sans-nova, sans-serif";
const titleFont = "Menco, sans-serif";
const bodyFont = "Segoe UI, sans-serif";

const typography = {
heading: {
    h1: {
      fontFamily: brandFont,
      fontSize: "25px",
      fontWeight: "900",
    },
    h2: {
      fontFamily: bodyFont,
      fontSize: "25px",
      fontWeight: "600",
    },
    h3: {
      fontFamily: bodyFont,
      fontSize: "20px",
      fontWeight: "600",
    },
    h4: {
      fontFamily: bodyFont,
      fontSize: "15px",
      fontWeight: "600",
    },
    logo: {
      fontFamily: brandFont,
      fontSize: "50px",
    }
  },
  body: {
    fontFamily: bodyFont,
    xsmall: "13px",
    small: "15px",
    medium: "17px",
    large: "18px",
  },
  
  button: {
    fontFamilyBold: brandFont,
    fontFamilyNormal: titleFont,
  },
  links: {
    fontFamily: bodyFont,
    fontSize: "13px",
  }
};


export default typography;