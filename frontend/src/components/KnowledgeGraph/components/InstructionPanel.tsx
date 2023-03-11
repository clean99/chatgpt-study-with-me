import React from 'react'
import styles from '../index.module.scss'
import { Typography } from 'antd'
import { v4 as uuidv4 } from 'uuid'

const { Title, Text } = Typography

interface ColorWithTitle {
  title: string
  color: string
}

interface InstructionPanelProps {
  title: string
  colorWithTitles: ColorWithTitle[]
  instruction: string[]
  visible: boolean
}

const InstructionPanel: React.FC<InstructionPanelProps> = ({
  title,
  colorWithTitles,
  instruction,
  visible,
}) => {
  return (
    <div className={styles.instructionPanel}>
      <Title level={3} className={styles.title}>
        {title}
      </Title>
      <div className={styles.instructionContainer}>
        <div className={styles.colorWithTitles}>
          {colorWithTitles.map(({ title, color }) => (
            <div className={styles.colorWithTitle} key={title}>
              <div className={styles.color} style={{ backgroundColor: color }} />
              <Text type={'secondary'}>{title}</Text>
            </div>
          ))}
        </div>
        <div className={styles.instruction}>
          {visible &&
            instruction.map((step, index) => (
              <div className={styles.step} key={uuidv4()}>
                <div className={styles.bullet}>{index + 1}</div>
                <Text type={'secondary'}>{step}</Text>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default InstructionPanel
