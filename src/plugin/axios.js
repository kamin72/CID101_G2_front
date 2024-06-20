import axios from 'axios'
const publicPath = process.env.NODE_ENV === "production" 
? "/cid101/g2/" 
: "/"

const axiosInstance = axios.create({
    baseURL: publicPath
})

const GET = (url, params) => {
    return new Promise((resolve, reject) => {
        axiosInstance.get(url, params).then(res => {
            resolve(res.data)
        }).catch((error)=>{
            reject(error)
        })
    })
}

export { GET }