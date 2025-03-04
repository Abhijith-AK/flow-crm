import commonAPI from "./commonAPI";
import SERVERURL from "./serverURL";

// verify email before registering
export const registerVerifyEmailAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/api/verify`, reqBody)
}

// register
export const registerManagerAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/api/register`, reqBody)
}

// create crm
export const createCRMAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/api/create`, reqBody)
}

// assign crm
export const assignManagerAPI = async (reqBody) => {
    return await commonAPI("PUT", `${SERVERURL}/api/assign`, reqBody)
}

// login
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/api/login`, reqBody)
}

// getCRM
export const getCRMAPI = async (id, reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/api/crm/${id}`, {}, reqHeader)
}