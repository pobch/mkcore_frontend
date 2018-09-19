import _ from 'lodash'

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

  const linkUrlError = []
  values['attached_links'] && values['attached_links'].forEach( (element, indx) => {
    if(element.link_url && !/^https?:\/\//i.test(element.link_url)) {
      linkUrlError[indx] = {link_url: 'ต้องขึ้นต้นด้วย http:// หรือ https://'}
    }
  })
  if(linkUrlError.length) {
    errors['attached_links'] = linkUrlError
  }

  const socialUrlsError = {}
  values['social_urls'] && _.forEach(values['social_urls'], (url, key) => {
    if(url && !/^https?:\/\//i.test(url)) {
      socialUrlsError[key] = 'ต้องขึ้นต้นด้วย http:// หรือ https://'
    }
  })
  if(!_.isEmpty(socialUrlsError)) {
    errors['social_urls'] = socialUrlsError
  }

  return errors
}
