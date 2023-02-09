import axios from 'axios'

const base = axios.create({ //Configurações do axios
    baseURL: `http://localhost:8000`, //URL base
    headers: {
        "Content-Type": "application/json"
    }
})

export default base