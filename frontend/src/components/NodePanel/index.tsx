import React from 'react'
import { Node } from '../../types/types'
import Button from '../Button'
import styles from './index.module.scss'
import { Form, Select, Typography } from 'antd'
import { Input } from '../Input'

const { Option } = Select
const { Title } = Typography

interface NodePanelProps {
  x: number
  y: number
  width?: number
  height?: number
  nodeData: Node
  isVisible: boolean
  onClose: () => void
  onSubmit: (values: Node) => void
  onDelete: (nodeId: string) => void
}

const NodePanel: React.FC<NodePanelProps> = ({
  x,
  y,
  width = 360,
  height = 300,
  nodeData,
  isVisible,
  onClose,
  onSubmit,
  onDelete,
}) => {
  const handleOnDelete = () => {
      onDelete(nodeData.id)
  }
  return (
    <div
      className={`${styles.nodePanel}${isVisible ? ` ${styles.visible}` : ''}`}
      style={{ top: y, left: x, width, height }}
    >
      <div className={styles.panelHeader}>
        <Title level={5} className={styles.title}>
          Modify Node
        </Title>
        <span className={styles.cancelIcon} onClick={onClose} role={'button'}>
          &times;
        </span>
      </div>
      <Form
        name='basic'
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 26 }}
        className={styles.panelContent}
        initialValues={{
          label: nodeData.label,
          completed: String(nodeData.completed),
        }}
        onFinish={onSubmit}
        autoComplete='off'
      >
        <Form.Item
          label='Title'
          name='label'
          rules={[{ required: true, message: 'Please input node title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Completed'
          name='completed'
          rules={[{ required: true, message: 'Please select node status!' }]}
        >
          <Select>
            <Option value={'true'}>Completed</Option>
            <Option value={'false'}>To be completed</Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 11, span: 24 }} className={styles.buttonGroup}>
            <Button type='danger' htmlType="button" onClick={handleOnDelete}>
            Delete
            </Button>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default NodePanel
