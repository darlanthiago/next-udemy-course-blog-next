import React from "react";
import { useRouter } from "next/router";

export default function PageNotFound() {
  const router = useRouter();

  return (
    <>
      <div>
        <button onClick={() => router.push("/")}>Back</button>
        <h1>404</h1>
      </div>
    </>
  );
}
