import React from 'react';
import styled from 'styled-components';
import { Box, H2, H3, Text, Link } from '@adminjs/design-system';

const pageHeaderHeight = 284;
const pageHeaderPaddingY = 74;
const pageHeaderPaddingX = 250;

export const DashboardHeader: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden" data-css="default-dashboard">
      <Box
        bg="grey100"
        height={pageHeaderHeight}
        py={pageHeaderPaddingY}
        px={['default', 'lg', pageHeaderPaddingX]}
      >
        <Text textAlign="center" color="white">
          <H2>Информационная страница</H2>
          <Text opacity={0.8}>
            На данной странице размещены ресурсы нашей компании
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

const boxes = [
  {
    title: 'Telegram',
    link: 'https://t.me/U_PROJECT_STUDIO',
    imageLink:
      'https://static.vecteezy.com/system/resources/previews/018/930/708/non_2x/telegram-logo-telegram-icon-transparent-free-png.png',
  },
  {
    title: 'Whatsapp',
    link: 'https://api.whatsapp.com/send?phone=79260305570',
    imageLink:
      'https://img.uxwing.com/wp-content/themes/uxwing/download/brands-social-media/wa-whatsapp-icon.png',
    subtitle: 'Описание чего-то',
  },
  {
    title: 'Вконтакте',
    link: 'https://api.whatsapp.com/send?phone=79260305570',
    imageLink:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/VK_Compact_Logo_%282021-present%29.svg/2048px-VK_Compact_Logo_%282021-present%29.svg.png',
  },
  {
    title: 'YouTube',
    link: 'https://www.youtube.com/@uprojectstudio7497',
    imageLink:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png',
  },
  {
    title: 'Instagram',
    link: 'https://www.instagram.com/uprojectstudio/?utm_medium=copy_link',
    imageLink: 'https://pngicon.ru/file/uploads/instagram.png',
  },
  {
    title: 'Сервис анализа',
    link: 'https://analyze.u-project-studio.ru/dashboard/1-grafiki',
    imageLink: 'https://cdn-icons-png.flaticon.com/512/4408/4408037.png',
  },
  {
    title: 'Старый сайт',
    link: 'https://u-projectstudio.ru/',
    imageLink: 'https://u-projectstudio.ru/image/catalog/logo/logo_401.png',
  },
  {
    title: 'Новый сайт',
    link: 'https://u-project-studio.ru/',
    imageLink: 'https://u-projectstudio.ru/image/catalog/logo/logo_401.png',
  },
  {
    title: 'Промо страница',
    link: 'https://business.u-projectstudio.ru/1',
    imageLink: 'https://u-projectstudio.ru/image/catalog/logo/logo_401.png',
  },
];

const Card = styled(Box)`
  display: ${({ flex }): string => (flex ? 'flex' : 'block')};
  color: ${({ theme }): string => theme.colors.grey100};
  text-decoration: none;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid ${({ theme }): string => theme.colors.primary100};
    box-shadow: ${({ theme }): string => theme.shadows.cardHover};
  }
`;

Card.defaultProps = {
  variant: 'white',
  boxShadow: 'card',
};

const Dashboard: React.FC = () => {
  return (
    <Box>
      <DashboardHeader />
      <Box
        mt={['xl', 'xl', '-100px']}
        mb="xl"
        mx={[0, 0, 0, 'auto']}
        px={['default', 'lg', 'xxl', '0']}
        position="relative"
        flex
        flexDirection="row"
        flexWrap="wrap"
        width={[1, 1, 1, 1024]}
      >
        {boxes.map((box, index) => (
          <Box key={index} width={[1, 1 / 2, 1 / 2, 1 / 3]} p="lg">
            <Link href={box.link} mr="xl">
              <Card>
                <div
                  style={{
                    height: '100px',
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '14px',
                  }}
                >
                  <img
                    alt={'image'}
                    src={box.imageLink}
                    style={{
                      height: '70px',
                      width: '70px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                <Text textAlign="center">
                  <H3 mt="lg">{box.title}</H3>
                </Text>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
