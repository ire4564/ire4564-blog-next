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
        <div style={{ display: "flex", marginBottom: "3px" }}>
          <div style={{ width: "20px", float: "left" }}>
            <div className="height-square"></div>
          </div>

          <div className="align-div">
            <div className="title-b f-14">Category.</div>
            <div className="post-detail-box">{post.data.category}</div>
          </div>

          <div className="align-div">
            <div className="title-b f-14">Date.</div>
            <div className="post-detail-box">{post.data.publishedOn}</div>
          </div>

          <div className="align-div">
            <div className="title-b f-14">Tag.</div>
            <div className="post-detail-box">
              {post.data.tag.split(" ").map((_tag) => `#${_tag}  `)}
            </div>
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <td className="td-subtitle">{post.data.subTitle}</td>
              <td className="td-detail">{post.data.excerpt}</td>
            </tr>
            <tr className="tr-record">
              <td></td>
              <td>ire4564 #{postIndex + 1} record</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Link>
  );
};

export default PostItem;
