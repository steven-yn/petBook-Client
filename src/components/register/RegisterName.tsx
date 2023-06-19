import { ChangeEventHandler, useRef, useState } from "react";
import {
  checkedNicknameState,
  registerFormState,
} from "@atoms/pageAtoms/register";
import Input from "@components/common/Input";
import { useSetRecoilState } from "recoil";
import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "@lib/API/petBookAPI";
import Message, { MessageProps } from "./Message";

const RegisterName = () => {
  const setRegisterForm = useSetRecoilState(registerFormState);
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setRegisterForm((el) => ({ ...el, [e.target.name]: e.target.value }));
  };
  return (
    <div>
      <Input
        iconType="Name"
        name="name"
        onChange={onChange}
        placeholder="가입자 이름"
      />
      <NicknameInput />
    </div>
  );
};

const NicknameInput = () => {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState<MessageProps>({
    type: "",
    value: "",
  });
  const checkedNickname = useRef("");
  const setCheckedNickname = useSetRecoilState(checkedNicknameState);
  const setRegisterForm = useSetRecoilState(registerFormState);
  const { mutate } = useMutation({
    mutationFn: registerRequest.checkNickname,
    onSuccess: ({ data }) => {
      if (!data.nicknameExist) {
        checkedNickname.current = nickname;
        setCheckedNickname({ nickname });
        setMessage({
          type: "success",
          value: "사용 가능한 닉네임입니다.",
        });
      } else {
        checkedNickname.current = "";
        setCheckedNickname({ nickname: "" });
        setMessage({
          type: "error",
          value: "중복된 닉네임입니다.",
        });
      }
    },
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setRegisterForm((state) => ({ ...state, nickname }));
    setNickname(e.target.value);
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (nickname === "") {
      setMessage({
        type: "error",
        value: "닉네임을 입력해주세요",
      });
      return;
    }
    if (nickname.length < 3) {
      setMessage({
        type: "error",
        value: "닉네임은 세글자 이상 입력해주세요",
      });
      return;
    }
    mutate({ params: { nickname } });
  };

  return (
    <>
      <Input
        iconType="Nickname"
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        Button={
          <button
            type="button"
            onClick={onClick}
            disabled={nickname === checkedNickname.current}
          >
            중복확인
          </button>
        }
      />
      <Message type={message.type} value={message.value} />
    </>
  );
};

export default RegisterName;
