import Head from "next/head";

const Meta = ({ title, description }) => {
  return (
    <Head>
      <title>{title || "IREArchive"}</title>
      <meta
        name="description"
        content={description || "나만의 프로그래머 아카이브"}
      />
      <meta name="keywords" content="ireArchive Record Blog" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        property="og:image"
        content={
          "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FPoLeS%2FbtrSlYCgWOq%2FooUrHNpGBH10ldSD8OpIG1%2Fimg.png"
        }
      />
    </Head>
  );
};

export default Meta;

// let's set a default title
Meta.defaultProps = {
  title: "IREArchive",
};
