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
        <meta property="og:title" content={"IRE Archive"} />
        <meta
          property="og:description"
          content={"나만의 프로그래머 아카이브"}
        />
        <meta
          property="og:url"
          content={"https://ire4564-blog-next.vercel.app/"}
        />
        <meta
          property="og:image"
          content={
            "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FPoLeS%2FbtrSlYCgWOq%2FooUrHNpGBH10ldSD8OpIG1%2Fimg.png"
          }
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
