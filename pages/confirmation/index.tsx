import React from "react";
import { useRouter } from "next/router";

type Props = {};

export default function ConfirmationPage({}: Props) {
  const router = useRouter();
  const emailQuery = router.query.email;
  let email = "";

  if (Array.isArray(emailQuery)) {
    email = emailQuery[0];
  } else if (typeof emailQuery === "string") {
    email = emailQuery;
  }
  return (
    <div className="p-8">
      <h1 className="font-bold text-4xl">Welcome to sixtythirtyten.</h1>
      <h2 className="font-bold text-md mt-4">We have successfully registered your account!</h2>
      <p className="text-sm mt-4">
        Please click on the link in the email we sent to{" "}
        <span className="font-bold">{decodeURIComponent(email)}</span> to confirm your account and start
        saving your color sets.
      </p>
    </div>
  );
}
