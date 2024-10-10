"use client";

export default function Docs() {
  return (
    <div>
      <div className="pb-10 pt-10">
        <div className="mx-auto max-w-2xl px-4">
          <div className="flex flex-col gap-2 rounded-md border p-8">
            <h1 className="text-lg font-semibold">
              {">"} Which files are printed?
            </h1>
            <p className="py-2">
              To keep the size of the PDF small, only the whitelisted extensions
              are include. That includes programming languages, markup
              languages, and some other common file types.
            </p>
            <p className="py-2">
              Files bigger than 100KB are not included in the PDF.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
