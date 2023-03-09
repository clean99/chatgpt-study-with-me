import * as React from 'react'
import Button from '../../Button'
import styles from '../index.module.scss'

interface EditButtonProps {
  editable: boolean
  setEditable: (editable: boolean) => void
  editableText?: string
  notEditableText?: string
}

const EditButton: React.FC<EditButtonProps> = ({
  editable,
  setEditable,
  editableText = 'Save',
  notEditableText = 'Edit',
}) => {
  return (
    <div className={styles.editableButton}>
      <Button type='primary' onClick={() => setEditable(!editable)}>
        {editable ? editableText : notEditableText}
      </Button>
    </div>
  )
}

export default EditButton
