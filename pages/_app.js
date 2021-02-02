import "water.css";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import Router from "next/router";
import * as gtag from "lib/gtag";

Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <DefaultSeo
                title="Bristol Covid-19 Numbers"
                description="Daily updates of Covid-19 case numbers in Bristol"
            ></DefaultSeo>
            <Component {...pageProps} />
        </>
    );
}
