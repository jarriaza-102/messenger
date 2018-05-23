import axios from 'axios';
import {API_URL} from './utils'
import {authHeader} from './authUser'

export const axiosHelper = {
    getRequest,
    postRequest,
    patchRequest,
    deleteRequest
};

async function getRequest(route) {
    try {
        const response = await axios(getHttpRequest('GET', API_URL + route, undefined));
        return response.data;
    } catch(error) {
        console.log('API ERROR');
        console.log(error);
    }
}

async function postRequest(route, data) {
    try {
        const response = await axios(getHttpRequest('POST', API_URL + route, data));
        return response.data;
    } catch(error) {
        console.log('API ERROR');
        console.log(error);
    }
}

async function patchRequest(route, data) {
    try {
        const response = await axios(getHttpRequest('PATCH', API_URL + route, data));
        return response.data;
    } catch(error) {
        console.log('API ERROR');
        console.log(error);
    }
}

async function deleteRequest(route) {
    try {
        const response = await axios(getHttpRequest('DELETE', API_URL + route));
        return response.data;
    } catch(error) {
        console.log('API ERROR');
        console.log(error);
    }
}

function getHttpRequest(method, url, data) {
    return {
        method: method,
        url: url,
        data: data,
        headers: authHeader()
    }
}