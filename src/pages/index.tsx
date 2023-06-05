import { type NextPage } from "next";
import { fetchData } from "next-auth/client/_utils";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, { FormEventHandler, useEffect, useState } from "react";
import { api } from "~/utils/api";
import Profile from "./profile";

const Home: NextPage = (props) => {
  const { data: session, status } = useSession();

  const createAccountMutation = api.UserRouter.createAccount.useMutation({});
  const getAllUsersQuery = api.UserRouter.getAllUsers.useQuery();

  const handleClick = () => {
    signIn();
  };

  useEffect(() => {
    if (status === "authenticated") {
      createAccountMutation.mutateAsync();
    }
  }, [status]);

  return (
    <>
      {status !== "authenticated" ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          Sign In
        </button>
      ) : (
        session.user.name && (
          <Profile username={session.user.name}/>
        )
      )}
    </>
  );
};

export default Home;
