export function validateOwnRoomCreateEdit(values) {
  const errors = {}
  const requiredFields = ['room_code', 'title', 'description', 'instructor_name']

  for(let field of requiredFields) {
    if(!values[field]) {
      errors[field] = 'กรุณากรอกข้อมูลลงในช่องนี้'
    }
  }

  return errors
}
