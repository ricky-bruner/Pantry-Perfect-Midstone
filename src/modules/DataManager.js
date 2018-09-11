
const remoteURL = "http://localhost:5002"

export default Object.create(null, {
    getUser: {
        value: (username) => {
            return fetch(`${remoteURL}/users?username=${username}`)
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