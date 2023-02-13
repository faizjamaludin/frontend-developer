import { gql, useMutation } from "@apollo/client";

interface AuthProp {
  isAuthorized: string | null;
}

const LOGIN_MUTATION = gql`
  mutation Login($userMobile: String!, $password: String!) {
    login(input: { user_mobile: $userMobile, password: $password }) {
      token
      user {
        user_id
      }
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Logout(
    $fullName: String!
    $email: String!
    $mobile: String!
    $password: String!
  ) {
    register(
      input: {
        user_fullname: $fullName
        user_email: $email
        user_mobile: $mobile
        password: $password
      }
    )
  }
`;

const LOGOUT_MUTATION = gql`
  mutation {
    logout {
      status
      message
    }
  }
`;

export const useLoginMutation = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  return { login, data, loading, error };
};

export const useRegisterMutation = () => {
  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION);

  return { register, data, loading, error };
};

export const useLogoutMutation = (isAuthorized: AuthProp) => {
  const [logoutMutation, { data, loading, error }] = useMutation(
    LOGOUT_MUTATION,
    {
      context: {
        headers: {
          Authorization: `Bearer ${isAuthorized}`,
        },
      },
    }
  );

  return [logoutMutation, { data, loading, error }];
};
