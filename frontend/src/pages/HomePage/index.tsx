import React from 'react'
import { Space } from 'antd'
import styles from './index.module.scss'
import PostWithDescription, { PostWithDescriptionProps } from '../../components/PostWithDescription'
import Layout from '../../components/Layout'

export interface HomePageProps {
  posts: PostWithDescriptionProps[]
}

const HomePage: React.FC<HomePageProps> = ({ posts }) => {
  return (
    <Layout>
      <Space direction='vertical' size={'large'} className={styles.container}>
        {posts.map((post, index) => (
          <PostWithDescription
            key={index}
            title={post.title}
            description={post.description}
            photo={post.photo}
            position={post.position}
            withEffect={post.withEffect}
          />
        ))}
      </Space>
    </Layout>
  )
}

export default HomePage
