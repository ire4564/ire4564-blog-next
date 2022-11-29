import { Html, Head, Main, NextScript } from "next/document";
import Meta from "../components/Meta";

const MyDocument = () => {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
        />
        <meta
          name="google-site-verification"
          content="1GGa_w108WDxO12-fM8XhIFiZrW-5y2ZsHKrA8lT7C0"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
