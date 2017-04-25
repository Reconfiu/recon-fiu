import promise from "request-promise"
import { BASE_URL } from './config'
var r_promise = promise.defaults({ jar: true })


let login = (username, password) => {
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
};

let signUp = (username, password) => {
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
    let user = JSON.parse(window.sessionStorage.getItem("user"))
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

var getSample = (size) => {
      return r_promise({
        method: "GET",
        url: `${BASE_URL}/api/getall/${size}` ,        
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json'
        }
    })
} 

var add_comment = ({body, id}) => {
    let {username, token} = JSON.parse(window.sessionStorage.getItem("user"))
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

var logout = () => {
    let {username, token} = JSON.parse(window.sessionStorage.getItem("user"))
    return r_promise({
        method: "POST",
        url: `${BASE_URL}/api/logout`,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json'
        },
        body: {
            user: {
                username
            },
            token
        },
        json: true
    })
}

export {
    login,
    signUp,
    searchBy,
    add_comment,
    logout,
    getSample
}