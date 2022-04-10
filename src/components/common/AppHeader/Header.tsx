import { ChatIcon, CopyIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Divider, Flex, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './AppHeader.module.scss';

export interface AppHeaderProps {}

export default function AppHeader(props: AppHeaderProps) {
  const [isCollapse, setIsCollapse] = useState(false);

  const [menuTop] = useState([
    {
      title: 'Vocabularies',
      icon: <ChatIcon fontSize={22}></ChatIcon>,
      link: '/vocabularies',
    },
    {
      title: 'Grammars',
      icon: <CopyIcon fontSize={22}></CopyIcon>,
      link: '/grammars',
    },
  ]);

  return (
    <Box
      width={isCollapse ? '96px' : '256px'}
      boxShadow="inset -1px 0 0 0 #e4e4e4;"
      height="100vh"
      transition="width 0.25s"
      overflow="hidden"
    >
      <Flex
        padding={isCollapse ? '30px 0px' : '30px 41px'}
        alignItems="center"
        justifyContent="center"
      >
        {!isCollapse && (
          <Box flexGrow={1} fontSize={28}>
            <Link to="/" className={styles.logo}>
              Tanjiro
            </Link>
          </Box>
        )}
        <Box>
          <HamburgerIcon
            fontSize={28}
            cursor="pointer"
            onClick={() => setIsCollapse(!isCollapse)}
          ></HamburgerIcon>
        </Box>
      </Flex>
      <Flex
        margin={isCollapse ? '0 20px' : '0 30px'}
        direction="column"
        alignItems="center"
        justifyContent="center"
        fontSize={18}
      >
        {menuTop.map((item, index) => {
          return (
            <Flex
              key={index}
              width="100%"
              alignItems="center"
              justifyContent="center"
              marginBottom="10px"
            >
              <NavLink
                to={item.link}
                className={({ isActive }) => {
                  return `${styles.link} ${
                    isCollapse ? styles['link-collapse'] : ''
                  } ${isActive ? styles['link-active'] : ''}`;
                }}
              >
                {isCollapse ? (
                  <Tooltip
                    label={
                      <Box
                        background="gray"
                        padding="10px"
                        borderRadius="6px"
                        color="white"
                        marginLeft="14px"
                      >
                        {item.title}
                      </Box>
                    }
                    placement="right"
                  >
                    {item.icon}
                  </Tooltip>
                ) : (
                  item.icon
                )}
                {!isCollapse && <Box marginLeft="15px">{item.title}</Box>}
              </NavLink>
            </Flex>
          );
        })}
      </Flex>
      <Flex padding={isCollapse ? '0px 15px' : '0 41px'}>
        <Divider border="" />
      </Flex>
    </Box>
  );
}
