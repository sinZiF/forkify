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