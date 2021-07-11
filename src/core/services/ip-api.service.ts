/**
 * This code was written by Tomas Coeli
 * 
 * @DEVELOPER Tomas Coeli / +5493548637261 / Argentina / tcoeli@gigadata.net
 */

// Axios
import axios, { AxiosPromise } from 'axios'

// Intercface
import { responseIpApi } from '../interfaces/ip-api.interface'

export const getLocationByIp = (ip: string): AxiosPromise<responseIpApi> => axios({method: 'GET', url: `http://ip-api.com/json/${ip}`})