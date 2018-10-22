
const remoteURL = "https://pantry-perfect-server.herokuapp.com"

export default Object.create(null, {
    get: {
        value: (resource) => {
            return fetch(`${remoteURL}/${resource}`)
            .then(res => res.json())
        }
    },
    getUserName: {
        value: (username) => {
            return fetch(`${remoteURL}/users?username=${username}`)
            .then(res => res.json())
        }
    },
    getUserEmail: {
        value: (email) => {
            return fetch(`${remoteURL}/users?email=${email}`)
            .then(res => res.json())
        }
    },
    getUserLogin: {
        value: (username, password) => {
            return fetch(`${remoteURL}/users?username=${username}&password=${password}`)
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
            .then(res => res.json())
        }
    },
    edit: {
        value: (resource, id, object) => {
            return fetch(`${remoteURL}/${resource}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            })
            .then(res => res.json())
        }
    },
    delete: {
        value: (resource, id) => {
            return fetch(`${remoteURL}/${resource}/${id}`, {
                method: "DELETE"
            }).then(res => res.json())
        }
    }
})