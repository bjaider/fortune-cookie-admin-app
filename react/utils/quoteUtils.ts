import { createQuote, deleteQuoteById } from "../services/fortuneCookieService"
import { getQuotesResponse, QuoteRow } from "../typings/quoteTable"

export const handleCreateQuote = async (
  quote: string,
  setItems: React.Dispatch<React.SetStateAction<getQuotesResponse[]>>,
  closeModal: () => void,
  showAlert: (message: string, type: 'success' | 'error') => void
) => {
  try {
    const newQuoteData = await createQuote(quote)
    setItems((prevItems) => [...prevItems, newQuoteData.response])
    closeModal()
    showAlert('Quote created successfully!', 'success')
  } catch (error) {
    showAlert('Failed to create the quote.', 'error')
  }
}

export const handleDeleteQuotes = async (
  items: getQuotesResponse[],
  pendingDeleteRows: QuoteRow[],
  setItems: React.Dispatch<React.SetStateAction<getQuotesResponse[]>>,
  setTableKey: React.Dispatch<React.SetStateAction<number>>,
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setPendingDeleteRows: React.Dispatch<React.SetStateAction<QuoteRow[]>>,
  showAlert: (message: string, type: 'success' | 'error') => void
) => {
  try {
    const deletePromises = pendingDeleteRows.map((row) =>
      deleteQuoteById(row.quoteId)
    )
    await Promise.all(deletePromises)

    const updatedItems = items.filter(
      (item) =>
        !pendingDeleteRows.find((row) => row.quoteId === item.quoteId)
    )
    setItems(updatedItems)
    setTableKey((prev) => prev + 1)
    showAlert('Quotes deleted successfully!', 'success')
  } catch (error) {
    showAlert('Failed to delete the quotes.', 'error')
  } finally {
    setTableKey((prev) => prev + 1)
    setIsDeleteModalOpen(false)
    setPendingDeleteRows([])
  }
}

export const confirmDeleteQuotes = (
  selectedRows: QuoteRow[],
  setPendingDeleteRows: React.Dispatch<React.SetStateAction<QuoteRow[]>>,
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setPendingDeleteRows(selectedRows)
  setIsDeleteModalOpen(true)
}
