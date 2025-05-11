import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { ExternalClient, Apps } from '@vtex/api'
export default class MasterData extends ExternalClient {
  public credentials!: {
    API_KEY: string
    API_TOKEN: string
  }

  constructor(context: IOContext, options?: InstanceOptions) {
    super(`https://api.vtex.com/${context.account}/dataentities`, context,
      {
        ...options,
        headers: {
          ...options && options.headers,
          ...(context.adminUserAuthToken
            ? { VtexIdclientAutCookie: context.adminUserAuthToken }
            : null),
          'Access-Control-Allow-Origin': '*'


        }
      }
    )
  }

  private async getCredentials(vtex: IOContext) {
    const apps = new Apps(vtex)
    const appId = process.env.VTEX_APP_ID as string
    const settings = await apps.getAppSettings(appId)
    const API_KEY = settings.vtexAppKey
    const API_TOKEN = settings.vtexAppToken
    this.credentials = {
      API_KEY,
      API_TOKEN,
    }
  }

  public async createDocument(body: any, table: string): Promise<IOResponse<any>> {
    if (!this.credentials) {
      await this.getCredentials(this.context)
    }
    return this.http.postRaw(`/${table}/documents`, body, {
      headers: {
        'x-vtex-api-appkey': this.credentials.API_KEY,
        'x-vtex-api-apptoken': this.credentials.API_TOKEN,
      },
    })
  }

  public async getDocument(documentId: string, table: string): Promise<IOResponse<any>> {
    if (!this.credentials) {
      await this.getCredentials(this.context)
    }
    return this.http.getRaw(`/${table}/documents/${documentId}?_fields=_all&_schema=default`, {
      headers: {
        'x-vtex-api-appkey': this.credentials.API_KEY,
        'x-vtex-api-apptoken': this.credentials.API_TOKEN,
      },
    })
  }

  public async getAllDocuments(table: string): Promise<IOResponse<any>> {
    if (!this.credentials) {
      await this.getCredentials(this.context)
    }
    return this.http.getRaw(`/${table}/search?_fields=_all&_schema=default`, {
      headers: {
        'x-vtex-api-appkey': this.credentials.API_KEY,
        'x-vtex-api-apptoken': this.credentials.API_TOKEN,
      },
    })
  }

  public async deleteDocument(documentId: string, table: string): Promise<IOResponse<any>> {
    if (!this.credentials) {
      await this.getCredentials(this.context)
    }
    return this.http.delete(`/${table}/documents/${documentId}`, {
      headers: {
        'x-vtex-api-appkey': this.credentials.API_KEY,
        'x-vtex-api-apptoken': this.credentials.API_TOKEN,
      },
    })
  }

  public async getStatusWithHeaders(
    status: number
  ): Promise<IOResponse<string>> {
    if (!this.credentials) {
      await this.getCredentials(this.context)
    }
    return this.http.getRaw(status.toString(), {
      headers: {
        'x-vtex-api-appkey': this.credentials.API_KEY,
        'x-vtex-api-apptoken': this.credentials.API_TOKEN,
      },
    })
  }



}
