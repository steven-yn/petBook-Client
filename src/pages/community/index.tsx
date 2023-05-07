import React from "react";
import styled from "styled-components";
import CommunityBanner from "@components/community/CommunityBanner";
import WriteButton from "@components/community/WriteButton";
import CommunitySection from "@components/community/CommunitySection";
import HotArticleList from "@components/community/HotArticleList";
import CategoryNav from "@components/community/CategoryNav";
import ArticlePreviewList from "@components/community/ArticlePreviewList";
import QnaArticleList, {
  QNA_CATEGORY,
} from "@components/community/QnaArticleList";
import getHrefWithCategory from "@lib/utils/gerHrefWithCategory";
import Link from "next/link";
import SearchBar from "@components/common/SearchBar";
import { CATEGORY_LIST } from "@lib/queries/category";
import {
  ARTICLE_LIST_PREVIEW,
  POPULAR_ARTICLE_LIST,
} from "@lib/queries/article";
import type { NextPageWithResources } from "@lib/queries";

const Community: NextPageWithResources = () => {
  return (
    <Main>
      <CommunityBanner />
      <CommunitySection
        title="지금 당신의 답변을 기다리고 있어요"
        sideElement={
          <Link href={getHrefWithCategory(QNA_CATEGORY)} passHref>
            <button type="button">더보기</button>
          </Link>
        }
      >
        <QnaArticleList />
      </CommunitySection>
      <CommunitySection title="이번주 hot 인기글">
        <HotArticleList />
      </CommunitySection>
      <CommunitySection
        title="실시간 live talk"
        sideElement={
          <SearchBar
            placeholder="관심있는 내용을 검색해보세요!"
            keywordBox={false}
          />
        }
      >
        <CategoryNav />
        <ArticlePreviewList />
      </CommunitySection>
      <WriteButton />
    </Main>
  );
};

const Main = styled.main`
  width: 100%;
  max-width: calc(1260px + 2rem);
  margin: 0 auto;
  padding: 3.25rem 1rem 6.25rem;
`;

Community.requiredResources = [
  CATEGORY_LIST,
  POPULAR_ARTICLE_LIST,
  ARTICLE_LIST_PREVIEW,
];
export default Community;
