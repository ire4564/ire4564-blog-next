import Head from "next/head";

const Meta = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="keywords" content="ireArchive Record Blog" />
      <meta property="og:image" content="/assets/thumnail.png" />
    </Head>
  );
};

export default Meta;

// let's set a default title
Meta.defaultProps = {
  title: "PressBlog - Your one stop blog for everything React Native",
};
