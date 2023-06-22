import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProfileHome from "./ProfileHome";
import JournalEntries from "./JournalEntries";
import { api } from "~/utils/api";


export default function Dashboard({ username }: { username: string }) {
  const router = useRouter();
  const { data, isLoading, refetch, isSuccess } =
    api.journalRouter.getAllUsersEntries.useQuery(undefined, {
      enabled: false,
    });

  const { data: openaiData, refetch: openaiRefetch, isLoading: openaiload } = api.openaiRouter.getTodaysQuote.useQuery(undefined, {
    enabled: false,
  })

  useEffect(() => {
    refetch();
    openaiRefetch()
  }, [])

  return (
    <div>
      <ProfileHome username={username} refetch={refetch} />
      {isLoading ? null : isSuccess && <JournalEntries journals={data} refetch={refetch} />}
      {openaiload ? null : <div>{openaiData?.quote} </div>}
    </div>
  );
}
