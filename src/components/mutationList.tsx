import { gql } from "@apollo/client";

export const AUTH_LOGIN = gql`
mutation {
  login( 
    input:{
      user_mobile:"60134549584",
      password:"faiz.jamaludin"
    }
  )
{
  token
  user {
    user_id
    }
  }
}
`

export const AUTH_LOGOUT = gql`
mutation{
    logout {
        status
        message
    }
}
Header:
{
    "Authorization": "Bearer 335|a9Z9VUbh4KheQwiYPkt5wdmNOpiRin9tABYBmKzg"
}    

`

export const USER_REGISTER = gql`
mutation{
    register(
        input: {
            user_fullname:"abc",
            user_email: "abc@abc.com",
            user_mobile:"60123344223",
            password: "12343212",
        }
    )
}
`