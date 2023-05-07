import styled from "styled-components";

import { createRequest } from "@lib/hooks/common/useResource";
import { registerRequest } from "@lib/API/petBookAPI";

// reponse 정의
export const REGISTER_CREATE = createRequest({
  key: ["REGISTER_CREATE"],
  requester: registerRequest.register,
});

const RegisterFormWrap = styled.div`
  & > div {
    &:last-child {
      margin-bottom: 0;
    }
    &.flex {
      & > div {
        width: 50%;
        &:first-child {
          margin-right: 9px;
        }
      }
    }
  }
  .box {
    position: relative;
    label {
      position: absolute;
      top: 50%;
      left: 30px;
      opacity: 68%;
      color: #000000;
      transform: translateY(-50%);
    }
    input {
      padding-left: 140px;
      line-height: 30px;
      &::placeholder {
        color: #b7b7b7;
      }
    }
  }
  .err_box {
    margin-top: 4px;
    font-size: 15px;
    font-weight: 300;
    color: #ff6e4e;
    line-height: 30px;
  }
`;
