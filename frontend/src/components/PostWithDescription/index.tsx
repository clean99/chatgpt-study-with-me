import React from 'react';
import cx from 'classnames';
import styles from './index.module.scss';

interface PostWithDescriptionProps {
  title: string;
  description: string;
  photo: string;
  position: 'left' | 'right';
  withEffect?: boolean;
}

const PostWithDescription: React.FC<PostWithDescriptionProps> = ({
  title,
  description,
  photo,
  position,
  withEffect = false,
}) => {
  const containerClassName = cx(styles.container, {
    [styles.containerRight]: position === 'right',
  });

  const photoClassName = cx(styles.photo, {
    [styles.photoLeft]: position === 'left',
    [styles.photoRight]: position === 'right',
    [styles.photoWithEffect]: withEffect,
  });

  const textClassName = cx(styles.text, {
    [styles.textLeft]: position === 'right',
    [styles.textRight]: position === 'left',
    [styles.textWithEffect]: withEffect,
  });

  return (
    <div className={containerClassName}>
      <div className={photoClassName} style={{ backgroundImage: `url(${photo})` }} />
      <div className={textClassName}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default PostWithDescription;
