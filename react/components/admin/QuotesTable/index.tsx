import React, { useState, useEffect, Fragment } from 'react'
import { Table, ModalDialog } from 'vtex.styleguide'
import CreateQuoteModal from '../CreateQuoteModal/index'
import { getQuotesResponse, QuoteFilterStatement, QuoteRow } from '../../../typings/quoteTable'
import { getQuotes } from '../../../services/fortuneCookieService'
import { applyFilters, searchItems } from '../../../utils/filterUtils'
import AlertState from '../AlertState/index'
import { getFontSize } from '../../../utils/tableUtils'
import { confirmDeleteQuotes, handleCreateQuote, handleDeleteQuotes } from '../../../utils/quoteUtils'
import { simpleInputVerbsAndLabel } from '../FilterComponents/index'
import { useIntl } from 'react-intl'

const QuotesTable = () => {
  const [items, setItems] = useState<getQuotesResponse[]>([])
  const [filteredItems, setFilteredItems] = useState<getQuotesResponse[]>([])
  const [tableDensity, setTableDensity] = useState<'low' | 'medium' | 'high'>('low')
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const [filterStatements, setFilterStatements] = useState<QuoteFilterStatement[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [tableKey, setTableKey] = useState<number>(0)
  const [pendingDeleteRows, setPendingDeleteRows] = useState<QuoteRow[]>([])
  const [alertState, setAlertState] = useState<{ message: string, type: 'success' | 'error', visible: boolean }>({
    message: '',
    type: 'success',
    visible: false,
  })

  const intl = useIntl()

  const showAlert = (message: string, type: 'success' | 'error') => {
    setAlertState({ message, type, visible: true })
    setTimeout(() => setAlertState(prev => ({ ...prev, visible: false })), 3000)
  }

  const fetchQuotes = async () => {
    try {
      const allQuotes = await getQuotes()
      setItems(allQuotes)
      setFilteredItems(allQuotes)
    } catch (error) {
      console.error('Error retrieving the quotes', error)
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  useEffect(() => {
    const filtered = applyFilters(items, filterStatements)
    setFilteredItems(filtered)
  }, [filterStatements, items])

  const handleSearchSubmit = () => {
    if (!searchValue || searchValue.trim() === '') {
      setFilteredItems(items)
    } else {
      const search = searchValue.toLowerCase()
      setFilteredItems(searchItems(items, search))
    }
  }

  return (
    <div>
      <AlertState
        message={alertState.message}
        type={alertState.type}
        visible={alertState.visible}
        onClose={() => setAlertState(prev => ({ ...prev, visible: false }))}
      />
      <Table
        fullWidth
        key={tableKey}
        items={filteredItems}
        rowKey="quoteId"
        schema={{
          properties: {
            quote: {
              title: intl.formatMessage({ id: 'admin/quotes-table.column.quote' }),
              cellRenderer: ({ cellData }: { cellData: string }) => (
                <span className={getFontSize(tableDensity)}>{cellData}</span>
              ),
            },
          },
        }}
        density={tableDensity}
        toolbar={{
          density: {
            buttonLabel: intl.formatMessage({ id: 'admin/quotes-table.toolbar.density.buttonLabel' }),
            lowOptionLabel: intl.formatMessage({ id: 'admin/quotes-table.toolbar.density.lowOptionLabel' }),
            mediumOptionLabel: intl.formatMessage({ id: 'admin/quotes-table.toolbar.density.mediumOptionLabel' }),
            highOptionLabel: intl.formatMessage({ id: 'admin/quotes-table.toolbar.density.highOptionLabel' }),
            handleCallback: setTableDensity,
          },
          inputSearch: {
            value: searchValue ?? '',
            placeholder: intl.formatMessage({ id: 'admin/quotes-table.toolbar.inputSearch.placeholder' }),
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value),
            onClear: () => {
              setSearchValue('')
              setFilteredItems(items)
            },
            onSubmit: handleSearchSubmit,
          },
          newLine: {
            label: intl.formatMessage({ id: 'admin/quotes-table.toolbar.newLine.label' }),
            handleCallback: () => setIsModalOpen(true),
          },
        }}
        filters={{
          alwaysVisibleFilters: ['quote'],
          statements: filterStatements,
          onChangeStatements: setFilterStatements,
          clearAllFiltersButtonLabel: intl.formatMessage({ id: 'admin/quotes-table.filters.clearAllFiltersButtonLabel' }),
          collapseLeft: true,
          options: {
            quote: {
              label: intl.formatMessage({ id: 'admin/quotes-table.filters.options.quote.label' }),
              ...simpleInputVerbsAndLabel(),
            },
          },
        }}
        bulkActions={{
          texts: {
            secondaryActionsLabel: intl.formatMessage({ id: 'admin/quotes-table.bulkActions.secondaryActionsLabel' }),
            rowsSelected: (qty: number) => (
              <Fragment>{intl.formatMessage({ id: 'admin/quotes-table.bulkActions.texts.allRowsSelected' }, { qty })}</Fragment>
            ),
            selectAll: intl.formatMessage({ id: 'admin/quotes-table.bulkActions.texts.selectAll' }),
            allRowsSelected: (qty: number) => (
              <Fragment>{intl.formatMessage({ id: 'admin/quotes-table.bulkActions.texts.allRowsSelected' }, { qty })}</Fragment>
            ),
          },
          totalItems: items.length,
          main: {
            label: intl.formatMessage({ id: 'admin/quotes-table.bulkActions.main.label' }),
            handleCallback: ({ selectedRows }: { selectedRows: QuoteRow[] }) => confirmDeleteQuotes(selectedRows, setPendingDeleteRows, setIsDeleteModalOpen),
          },
        }}
      />
      <CreateQuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={(quote: string) => handleCreateQuote(quote, setItems, () => setIsModalOpen(false), showAlert)}
      />
      <ModalDialog
        centered
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        confirmation={{
          onClick: () => handleDeleteQuotes(items, pendingDeleteRows, setItems, setTableKey, setIsDeleteModalOpen, setPendingDeleteRows, showAlert),
          label: intl.formatMessage({ id: 'admin/quotes-table.modalDialog.confirm' }),
          isDangerous: true,
        }}
        cancelation={{
          onClick: () => setIsDeleteModalOpen(false),
          label: intl.formatMessage({ id: 'admin/quotes-table.modalDialog.cancel' }),
        }}
      >
        <span>
          {intl.formatMessage({ id: 'admin/quotes-table.bulkActions.main.confirmation' }, { qty: pendingDeleteRows.length })}
        </span>
      </ModalDialog>
    </div>
  )
}

export default QuotesTable
