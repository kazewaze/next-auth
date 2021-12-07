import React from "react";
import Layout from "components/Layout";
import useUser from "lib/useUser";

export default function Admin() {
  const { user } = useUser({
    redirectTo: "/login",
  });

  return (
    <Layout>
      {user && (
        <>
          <h1>
            Welcome back, { user.login.full_name }
          </h1>
        </>
      )}
    </Layout>
  );
}