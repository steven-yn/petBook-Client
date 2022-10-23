import { useRef } from "react";
import styled, { css } from "styled-components";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import useButtonOffset from "./useButtonOffset";
import useCurrentPage from "./useCurrentPage";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  margin-top: 53px;
`;

const selectedStyle = css`
  border-radius: 50%;
  background-color: #000;
  font-weight: 700;
  color: #fff;
`;

const Button = styled.button<{ selected: boolean }>`
  ${({ selected }) => selected && selectedStyle};
  display: flex;
  justify-content: center;
  align-items: center;

  width: 22px;
  height: 22px;

  font-size: 16px;
`;

interface Props {
  numPages: number;
}

const PaginationButton = ({ numPages }: Props) => {
  const { currentPage, changeCurrentPage } = useCurrentPage(numPages);
  const btnNum = useRef(10);
  const offset = useButtonOffset({ btnNum: btnNum.current, currentPage });
  const onClickPrev = () => {
    changeCurrentPage(offset - btnNum.current);
  };
  const onClickNext = () => {
    changeCurrentPage(offset + btnNum.current);
  };
  return (
    <Wrapper>
      {offset !== 1 && (
        <button onClick={onClickPrev} type="button">
          <FiChevronLeft />
        </button>
      )}
      {Array(numPages + 1)
        .fill(1)
        .slice(offset, btnNum.current + offset)
        .map((_, i) => (
          <Button
            // eslint-disable-next-line react/no-array-index-key
            key={i + offset}
            onClick={() => changeCurrentPage(i + offset)}
            selected={currentPage === offset + i}
          >
            {i + offset}
          </Button>
        ))}
      {btnNum.current + offset < numPages && (
        <button onClick={onClickNext} type="button">
          <FiChevronRight />
        </button>
      )}
    </Wrapper>
  );
};

export default PaginationButton;
