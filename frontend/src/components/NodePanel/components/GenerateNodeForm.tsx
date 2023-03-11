import * as React from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Button as AntdButton } from 'antd'
import { Input } from '../../Input'
import Button from '../../Button'
import styles from '../index.module.scss'

const MAX_NODES = 5

interface GenerateNodeFormProps {
  onSubmit: (titles: string[]) => void
  nodeId: string
}

const GenerateNodeForm: React.FC<GenerateNodeFormProps> = ({ onSubmit, nodeId }) => {
  const [form] = Form.useForm()
  const onFinish = (values: { labels: string[] }) => {
    onSubmit(values.labels)
  }
  React.useEffect(() => {
    form.setFieldsValue({
      labels: [],
    })
  }, [form, nodeId])
  return (
    <Form
      form={form}
      name='dynamic_form_item'
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 26 }}
      onFinish={onFinish}
      className={styles.panelContent}
    >
      <Form.List
        name='labels'
        rules={[
          {
            validator: async (_, names) => {
              if (!names) {
                return Promise.reject(new Error('At least 1 node'))
              }
              if (names.length > MAX_NODES) {
                return Promise.reject(new Error(`At most ${MAX_NODES} nodes at a time`))
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item label={index === 0 ? 'Titles' : ''} required={true} key={field.key}>
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'Please input node\'s title or delete this field.',
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder='node title' className='w-11/12 mr-2' />
                </Form.Item>
                <MinusCircleOutlined
                  className='dynamic-delete-button'
                  onClick={() => remove(field.name)}
                />
              </Form.Item>
            ))}
            {fields.length < MAX_NODES && (
              <Form.Item>
                <AntdButton
                  type='dashed'
                  onClick={() => add()}
                  style={{ width: '100%' }}
                  icon={<PlusOutlined />}
                >
                  Add field
                </AntdButton>
              </Form.Item>
            )}
            <Form.ErrorList errors={errors} />
          </>
        )}
      </Form.List>
      <Form.Item wrapperCol={{ offset: 18, span: 24 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default GenerateNodeForm
