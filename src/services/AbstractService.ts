import {HTTPClient} from "../common/HttpClient";

export class AbstractService {
    protected readonly baseUrl: string

    protected readonly client: HTTPClient

    constructor(baseUrl: string, client: HTTPClient) {
        this.baseUrl = baseUrl
        this.client = client
    }
}