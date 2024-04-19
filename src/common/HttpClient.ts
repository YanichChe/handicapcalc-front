import type {AxiosRequestConfig, AxiosResponse} from 'axios'
import {default as axios} from 'axios'
import {Dictionary} from './types/Dictionary'

export class HTTPClient {

    private static instance: HTTPClient

    private readonly timeout: number

    constructor(timeout: number = 30_000, headers: Dictionary<string> = { 'Content-Type': 'application/json' }) {
        this.timeout = timeout
    }

    public static getInstance(): HTTPClient {
        if (!HTTPClient.instance) {
            const timeout = 30_000
            const headers = { 'Content-Type': 'application/json' }
            HTTPClient.instance = new HTTPClient(timeout, headers)
        }

        return HTTPClient.instance
    }

    public async post<T = any>(
        url: string,
        data: Dictionary<any> | string,
        timeout_?: number,
        parameters: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T>> {
        const config = {
            timeout: timeout_ ?? this.timeout,
            ...parameters,
        }
        try {
            return await axios.post(url, data, config)
        } catch (error) {
            throw error
        }
    }
}
