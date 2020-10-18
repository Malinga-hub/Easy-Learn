import {HttpHeaders} from '@angular/common/http'

export const BASE_URL = "http://localhost/easy-learn-api/api/v1"
export const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDI4MzgyNjcsImV4cCI6MTYwMzA1NDI2NywidG9r"+
"ZW5fdHlwZSI6IkJlYXJlciIsImRhdGEiOnsiaWQiOjYsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIwOS0xMC0yMCJ9fQ.2mkuXFwXjDmOfDB4FrfEBf7IH3gaNQHr_IKl_16NlqI"

/* default headers */
export const HEADERS = new HttpHeaders()
.set('Content-Type', 'application/json')
.set('Authorization', `Bearer ${TOKEN}`)
