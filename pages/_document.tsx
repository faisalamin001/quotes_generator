import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Generate quotes with ease." />

        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemProp="name" content="Quotes Generator" />
        <meta itemProp="description" content="Generate quotes with ease." />
        <meta property="og:site_name" content="quotes.com" />
        <meta
          itemProp="image"
          content="https://quotes-generator-swart.vercel.app"
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta
          property="og:url"
          content="https://quotes-generator-swart.vercel.app"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Article Idea Generator" />
        <meta property="og:description" content="Generate quotes with ease." />
        <meta
          property="og:image"
          content="https://quotes-generator-swart.vercel.app"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Article Idea Generator" />
        <meta name="twitter:description" content="Generate quotes with ease." />
        <meta
          property="og:image"
          content="https://quotes-generator-swart.vercel.app"
        />
        <meta
          name="twitter:image"
          content="https://quotes-generator-swart.vercel.app/og-image.png"
        />
      </Head>
      <body className="transition-colors duration-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
