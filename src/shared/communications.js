import promise from "request-promise"
import { BASE_URL } from './constants'
var r_promise = promise.defaults({ jar: true })


var login = (username, password) => {
    return r_promise({
        method: 'POST',
        url: `${BASE_URL}/api/login`,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json'
        },
        body: {
            user: { username, password }
        },
        json: true
    })
}

var signUp = (username, password) => {
    return r_promise({
        method: "POST",
        url: `${BASE_URL}/api/adduser`,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json'
        },
        body: {
            user: { username, password }
        },
        json: true
    })
}

var searchBy = (query) => {
    let user = JSON.parse(window.localStorage.getItem("user"))
    return r_promise({
        method: "POST",
        url: `${BASE_URL}/api/searchby`,        
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json'
        },
        body: {
            query, user: { username: user.username }, token: user.token
        },
        json: true
    })
}

var add_comment = ({body, id}) => {
    let {username, token} = JSON.parse(window.localStorage.getItem("user"))
    console.log({username, token, body, id})
    return r_promise({
        method: "POST",
        url: `${BASE_URL}/api/addcomment`,        
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json'
        },
        body: {
            user: { 
                username
            },
            body,
            id,
            token
        },
        json: true
    })
}

export {
    login,
    signUp,
    searchBy,
    add_comment
}