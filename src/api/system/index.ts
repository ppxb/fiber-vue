import axios from 'axios'
import { CreateDeptReq, CreateUserReq } from './types'

export const createDept = (data: CreateDeptReq) =>
  axios.post('/api/dept/create', data)
export const createUser = (data: CreateUserReq) =>
  axios.post('/api/user/create', data)
