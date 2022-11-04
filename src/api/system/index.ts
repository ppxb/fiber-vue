import axios from 'axios'

export const create = (data: any) => axios.post('/api/dept/create', data)
