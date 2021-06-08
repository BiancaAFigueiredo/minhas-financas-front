import axios from 'axios'

const baseApi = axios.create({
  baseURL:'https://basic-finances-backend.herokuapp.com/'
})


export default baseApi