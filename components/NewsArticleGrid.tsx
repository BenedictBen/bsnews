import { NewsArticles } from '@/models/NewsArticles';
import { Box, SimpleGrid }  from '@chakra-ui/react';
import { NewsArticleEntry } from './NewsArticleEntry';


interface NewsArticleGridProps {
    articles: NewsArticles[] 
}

const NewsArticleGrid = ({ articles }: NewsArticleGridProps) => {
  return (
    <SimpleGrid columns={[2, 2,3]} justifyItems="center" gap="3" mb="5">
      {articles.map((article) => (
        <Box maxW="sm" key={article.url}>
          <NewsArticleEntry article={article} />
        </Box>
      ))}
    </SimpleGrid>
  );
};
 
export default NewsArticleGrid;