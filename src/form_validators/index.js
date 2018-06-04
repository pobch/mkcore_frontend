export function validateOwnRoomCreateEdit(values) {
  const errors = {}
  const requiredFields = ['room_code', 'title', 'description', 'instructor_name']

  for(let field of requiredFields) {
    if(!values[field]) {
      errors[field] = 'This field is required'
    }
  }

  return errors
}