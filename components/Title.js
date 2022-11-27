const Title = ({ title, date, subTitle }) => {
  return (
    <div className="align-center">
      <div className="post-title">{title}</div>
      <div className="post-sub-title">{subTitle}</div>
      <div className="post-date" style={{ marginBottom: "30px" }}>
        {date}
      </div>
      <div className="width-line"></div>
    </div>
  );
};

export default Title;
