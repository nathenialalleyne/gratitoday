import React, { useEffect, useState } from "react";
import ProfileHome from "./ProfileHome";
import JournalEntries from "./JournalEntries";
import { api } from "~/utils/api";

export default function Profile({ username }: { username: string }) {
  const [test, setTest] = useState<string>("")
  const { data, isLoading, refetch, isSuccess, status } =
    api.journalRouter.getAllUsersEntries.useQuery(undefined, {
      enabled: false,
    });

  useEffect(() => {
    refetch();
  }, [])

  return (
    <div>
      <h1>Profile</h1>
      <ProfileHome username={username} refetch={refetch} />
      {isLoading ? null : isSuccess && <JournalEntries journals={data} refetch={refetch} />}
    </div>
  );
}
