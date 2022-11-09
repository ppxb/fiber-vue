import axios from 'axios'
import { listReq, projectReq } from './types'

// get common assets list
export const getAssetList = (data: listReq) =>
  axios.post('/api/asset/list', data)

export const importAssets = (data: any, header: any) =>
  axios.post('/api/asset/import', data, header)

// add asset bind project
export const createProject = (data: projectReq) =>
  axios.post('/api/asset/project/create', data)

// get asset project list
export const getProjectList = (data: listReq) =>
  axios.post('/api/asset/project/list', data)
