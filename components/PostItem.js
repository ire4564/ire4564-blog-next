/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const PostItem = ({ post, postIndex }) => {
  const [hover, setHover] = useState(false);

  return (
    <Link href={`/posts/${post.slug}`}>
      <div
        className={`${styles.postItem} ${hover ? "hover-section" : ""}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h3
          className="title-b"
          style={{ fontSize: "20px", marginBottom: "12px" }}
        >
          {post.data.title}
        </h3>
        <div className="width-line"></div>
        <ul className="post-detail-text">
          <li style={{ width: "2%", marginLeft: "30px", marginRight: "-75px" }}>
            <div className="height-square"></div>
          </li>
          <li>
            <div className="title-b f-14">Category.</div>
            <div className="post-detail-box">{post.data.category}</div>
          </li>
          <li>
            <div className="title-b f-14">Date.</div>
            <div className="post-detail-box">{post.data.publishedOn}</div>
          </li>
          <li>
            <div className="title-b f-14">Tag.</div>
            <div className="post-detail-box">
              {post.data.tag.split(" ").map((_tag) => `#${_tag}  `)}
            </div>
          </li>
        </ul>
        <table>
          <tr>
            <td className="td-subtitle">{post.data.subTitle}</td>
            <td className="td-detail">{post.data.excerpt}</td>
          </tr>
          <tr className="tr-record">
            <td></td>
            <td>ire4564 #{postIndex + 1} record</td>
          </tr>
        </table>
        {/** 
      <h3 className="title-b">
        <Link href={`/posts/${post.slug}`}>{post.data.subTitle}</Link>
      </h3>
      <p>{post.data.excerpt}</p>
      <Link href={`/posts/${post.slug}`}>Read more</Link>
      */}
      </div>
    </Link>
  );
};

export default PostItem;
