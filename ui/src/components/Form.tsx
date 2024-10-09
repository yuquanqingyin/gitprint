"use client";

import { useEffect, useState } from "react";
import { parseJwt } from "../lib/jwt";
import { User } from "../lib/types";

export default function Form() {
  const [user, setUser] = useState<User | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const [repo, setRepo] = useState<string>("");
  const [ref, setRef] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const jwtToken = localStorage.getItem("auth_jwt");
      if (!jwtToken) return;

      const claims = parseJwt(jwtToken);
      if (!claims) return;

      setToken(jwtToken);
      setUser(claims.user);
    }
  }, []);

  function isValidRepo(repo: string) {
    const parts = repo.split("/");
    return parts.length === 2 && parts[0] && parts[1];
  }

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
      {user && (
        <div className="flex flex-col gap-2 rounded-md border p-4 mt-2">
          <div className="">
            <label htmlFor="repository" className="block text-md text-white">
              Repository
            </label>
            <label
              htmlFor="repository"
              className="block caption text-sm text-gray-400"
            >
              Public or private repository that you have access to.
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="repository"
                id="repository"
                className="input"
                placeholder="owner/repo"
                required
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="ref" className="block text-md text-white">
              [Optional] Ref
            </label>
            <label
              htmlFor="ref"
              className="block caption text-sm text-gray-400"
            >
              Could be a branch, tag, or commit SHA.
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="ref"
                id="ref"
                className="input"
                placeholder="main"
                required
                value={ref}
                onChange={(e) => setRef(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-2">
            <button
              type="submit"
              className="btn"
              disabled={!isValidRepo(repo)}
              onClick={() => {
                console.log(token);
              }}
            >
              Generate PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
