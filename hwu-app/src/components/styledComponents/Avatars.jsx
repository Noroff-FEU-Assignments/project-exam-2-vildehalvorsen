import styled from "styled-components";
import colors from "../../theme/colors";
import borders from "../../theme/borders";

const MainAvatar = styled.img`
  width: 170px;
  height: 170px;
  object-fit: cover;
  border-radius: ${borders.imageBorder};
  filter: drop-shadow(0 3px 4px ${colors.gray});
`;

const FollowerAvatar = styled.img`
  width: 25px;
  height: 25px;
  object-fit: cover;
  border-radius: ${borders.imageBorder};
`;

const PostAvatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: ${borders.imageBorder};
`;

const CommentAvatar = styled.img`
  width: 25px;
  height: 25px;
  object-fit: cover;
  border-radius: ${borders.imageBorder};
  margin-right: 5px;
`;

const ProfileListAvatar = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: ${borders.imageBorder};
`;

const XSmallAvatar = styled.img`
  width: 25px;
  height: 25px;
  object-fit: cover;
  border-radius: ${borders.imageBorder};
`;

const SmallAvatar = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: ${borders.imageBorder};
`;
const MediumAvatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: ${borders.imageBorder};
`;



export {
  MainAvatar,
  FollowerAvatar,
  PostAvatar,
  CommentAvatar,
  ProfileListAvatar,
  XSmallAvatar,
  SmallAvatar,
  MediumAvatar,
};
