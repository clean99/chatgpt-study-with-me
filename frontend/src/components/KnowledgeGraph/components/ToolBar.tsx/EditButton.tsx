import * as React from 'react'
import Button from '../../../Button'
import styles from '../../index.module.scss'

interface EditButtonProps {
  editable: boolean
  handleOnClick: () => void
  editableText?: string
  notEditableText?: string
}

const EditButton: React.FC<EditButtonProps> = ({
  editable,
  handleOnClick,
  editableText = 'Save',
  notEditableText = 'Edit',
}) => {
  return (
    <div className={styles.editableButton}>
      <Button type='primary' onClick={handleOnClick}>
        {editable ? editableText : notEditableText}
      </Button>
    </div>
  )
}

export default EditButton
