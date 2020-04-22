import axios from "axios"

export const queryByCase = () =>
  axios.get("https://covid19.th-stat.com/api/open/cases")
export const queryStateToday = () =>
  axios.get("https://covid19.th-stat.com/api/open/today")
export const queryTimeline = () =>
  axios.get("https://covid19.th-stat.com/api/open/timeline")
export const queryNotification = () =>
  axios.get("https://covid19.th-stat.com/api/open/area")
