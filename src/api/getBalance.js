const apiUrl = `https://9tulzhs3q4.execute-api.ap-southeast-2.amazonaws.com/dev/myki/balance`

function postData (url = ``, data = {}) {
    return fetch(url, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export default async function getBalance (username, password) {
    let auth = {
        username: username,
        password: password
    }

    let response = await postData(apiUrl, auth);

    if (response.error) {
        throw new Error (response.error)
    } else {
        return response
    }
}