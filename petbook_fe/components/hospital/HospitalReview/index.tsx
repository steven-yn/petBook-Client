import React, { useEffect } from "react";
import OnClickOutside from "@components/common/OnClickOutside";
import {
  ReviewBoxProps,
  ReviewProps,
} from "@lib/API/petBookAPI/types/hospitalRequest";
import { HOSPITAL_REVIEW_CREATE } from "@pages/hospitalmap";
import { useQueryClient } from "@tanstack/react-query";
import { reviewFormState } from "@atoms/pageAtoms/hospitalmap/reviewState";
import { useRecoilState } from "recoil";
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
import ImgWrap from "./ImgWrap";

const HospitalReview = ({
  closeModal,
  hospitalId,
  hospitalName,
}: ReviewProps) => {
  const queryClient = useQueryClient();
  const [reviewForm, setreviewForm] = useRecoilState(reviewFormState);

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

  const AddReviewBox = () => {
    const check = CheckValidation("length");
    check
      ? SetReviewDefaultObj()
      : alert("내 동물보다 더 많은 리뷰는 작성이 불가능합니다");
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

  return (
    <OnClickOutside trigger={closeModal}>
      <ReviewWarp className="Review">
        <ReviewHeader>
          <p>{hospitalName}</p>
          <h3>리뷰 작성</h3>
          <ReviewAddButton onClick={AddReviewBox}>추가</ReviewAddButton>
        </ReviewHeader>
        <ReviewBoxItem>
          {reviewForm?.map((item, index) => {
            return (
              <HospitalReviewBox
                hospitalId={hospitalId}
                key={index}
                reviewIndex={index}
                removeBox={() => RemoveReviewBox(index)}
              />
            );
          })}
        </ReviewBoxItem>
        <HospitalReview.ActionBtn />
      </ReviewWarp>
    </OnClickOutside>
  );
};

const HospitalReviewBox = ({
  hospitalId,
  reviewIndex,
  removeBox,
}: ReviewBoxProps) => {
  const [reviewForm, setReviewForm] = useRecoilState(reviewFormState);

  const onChange = (e?: any, reviewIndex?: number) => {
    const name: string = e.target.attributes["data-type"].nodeValue;
    setReviewForm(
      reviewForm.map((item, index) => {
        return index === reviewIndex
          ? { ...item, hospitalId: hospitalId, [`${name}`]: e.target.value }
          : item;
      })
    );
  };

  useEffect(() => {
    console.log(reviewForm[reviewIndex].content);
  }, [reviewForm]);

  return (
    <section>
      <HospitalReview.PetBox
        reviewIndex={reviewIndex}
        removeBox={removeBox}
        onChange={onChange}
      />
      <ReviewForm>
        <HospitalReview.ReactionBox onChange={onChange} />
        <HospitalReview.ContentForm onChange={onChange} />
      </ReviewForm>
    </section>
  );
};

const ActionBtn = () => {
  const { data, mutate, status } = useSetResource(HOSPITAL_REVIEW_CREATE);
  const { closeModal } = useModal();
  const onSubmit = () => {
    console.log("submit");
  };

  useEffect(() => {
    if (data === undefined) return;
    alert("리뷰등록완료");
    closeModal();
  }, [data]);

  return (
    <ReviewButtonWrap>
      <button type="button" value="cancel" onClick={closeModal}>
        취소
      </button>
      <button type="button" value="submit" onClick={onSubmit}>
        작성완료
      </button>
    </ReviewButtonWrap>
  );
};

const PetBox = ({
  reviewIndex,
  removeBox,
  onChange,
}: {
  reviewIndex: number;
  removeBox: () => void;
  onChange: () => void;
}) => {
  return (
    <ReviewSelectChip>
      <h4>진료받은 내 동물</h4>
      {reviewIndex !== 0 && <button onClick={removeBox}>삭제</button>}
      <section>
        {PETDATA.map((item: { title: string; img: string }, index) => {
          const id = String(index);
          return (
            <article key={id}>
              <label htmlFor={id}>
                <input
                  type="radio"
                  name="pet"
                  data-type="petName"
                  id={id}
                  onChange={() => onChange}
                />
                <div className="Img">{item.img}</div>
                <h5>{item.title}</h5>
              </label>
            </article>
          );
        })}
      </section>
    </ReviewSelectChip>
  );
};

const ReactionBox = ({ onChange }: { onChange: () => void }) => {
  return (
    <>
      <p>병원진료는 전반적으로</p>
      <ReviewButtonWrap>
        {REACTION.map((reaction) => {
          return (
            <ReviewFormReactionBtn
              key={reaction.value}
              htmlFor={reaction.value}
            >
              <input
                className="default"
                type="radio"
                name="reaction"
                data-type="experience"
                id={reaction.value}
                onChange={onChange}
                value={reaction.value === "Y" ? "GOOD" : "BAD"}
              />
              <p>
                {reaction.value === "Y" ? (
                  <span className="Happy" />
                ) : (
                  <span className="Frown" />
                )}
                <span>{reaction.title}</span>
              </p>
            </ReviewFormReactionBtn>
          );
        })}
      </ReviewButtonWrap>
    </>
  );
};

const ContentForm = ({ onChange }: { onChange: () => void }) => {
  return (
    <>
      <form action="">
        <InputBox>
          <IconBox>
            <div className="Pencil" />
          </IconBox>
          <input
            onChange={onChange}
            data-type="content"
            type="text"
            placeholder="어떤 증상으로 병원에 방문하셨나요?"
          />
        </InputBox>
        <InputBox>
          <IconBox>
            <div className="Medical" />
          </IconBox>
          <textarea
            onChange={onChange}
            data-type="disease"
            cols={30}
            rows={10}
            placeholder="병원에서 느낀 점을 자유롭게 작성해주세요."
          />
        </InputBox>
        <HospitalReview.ImgWrap />
      </form>
    </>
  );
};

HospitalReview.ImgWrap = ImgWrap;
HospitalReview.ReactionBox = ReactionBox;
HospitalReview.PetBox = PetBox;
HospitalReview.ContentForm = ContentForm;
HospitalReview.ActionBtn = ActionBtn;

export default HospitalReview;
