"use client";

import Form from "../components/Form";

export default function Home() {
  return (
    <div>
      <div className="pb-10 pt-10">
        <div className="mx-auto max-w-2xl px-4">
          <div className="flex flex-col gap-2 rounded-md border p-8">
            <h1 className="text-lg font-semibold">
              {">"} Print your favorite Git repositories as PDF
            </h1>
            <p className="py-2">
              Looking for a fun way to explore your favorite GitHub
              repositories? Tired of staring at the screen for hours on end? Or
              maybe want to print out a hard copy as a keepsake?
            </p>
            <p className="py-2">
              Simply sign in with your GitHub account and start printing public
              or private repositories in a beautiful, easy-to-read format.
            </p>
            <p className="py-2">
              It is currently in beta, so please be patient with us as we work.
              Feel free to request features or report bugs.
            </p>
            <p className="py-2 font-bold">
              Made by <a href="https://x.com/pliutau">@pliutau</a> with ❤️
            </p>
          </div>
        </div>
      </div>
      <div className="pb-10">{Form()}</div>
      <div className="pb-10">
        <div className="mx-auto max-w-2xl px-4">
          <div className="flex flex-col text-center pb-4">
            <h2 className="text-lg font-semibold">Repositories of the day</h2>
            <span className="text-sm text-gray-400">
              Click to download the PDF
            </span>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-2">
            <a
              className="cursor-pointer rounded-md border p-4"
              href={`${process.env.NEXT_PUBLIC_API_ADDR}/files?export_id=ed6f6f9dbdc445653b1b9737367c25ea734a3b8ce5e86c88d4174e19c718650a&ext=pdf`}
            >
              <div className="text-sm font-semibold">docker/scout-cli</div>
              <div className="text-sm text-white">v1.14.0</div>
              <div className="text-sm text-zinc-600">2.4MB</div>
            </a>
            <a
              className="cursor-pointer rounded-md border p-4"
              href={`${process.env.NEXT_PUBLIC_API_ADDR}/files?export_id=4fe527c7ae65ac12fee5a0d33b70feeaa5b43f3fd02ae612a939a613689a9445&ext=pdf`}
            >
              <div className="text-sm font-semibold">astral-sh/ruff-lsp</div>
              <div className="text-sm text-white">v0.0.57</div>
              <div className="text-sm text-zinc-600">2.3MB</div>
            </a>
            <a
              className="cursor-pointer rounded-md border p-4"
              href={`${process.env.NEXT_PUBLIC_API_ADDR}/files?export_id=4808a2e810e5c640a2318a31d619e4fcf04b646c7146eaeac32d0cf8371a345f&ext=pdf`}
            >
              <div className="text-sm font-semibold">binarly-io/efiXplorer</div>
              <div className="text-sm text-white">v6.0</div>
              <div className="text-sm text-zinc-600">1MB</div>
            </a>
            <a
              className="cursor-pointer rounded-md border p-4"
              href={`${process.env.NEXT_PUBLIC_API_ADDR}/files?export_id=9924e3dcdcca1af6e78bc73a886d5d2d6f526f3d85dae064d8dbe6951ef964c9&ext=pdf`}
            >
              <div className="text-sm font-semibold">redis/redis-vl-python</div>
              <div className="text-sm text-white">0.3.4</div>
              <div className="text-sm text-zinc-600">2.5MB</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
