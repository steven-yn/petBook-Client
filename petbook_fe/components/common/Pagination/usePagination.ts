import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import navigator from "@lib/modules/navigator";
import { replaceQuery } from "@lib/modules/queryString";

export const usePage = () => {
  const router = useRouter();
  const pageParam = Number(router.query?.page);
  const currentPage = Number.isNaN(pageParam) ? 1 : pageParam;
  return currentPage;
};

export default function usePagination({
  totalPages,
  buttonNum,
}: {
  totalPages: number;
  buttonNum: number;
}) {
  const [offset, setOffset] = useState(1);
  const currentPage = usePage();
  const router = useRouter();
  const changeCurrentPage = (page: number) => {
    const url = replaceQuery({
      router,
      key: "page",
      query: String(page),
    });
    navigator({
      url,
      options: {
        shallow: true,
      },
    });
  };

  // currentPage가 1 ~ totalPages range에 존재하는지 판단
  useEffect(() => {
    if (totalPages === 0) return;
    if (currentPage < 1) {
      changeCurrentPage(1);
    } else if (currentPage > totalPages) {
      changeCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // currentPage 변화에 따른 button offset 판단
  useEffect(() => {
    if (currentPage >= offset + buttonNum) {
      setOffset((oldOffset) => oldOffset + buttonNum);
    } else if (currentPage < offset) {
      setOffset((oldOffset) => oldOffset - buttonNum);
    }
  }, [currentPage]);

  return {
    currentPage,
    changeCurrentPage,
    offset,
  };
}