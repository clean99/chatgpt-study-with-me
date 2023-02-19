import React from 'react'
import styles from './index.module.scss'
import { MailOutlined, GithubOutlined, WechatOutlined } from '@ant-design/icons'

const Footer: React.FC = () => {
  return (
    <footer className={`${styles.footer} bg-gray-800 py-10 px-20`}>
      <div className='px-4 flex flex-row items-center justify-between'>
        <div className='flex'>
          <div className='text-gray-400 mr-2'>{'\u00A9'}2023 StudywithmeAI Inc.</div>
          <div className='flex items-center'>
            <MailOutlined className='mr-2 text-gray-400' />
            <p className='text-gray-400'>ai.studywithme@gmail.com</p>
          </div>
        </div>
        <div className='flex'>
          <div className='flex items-center mr-4'>
            <GithubOutlined className='text-2xl text-gray-400 mr-2' />
          </div>
          <div className='flex items-center'>
            <WechatOutlined className='text-2xl text-green-400 mr-2' />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
