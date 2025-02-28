import commonAPI from "./commonAPI";
import SERVERURL from "./serverURL";

export const registerVerifyEmailAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/api/verify`, reqBody)
}

export const registerManagerAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/api/register`, reqBody)
}

export const createCRMAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/api/create`, reqBody)
}

export const assignManagerAPI = async (reqBody) => {
    return await commonAPI("PUT", `${SERVERURL}/api/assign`, reqBody)
}