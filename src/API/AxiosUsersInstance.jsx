import axios from "axios";

const AxiosUsersInstance = axios.create({
    baseURL:`https://kashop1.runasp.net/api/Customer`,
    headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}
)
export default AxiosUsersInstance;