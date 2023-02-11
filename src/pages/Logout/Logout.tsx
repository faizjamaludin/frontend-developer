import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const LOGOUT_MUTATION = gql`
  mutation {
    logout {
      status
      message
    }
  }
`;

function Logout() {
  const [logout, setLogout] = useState("");

  const logoutToken = localStorage.getItem("token");

  const [logoutMutation, { data, error }] = useMutation(LOGOUT_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${logoutToken}`,
      },
    },
  });

  if (error) {
    console.error(error);
  }

  if (data) {
    console.log(data);
  }

  return (
    <button
      onClick={() => {
        logoutMutation()
          .then(({ data }) => {
            localStorage.removeItem("token");
            setLogout(data.logout.status);
          })
          .catch((error) => {
            console.error(error);
          });
      }}
    >
      Logout
    </button>
  );
}

export default Logout;
