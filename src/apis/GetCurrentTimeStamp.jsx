import moment from 'moment'
export const GetCurrentTimeStamp = (timeStamp) => {
  return moment().format(timeStamp)
}
