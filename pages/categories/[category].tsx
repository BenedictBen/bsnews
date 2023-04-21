import NewsArticleGrid from "@/components/NewsArticleGrid";
import { NewsArticles, NewsResponse } from "@/models/NewsArticles";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";



interface CategoryNewsPageProps {
    newsArticles: NewsArticles[],
}

export const getStaticPaths: GetStaticPaths =  async () => {
    const categorySlugs = [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology"
    ];

    const paths = categorySlugs.map(slug => ({ params: { category: slug }}));

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async({params}) => {
    const category = params?.category?.toString()
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
    )

    const newsResponse: NewsResponse = await (response).json();
    return {
      props: { newsArticles: newsResponse.articles } ,
      revalidate: 5 * 60,
    };
}

const CategoryNewsPage = ({ newsArticles }: CategoryNewsPageProps) => {
    const router = useRouter()
    const categoryName = router.query.category?.toString();

    // const title = "Category: " + categoryName;

    return (
      <>
        {/* <Head>
        <title key="title">{`${title} -  News App`}</title>
      </Head> */}

        <Box mt="2">
          <NewsArticleGrid articles={newsArticles} />
        </Box>
      </>
    );
}
 
export default CategoryNewsPage;