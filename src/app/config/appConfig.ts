import {HttpHeaders} from '@angular/common/http'

export const BASE_URL = "http://localhost/easy-learn-api/api/v1"
// export const BASE_URL = "http://a829384401ba.ngrok.io/easy-learn-api/api/v1"
export const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDMwOTQ5OTQsImV4cCI6MTYwMzMxMDk5NCwidG9rZW5fdHlwZSI6Ik"+
"JlYXJlciIsImRhdGEiOnsiaWQiOjYsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIwOS0xMC0yMCJ9fQ.HW7gzbUa-bZzjqEQ-W3K-aQAnXWiqK6CJk6UPMhIZgI"

/* default headers */
export const HEADERS = new HttpHeaders()
.set('Content-Type', 'application/json')
.set('Authorization', `Bearer ${TOKEN}`)
