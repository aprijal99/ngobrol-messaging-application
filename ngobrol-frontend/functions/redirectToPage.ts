import {GetServerSidePropsResult} from 'next';

const redirectToPage = (path: string): GetServerSidePropsResult<any> => ({
  redirect: {
    statusCode: 302,
    destination: `/${path}`,
  },
});

export default redirectToPage;
