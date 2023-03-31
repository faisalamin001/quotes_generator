import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="https://i.postimg.cc/j5S0SV3g/logo2.png" />
        <meta name="description" content="Generate quotes with ease." />

        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemProp="name" content="Quotes Generator" />
        <meta itemProp="description" content="Generate quotes with ease." />
        <meta property="og:site_name" content="quotes.com" />
        <meta itemProp="image" content="/demo.png" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta
          property="og:url"
          content="https://i.postimg.cc/fyfWfnf1/demo.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Quotes Generator" />
        <meta property="og:description" content="Generate quotes with ease." />
        <meta
          property="og:image"
          content="https://i.postimg.cc/fyfWfnf1/demo.png"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Quotes Generator" />
        <meta name="twitter:description" content="Generate quotes with ease." />
        <meta
          property="og:image"
          content="https://i.postimg.cc/fyfWfnf1/demo.png"
        />
        <meta
          name="twitter:image"
          content="https://i.postimg.cc/fyfWfnf1/demo.png"
        />
      </Head>
      <body className="transition-colors duration-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
