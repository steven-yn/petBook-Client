import QuillWrapper from "@components/common/Editor/QuillWrapper";
import useRecoilSelector from "@lib/hooks/common/useRecoilSelector";
import useSelectorState from "@lib/hooks/common/useSelectorState";
import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  PropsWithChildren,
  useRef,
  useState,
} from "react";
import ReactQuill from "react-quill";
import { useResource } from "@lib/hooks/common/useResource";

import localConsole from "@lib/utils/localConsole";
import {
  WriteEditorDiv,
  WriteTitleInput,
  WriteFormSection,
  WriteGuideDiv,
  GuideTopSpringDiv,
} from "./styled/WriteForm.style";
import writeState from "../../atoms/pageAtoms/community/writeState";
import { CATEGORY_LIST } from "@lib/queries/category";

const WriteForm = () => {
  return (
    <WriteFormSection>
      <WriteForm.Input />
      <WriteForm.Guide>
        <WriteForm.GuideTitle />
      </WriteForm.Guide>
      <WriteForm.Editor />
    </WriteFormSection>
  );
};

const Input = () => {
  const [{ inputTitle }, setWrite] = useSelectorState(writeState, {
    inputTitle: "",
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setWrite((write) => ({ ...write, inputTitle: e.target.value }));
  };

  return (
    <>
      <WriteTitleInput
        className="Write__Input default"
        placeholder="제목을 입력하세요"
        onChange={onChange}
        value={inputTitle}
      />
      {/* <Image src="/Icon.png" width={10} height={10} /> */}
    </>
  );
};

const Guide = React.memo(({ children }: PropsWithChildren<any>) => {
  // const user = useRecoilValue(userState);
  const divDummy = ["", "", "", ""];

  // localConsole?.log(user, "user");

  return (
    <WriteGuideDiv className="Write__Guide">
      {divDummy.map((elem, idx) => {
        return (
          <GuideTopSpringDiv
            key={idx}
            className={`Write__Guide__Spring__${idx}`}
          />
        );
      })}
      {children}
      <p className="Write__Guide__Content">
        {`
          내 소중한 동물의 자랑, 펫북에서 마음껏 해주세요! 무엇을 좋아하는지 어떤 특징이 있는지 등등 자세하게 들려주면 더 좋아요 :)
        `}
      </p>
    </WriteGuideDiv>
  );
});

Guide.displayName = "Guide";

const GuideTitle = () => {
  const { data, status } = useResource({
    key: CATEGORY_LIST.createKey(),
    fetcher: () => CATEGORY_LIST.fetcher(),
  });

  const categoryList = data?.data && status === "success" ? data?.data : [];

  const { selectedCategory } = useRecoilSelector(writeState, {
    selectedCategory: {
      idx: 0,
      name: "",
    },
  });

  // 초기값에 recoil 안엔 name 이 비어있는 문제가 있음
  const currentCategory = selectedCategory.name
    ? selectedCategory.name
    : categoryList[0]?.name
    ? categoryList[0]?.name
    : "";

  return (
    <h5 className="Write__Guide__Title">
      {currentCategory}
      &nbsp;잘쓰는 법!
    </h5>
  );
};

const Editor = () => {
  const [{ inputContent }, setWrite] = useSelectorState(writeState, {
    inputContent: "",
  });
  const editorRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(false);

  const pureText = inputContent.replace(
    /<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/gi,
    ""
  );

  const keyList = [
    "Backspace",
    "ArrowUp",
    "ArrowRight",
    "ArrowDown",
    "ArrowLeft",
    "Meta",
    "Alt",
    "Shift",
    "CapsLock",
    "Tab",
    "Escape",
  ];

  const onKeyPress: KeyboardEventHandler = (event) => {
    if (event.nativeEvent.isComposing) {
      event.preventDefault();
      event.stopPropagation();
      event.defaultPrevented = true;

      return false;
    }

    if (
      !keyList.includes(event.key) &&
      !keyList.includes(event.nativeEvent.key) &&
      pureText.length >= 500
    ) {
      // setReadOnly(true);
      event.preventDefault();
      event.stopPropagation();
      event.defaultPrevented = true;
      return false;
    }

    if (readOnly) {
      // setReadOnly(false);
    }
  };

  const onChange = (
    value: string,
    delta: any,
    source: any,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    if (pureText.length >= 500) {
      setWrite((write) => ({ ...write }));
      return "";
    }

    setWrite((write) => ({ ...write, inputContent: value }));
  };

  return (
    <WriteEditorDiv
      className="Write__Editor__Wrap"
      ref={editorRef}
      onKeyDown={onKeyPress}
      onKeyUp={onKeyPress}
      onKeyDownCapture={onKeyPress}
      onKeyUpCapture={onKeyPress}
      onKeyPress={onKeyPress}
      onKeyPressCapture={onKeyPress}
    >
      <QuillWrapper
        theme="snow"
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="내용을 입력하세요"
        value={inputContent}
        readOnly={readOnly}
      />
      {/* <WriteForm.Length pureText={pureText} /> */}
    </WriteEditorDiv>
  );
};

// const Length = ({ pureText }: { pureText: string }) => {
//   const MaxRef = useRef<HTMLSpanElement>(null);

//   if (
//     MaxRef.current &&
//     pureText.length >= 500 &&
//     MaxRef.current.style.color !== "#FF512B"
//   ) {
//     MaxRef.current.style.color = "#FF512B";
//   }

//   if (
//     MaxRef.current &&
//     pureText.length < 500 &&
//     MaxRef.current.style.color === "rgb(255, 81, 43)"
//   ) {
//     MaxRef.current.style.removeProperty("color");
//   }

//   return (
//     <WriteContentLengthP className="Editor__Content__Length">
//       <span className="Max__Length" ref={MaxRef}>
//         {/* {pureText.length >= 500 ? 500 : pureText.length} */}
//         {pureText.length}
//       </span>
//       /500
//     </WriteContentLengthP>
//   );
// };

WriteForm.Input = Input;
WriteForm.Guide = Guide;
WriteForm.GuideTitle = GuideTitle;
WriteForm.Editor = Editor;
// WriteForm.Length = Length;

export default WriteForm;