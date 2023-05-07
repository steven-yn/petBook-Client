import type { ChangeEventHandler, ReactNode } from "react";
import styled from "styled-components";

interface Props {
  placeholder: string;
  type?: string;
  name: string;
  iconType: string;
  Button?: ReactNode;
  onChange: ChangeEventHandler;
}

const Input = ({
  placeholder,
  type,
  iconType,
  Button,
  onChange,
  name,
}: Props) => {
  return (
    <InputBox>
      <IconBox>
        <div className={iconType} />
      </IconBox>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
      {Button || null}
    </InputBox>
  );
};

const IconBox = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
`;

const InputBox = styled.div`
  position: relative;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  button {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);

    height: 1rem;

    color: var(--primary);
    letter-spacing: -0.02em;
    line-height: 17px;
    font-weight: 500;
    font-size: 14px;

    text-decoration-line: underline;
    text-underline-offset: 3px;
    &:disabled {
      color: #c5c4bd;
    }
  }
`;

export default Input;
