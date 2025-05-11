import React, { useState } from 'react'
import { Spinner } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { getQuotes } from '../../services/fortuneCookieService'
import { generateLuckyNumber } from '../../utils/fortuneUtils'
import { getQuotesResponse } from '../../typings/quoteTable'
import { useIntl } from 'react-intl'

const CSS_HANDLES = [
  'fortuneCookieContainer',
  'fortuneCookieButton',
  'fortuneCookieSpinner',
  'fortuneCookieQuoteWrapper',
  'fortuneCookiePhrase',
  'fortuneCookieLuckyNumber',
]

const FortuneCookieQuote: React.FC = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const [loading, setLoading] = useState(false)
  const [quote, setQuote] = useState<getQuotesResponse | string>('')
  const [luckyNumber, setLuckyNumber] = useState('')
  const [quotes, setQuotes] = useState<getQuotesResponse[]>([])

  const intl = useIntl()

  const generate = async () => {
    if (quotes.length === 0) {
      try {
        setLoading(true)
        setQuote('')
        setLuckyNumber('')

        const newQuotes = await getQuotes()
        setQuotes(newQuotes)

        const newQuote = newQuotes[Math.floor(Math.random() * newQuotes.length)].quote
        const newLucky = generateLuckyNumber()

        setQuote(newQuote)
        setLuckyNumber(newLucky)
      } catch (error) {
        console.error('Error generating quote:', error)
        setQuote(intl.formatMessage({ id: 'store/fortune-cookie-quote.error' }))
        setLuckyNumber('')
      } finally {
        setLoading(false)
      }
    } else {
      const newQuote = quotes[Math.floor(Math.random() * quotes.length)].quote
      const newLucky = generateLuckyNumber()

      setQuote(newQuote)
      setLuckyNumber(newLucky)
    }
  }

  return (
    <div className={handles.fortuneCookieContainer}>
      <button
        className={handles.fortuneCookieButton}
        onClick={generate}
        disabled={loading}
      >
        {loading ? intl.formatMessage({ id: 'store/fortune-cookie-quote.loading' }) : intl.formatMessage({ id: 'store/fortune-cookie-quote.generate' })}
      </button>

      {loading && (
        <div className={handles.fortuneCookieSpinner}>
          <Spinner />
        </div>
      )}

      {!loading && quote && luckyNumber && (
        <div className={handles.fortuneCookieQuoteWrapper}>
          <h3 className={handles.fortuneCookiePhrase}>{quote}</h3>
          <h5 className={handles.fortuneCookieLuckyNumber}>
            {intl.formatMessage({ id: 'store/fortune-cookie-quote.luckyNumber' })}: {luckyNumber}
          </h5>
        </div>
      )}
    </div>
  )
}

export default FortuneCookieQuote
