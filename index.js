// pages/index.js
import Head from 'next/head';
import Banner from '../components/Banner';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Banner Example</title>
        <meta name="description" content="Banner component example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Banner />
      </main>
    </div>
  );
}