import React, { useState } from 'react'
import { Spinner } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { getQuotes } from '../../services/fortuneCookieService'
import { generateLuckyNumber } from '../../utils/fortuneUtils'
import { getQuotesResponse } from '../../typings/quoteTable'
import { useIntl } from 'react-intl'

const CSS_HANDLES = [
  'fortuneCookieContainer',
  'fortuneCookieBackgroundImage',
  'fortuneCookieButton',
  'fortuneCookieSpinner',
  'fortuneCookieQuoteWrapper',
  'fortuneCookiePhrase',
  'fortuneCookieLuckyNumberContainer',
  'fortuneCookieLuckyNumber',
]

type fortuneCookieQuoteProps = {
  backgroundImage: string
}

const FortuneCookieQuote = ({ backgroundImage }: fortuneCookieQuoteProps) => {
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
      <img src={backgroundImage} alt="background image" className={handles.fortuneCookieBackgroundImage} />
      {loading && (
        <div className={handles.fortuneCookieSpinner}>
          <Spinner />
        </div>
      )}

      {!loading && luckyNumber && (
        <div className={handles.fortuneCookieLuckyNumberContainer}>
          <h5 className={handles.fortuneCookieLuckyNumber}>
            {luckyNumber}
          </h5>
        </div>
      )}

      {!loading && quote && (
        <div className={handles.fortuneCookieQuoteWrapper}>
          <h3 className={handles.fortuneCookiePhrase}>{quote}</h3>
        </div>
      )}

      <button
        className={handles.fortuneCookieButton}
        onClick={generate}
        disabled={loading}
      >
        {intl.formatMessage({ id: 'store/fortune-cookie-quote.generate' })}
      </button>
    </div>
  )
}

FortuneCookieQuote.schema = {
  title: 'Fortune cookies app',
  type: 'object',
  properties: {
    backgroundImage: {
      title: 'Imagen de fondo',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
  },
};



export default FortuneCookieQuote
