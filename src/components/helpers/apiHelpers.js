import { Axios } from "axios";

/*export const postData = async (url = '', data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    return response;
};*/

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const getBudget = async () =>{
    const url = `http://localhost:3000/api/budget`
    const response = await Axios.get(url, config);
    return response;
}

export const postBudget = async (data) => {
    const url = `http://localhost:3000/api/budget`;
    const body = data
    const response = await Axios.post(url, body, config);
    return response;
}

export const getExpense = async () => {
    const url = `http://localhost:3000/api/expenses`
    const response = await Axios.get(url, config);
    console.log('res', response)
    return response;
}

export const postExpense = async (data) => {
    const url = `http://localhost:3000/api/expense`;
    const body = data
    const response = await Axios.post(url, body, config);
    return response;
}