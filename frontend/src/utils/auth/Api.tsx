import Swal from "sweetalert2";

const isResponseOk = (response: any) => {
    if (response.status >= 200 && response.status <= 299) {
        return response.json();
    } else {
        response.json().then((result: any) => {
            Swal.fire({
                title: result.detail,
                confirmButtonText: 'Cool'
            })
            return false
        })
    }
}

export default isResponseOk;
