const useSetDefaultDate = (date) => {
  date.setHours(0, 0, 0, 0);
  const result = Math.floor(date.getTime() / 100000) * 100000
  return result
}

export default useSetDefaultDate