import Head from "next/head";
import { NextSeo } from "next-seo";

const Meta = ({ title, description }) => {
  return (
    <NextSeo
      title={title || "IREArchive"}
      description={description || "나만의 프로그래머 아카이브"}
      openGraph={{
        url: "https://www.ire-archive.com",
        title: "IREArchive",
        description: "나만의 프로그래머 아카이브",
        images: [
          {
            url: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCCbIm%2FbtrSqM9FRH1%2FoQFMSQWcvN9VYFmxRzPlEk%2Fimg.png",
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
