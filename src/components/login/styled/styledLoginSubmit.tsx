import styled from "styled-components";

const Submitbutton = styled.button`
  margin-top: 64px;
  width: 100%;
  font-weight: bold;
  font-size: 18px;
  color: white;
  line-height: 52px;
  border-radius: 8px;
  background-color: #ff6847;
`;
const ButtonBox = styled.div`
  margin-top: 42px;
  a {
    display: block;
    width: 100%;
    padding: 20px 0;
    margin-bottom: 12px;
    border-radius: 12px;
    text-align: center;
    font-weight: 700;
    font-size: 20px;
    color: white;
    box-sizing: border-box;
    &:last-child {
      margin-bottom: 0;
    }
    &.email {
      padding: 28px 0;
      margin-bottom: 60px;
      background-color: var(--primary);
    }
    &.naver {
      background-color: #41d97e;
    }
    &.kakao {
      background-color: #ffc700;
    }
    &.google {
      background-color: #7270ff;
    }
  }
`;
const Wrapper = styled.div`
  width: 100%;
`;

const PassGuide = styled.figure`
  margin-top: 20px;
  text-align: center;
  p {
    display: inline;
    font-size: 18px;
  }
  a {
    position: relative;
    display: inline-block;
    padding: 0 20px;
    font-size: 14px;
    color: #777774;
    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 12px;
      background-color: #e0dfd9;
    }
    &:last-child {
      color: #ff6847;
      &::after {
        display: none;
      }
    }
  }
`;

const InfoText = styled.p`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 4px;
  font-size: 0.875rem;
  color: red;
  line-height: 1.25rem;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.25rem;
`;

export { ButtonBox, Wrapper, PassGuide, Submitbutton, InfoText, FlexBox };
