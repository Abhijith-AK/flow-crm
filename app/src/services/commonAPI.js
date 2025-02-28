import axios from "axios"

const commonAPI = async (method, url, reqBody, reqHeader) => {
    const reqConfig = {
        method,
        url,
        data: reqBody,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
    }

    return await axios(reqConfig).then(res => res).catch(err => err)
}

export default commonAPI