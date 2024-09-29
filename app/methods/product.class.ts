import axios from "axios"

export class Product {

    public remainItem = (endpoint: string):Promise<[]> => {
        return new Promise((resolve, reject) => {
            axios.get(`http://${endpoint}/api/remainItem`).then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(404)
            })
        })
    }

    public getProduct = (endpoint: string, page: number): Promise<{ products: [], totalPage: number }> => {
        return new Promise((resolve, reject) => {
            axios.get(`http://${endpoint}/api/products/${page}`).then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(404)
            })
        })
    }


    public searchProduct = (endpoint: string, keyword: string): Promise<{ searchProducts: [] }> => {
        return new Promise((resolve, reject) => {
            axios.get(`http://${endpoint}/api/search/${keyword}`).then((res) => {
                resolve(res.data)
            })
        })
    }
}