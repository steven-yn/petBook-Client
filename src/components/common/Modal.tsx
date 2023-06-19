import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import OnClickOutside from "./OnClickOutside";

export type ModalProps = {
  handleClose: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  buttonText?: string;
};

export const Modal = ({
  children,
  handleClose,
  onCancel,
  onConfirm,
  buttonText,
}: PropsWithChildren<ModalProps>) => {
  return (
    <ModalContainer>
      <OnClickOutside trigger={handleClose}>
        <ModalItemWrap>
          {children}
          <div className="Button_Box">
            {onCancel && <button onClick={onCancel}>취소</button>}
            {onConfirm && (
              <button onClick={onConfirm} className="Primary">
                {buttonText}
              </button>
            )}
          </div>
        </ModalItemWrap>
      </OnClickOutside>
    </ModalContainer>
  );
};

export const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  background-color: rgba(86, 86, 83, 0.3);
`;

export const ModalItemWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 16px;

  text-align: center;
  background-color: var(--modal-bg);
  padding: 3rem 2rem 2.5rem;
  max-width: 464px;
  width: calc(100% - 1rem);
  .Button_Box {
    display: flex;
    gap: 0.5rem;
  }
`;

export default Modal;
