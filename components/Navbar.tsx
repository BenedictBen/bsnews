import {
  Button,
  IconButton,
  Flex,
  Box,
  Text,
  Icon,
  Show,
  Divider,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";
import { BsSearch, BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [active, setIsActive] = useState(1);
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [show, changeShow] = useState("none");

  const links = [
    { id: 1, title: "General", href: "/" },
    { id: 2, title: "Business", href: "/categories/business" },
    { id: 3, title: "Entertainment", href: "/categories/entertainment" },
    { id: 4, title: "Health", href: "/categories/health" },
    { id: 5, title: "Science", href: "/categories/science" },
    { id: 6, title: "Sports", href: "/categories/sports" },
    { id: 7, title: "Technology", href: "/categories/technology" },
  ];
  return (
    <>
      <Flex
        display={["none", "none", "flex", "flex"]}
        alignItems={"center"}
        justifyContent="space-between"
        px={["2", "4", "6"]}
        py={["1", "2", "3"]}
      >
        <Box>
          <Link href="/">
            <Text
              fontWeight={"bold"}
              fontSize={{ md: "12px", lg: "24px" }}
              color="red.300"
            >
              B NEWS
            </Text>
          </Link>
        </Box>
        <Flex display={["none", "none", "flex", "flex"]}>
          {links.map((link) => (
            <Link key={link.id} href={link.href}>
              {/* <Text fontSize={["xs", "sm", "md"]}>{link.title}</Text> */}
              <Button
                variant={"ghost"}
                onClick={() => setIsActive(link.id)}
                bg={active == link.id ? "orange" : "transparent"}
                size={["xs", "sm"]}
              >
                {link.title}
              </Button>
            </Link>
          ))}
        </Flex>

        <Flex
          display={["none", "none", "flex", "flex"]}
          gap="3"
          alignItems={"center"}
        >
          <Link href="/search">
            <Icon as={BsSearch} boxSize="4" />
          </Link>
          <IconButton
            icon={isDark ? <BsFillSunFill /> : <BsMoonFill />}
            aria-label="Toggle Theme"
            colorScheme="green"
            onClick={toggleColorMode}
            size="xs"
          />
        </Flex>
      </Flex>
      <Divider />

      {/* Small Screen */}
      <Flex
        alignItems={"center"}
        justifyContent="space-between"
        px="4"
        py="2"
        display={["flex", "flex", "none", "none"]}
        mt="4"
      >
        <Box>
          <Link href="/">
            <Text fontWeight={"bold"} fontSize={["20px"]} color="red.300">
              B NEWS
            </Text>
          </Link>
        </Box>
        <Flex gap="2">
          <Icon
            aria-label="Open Menu"
            as={AiOutlineMenu}
            boxSize="6"
            mr="2"
            // display={["flex", "flex", "none", "none"]}
            onClick={() => changeShow("flex")}
          />
          <IconButton
            icon={isDark ? <BsFillSunFill /> : <BsMoonFill />}
            aria-label="Toggle Theme"
            colorScheme="green"
            onClick={toggleColorMode}
            size="xs"
            // display={["flex", "flex", "none", "none"]}
          />
        </Flex>
        <Flex
          w="100vw"
          bg={"green.300"}
          zIndex={20}
          h="100vh"
          position={"fixed"}
          top="0"
          left={"0"}
          overflow="auto"
          flexDirection={"column"}
          display={show}
        >
          <Flex justify={"flex-end"}>
            <IconButton
              icon={<AiOutlineClose />}
              mt="2"
              mr="2"
              aria-label="Close Menu"
              size="md"
              onClick={() => changeShow("none")}
            />
          </Flex>
          <Flex flexDirection={"column"} alignItems="center">
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => changeShow("none")}
              >
                {/* <Text fontSize={["xs", "sm", "md"]}>{link.title}</Text> */}
                <Button
                  variant={"ghost"}
                  onClick={() => setIsActive(link.id)}
                  bg={active == link.id ? "orange" : "transparent"}
                  size={["xs", "sm", "md", "lg"]}
                >
                  {link.title}
                </Button>
              </Link>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
