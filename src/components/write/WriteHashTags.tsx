import writeState from "@atoms/pageAtoms/community/writeState";
import hashTagKeydown from "@lib/handler/hashTagKeydown";
import useRecoilSelector from "@lib/hooks/common/useRecoilSelector";
import useSetHashTag from "@lib/hooks/write/useSetHashTag";
import React, {
  FocusEventHandler,
  KeyboardEventHandler,
  PropsWithChildren,
  useRef,
  useState,
} from "react";
import { BubblyTip, BubblyTipHandler, useBubblyTip } from "react-bubblytip";

import {
  HashInput,
  HashTagTitleP,
  RoundHashTagButton,
  WriteHashDiv,
  WriteHashTagsSection,
} from "./styled/WriteHashTags.style";
import "react-bubblytip/lib/bubblytip.css";
import Button from "@/stories/common/Button";

// TODO : 최대 5개 구현, 요소가 HashTagBox 넘어가지 않도록 구현
const WriteHashTags = () => {
  const [isError, setIsError] = useState(false);
  const [isView, msgPush] = useBubblyTip({
    timeout: 3000,
  });

  return (
    <WriteHashTagsSection>
      <WriteHashTags.Title isView={isView} />
      <WriteHashTags.TagBox isError={isError} setIsError={setIsError}>
        <WriteHashTags.List />
        <WriteHashTags.Input setIsError={setIsError} msgPush={msgPush} />
      </WriteHashTags.TagBox>
    </WriteHashTagsSection>
  );
};

const Title = React.memo(({ isView }: { isView: boolean }) => {
  return (
    <HashTagTitleP className="Hash__Tag__Title">
      # 해시태그를 달아주세요
      <BubblyTip push={isView} marginLeft={12}>
        해시태그가 많을수록 다른 유저한테 더 잘 보여요!
      </BubblyTip>
    </HashTagTitleP>
  );
});

Title.displayName = "Title";

interface TagBoxProps {
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const TagBox = React.memo(
  ({ children, isError, setIsError }: PropsWithChildren<TagBoxProps>) => {
    const tagBoxRef = useRef<HTMLDivElement>(null);

    const onFocus: FocusEventHandler<HTMLDivElement> = (e) => {
      e.currentTarget.style.outline = "solid 1px var(--primary)";
    };

    const onBlur: FocusEventHandler<HTMLDivElement> = (e) => {
      e.currentTarget.style.removeProperty("outline");
    };

    return (
      <WriteHashDiv
        className={`Hash__Tag__Div ${isError ? "Error" : ""}`}
        ref={tagBoxRef}
        onAnimationEnd={() => {
          setIsError(false);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {children}
      </WriteHashDiv>
    );
  }
);

TagBox.displayName = "TagBox";

const List = React.memo(() => {
  const { inputHash } = useRecoilSelector(writeState, {
    inputHash: [] as string[],
  });

  return (
    <>
      {inputHash.map((hashTag) => {
        return <WriteHashTags.Item key={hashTag} hashTag={hashTag} />;
      })}
    </>
  );
});

List.displayName = "List";

const Item = React.memo(({ hashTag }: { hashTag: string }) => {
  const { removeTag } = useSetHashTag();

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    removeTag(hashTag);
  };

  return (
    <Button
      variant="small"
      bgColor="var(--bg_white_02)"
      color="var(--black_03)"
      onClick={onClick}
    >
      #{hashTag}
    </Button>
  );
});

Item.displayName = "Item";

interface InputProps {
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  msgPush: (callback: BubblyTipHandler) => void;
}

const Input = React.memo(({ setIsError, msgPush }: InputProps) => {
  const { setTags } = useSetHashTag(setIsError);
  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const { done } = hashTagKeydown(e, setTags, setIsError);

    if (done) {
      e.currentTarget.value = "";
    }
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    // const { done } = hashTagBlur(e, setTags, setIsError);
    e.currentTarget.value = "";

    // if (done) {
    // e.currentTarget.value = "";
    // }
  };

  const onClick = () => {
    msgPush((push) => !push);
  };

  return (
    <HashInput
      className="default"
      placeholder="#해시태그 입력"
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onClick={onClick}
    />
  );
});

Input.displayName = "Input";

WriteHashTags.Title = Title;
WriteHashTags.TagBox = TagBox;
WriteHashTags.Input = Input;
WriteHashTags.List = List;
WriteHashTags.Item = Item;

export default WriteHashTags;
