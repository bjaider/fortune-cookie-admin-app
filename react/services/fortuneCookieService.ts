import { DocumentResponse, getQuotesResponse } from "../typings/quoteTable"


export const getQuotes = async (): Promise<getQuotesResponse[]> => {
  const response = await fetch('/_v/documents/quotes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  const data: { data: DocumentResponse[] } = await response.json()

  if (!data.data.length) {
    throw new Error('No quotes found')
  }

  return data.data.map(({ id, CookieFortune }) => ({ quoteId: id, quote: CookieFortune }))
}

export const createQuote = async (quote: string) => {
  try {
    const response = await fetch('/_v/documents/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ CookieFortune: quote }),
    })

    if (!response.ok) {
      throw new Error('Error creating the quote')
    }

    const newQuoteData = await response.json()
    return newQuoteData
  } catch (error) {
    console.error('Error creating the quote:', error)
    throw error
  }
}

export const deleteQuoteById = async (quoteId: string) => {
  try {
    const response = await fetch(`/_v/documents/quote/${quoteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Error deleting the quote')
    }

    return await response.json()
  } catch (error) {
    console.error('Error deleting the quote:', error)
    throw error
  }
}
