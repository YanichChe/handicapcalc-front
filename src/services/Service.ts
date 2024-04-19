import {AbstractService} from "./AbstractService";
import {Dictionary} from "../common/types/Dictionary";

export class Service extends AbstractService {
    public async getResultNine(data: Dictionary<any>): Promise<number> {
        const result = await this.client.post(`${this.baseUrl}/nine-holes-cr`, data)
        return result.data as number
    }

    public async getResultEighteenCR(data: Dictionary<any>): Promise<number> {
        const result = await this.client.post(`${this.baseUrl}/eighteen-holes-cr`, data)
        return result.data as number
    }

    public async getResultEighteen(data: Dictionary<any>): Promise<number> {
        const result = await this.client.post(`${this.baseUrl}/eighteen-holes`, data)
        return result.data as number
    }
}
