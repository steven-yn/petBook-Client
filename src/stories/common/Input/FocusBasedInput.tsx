import React, { PropsWithChildren } from "react";
import {
  FocusBasedAlginCenterLabel,
  FocusBasedBgSpan,
  FocusBasedInputElem,
} from "./FocusBasedInput.style";
import { CommonInputProps } from "./CommonInput";

export interface FocusBasedInputProps extends CommonInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bgUrl?: string;
  bgWidth?: string;
  bgHeight?: string;
}

const FocusBasedInput = (props: PropsWithChildren<FocusBasedInputProps>) => {
  const { children, bgUrl, bgWidth, bgHeight, value, onChange } = props;
  const inputProps = { ...props };
  delete inputProps.children;

  const onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (e.target.validity.valid) {
      e.target.classList.add("valid");
    } else {
      e.target.classList.add("invalid");
    }
  };

  const onFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    e.target.classList.remove("valid");
    e.target.classList.remove("invalid");
  };

  return (
    <FocusBasedAlginCenterLabel>
      {children}
      {bgUrl && (
        <FocusBasedBgSpan
          url={bgUrl || ""}
          width={bgWidth || "1rem"}
          height={bgHeight || "1rem"}
        />
      )}
      <FocusBasedInputElem
        {...inputProps}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        bgWidth={bgWidth}
      />
    </FocusBasedAlginCenterLabel>
  );
};

export default FocusBasedInput;
