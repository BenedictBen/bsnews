import Head from "next/head";
import { NewsArticles } from "@/models/NewsArticles";
import { FormEvent, useState } from "react";
import {
  Button,
  FormControl,
  Input,
  Spinner,
  Box,
  Heading,
  
} from "@chakra-ui/react";
import NewsArticleGrid from "@/components/NewsArticleGrid";


const SearchNewsPage = () => {
  const [searchResults, setSearchResults] = useState<NewsArticles[] | null>(
    null
  );
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] =
    useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("searchQuery")?.toString().trim();

    if (searchQuery) {
      try {
        setSearchResults(null);
        setSearchResultsLoadingIsError(false);
        setSearchResultsLoading(true);
        const response = await fetch("/api/search-news?q=" + searchQuery);
        const articles: NewsArticles[] = await response.json();
        setSearchResults(articles);
      } catch (error) {
        console.error(error);
        setSearchResultsLoadingIsError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  }
  
  return (
    <>
      <Head>
        <title key="title">Search News</title>
      </Head>
      <Box display="flex" alignItems={"center"} justifyContent="center" flexDirection={"column"}>
        <Heading
          mb="2"
          color="blue.300"
          fontSize={["12px", "20px", "24px", "36px"]}
        >
          Search News
        </Heading> 
        <form onSubmit={handleSubmit}>
          <FormControl alignItems={"center"} display={"flex"} gap="5" mb="2">
            <Input
              placeholder="E.g politics, sports, ...."
              w={["350px", "450px", "550px"]}
              name="searchQuery"
            />
            <Button
              type="submit"
              disabled={searchResultsLoading}
              colorScheme="blue"
              size={["xl", "sm", "md"]}
              flexShrink={0}
            >
              Search
            </Button>
          </FormControl>
        </form>

        <Box
          display="flex"
          alignItems={"center"}
          justifyContent="center"
          gap="3"
        >
          {searchResultsLoading && (
            <Spinner
              display={"flex"}
              m="auto"
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          )}
          {searchResultsLoadingIsError && (
            <p>Something went wrong. Please try again.</p>
          )}
          {searchResults?.length === 0 && (
            <p>Nothing found. Try a different query!</p>
          )}
          {searchResults && <NewsArticleGrid articles={searchResults} />}
          {/* <Wrap>
          <WrapItem>
          
          {searchResults && <NewsArticleGrid articles={searchResults} />}
          </WrapItem>
        </Wrap> */}
        </Box>
      </Box>
    </>
  );
};

export default SearchNewsPage;


