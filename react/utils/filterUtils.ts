import { getQuotesResponse, QuoteFilterStatement } from "../typings/quoteTable"
export const applyFilters = (items: getQuotesResponse[], filterStatements: QuoteFilterStatement[]): getQuotesResponse[] => {
  const filterItem = (item: getQuotesResponse) => {
    return filterStatements.every((st) => {
      const fieldValue = item.quote.toLowerCase()
      const filterValue = st.object?.toLowerCase() || ''
      switch (st.verb) {
        case '=':
          return fieldValue === filterValue
        case '!=':
          return fieldValue !== filterValue
        case 'contains':
          return fieldValue.includes(filterValue)
        default:
          return true
      }
    })
  }

  return items.filter(filterItem)
}

export const searchItems = (items: getQuotesResponse[], searchValue: string): getQuotesResponse[] => {
  return items.filter(item => item.quote?.toLowerCase().includes(searchValue.toLowerCase()))
}
