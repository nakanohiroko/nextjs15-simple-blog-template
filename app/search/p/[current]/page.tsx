import { getList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';

type Props = {
  params: {
    current: string;
  };
  searchParams: {
    q?: string;
  };
};

export const revalidate = 60;

export default async function Page({ params, searchParams }: Props) {
  const [{ current }, { q }] = await Promise.all([params, searchParams]);
  const currentPage = parseInt(current, 10);
  const data = await getList({
    limit: LIMIT,
    offset: LIMIT * (currentPage - 1),
    q,
  });
  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} current={currentPage} basePath="/search" q={q} />
    </>
  );
}
