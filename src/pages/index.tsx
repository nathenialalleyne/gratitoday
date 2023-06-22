import { type NextPage } from "next";
import { fetchData } from "next-auth/client/_utils";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, { FormEventHandler, useEffect, useState } from "react";
import { api } from "~/utils/api";
import Profile from "./dashboard";
import getFormattedDate from "~/utils/date";
import Navbar from "~/components/Navbar";

const Home: NextPage = (props) => {
  const { data: session, status } = useSession();
  const { data, refetch } = api.openaiRouter.getTodaysQuote.useQuery(undefined, { enabled: false })


  const handleClick = async () => {
    await signIn();
  };

  useEffect(() => {
    refetch()
    console.log(getFormattedDate)
  }, [])

  return (
    <>
      <Navbar />

      <div>{data?.quote}</div>
    </>
  );
};

export default Home;
