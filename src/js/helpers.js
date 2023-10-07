import { TIMER } from "./config";

const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took to long. Timeout after ${s} second`))
        }, s * 1000)
    })
}

export const AJAX = async function(url, uploadData = undefined) {
    try {
        const fetchPro = uploadData ? fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData)
        }) : fetch(url);

        const res = await Promise.race([fetchPro, timeout(TIMER)])
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`${data.status}: ${data.message} !!!!`);
        }
        return data;
    } catch (error) {
        throw new Error(error.message)
    }

}
/*
export const getJSON = async function(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} ${res.status}`)
        return data;
    } catch(error) {
        throw new Error(error)
    }
}

export const sendJSON = async function(url, newRecipe) {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecipe)
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`${data.status}: ${data.message} !!!!`);
        }
        return data;
    }  catch(err) {
        throw new Error(err.message)
    }
}
*/