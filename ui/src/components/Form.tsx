"use client";

import { useEffect, useState } from "react";
import { parseJwt } from "../lib/jwt";
import { User } from "../lib/types";

export default function Form() {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_jwt");
      if (!token) return;

      const claims = parseJwt(token);
      if (!claims) return;

      setUser(claims.user);
    }
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-md border p-4 justify-center items-center">
        {user ? (
          <p>
            Signed in as{" "}
            <span className="font-semibold text-teal-500">{user.username}</span>{" "}
            (
            <a
              href="#"
              onClick={() => {
                localStorage.removeItem("auth_jwt");
                setUser(undefined);
              }}
            >
              Log out
            </a>
            )
          </p>
        ) : (
          <a href={`${process.env.NEXT_PUBLIC_API_ADDR}/github/auth/url`}>
            Sign in with GitHub
          </a>
        )}
      </div>
    </div>
  );
}
