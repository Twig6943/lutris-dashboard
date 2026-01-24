import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
const baseURL = import.meta.env.VITE_BASE_URL

const service = axios.create({
  baseURL: baseURL,
  timeout: 30000
})

service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers["Authorization"] = "Token " + userStore.token;
      config.headers["Accept"] = "Application/json";
    }
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    //const res = response.data
    const validCodes = [200, 201, 202]
    if (validCodes.includes(response.status)) {
      return response
    } else {
      showError(response)
      return Promise.reject(response)
    }
  },
  (error)=> {
    console.log(error) // for debug
    const badMessage = error.message || error
    const code = parseInt(badMessage.toString().replace('Error: Request failed with status code ', ''))
    showError({ code, message: badMessage })
    return Promise.reject(error)
  }
)

function showError(error) {
  if (error.code === 403) {
    const userStore = useUserStore()
    userStore.loginOut()
  } else {
    ElMessage({
      message: error.msg || error.message || '服务异常',
      type: 'error',
      duration: 3 * 1000
    })
  }

}

export default service