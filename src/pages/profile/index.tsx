import React, { useEffect, useState } from "react";
import ProfileHome from "./ProfileHome";
import JournalEntries from "./JournalEntries";
import { api } from "~/utils/api";
import { openaiClient, } from "~/utils/openai";
import { OpenAIApi, Configuration } from "openai";


export default function Profile({ username }: { username: string }) {
  const { data, isLoading, refetch, isSuccess, status } =
    api.journalRouter.getAllUsersEntries.useQuery(undefined, {
      enabled: false,
    });

  // const { data: openaiData, refetch: openaiRefetch, isLoading: openaiload } = api.openaiRouter.createCompletion.useQuery(undefined, {
  //   enabled: false,
  // })

  useEffect(() => {
    refetch();
    // openaiRefetch()

  }, [])

  return (
    <div>
      <ProfileHome username={username} refetch={refetch} />
      {isLoading ? null : isSuccess && <JournalEntries journals={data} refetch={refetch} />}
      {/* {openaiload ? null : <div>{openaiData?.choices.map((model, i) => <div key={i}>{model.text}</div>)} </div>} */}
    </div>
  );
}
