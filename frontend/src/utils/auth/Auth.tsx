import Swal from 'sweetalert2'

const showSwall = (message: string) => {
    Swal.fire({
        title: message,
        confirmButtonText: 'Cool'
    })
}

const getCSRF = async () => {
    try {
        const response = await fetch("http://localhost:8000/auth/csrf/", {
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
    fetch("http://localhost:8000/auth/login/", {
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
        .then(x => x.json())
        .then((response: any) => {
            showSwall(response.detail)
        })
        .catch((err) => {
            console.log(err)
        });
}

const logout = async () => {
    try {
        const response = await fetch("http://localhost:8000/auth/logout", {
            credentials: "include",
        }).then(x => x.json())
        return response.detail
    } catch (err) {
        console.log(err)
        return 'Error'
    }
};



const getSession = async () => {
    try {
        const session = await fetch("http://localhost:8000/auth/session/", { credentials: "include" }).then(x => x.json())
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
    return fetch("http://localhost:8000/auth/whoami/", {
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
        .then(x => x.json())
        .then(data => {
            return data.username;
        })
        .catch(err => {
            console.log(err)
        });
}


export { getCSRF, login, logout, getSession, whoAmI }; 