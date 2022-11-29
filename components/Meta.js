import { NextSeo } from "next-seo";

const Meta = ({ title, description }) => {
  return (
    <NextSeo
      title={title || "IREArchive"}
      description={description || "나만의 프로그래머 아카이브"}
      openGraph={{
        title: "IREArchive",
        description: "나만의 프로그래머 아카이브",
        images: [
          {
            url: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FPoLeS%2FbtrSlYCgWOq%2FooUrHNpGBH10ldSD8OpIG1%2Fimg.png",
          },
        ],
        siteName: "IREArchive",
      }}
    />
  );
};

export default Meta;

// let's set a default title
Meta.defaultProps = {
  title: "IREArchive",
};
