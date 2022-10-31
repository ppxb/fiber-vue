import axios from 'axios'

export const list = (data: any) => axios.post('/api/asset/list', data)
