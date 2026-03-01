import styles from "./loading.module.scss";

export default function LoadingDots() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.dots}>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </div>
  );
}
