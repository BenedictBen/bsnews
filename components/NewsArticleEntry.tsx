import { NewsArticles } from "@/models/NewsArticles"
// import Image from "next/image"
import {
  
  Card,
  CardBody,
  Text,
  Heading,
  Stack,
  chakra,
} from "@chakra-ui/react";
import Image from "next/image";
import { BsTypeUnderline } from "react-icons/bs";
import placeholderImage from "../Assets/images/placeholder.jpg"

interface NewsArticleEntryProps {
    article: NewsArticles 
}

export const NewsArticleEntry = ({article : {
    title, description, url, urlToImage
}} : NewsArticleEntryProps) => {

    const validImageUrl = (urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://")) ? urlToImage : undefined
        const OurImage = chakra(Image, {
          shouldForwardProp: (prop) =>
            ["width", "height", "src", "alt"].includes(prop),
        });

        

    return (
      <a href={url}>
        <Card
          variant="elevated"
          h={["420px", "350px", "450px"]}
          _hover={{
            boxShadow: "dark-lg",
          }}
        >
          <CardBody>
            <OurImage
              src={validImageUrl || placeholderImage}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              width="400"
              height="200"
              // width={["200px", "250px", "300px"]}
              // height={["150px"]}
              objectFit="cover"
            />
            <Stack mt="6" spacing={"3"}>
              <Heading
                size={["xs", "sm", "md"]}
                _hover={{
                  textDecoration: "underline",
                }}
              >
                {title}
              </Heading>
              <Text fontSize={["xs", "sm", "md"]} noOfLines={3}>
                {description}
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </a>
    );
}
