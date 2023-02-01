import Link from "next/link";
import styled from "styled-components";

export const HeaderBox = styled.header`
  position: fixed;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  width: 100%;

  border-bottom: 1px solid #e0dfd9;
  background-color: var(--bg_white_02);
`;

export const HeaderDiv = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: auto 1fr auto;
  grid-column-gap: 1.8047vw;
  align-items: flex-end;

  width: 100%;
  max-width: 67.5vw;

  padding-top: 34px;
`;

export const HeaderLogoLink = styled(Link)`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  column-gap: 1.0417vw;

  padding: 15px 1.0417vw;
`;

export const HeaderPersonalDiv = styled.div`
  padding: 15px 1.0417vw;

  white-space: nowrap;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5rem;
  letter-spacing: -0.02em;
  color: #383835;
`;