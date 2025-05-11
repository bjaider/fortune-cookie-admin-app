import { UserInputError } from "@vtex/api"


export async function deleteQuoteById(ctx: Context, next: () => Promise<any>) {

  const {
    clients: { masterData }
  } = ctx

  const {
    vtex: {
      route: {
        params: { id }
      },
    },
  } = ctx

  const {
    vtex: { logger },
  } = ctx

  try {
    await masterData.deleteDocument(id as string, "CF")
    const response = await masterData.getAllDocuments("CF")
    ctx.status = 200
    ctx.body = {
      message: 'Success',
      status: 200,
      data: response.data
    }
    ctx.set('Content-Type', 'application/json')
    ctx.set('Accept', '*/*')
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    ctx.set('Cache-Control', 'private')
    await next();
  } catch (error) {
    logger.debug(error.message)
    ctx.status = error.response.status ?? 500
    ctx.body = {
      message: error.message,
      status: error.response.status,
      data: {}
    }
    throw new UserInputError(error.message)
  }

}
