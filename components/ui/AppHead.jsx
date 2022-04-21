import Head from 'next/head';

function AppHead({ title, description }) {
  return (
    <Head>
      <title>{title || 'Event Management'}</title>
      <meta
        name="description"
        content={description || 'All the events are upcoming'}
      ></meta>
    </Head>
  );
}

export default AppHead;
