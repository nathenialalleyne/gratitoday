import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProfileHome from "./ProfileHome";
import JournalEntries from "./JournalEntries";
import { api } from "~/utils/api";


export default function Profile({ username }: { username: string }) {
  const router = useRouter();
  const { data, isLoading, refetch, isSuccess, status } =
    api.journalRouter.getAllUsersEntries.useQuery(undefined, {
      enabled: false,
    });

  const { data: openaiData, refetch: openaiRefetch, isLoading: openaiload } = api.openaiRouter.createCompletion.useQuery(undefined, {
    enabled: false,
  })

  const { data: test, refetch: test2, isLoading: tes3 } = api.openaiRouter.listCompletions.useQuery(undefined, {
    enabled: false,
  })

  useEffect(() => {
    refetch();
    openaiRefetch()
    test2()
  }, [])

  return (
    <div>
      <ProfileHome username={username} refetch={refetch} />
      {isLoading ? null : isSuccess && <JournalEntries journals={data} refetch={refetch} />}
      {openaiload ? null : <div>{openaiData?.quote} </div>}
    </div>
  );
}
