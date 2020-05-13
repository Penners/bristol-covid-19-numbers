import "../water.css";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DefaultSeo
        title="Bristol Covid-19 Numbers"
        description="Daily updates of Covid-19 case numbers in Bristol"
      ></DefaultSeo>
      <Component {...pageProps} />
    </React.Fragment>
  );
}
