import { url } from "./api"

export class FetchCalls {

    async userAuthentication(data) {
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
            localStorage.setItem("token", data.body.token)
            const userData = await this.getUserData(data.body.token)
            const myPayload = {
                token: data.body.token,
                firstName: userData.firstName,
                lastName: userData.lastName
            }
            return myPayload
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
                console.log(data.body)
                return data.body
            } catch ( error ) {
                console.log(error)
            }
        }

        async updateUserName(token, myFirstName, myLastName) {
            const myBody = {
                firstName: myFirstName,
                lastName: myLastName
            }
            try {
                const response = await fetch(
                    `${url}/user/profile`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(myBody)
                        
                    }
                )
                const data = await response.json()
                return JSON.stringify(data)
            } catch ( error ) {
                console.log(error)
            }
        }


}