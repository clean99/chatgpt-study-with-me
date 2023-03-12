import * as React from 'react'
import { Form, Select, Input } from 'antd'
import Button from '../../Button'
import styles from '../index.module.scss'
import { Completed, Node } from '../../../types/types'

const { Option } = Select

interface ModifyNodeFormProps {
  onSubmit: (values: any) => void
  onDelete: (nodeId: string) => void
  nodeData: Node
}

const ModifyNodeForm: React.FC<ModifyNodeFormProps> = ({ nodeData, onSubmit, onDelete }) => {
  const [form] = Form.useForm()
  const handleOnDelete = () => {
    onDelete(nodeData.id)
  }
  React.useEffect(() => {
    form.setFieldsValue({
      label: nodeData.label,
      completed: nodeData.completed,
    })
  }, [nodeData, form])
  return (
    <Form
      form={form}
      name='basic'
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 26 }}
      className={styles.panelContent}
      initialValues={{
        label: nodeData.label,
        completed: nodeData.completed,
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
          <Option value={Completed.COMPLETED}>Completed</Option>
          <Option value={Completed.NOT_COMPLETED}>To be completed</Option>
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 11, span: 24 }} className={styles.buttonGroup}>
        <Button type='danger' htmlType='button' onClick={handleOnDelete}>
          Delete
        </Button>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ModifyNodeForm
