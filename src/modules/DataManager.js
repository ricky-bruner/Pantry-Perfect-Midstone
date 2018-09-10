
const remoteURL = "http://localhost:5002"

export default Object.create(null, {
    getUser: {
        value: (username) => {
            return fetch(`${remoteURL}/users?username=${username}`)
            .then(res => res.json())
        }
    }
})