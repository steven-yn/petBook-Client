import React, { useEffect } from "react";
import OnClickOutside from "@components/common/OnClickOutside";
import { ReviewProps } from "@lib/API/petBookAPI/types/hospitalRequest";
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
import ImgWrap from "./ImgWrap";

const HospitalReview = ({
  closeModal,
  hospitalId,
  hospitalName,
}: ReviewProps) => {
  const queryClient = useQueryClient();
  const [reviewForm, setReviewForm] = useRecoilState(reviewFormState);

  useEffect(() => {
    SetReviewDefaultObj();
    document.body.classList.add("dim");
    return () => {
      document.body.classList.remove("dim");
    };
  }, []);

  const SetReviewDefaultObj = () => {
    setReviewForm((oldEl) => [
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
    setReviewForm([...newArr]);
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

  const onChange = (e?: any, reviewIndex?: number, name?: string) => {
    const valuedd = JSON.parse(JSON.stringify(reviewForm));
    valuedd[reviewIndex === undefined ? 0 : reviewIndex][
      name === undefined ? "" : name
    ] = e.target.value;
    setReviewForm([...valuedd]);
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
          {reviewForm?.map((item, idx) => {
            return (
              <section key={"id" + idx}>
                <ReviewSelectChip>
                  <h4>진료받은 내 동물</h4>
                  {idx !== 0 && (
                    <button onClick={() => RemoveReviewBox(idx)}>삭제</button>
                  )}
                  <section>
                    {PETDATA.map(
                      (item: { title: string; img: string }, index) => {
                        const id = String(index);
                        return (
                          <article key={id}>
                            <label htmlFor={idx + id}>
                              <input
                                type="radio"
                                name={idx + "pet"}
                                data-type="petName"
                                id={idx + id}
                                value={item.title}
                                onChange={(e) => onChange(e, idx, "petName")}
                              />
                              <div className="Img">{item.img}</div>
                              <h5>{item.title}</h5>
                            </label>
                          </article>
                        );
                      }
                    )}
                  </section>
                </ReviewSelectChip>
                <ReviewForm>
                  <p>병원진료는 전반적으로</p>
                  <ReviewButtonWrap>
                    {REACTION.map((reaction, index) => {
                      const id = String(index);
                      const keyV = reaction.value + idx + index + "reaction";
                      return (
                        <ReviewFormReactionBtn key={index} htmlFor={keyV}>
                          {idx}
                          <input
                            className="default"
                            type="radio"
                            name={idx + "reaction"}
                            data-type="experience"
                            id={keyV}
                            value={reaction.value === "N" ? "BAD" : "GOOD"}
                            onChange={(e) => onChange(e, idx, "experience")}
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

                  <form action="">
                    <InputBox>
                      <IconBox>
                        <div className="Pencil" />
                      </IconBox>
                      <input
                        value={item.content}
                        onChange={(e) => onChange(e, idx, "content")}
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
                        value={item.disease}
                        onChange={(e) => onChange(e, idx, "disease")}
                        data-type="disease"
                        cols={30}
                        rows={10}
                        placeholder="병원에서 느낀 점을 자유롭게 작성해주세요."
                      />
                    </InputBox>
                    <HospitalReview.ImgWrap />
                  </form>
                </ReviewForm>
              </section>
            );
          })}
        </ReviewBoxItem>
        <HospitalReview.ActionBtn />
      </ReviewWarp>
    </OnClickOutside>
  );
};

const ActionBtn = () => {
  const { data, mutate, status } = useSetResource(HOSPITAL_REVIEW_CREATE);
  const reviewForm = useRecoilValue(reviewFormState);
  const { closeModal } = useModal();
  const onSubmit = () => {
    mutate(reviewForm);
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

HospitalReview.ImgWrap = ImgWrap;
HospitalReview.ActionBtn = ActionBtn;
export default HospitalReview;
