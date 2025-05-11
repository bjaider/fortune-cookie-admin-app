export type ShowToastType = (options: {
  message: string
  duration?: number
  type: 'success' | 'error' | 'info' | 'warning'
}) => void

export type DocumentResponse = {
  id: string,
  CookieFortune: string
}

export type getQuotesResponse = {
  quoteId: string,
  quote: string
}

export type QuoteFilterStatement = {
  subject: string
  verb: '=' | '!=' | 'contains'
  object?: string
}

export type TableDensity = 'low' | 'medium' | 'high'

export type QuoteRow = {
  quoteId: string
  CookieFortune: string
}

export type AlertStateProps = {
  message: string
  type: 'success' | 'error'
  visible: boolean
  onClose: () => void
}

export type SimpleInputObjectProps = {
  values: string
  onChangeObjectCallback: (val: string) => void
}
