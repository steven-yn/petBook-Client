import { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";
import { registerFormState } from "@atoms/pageAtoms/register";

import styled from "styled-components";
import useModal from "@lib/hooks/common/useModal";
import ArgreeModal from "./AgreeModal";

const ARGREE_CONTENT = [
  {
    id: 0,
    text: "펫북 이용 약관에 동의합니다 [필수]",
  },
  {
    id: 1,
    text: "개인정보 수집 및 이용에 동의합니다 [필수]",
  },
];

const RegisterAgree = () => {
  const setRegisterForm = useSetRecoilState(registerFormState);
  const [agree, setAgree] = useState([false, false]);
  const { openModal, closeModal } = useModal();

  const openAgreeModal = (id: number) => {
    if (agree[id]) {
      setAgree((state) =>
        state.map((elem, index) => (index === id ? false : elem))
      );
    } else {
      openModal(ArgreeModal, {
        handleClose: closeModal,
        index: id,
        onConfirm: () => {
          setAgree((state) =>
            state.map((elem, index) => (index === id ? true : elem))
          );
          closeModal();
        },
      });
    }
  };

  useEffect(() => {
    setRegisterForm((el) => ({
      ...el,
      agree: agree.every((el) => el) ? true : false,
    }));
  }, [agree]);

  return (
    <RegisterAgreeBox>
      {ARGREE_CONTENT.map((agreeEl) => (
        <label key={agreeEl.id}>
          <input
            key={agreeEl.id}
            onChange={() => openAgreeModal(agreeEl.id)}
            checked={agree[agreeEl.id]}
            type="checkbox"
            className="default"
          />
          <p>{agreeEl.text}</p>
        </label>
      ))}
    </RegisterAgreeBox>
  );
};

const RegisterAgreeBox = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  label {
    cursor: pointer;
  }
`;

export default RegisterAgree;
