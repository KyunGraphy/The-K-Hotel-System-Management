const useSetDefaultDate = (date) => {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  const newDate = Math.floor(date.getTime() / 100000) * 100000
  return newDate
}

export default useSetDefaultDate