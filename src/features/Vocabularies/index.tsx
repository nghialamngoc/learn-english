import { Box, Divider, Flex, Spinner, Text } from '@chakra-ui/react';
import { Vocabulary } from 'models/vocabulary';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Vocabularies.module.scss';

const dummyData: Vocabulary = {
  id: 1,
  text: 'Gucci',
  mean: 'Good, well or nice',
  spelling: 'gucci',
  example: [
    `Hey guys! Guess what I just learned?! Have you ever heard
    someone say gucci?. It's actually an English slang term that
    means good or nice. So I can say 'That new car is gucci!'`,
  ],
  type: 'adj',
  createAt: '04/11/2022',
};

export default function Vocabularies() {
  const [data, setData] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const getData = useCallback(() => {
    try {
      setLoading(true);
      const res = [dummyData, dummyData, dummyData, dummyData, dummyData];
      setData((pre) => {
        return [...pre, ...res];
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, []);

  const onScroll = useCallback(() => {
    if (!listRef.current) {
      return;
    }

    console.log(
      window.scrollY,
      window.innerHeight,
      window.scrollY + window.innerHeight,
      listRef.current.clientHeight,
      listRef.current.offsetTop,
      listRef.current.clientHeight + listRef.current.offsetTop
    );

    if (
      window.scrollY + window.innerHeight >=
      listRef.current.clientHeight + listRef.current.offsetTop
    ) {
      setLoadMore(true);
    }
  }, []);

  useEffect(() => {
    getData();

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [getData, onScroll]);

  useEffect(() => {
    if (loadMore) {
      try {
        setLoadMore(true);
        const res = [dummyData, dummyData, dummyData, dummyData, dummyData];
        setData((pre) => {
          return [...pre, ...res];
        });
      } catch (err) {
      } finally {
        setLoadMore(false);
      }
    }
  }, [loadMore, getData]);

  return (
    <Box padding="20px 40px 0" backgroundColor="#f1f1f1" height="100%">
      <Box>
        <Text fontSize="26px">Vocabularies List</Text>
      </Box>
      {loading ? (
        <Flex
          width="100%"
          height="200px"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner color="blue.500" />
        </Flex>
      ) : (
        <Flex marginLeft="-40px" flexFlow="row wrap" ref={listRef}>
          {data?.map((item, index) => {
            return (
              <Flex
                w={{
                  sm: 'calc( 100% - 40px )',
                  md: 'calc( 50% - 40px )',
                  lg: 'calc( 25% - 40px )',
                  xl: 'calc( 20% - 40px )',
                }}
                marginLeft="40px"
                flexDir="column"
                _hover={{
                  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                }}
                cursor="pointer"
                borderRadius="20px"
                key={index}
                mt={10}
              >
                <Flex className={styles['item-header']}>
                  <Text fontSize="30px" fontWeight="500">
                    {item.text}
                  </Text>
                  <Text>/ {item.spelling} /</Text>
                </Flex>
                <Flex
                  flexDir="column"
                  width="100%"
                  backgroundColor="white"
                  borderRadius="0 0 20px 20px"
                >
                  <Flex flexDir="column" padding="20px">
                    <Flex flexDir="column">
                      <Text fontStyle="italic" fontWeight="500">
                        Meaning:
                      </Text>
                      <Text>{item.mean}</Text>
                    </Flex>
                    <Flex flexDir="column" mt={3}>
                      <Text fontStyle="italic" fontWeight="500">
                        Type:
                      </Text>
                      <Text>{item.type}</Text>
                    </Flex>
                    <Flex flexDir="column" mt={3}>
                      <Text fontStyle="italic" fontWeight="500">
                        Example:
                      </Text>
                      {item.example?.map((text, index) => {
                        return (
                          <Text
                            className={styles['example-content']}
                            key={index}
                          >
                            - {text}
                          </Text>
                        );
                      })}
                    </Flex>
                  </Flex>
                  <Divider></Divider>
                  <Flex padding="20px">
                    <Box fontSize={13} color="#ff754c" fontWeight="500">
                      {item.createAt}
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            );
          })}

          {loadMore && (
            <Flex
              width="100%"
              height="200px"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner color="blue.500" />
            </Flex>
          )}
        </Flex>
      )}

      <Box height={200}>Footer</Box>
    </Box>
  );
}
