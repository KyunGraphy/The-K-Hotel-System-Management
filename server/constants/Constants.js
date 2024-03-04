// -----------------------------------------------------
export const HTTPStatus = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ACCEPT: 406,
  SERVER_ERROR: 500,
}

// -----------------------------------------------------
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

// -----------------------------------------------------
export const defaultPassword = '1234'