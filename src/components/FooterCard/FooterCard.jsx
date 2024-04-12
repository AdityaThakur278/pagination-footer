import cx from "classnames";

import styles from "./footerCard.module.css";

const FooterCard = (props) => {
  const { value, currentPage, isDisabled, onClick, isFetching } = props;

  const handlePageSelect = () => {
    if (isDisabled || isFetching) return;
    onClick(value - 1);
  };

  return (
    <span
      className={cx(styles.cardContainer, {
        [styles.selected]: currentPage === value,
        [styles.disabled]: isDisabled || isFetching,
      })}
      onClick={handlePageSelect}
    >
      {value}
    </span>
  );
};

export default FooterCard;
