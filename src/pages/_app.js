import '@/styles/globals.css'
import Script from "next/script"
import { useRouter } from 'next/router';
import { useEffect } from "react";
import * as gtag from '@/utils/gtag'

export default function App({ Component, pageProps }) {
  const router = useRouter();
 
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
 
    router.events.on("routeChangeComplete", handleRouteChange);
 
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
    <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-N0PMSYD4PB"></Script>
    <Script
      id='google-analytics'
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-N0PMSYD4PB', {
            page_path: window.location.pathname,
          });
        `,
        }}
    />
  <Component {...pageProps} />
  </>
  )
}
