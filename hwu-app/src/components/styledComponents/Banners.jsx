import styled from "styled-components";
import colors from "../../theme/colors";
import typography from "../../theme/typography";
import device from "../../theme/device";

const BannerBackground = styled.div`
  height: 250px;
  width: 100%;
  background-color: ${colors.primary};
  border-radius: 0 0 65%;

  .bannerLogo {
    display: grid;
    grid-template-areas:
      "first second"
      "third third";
    grid-template-rows: 125px 125px;
    grid-template-columns: 1fr 1fr;

    p {
      font-family: ${typography.heading.h1.fontFamily};
      color: ${colors.white};
    }

    .line1 {
      grid-area: first;

      p {
        margin: 55px 0 0 15px;
        font-size: 40px;
      }
    }

    .line2 {
      grid-area: third;

      p {
        margin: -35px 0 0 50px;
        font-size: 45px;
      }
    }

    .line3 {
      grid-area: second;

      p {
        text-align: right;
        font-size: 30px;
        margin: 80px 20px 0 0;
      }
    }
  }
  @media (${device.mobileL}) {
    border-radius: 0 0 55%;

    .bannerLogo {
      max-width: 650px;
      margin: 0 auto;
      .line1 {
        p {
          margin: 55px 0 0 15%;
          font-size: 55px;
        }
      }

      .line2 {
        p {
          margin: -35px 0 0 15%;
          font-size: 65px;
        }
      }

      .line3 {
        p {
          margin: 70px 25% 0 0;
          font-size: 35px;
        }
      }
    }
  }

  @media (${device.tablet}) {
    height: 275px;
    border-radius: 0 0 45%;

    .bannerLogo {
      max-width: 900px;
      .line1 {
        p {
          margin: 30px 0 0 15%;
          font-size: 75px;
        }
      }

      .line2 {
        p {
          margin: -55px 0 0 15%;
          font-size: 105px;
        }
      }

      .line3 {
        p {
          margin: 50px 20% 0 0;
          font-size: 70px;
        }
      }
    }
  }

  @media (${device.laptop}) {
    height: 400px;
    border-radius: 0 0 35%;

    .bannerLogo {
      max-width: 1200px;
      .line1 {
        p {
          margin: 50px 0 0 15%;
          font-size: 110px;
        }
      }

      .line2 {
        p {
          margin: -10px 0 0 15%;
          font-size: 140px;
        }
      }

      .line3 {
        p {
          margin: 80px 20% 0 0;
          font-size: 90px;
        }
      }
    }
  }
`;

const ProfileBanner = styled.img`
  height: 250px;
  width: 100%;
  object-fit: cover;
  border-radius: 0 0 65%;
  background-color: ${colors.primary};

  @media (${device.mobileL}) {
    border-radius: 0 0 55%;
  }

  @media (${device.tablet}) {
    height: 275px;
    border-radius: 0 0 45%;
  }

  @media (${device.laptop}) {
    height: 400px;
    border-radius: 0 0 35%;
  }
`;

const FooterBanner = styled.footer`
  height: 250px;
  width: 100%;
  background-color: ${colors.primary};
  border-radius: 65% 0 0 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  color: ${colors.softPrimary};
  margin-top: 100px;
  margin-bottom: env(safe-area-inset-bottom);

  > p {
    margin: 10px 30px;
    text-align:right;
  }
`;

export { BannerBackground, ProfileBanner, FooterBanner };
