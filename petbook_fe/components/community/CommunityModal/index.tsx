import useClickOutside from "@lib/hooks/common/useClickOutside";
import { useRef } from "react";
import { Container, ModalBox, ButtonBox } from "./styled";

interface Props {
  open: boolean;
  subTitle?: string;
  modalTitle: string;
  modalContent?: React.ReactNode;
  closeModal: () => void;
  clickCancelButton: () => void;
  clickConfirmButton: () => void;
}

const CommunityModal = ({
  open,
  subTitle,
  modalTitle,
  modalContent,
  closeModal,
  clickCancelButton,
  clickConfirmButton,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, closeModal);
  return open ? (
    <Container>
      <ModalBox ref={ref}>
        <p>{subTitle}</p>
        <h1>{modalTitle}</h1>
        {modalContent}
        <ButtonBox>
          <button type="button" onClick={clickCancelButton}>
            유지하기
          </button>
          <button type="button" onClick={clickConfirmButton}>
            삭제하기
          </button>
        </ButtonBox>
      </ModalBox>
    </Container>
  ) : null;
};

CommunityModal.defaultProps = {
  subTitle: "",
  modalContent: null,
};

export default CommunityModal;