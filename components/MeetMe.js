import Image from "next/image";
import styles from "../styles/Home.module.css";

const MeetMe = () => {
  return (
    <div>
      {/** 
      <Image
        src="photo-1618077360395-f3068be8e001?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        alt="john doe avatar"
        width={150}
        height={150}
        className={styles.img}
      />
      */}
      <p className={styles.p}>
        <strong>누구보다 재밌고 확실하게🙋💜 FE Developer 김도희입니다.</strong>
        <span className="title-s"> Time is flying, Never to return.</span>
      </p>
      <p className={styles.p}>
        지나간 시간은 되돌릴 수 없기에, 어떤 일이든지 매사에 집중하며 즐깁니다.
        좋은 환경에서 좋은 사람들과 함께 즐겁게 일하는 것이 매일의 꿈입니다.
        그런 사람이 되기 위해서, 오늘도 노력하는 사람입니다.
      </p>
    </div>
  );
};

export default MeetMe;
