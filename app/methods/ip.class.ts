import { URI } from "@/config"
import axios from "axios"

export class IPClass {
    public getIpSpecific = (represent: number): Promise<any> => {
        return new Promise((resolve) => {
            axios.get(`${URI}/api/ip/${represent}`).then((res) => {
                resolve(res)
            })
        })
    }

    public getIp = () => {
        return new Promise((resolve) => {
            axios.get(`${URI}/api/ip`).then((res) => {
                resolve(res)
            })
        })
    }

    public updateConfig = (listIp: object[]) => {
        return new Promise((resolve) => {
            axios.patch(`${URI}/api/updateConfig`, {
                listIp: listIp
            }).then((res) => {
                resolve(res)
            })
        })
    }
}