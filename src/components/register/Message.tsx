import Check from "@components/common/icon/Check";
import styled from "styled-components";

export interface MessageProps {
  type: "success" | "error" | "";
  value: string;
}

const Message = ({ type, value }: MessageProps) => {
  return (
    <MessageBox type={type}>
      {value && (
        <>
          {type === "error" ? "*" : <Check />}
          <p>{value}</p>
        </>
      )}
    </MessageBox>
  );
};

const MessageBox = styled.div<{ type: MessageProps["type"] }>`
  display: flex;
  align-items: center;
  gap: 0.125rem;
  padding-left: 0.5rem;
  font-size: 0.875rem;
  line-height: 20px;
  color: ${({ type }) =>
    type === "" ? "#383835" : type === "success" ? "#2BC128" : "#FF6847"};
`;

export default Message;
