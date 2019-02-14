import React, { useState } from 'react'
import { Modal, Button, Input } from 'antd'
import { InfoText } from '../general/InfoText'

const ApiKeyModal = ({ isOpen, onChange, onClose }) => {
  const [value, setValue] = useState('')
  return (
    <Modal
      title={`API Key`}
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      maskClosable={true}
    >
      <Input
        size='large'
        placeholder='API Key'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <InfoText center>
        Get your API Key from the <a href='/api-portal'>API Portal</a>
      </InfoText>
      <Button
        type='primary'
        icon='enter'
        style={{ width: '100%' }}
        onClick={() => onChange(value)}
        disabled={!value}
      >
        Set API Key
      </Button>
    </Modal>
  )
}

export default ApiKeyModal