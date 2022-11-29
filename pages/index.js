/* eslint-disable @next/next/no-img-element */

import PostItem from "../components/PostItem";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { getPosts } from "../scripts/utils.js";

const Home = ({ posts }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loadMorePosts = async () => {
    const res = await fetch(`/api/posts?page=${currentPageIndex + 1}`); // absolute url is supported here
    const posts = await res.json();

    setFilteredPosts((_posts) => [..._posts, ...posts]);
    setCurrentPageIndex((_pageIndex) => _pageIndex + 1);
  };

  return (
    mounted && (
      <>
        <div className="align-center" style={{ marginTop: "-40px" }}>
          <img
            src="/assets/collect.png"
            width={78}
            height={28}
            alt={"collect"}
          />
          <p className="mini-desc">
            Records of study, records of worries, archives
          </p>
        </div>
        <div className={styles.articleList}>
          {[...filteredPosts]
            .sort(
              (a, b) =>
                new Date(b.data.publishedOn) - new Date(a.data.publishedOn)
            )
            .map((post, index) => (
              <PostItem key={index} post={post} postIndex={index} />
            ))}
          <button onClick={loadMorePosts} className={styles.button}>
            More Record
          </button>
        </div>
      </>
    )
  );
};

export default Home;

export const getStaticProps = async () => {
  const posts = getPosts(1);

  return {
    props: {
      posts,
    },
  };
};
