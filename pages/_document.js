import { Html, Head, Main, NextScript } from "next/document";
import Meta from "../components/Meta";

const MyDocument = () => {
  return (
    <Html lang="en">
      <Head>
        <Meta />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
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
