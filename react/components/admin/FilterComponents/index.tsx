import React from 'react'
import { Input } from 'vtex.styleguide'
import { QuoteFilterStatement, SimpleInputObjectProps } from '../../../typings/quoteTable'

export const SimpleInputObject = ({ values, onChangeObjectCallback }: SimpleInputObjectProps) => (
  <Input
    value={values ?? ''}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeObjectCallback(e.target.value)}
  />
)

export const simpleInputVerbsAndLabel = () => ({
  renderFilterLabel: (st: QuoteFilterStatement) => {
    const value = st?.object
    if (!value) return 'Any'
    const verbMap: Record<string, string> = {
      '=': 'is',
      '!=': 'is not',
      contains: 'contains',
    }
    return `${verbMap[st.verb] || st.verb} "${value}"`
  },
  verbs: [
    {
      label: 'is',
      value: '=',
      object: { renderFn: SimpleInputObject, extraParams: {} },
    },
    {
      label: 'is not',
      value: '!=',
      object: { renderFn: SimpleInputObject, extraParams: {} },
    },
    {
      label: 'contains',
      value: 'contains',
      object: { renderFn: SimpleInputObject, extraParams: {} },
    },
  ],
})
