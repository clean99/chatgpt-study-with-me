import React from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

export enum PhotoPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export interface PostWithDescriptionProps {
  title: string
  description: string
  photo: string
  position: PhotoPosition
  withEffect?: boolean
}

const PostWithDescription: React.FC<PostWithDescriptionProps> = ({
  title,
  description,
  photo,
  position,
  withEffect = false,
}) => {
  const containerClassName = cx(styles.container, {
    [styles.containerRight]: position === PhotoPosition.RIGHT,
  })

  const photoClassName = cx(styles.photo, {
    [styles.photoLeft]: position === PhotoPosition.LEFT,
    [styles.photoRight]: position === PhotoPosition.RIGHT,
    [styles.photoWithEffect]: withEffect,
  })

  const textClassName = cx(styles.text, {
    [styles.textLeft]: position === PhotoPosition.RIGHT,
    [styles.textRight]: position === PhotoPosition.LEFT,
    [styles.textWithEffect]: withEffect,
  })

  return (
    <div className={containerClassName}>
      <div className={photoClassName} style={{ backgroundImage: `url(${photo})` }} />
      <div className={textClassName}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}

export default PostWithDescription
