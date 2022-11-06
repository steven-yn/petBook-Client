import { Button } from "@components/common/Button/Button";
import styled from "styled-components";

const WriteHashTagsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;

  width: 100%;
  height: 103px;

  margin-top: 54px;
`;

const HashTagTitleP = styled.p`
  font-weight: bold;
`;

const WriteHashDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  width: 100%;
  max-width: 1064px;
  height: 70px;

  padding: 12px 15px;

  background-color: #ffffff;

  border: 1px solid #f5edde;
  border-radius: 12px;
  box-sizing: border-box;

  /* transition: all 0.15s ease-in-out; */

  &.Error {
    animation: errorShake 0.1s 3;
  }

  @keyframes errorShake {
    50% {
      transform: translate3d(-3px, 0, 0);
    }
    100% {
      transform: translate3d(3px, 0, 0);
    }
  }
`;

const HashInput = styled.input`
  position: relative;
  left: -12px;

  width: 100%;

  padding: 12px 15px;

  border: none;
  border-radius: 12px;

  &::placeholder {
    pointer-events: none;

    color: #999999;
  }

  &:focus {
    outline: none;
  }
`;

const RoundHashTagButton = styled(Button)`
  padding: 8px 14px 9px;

  border-radius: 18px;
  background-color: #fff4e0;

  white-space: nowrap;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;
export {
  WriteHashTagsSection,
  WriteHashDiv,
  HashTagTitleP,
  HashInput,
  RoundHashTagButton,
};
