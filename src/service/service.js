import { url } from "./api"

export class FetchCalls {

    async getUserToken(data) {
        const userLoginInfo = { email: data.email, password: data.password }
        try {
            const response = await fetch(
                `${url}/user/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userLoginInfo),
                }
            )
            const data = await response.json()
            localStorage.setItem("token", JSON.stringify(data.body.token))
            console.log(data)
            return data
    
        } catch ( error ) {
    
            console.log(error)
    
        }
    }

    async getUserData(token) {
            try {
                const response = await fetch(
                    `${url}/user/profile`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                const data = await response.json()
                return JSON.stringify(data)
    
            } catch ( error ) {
    
                console.log(error)
    
            }
        }


}

