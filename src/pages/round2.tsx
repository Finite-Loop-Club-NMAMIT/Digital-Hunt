import React, { useState } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface Round2Content {
  firstWord: string;
  secondWord: string;
  thirdWord: string;
  hexahue: string;
  latitude: string;
  longitude: string;
  asciiResult: string;
  badge: string;
}

export default function Round2() {
  const [reveal, setReveal] = useState<{
    hintNo: number | null;
    revealed: boolean;
  }>();
  const q = api.round2.getHint.useMutation();
  const [form, setForm] = React.useState<Round2Content>({
    firstWord: "",
    secondWord: "",
    thirdWord: "",
    hexahue: "",
    latitude: "",
    longitude: "",
    asciiResult: "",
    badge: "",
  });
  const addForm = api.round2.submitForm.useMutation();

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addForm.mutate(form, {
      onSuccess: () => {
        alert("Form submitted successfully");
      },
      onError: () => {
        alert("Error submitting form");
      },
    });
  }

  const { status: status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/", undefined).catch((e) => console.log(e));
  }
  if (status === "loading") {
    return <></>;
  }
  return (
    <>
      <div className="mx-3 mt-3 flex flex-col p-10">
        <h1 className="mb-5 text-center text-2xl font-extrabold leading-none tracking-tight text-blue-600 md:text-3xl lg:text-4xl">
          Round 2 Submission Form
        </h1>
        <div className="flex justify-center">
          <ol className="list-decimal">
            <li>You can submit any number of times.</li>
            <li>
              Hints can be taken for each puzzle but each hint reveal will cost
              a negative 10 points.
            </li>
            <li>
              If you&apos;ve already revealed a hint, it won&apos;t cost you
              when you reveal it again.
            </li>
          </ol>
        </div>
        <form onSubmit={submit} className="mt-5 flex flex-col gap-5">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center font-semibold">Puzzle 1</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <input
                type="text"
                value={form.firstWord}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, firstWord: e.target.value };
                  })
                }
                placeholder="First word"
                className="w-full rounded-full border border-gray-300 p-2"
              />
              {reveal?.hintNo === 1 ? (
                <div className="w-full max-w-sm rounded-xl border p-2">
                  Hint No. {reveal.hintNo}
                  <p
                    className={`${
                      reveal.revealed ? "" : "blur-sm"
                    } transition duration-1000`}
                  >
                    {reveal.revealed
                      ? q.isLoading
                        ? "loading..."
                        : q.data
                      : "You really thought you could get it just like that?"}
                  </p>
                  <button
                    className="mt-2 rounded-full bg-blue-600 px-2 py-1 text-white hover:bg-blue-500"
                    type="button"
                    onClick={() => {
                      !reveal.revealed && q.mutate({ hintNo: 1 });
                      reveal.revealed
                        ? setReveal({ hintNo: null, revealed: false })
                        : setReveal({ hintNo: 1, revealed: true });
                    }}
                  >
                    {reveal.revealed ? "Close Hint" : "Reveal Hint"}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="w-36 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                  onClick={() => {
                    setReveal({
                      hintNo: 1,
                      revealed: false,
                    });
                  }}
                >
                  Get Hint
                </button>
              )}
            </div>
          </div>{" "}
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center font-semibold">Puzzle 2</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <input
                type="text"
                value={form.secondWord}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, secondWord: e.target.value };
                  })
                }
                placeholder="Second word"
                className="w-full rounded-full border border-gray-300 p-2"
              />
              {reveal?.hintNo === 2 ? (
                <div className="w-full max-w-sm rounded-xl border p-2">
                  Hint No. {reveal.hintNo}
                  <p
                    className={`${
                      reveal.revealed ? "" : "blur-sm"
                    } transition duration-1000`}
                  >
                    {reveal.revealed
                      ? q.isLoading
                        ? "loading..."
                        : q.data
                      : "You really thought you could get it just like that?"}
                  </p>
                  <button
                    className="mt-2 rounded-full bg-blue-600 px-2 py-1 text-white hover:bg-blue-500"
                    type="button"
                    onClick={() => {
                      !reveal.revealed && q.mutate({ hintNo: 2 });
                      reveal.revealed
                        ? setReveal({ hintNo: null, revealed: false })
                        : setReveal({ hintNo: 2, revealed: true });
                    }}
                  >
                    {reveal.revealed ? "Close Hint" : "Reveal Hint"}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="w-36 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                  onClick={() => {
                    setReveal({
                      hintNo: 2,
                      revealed: false,
                    });
                  }}
                >
                  Get Hint
                </button>
              )}
            </div>
          </div>{" "}
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center font-semibold">Puzzle 3</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <input
                type="text"
                value={form.thirdWord}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, thirdWord: e.target.value };
                  })
                }
                placeholder="Third word"
                className="w-full rounded-full border border-gray-300 p-2"
              />
              {reveal?.hintNo === 3 ? (
                <div className="w-full max-w-sm rounded-xl border p-2">
                  Hint No. {reveal.hintNo}
                  <p
                    className={`${
                      reveal.revealed ? "" : "blur-sm"
                    } transition duration-1000`}
                  >
                    {reveal.revealed
                      ? q.isLoading
                        ? "loading..."
                        : q.data
                      : "You really thought you could get it just like that?"}
                  </p>
                  <button
                    className="mt-2 rounded-full bg-blue-600 px-2 py-1 text-white hover:bg-blue-500"
                    type="button"
                    onClick={() => {
                      !reveal.revealed && q.mutate({ hintNo: 3 });
                      reveal.revealed
                        ? setReveal({ hintNo: null, revealed: false })
                        : setReveal({ hintNo: 3, revealed: true });
                    }}
                  >
                    {reveal.revealed ? "Close Hint" : "Reveal Hint"}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="w-36 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                  onClick={() => {
                    setReveal({
                      hintNo: 3,
                      revealed: false,
                    });
                  }}
                >
                  Get Hint
                </button>
              )}
            </div>
          </div>{" "}
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center font-semibold">Puzzle 4</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <input
                type="text"
                value={form.hexahue}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, hexahue: e.target.value };
                  })
                }
                placeholder="** ** ** ** ** ** ** ** ** ** **"
                className="w-full rounded-full border border-gray-300 p-2"
              />
              {reveal?.hintNo === 4 ? (
                <div className="w-full max-w-sm rounded-xl border p-2">
                  Hint No. {reveal.hintNo}
                  <p
                    className={`${
                      reveal.revealed ? "" : "blur-sm"
                    } transition duration-1000`}
                  >
                    {reveal.revealed
                      ? q.isLoading
                        ? "loading..."
                        : q.data
                      : "You really thought you could get it just like that?"}
                  </p>
                  <button
                    className="mt-2 rounded-full bg-blue-600 px-2 py-1 text-white hover:bg-blue-500"
                    type="button"
                    onClick={() => {
                      !reveal.revealed && q.mutate({ hintNo: 4 });
                      reveal.revealed
                        ? setReveal({ hintNo: null, revealed: false })
                        : setReveal({ hintNo: 4, revealed: true });
                    }}
                  >
                    {reveal.revealed ? "Close Hint" : "Reveal Hint"}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="w-36 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                  onClick={() => {
                    setReveal({
                      hintNo: 4,
                      revealed: false,
                    });
                  }}
                >
                  Get Hint
                </button>
              )}
            </div>
          </div>{" "}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-3 items-center">
              <h2 className="text-center font-semibold">Puzzle 5</h2>
              {reveal?.hintNo === 5 ? (
                <div className="w-full max-w-sm rounded-xl border p-2">
                  Hint No. {reveal.hintNo}
                  <p
                    className={`${
                      reveal.revealed ? "" : "blur-sm"
                    } transition duration-1000`}
                  >
                    {reveal.revealed
                      ? q.isLoading
                        ? "loading..."
                        : q.data
                      : "You really thought you could get it just like that?"}
                  </p>
                  <button
                    className="mt-2 rounded-full bg-blue-600 px-2 py-1 text-white hover:bg-blue-500"
                    type="button"
                    onClick={() => {
                      !reveal.revealed && q.mutate({ hintNo: 5 });
                      reveal.revealed
                        ? setReveal({ hintNo: null, revealed: false })
                        : setReveal({ hintNo: 5, revealed: true });
                    }}
                  >
                    {reveal.revealed ? "Close Hint" : "Reveal Hint"}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="w-36 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                  onClick={() => {
                    setReveal({
                      hintNo: 5,
                      revealed: false,
                    });
                  }}
                >
                  Get Hint
                </button>
              )}
            </div>
            <div className="flex w-full flex-row items-center space-x-2">
              <input
                type="text"
                value={form.latitude}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, latitude: e.target.value };
                  })
                }
                placeholder="Latitude"
                className="w-full rounded-full border border-gray-300 p-2"
              />
              <input
                type="text"
                value={form.longitude}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, longitude: e.target.value };
                  })
                }
                placeholder="Longitude"
                className="w-full rounded-full border border-gray-300 p-2"
              />
            </div>
          </div>{" "}
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center font-semibold">Puzzle 6</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <input
                type="text"
                value={form.asciiResult}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, asciiResult: e.target.value };
                  })
                }
                placeholder="Passcode"
                className="w-full rounded-full border border-gray-300 p-2"
              />
              {reveal?.hintNo === 6 ? (
                <div className="w-full max-w-sm rounded-xl border p-2">
                  Hint No. {reveal.hintNo}
                  <p
                    className={`${
                      reveal.revealed ? "" : "blur-sm"
                    } transition duration-1000`}
                  >
                    {reveal.revealed
                      ? q.isLoading
                        ? "loading..."
                        : q.data
                      : "You really thought you could get it just like that?"}
                  </p>
                  <button
                    className="mt-2 rounded-full bg-blue-600 px-2 py-1 text-white hover:bg-blue-500"
                    type="button"
                    onClick={() => {
                      !reveal.revealed && q.mutate({ hintNo: 6 });
                      reveal.revealed
                        ? setReveal({ hintNo: null, revealed: false })
                        : setReveal({ hintNo: 6, revealed: true });
                    }}
                  >
                    {reveal.revealed ? "Close Hint" : "Reveal Hint"}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="w-36 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                  onClick={() => {
                    setReveal({
                      hintNo: 6,
                      revealed: false,
                    });
                  }}
                >
                  Get Hint
                </button>
              )}
            </div>
          </div>{" "}
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center font-semibold">Puzzle 7</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <input
                type="text"
                value={form.badge}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, badge: e.target.value };
                  })
                }
                placeholder="Badge"
                className="w-full rounded-full border border-gray-300 p-2"
              />
              {reveal?.hintNo === 7 ? (
                <div className="w-full max-w-sm rounded-xl border p-2">
                  Hint No. {reveal.hintNo}
                  <p
                    className={`${
                      reveal.revealed ? "" : "blur-sm"
                    } transition duration-1000`}
                  >
                    {reveal.revealed
                      ? q.isLoading
                        ? "loading..."
                        : q.data
                      : "You really thought you could get it just like that?"}
                  </p>
                  <button
                    className="mt-2 rounded-full bg-blue-600 px-2 py-1 text-white hover:bg-blue-500"
                    type="button"
                    onClick={() => {
                      !reveal.revealed && q.mutate({ hintNo: 7 });
                      reveal.revealed
                        ? setReveal({ hintNo: null, revealed: false })
                        : setReveal({ hintNo: 7, revealed: true });
                    }}
                  >
                    {reveal.revealed ? "Close Hint" : "Reveal Hint"}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="w-36 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                  onClick={() => {
                    setReveal({
                      hintNo: 7,
                      revealed: false,
                    });
                  }}
                >
                  Get Hint
                </button>
              )}
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <button
              type="submit"
              className="w-36 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
