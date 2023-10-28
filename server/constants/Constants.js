export const roleKeys = {
  'Receptionist': 'RC',
  'Business Staff': 'BS',
  'Service Staff': 'SS',
  'Accountant': 'AC',
  'Human Resources Staff': 'HR',
  'Director': 'DR',
}

// -----------------------------------------------------
export function padWithLeadingZeros(num, totalLength) {
  return String(num).padStart(totalLength, '0');
}
