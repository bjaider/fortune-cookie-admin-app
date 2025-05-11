import { UserInputError } from '@vtex/api'
import { json } from 'co-body'


export async function createQuote(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { masterData }
  } = ctx

  const {
    vtex: { logger },
  } = ctx


  try {
    const { CookieFortune } = await json(ctx.req)

    const createResponse = await masterData.createDocument({ CookieFortune }, "CF")

    logger.debug('Quote was saved successfully')
    ctx.body = {
      message: 'Quote was saved successfully',
      response: { quoteId: createResponse.data.DocumentId, quote: CookieFortune },
    }


    ctx.set('Content-Type', 'application/json')
    ctx.set('Accept', 'application/json')
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Cache-Control', 'private')
    await next()
  } catch (error) {
    logger.error(`Error: ${error}`)
    throw new UserInputError(`Error saving the quote: ${error}`)
  }
}
