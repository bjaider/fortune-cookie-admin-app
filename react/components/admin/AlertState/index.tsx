import React from 'react'
import { Alert } from 'vtex.styleguide'
import { AlertStateProps } from '../../../typings/quoteTable'

const AlertState = ({ message, type, visible, onClose }: AlertStateProps) => {
  if (!visible) return null
  return (
    <div className="mb5">
      <Alert type={type} onClose={onClose}>
        {message}
      </Alert>
    </div>
  )
}

export default AlertState
