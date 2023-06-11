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
    mobileSize: "13px",
    tabletSize: "15px",
    laptopSize: "15px",
  },
  
  button: {
    fontFamilyNormal: buttonFont,
    mobileSize: "13px",
    tabletSize: "15px",
    laptopSize: "15px",
  },
  links: {
    fontFamily: bodyFont,
    mobileSize: "13px",
    tabletSize: "13px",
    laptopSize: "15px",
  }
};


export default typography;