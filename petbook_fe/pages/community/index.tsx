import { NextPage } from "next";
import React from "react";
import styled from "styled-components";
import { articleRequest, categorySprRequest } from "@lib/API/petBookAPI";
import CommunityBanner from "@components/community/CommunityBanner";
import WriteButton from "@components/community/WriteButton";
import { createResource } from "@lib/hooks/common/useResource";
import CommunitySection from "@components/community/CommunitySection";
import HotArticleList from "@components/community/HotArticleList";
import CategoryNav from "@components/community/CategoryNav";
import ArticleBoxGrid from "@components/community/ArticleBoxGrid";
import QuestionList from "@components/community/QnaArticleList";
import { CategoryItem } from "@lib/API/petBookAPI/types/categoryRequestSpr";

const ARTICLE_LIST = createResource({
  key: "ARTICLE_LIST",
  fetcher: articleRequest.article_list
});

export const CATEGORY_LIST = createResource({
  key: "CATEGORY_LIST",
  fetcher: categorySprRequest.category_list,
});

export const createArticleListResource = (category: CategoryItem) => ({
  key: `${ARTICLE_LIST.key}_${category.name}`,
  fetcher: () => ARTICLE_LIST.fetcher({ categoryId: category.id === 0 ? "" : category.id, page: 0, size: 5 }),
});

const Main = styled.main`
  width: 90vw;
  max-width: 1260px;
  margin: 0 auto;
  padding-top: 52px;
  margin-bottom: 100px;
`;

const Community: NextPage = () => {
  return (
    <Main>
      <CommunityBanner />
      <CommunitySection title="지금 당신의 답변을 기다리고 있어요" more>
        <QuestionList />
      </CommunitySection>
      <CommunitySection title="이번주 hot 인기글" more>
        <HotArticleList />
      </CommunitySection>
      <CommunitySection title="실시간 live talk">
        <CategoryNav />
        <ArticleBoxGrid />
      </CommunitySection>
      <WriteButton />
    </Main>
  );
};

type PetbookPages = NextPage & {
  requiredResources?: [typeof CATEGORY_LIST];
};

const CommunityIndex: PetbookPages = Community;
CommunityIndex.requiredResources = [CATEGORY_LIST];

CommunityIndex.getInitialProps = async () => {
  const { data } = await CATEGORY_LIST.fetcher();
  const resources = data.concat([{ id: 0, name: "전체" }]).map((category) => createArticleListResource(category));
  return {
    // resources,
  };
};

export default CommunityIndex;
