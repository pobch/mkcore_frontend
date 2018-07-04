export function validateOwnRoomCreateEdit(values) {
  const errors = {}
  const requiredFields = ['room_code', 'title', 'description', 'instructor_name']

  for(let field of requiredFields) {
    if(!values[field]) {
      errors[field] = 'กรุณากรอกข้อมูลลงในช่องนี้'
    }
  }

  if(values['room_code'] && /\W/g.test(String(values['room_code']))) {
    errors['room_code'] = 'ตัวอักษรภาษาอังกฤษ ตัวเลข หรือ _ เท่านั้น'
  }

  return errors
}
