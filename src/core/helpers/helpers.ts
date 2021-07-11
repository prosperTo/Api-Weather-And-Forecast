/**
 * This code was written by Tomas Coeli
 * 
 * @DEVELOPER Tomas Coeli / +5493548637261 / Argentina / tcoeli@gigadata.net
 */


/* Get Ip Address */
import { Request } from 'express'
import publicIp from 'public-ip'

export const getIpAddres = async (req: Request) => req.hostname === 'localhost' || req.hostname === '127.0.0.1' ? await publicIp.v4() : req.hostname

/* Moment Js*/
import moment from 'moment'

export const countingHoursWorked = (dateStart: number, dateFinish: number) => moment.duration(moment(timestampToDate(dateStart, '')).diff(timestampToDate(dateFinish, ''))).asHours()
export const calculateDifDate = (dateStart: number, dateFinish: number, type: string ) => { let hour = moment.duration(moment(timestampToDate(dateStart, '')).diff(timestampToDate(dateFinish, '')));  switch (type) { case 'hour': return hour.asHours(); case 'minutes': return hour.asMinutes(); case 'seconds': return hour.asSeconds(); default: return hour }}
export const dateNowFormat = (format: string): string => moment().format(format)
export const dateNowTimestamp = (): any => moment().unix()
export const dateToTimestamp = (date: string): number => moment(date).unix()
export const dateCustom = (date: string, format: string): string => moment(date).format(format)
export const dateCustomToTimestamp = (date: string, format: string): number => moment(date, format).unix()
export const timestampToDate = (date: number, format: string): string => moment(new Date(date*1000)).format(format)
export const dateIsBefore = (date: String, dateToCompare: String, format: String): Boolean => moment(date as string, format as string).subtract(1, 'seconds').isBefore(moment(dateToCompare as string, format as string))
export const dateIsAfter = (date: String, dateToCompare: String, format: String): Boolean => moment(date as string, format as string).add(1, 'seconds').isAfter(moment(dateToCompare as string, format as string))


/* Response */
import { Response } from 'express'

export const respJson = (res: Response, status: number, ok: boolean, others: {}): any => res.status(status).json({ok, status, ...others})