import layoutCalculator from "@lib/utils/layoutCalculator";
import styled, { CSSProperties, css } from "styled-components";

export const BackgroundImageCommon = css`
  position: relative;

  image-rendering: -webkit-optimize-contrast;
  transform: translateZ(0);
  backface-visibility: hidden;
`;

export const BackgroundImageAttr = css`
  ${BackgroundImageCommon}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const BackgroundImageSpan = styled.span<{
  url: string;
  width: string;
  height: string;
  display?: CSSProperties["display"];
  bgPosition?: CSSProperties["backgroundPosition"];
}>`
  ${BackgroundImageCommon}
  display: ${(props) => (props.display ? props.display : "inline-block")};

  width: ${(props) => layoutCalculator(props.width)};
  height: ${(props) => layoutCalculator(props.height)};

  background-image: url(${(props) => props.url});
  background-size: ${(props) =>
    `${layoutCalculator(props.width)} ${layoutCalculator(props.height)}`};
  background-position: ${(props) =>
    props.bgPosition ? props.bgPosition : "center"};
`;

export const BackgroundImageButton = styled.button<{
  url: string;
  width: string;
  height: string;
  display?: CSSProperties["display"];
  bgPosition?: CSSProperties["backgroundPosition"];
}>`
  ${BackgroundImageCommon}
  display: ${(props) => (props.display ? props.display : "inline-block")};

  width: ${(props) => props.width};
  height: ${(props) => props.height};

  background-image: url(${(props) => props.url});
  background-size: ${(props) => `${props.width} ${props.height}`};
  background-position: ${(props) =>
    props.bgPosition ? props.bgPosition : "center"};
`;

export interface BackgroundImageProps {
  url: string;
  width: string;
  height: string;
  display?: CSSProperties["display"];
  bgPosition?: CSSProperties["backgroundPosition"];
}
export const BackgroundImageInput = styled.input<BackgroundImageProps>`
  ${BackgroundImageCommon}
  display: ${(props) => (props.display ? props.display : "inline-block")};

  width: ${(props) => props.width};
  height: ${(props) => props.height};

  background-image: url(${(props) => props.url});
  background-size: ${(props) => `${props.width} ${props.height}`};
  background-position: ${(props) =>
    props.bgPosition ? props.bgPosition : "center"};
`;

export const BackgroundImageA = styled.a<{
  url: string;
  width: string;
  height: string;
  display?: CSSProperties["display"];
  bgPosition?: CSSProperties["backgroundPosition"];
}>`
  ${BackgroundImageCommon}
  display: ${(props) => (props.display ? props.display : "inline-block")};

  width: ${(props) => props.width};
  height: ${(props) => props.height};

  background-image: url(${(props) => props.url});
  background-size: ${(props) => `${props.width} ${props.height}`};
  background-position: ${(props) =>
    props.bgPosition ? props.bgPosition : "center"};
`;

export const BackgroundImageDiv = styled.div<{
  url: string;
  width: string;
  height: string;
  display?: CSSProperties["display"];

  bgPosition?: CSSProperties["backgroundPosition"];
}>`
  ${BackgroundImageCommon}
  display: ${(props) => (props.display ? props.display : "block")};

  width: ${(props) => props.width};
  height: ${(props) => props.height};

  background-image: url(${(props) => props.url});
  background-size: ${(props) => `${props.width} ${props.height}`};
  background-position: ${(props) =>
    props.bgPosition ? props.bgPosition : "center"};
`;
