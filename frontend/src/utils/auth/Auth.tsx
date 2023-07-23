import Swal from 'sweetalert2'
import isResponseOk from "./Api";



const showSwall = (message: string) => {
    Swal.fire({
        title: message,
        confirmButtonText: 'Cool'
    })
}

const getCSRF = async () => {
    try {
        const response = await fetch("http://localhost:8000/api/csrf/", {
            credentials: "include",
        })
        return response.headers.get("X-CSRFToken") || '';
    } catch (error: any) {
        console.log(error)
    }
}


const login = async (
    csrf: string,
    userData: any,
) => {
    fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf,
        },
        credentials: "include",
        body: JSON.stringify({
            username: userData.get('user'),
            password: userData.get('password')
        }),
    })
        .then(isResponseOk)
        .then((response: any) => {
            showSwall(response.detail)
        })
        .catch((err) => {
            console.log(err)
            showSwall('Error')
        });
}

const logout = async () => {
    try {
        const response = await fetch("http://localhost:8000/api/logout", {
            credentials: "include",
        }).then(isResponseOk)
        return response.detail
    } catch (err) {
        console.log(err)
        return 'Error'
    }
};



const getSession = async () => {
    try {
        console.log('session')
        const session = await fetch("http://localhost:8000/api/session/", { credentials: "include" }).then(isResponseOk)
        if (session.isAuthenticated) {
            return true
        }
        return false
    } catch (error: any) {
        console.log(error)
        return false
    }

}

const whoAmI = async () => {
    return fetch("http://localhost:8000/api/whoami/", {
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
        .then(isResponseOk)
        .then(data => {
            return data.username;
        })
        .catch(err => {
            console.log(err)
            showSwall('Error')
        });
}


export { getCSRF, login, logout, getSession, whoAmI }; 