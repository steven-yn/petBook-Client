import React, { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import OnClickOutside from "@components/common/OnClickOutside";
import {
  ReviewBoxProps,
  ReviewProps,
} from "@lib/API/petBookAPI/types/hospitalRequest";
import { HOSPITAL_REVIEW_CREATE } from "@pages/hospitalmap";
import { useQueryClient } from "@tanstack/react-query";
import { reviewFormState } from "@atoms/pageAtoms/hospitalmap/reviewState";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSetResource } from "@lib/hooks/common/useResource";
import { PETDATA, REACTION } from "./_constants";
import useModal from "@lib/hooks/common/useModal";

import { IconBox, InputBox } from "@components/find/style/styledFindSubmit";
import {
  ReviewWarp,
  ReviewHeader,
  ReviewSelectChip,
  ReviewForm,
  ReviewFormReactionBtn,
  ReviewButtonWrap,
  ReviewAddButton,
  ReviewBoxItem,
} from "./styled";

import ReviewBox from "./ReviewBox";
import ActionsBtn from "./ActionsBtn";

interface IForm {
  hospitalId: number;
  content: string;
  disease: string;
  imageIds: undefined;
  experience: string;
  petName: string;
}

const HospitalReview = ({
  closeModal,
  hospitalId,
  hospitalName,
}: ReviewProps) => {
  const queryClient = useQueryClient();
  const [reviewForm, setreviewForm] = useRecoilState(reviewFormState);
  const [forms, setForms] = useState<IForm[]>([]);

  useEffect(() => {
    SetReviewDefaultObj();
    document.body.classList.add("dim");
    return () => {
      document.body.classList.remove("dim");
    };
  }, []);

  const SetReviewDefaultObj = () => {
    setreviewForm((oldEl) => [
      ...oldEl,
      {
        hospitalId,
        content: "",
        disease: "",
        imageIds: undefined,
        experience: "",
        petName: "",
      },
    ]);
  };

  const formAdd = () => {
    setForms((oldEl: IForm[]) => [
      ...oldEl,
      {
        hospitalId,
        content: "",
        disease: "",
        imageIds: undefined,
        experience: "",
        petName: "",
      },
    ]);
  };

  const AddReviewBox = () => {
    const check = CheckValidation("length");
    check ? formAdd() : alert("내 동물보다 더 많은 리뷰는 작성이 불가능합니다");
  };

  const RemoveReviewBox = (index: number) => {
    if (reviewForm.length === 0) return;
    const newArr = [...reviewForm];
    newArr.splice(index, 1);
    setreviewForm([...newArr]);
  };

  const CheckValidation = (type: string) => {
    switch (type) {
      case "length": {
        if (PETDATA.length <= reviewForm.length) {
          return false;
        } else {
          return true;
        }
      }
    }
  };

  function onInputChange(index: number, name: string, value: string) {
    const tempForms: IForm[] = [...forms];

    tempForms[index][name] = value;

    setForms(tempForms);
  }

  return (
    <OnClickOutside trigger={closeModal}>
      <ReviewWarp className="Review">
        <ReviewHeader>
          <p>{hospitalName}</p>
          <h3>리뷰 작성</h3>
          <ReviewAddButton onClick={AddReviewBox}>추가</ReviewAddButton>
        </ReviewHeader>
        <ReviewBoxItem>
          {forms?.map((item, index) => {
            return (
              <ReviewBox
                hospitalId={hospitalId}
                key={index}
                onInputChange={onInputChange}
                reviewIndex={index}
                removeBox={() => RemoveReviewBox(index)}
              />
            );
          })}
        </ReviewBoxItem>

        <ActionsBtn />
      </ReviewWarp>
    </OnClickOutside>
  );
};

export default HospitalReview;
