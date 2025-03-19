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

// get all CRM
export const getAllCRMAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/api/all-crm`, {}, reqHeader)
}

// register Employee
export const registerEmployeeAPI = async ( reqHeader, reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/api/employee/register`, reqBody, reqHeader)
}

// get all employee
export const getAllEmployeeAPI = async (id, reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/api/employee/all/${id}`, {}, reqHeader)
}

// get employee
export const getEmployeeAPI = async (id, reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/api/employee/${id}`, {}, reqHeader)
}

// update employee
export const updateEmployeeAPI = async (id, reqHeader, reqBody) => {
    return await commonAPI("PUT", `${SERVERURL}/api/employee/${id}`, reqBody, reqHeader)
}

// delete employee
export const deleteEmployeeAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${SERVERURL}/api/employee/${id}`, {}, reqHeader)
}

// add lead
export const addLeadAPI = async ( reqHeader, reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/api/crm/lead/add`, reqBody, reqHeader)
}

// get lead
export const getLeadAPI = async (id, reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/api/crm/lead/${id}`, {}, reqHeader)
}

// get all lead
export const getAllLeadAPI = async (id, reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/api/crm/leads-all/${id}`, {}, reqHeader)
}

// update lead
export const updateLeadAPI = async ( reqHeader, reqBody) => {
    return await commonAPI("PUT", `${SERVERURL}/api/crm/lead/update`, reqBody, reqHeader)
}

// update lead status
export const updateLeadStatusAPI = async (reqHeader, reqBody) => {
    return await commonAPI("PUT", `${SERVERURL}/api/crm/lead/update-status`, reqBody, reqHeader)
}


// delete lead
export const deleteLeadAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${SERVERURL}/api/crm/lead/delete/${id}`, {}, reqHeader)
}

// add task
export const addTaskAPI = async (reqHeader, reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/api/crm/task/add`, reqBody, reqHeader)
}

// get task
export const getTaskAPI = async (id, reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/api/crm/task/${id}`, {}, reqHeader)
}

// get all task
export const getAllTaskAPI = async (id, reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/api/crm/tasks-all/${id}`, {}, reqHeader)
}

// update task
export const updateTaskAPI = async (reqHeader, reqBody) => {
    return await commonAPI("PUT", `${SERVERURL}/api/crm/task/update`, reqBody, reqHeader)
}

// delete task
export const deleteTaskAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${SERVERURL}/api/crm/task/delete/${id}`, {}, reqHeader)
}

// add Note
export const addNoteAPI = async (reqHeader, reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/api/crm/note/add`, reqBody, reqHeader)
}

// get all Note
export const getAllNoteAPI = async (id, leadId, reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/api/crm/${id}/note/${leadId}`, {}, reqHeader)
}

// delete Note
export const deleteNoteAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${SERVERURL}/api/crm/note/delete/${id}`, {}, reqHeader)
}

// delete crm
export const deleteCrmAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${SERVERURL}/api/delete-crm/${id}`, {}, reqHeader)
}