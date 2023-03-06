import * as React from 'react'
import Button from '../../Button'
import styles from '../index.module.scss'

interface EditButtonProps {
  editable: boolean
  setEditable: (editable: boolean) => void
}

const EditButton: React.FC<EditButtonProps> = ({ editable, setEditable }) => {
  return (
    <div className={styles.editableButton}>
      <Button type='primary' onClick={() => setEditable(!editable)}>
        {editable ? 'Save' : 'Edit'}
      </Button>
    </div>
  )
}

export default EditButton
