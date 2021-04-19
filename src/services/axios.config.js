import axios from 'axios';

const apiKey = '674400dc325b22ffe51063f6839ba9f0';

const baseUrl = 'https://api.themoviedb.org/3/';
// const baseImageUrl = '';

axios.defaults.baseURL = `${baseUrl}`
axios.defaults.params = {}
axios.defaults.params['api_key'] = apiKey
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

// const myAxios = {
//     ...axios,
//     get: (...args) => {
//         return axios.get(...args, {

//         })
//     }
// }

// myAxios.interceptors.response.use(response => {
//     return response;
//     }, error => {
//         switch(error.response.status){
//             case 403: 
//         }
//     })

export default axios;