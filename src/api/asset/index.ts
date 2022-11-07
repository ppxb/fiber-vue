import axios from 'axios'
import { projectListReq, projectReq } from './types'

export const list = (data: any) => axios.post('/api/asset/list', data)

// add asset bind project
export const createProject = (data: projectReq) =>
  axios.post('/api/asset/project/create', data)

// get asset project list
export const getProjectList = (data: projectListReq) =>
  axios.post('/api/asset/project/list', data)
