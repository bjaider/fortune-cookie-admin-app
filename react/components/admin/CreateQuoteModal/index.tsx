import React, { useState } from 'react'
import { Modal, Button, Textarea } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

interface CreateQuoteModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (quote: string) => void
}

const CreateQuoteModal = ({ isOpen, onClose, onCreate }: CreateQuoteModalProps) => {
  const [quote, setQuote] = useState('')
  const intl = useIntl()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuote(e.target.value)
  }

  const handleSubmit = () => {
    if (quote.trim()) {
      onCreate(quote)
      setQuote('')
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={intl.formatMessage({ id: 'admin/create-quote-modal.title' })}
    >
      <div>
        <Textarea
          value={quote}
          onChange={handleInputChange}
          placeholder={intl.formatMessage({ id: 'admin/create-quote-modal.placeholder' })}
        />
      </div>
      <div className="flex justify-end mt4">
        <Button variation="secondary" onClick={onClose}>
          {intl.formatMessage({ id: 'admin/create-quote-modal.cancel' })}
        </Button>
        <span className="ml3">
          <Button variation="primary" onClick={handleSubmit}>
            {intl.formatMessage({ id: 'admin/create-quote-modal.create' })}
          </Button>
        </span>
      </div>
    </Modal>
  )
}

export default CreateQuoteModal
