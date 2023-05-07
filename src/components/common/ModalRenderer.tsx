import modalState from "@atoms/common/modalState";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const ModalRenderer = () => {
  const { Component, props } = useRecoilValue(modalState);
  useEffect(() => {
    if (Component) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [Component]);

  return Component ? <Component {...props} /> : null;
};

export default ModalRenderer;
