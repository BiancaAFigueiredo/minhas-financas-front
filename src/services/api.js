import axios from 'axios'

const baseApi = axios.create({
  baseURL:'https://minha-financa-backend.herokuapp.com/'
})


export default baseApi