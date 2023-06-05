import React, { useEffect, useState } from "react";
import ProfileHome from "./ProfileHome";
import JournalEntries from "./JournalEntries";
import { api } from "~/utils/api";

export default function Profile({ username }) {
  const { data, isLoading, refetch, isSuccess, fetchStatus, failureCount } =
    api.journalRouter.getAllUsersEntries.useQuery(undefined, {enabled: false });
  const [error, setError] = useState(false);


  return (
    <div>
      <h1>Profile</h1>
      <ProfileHome username={username} />
      {isLoading ? null : isSuccess && <JournalEntries journals={data} />}
    </div>
  );
}
