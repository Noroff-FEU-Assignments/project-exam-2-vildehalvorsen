const brandFont = "gill-sans-nova, sans-serif";
const titleFont = "Segoe UI, sans-serif";
const bodyFont = "Segoe UI, sans-serif";
const buttonFont = "Menco, sans-serif";

const typography = {
heading: {
    h1: {
      fontFamily: brandFont,
      fontSize: "25px",
      fontWeight: "900",
    },
    h2: {
      fontFamily: titleFont,
      fontSize: "25px",
      fontWeight: "600",
    },
    h3: {
      fontFamily: titleFont,
      fontSize: "20px",
      fontWeight: "600",
    },
    h4: {
      fontFamily: titleFont,
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
    fontFamilyNormal: buttonFont,
  },
  links: {
    fontFamily: bodyFont,
    fontSize: "13px",
  }
};


export default typography;