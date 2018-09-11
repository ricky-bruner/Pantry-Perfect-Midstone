
const remoteURL = "http://localhost:5002"

export default Object.create(null, {
    get: {
        value: (resource) => {
            return fetch(`${remoteURL}/${resource}`)
            .then(res => res.json())
        }
    },
    getUser: {
        value: (username) => {
            return fetch(`${remoteURL}/users?username=${username}`)
            .then(res => res.json())
        }
    },
    getUserData: {
        value: (resource, userId) => {
            return fetch(`${remoteURL}/${resource}?userId=${userId}`)
            .then(res => res.json())
        }
    },
    add: {
        value: (resource, object) => {
            return fetch(`${remoteURL}/${resource}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            })
        }
    }
})