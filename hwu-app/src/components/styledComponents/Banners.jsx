import styled from "styled-components";
import colors from "../../theme/colors";
import typography from "../../theme/typography";

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
`;

const ProfileBanner = styled.img`
  height: 250px;
  width: 100%;
  object-fit: cover;
  border-radius: 0 0 65%;
  background-color: ${colors.primary};
`;

export { BannerBackground, ProfileBanner };
