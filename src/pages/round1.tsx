import React, { useState, type ChangeEvent } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
interface Round1Content {
  hiddenRoute: string;
  loginRoute: string;
  shifts: string;
  playfairKey: string;
  passcode: string;
  captchaSolved: boolean;
  hackerName: string;
  hackerLocation: string;
  hackerPin: string;
  directEntry: string;
}

interface Round1Correct {
  hiddenRoute?: boolean;
  loginRoute?: boolean;
  shifts?: boolean;
  playfairKey?: boolean;
  passcode?: boolean;
  captchaSolved?: boolean;
  hackerName?: boolean;
  hackerLocation?: boolean;
  hackerPin?: boolean;
  directEntry?: boolean;
}

export default function Round1() {
  const [de, setDe] = useState<string>("");
  const [correct, setCorrect] = useState<Round1Correct | undefined>(undefined);
  const [form, setForm] = useState<Round1Content>({
    hiddenRoute: "",
    loginRoute: "",
    shifts: "",
    playfairKey: "",
    passcode: "",
    captchaSolved: true,
    hackerName: "",
    hackerLocation: "",
    hackerPin: "",
    directEntry: "",
  });
  const addForm = api.round1.submitForm.useMutation();
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    let newDe = de;
    newDe = newDe.substr(0, index) + value + newDe.substr(index + 1);
    setDe(newDe);
    setForm((p) => ({ ...p, directEntry: newDe }));

    if (value && index < 15) {
      const nextInput = document.getElementById(
        `de-input-${index + 1}`,
      ) as HTMLInputElement;
      nextInput.focus();
    }
  };
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addForm.mutate(form, {
      onSuccess: ({ points, maxPoints, correct }) => {
        alert("Form submitted successfully");
        setCorrect(() => correct);
      },
      onError: (err) => {
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
          Round 1 Submission Form
        </h1>

        <form onSubmit={submit} className="flex flex-col gap-5">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center font-semibold">Puzzle 1</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <input
                value={form.hiddenRoute}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, hiddenRoute: e.target.value };
                  })
                }
                type="text"
                placeholder="Hidden route"
                className={
                  "w-full rounded-full border border-gray-300 p-2 " +
                  (correct
                    ? correct.hiddenRoute
                      ? "border-2 border-green-500"
                      : "border-2 border-red-500"
                    : "")
                }
              />
              {correct ? (
                correct?.hiddenRoute ? (
                  <TiTick className="h-6 w-6 text-green-500" />
                ) : (
                  <RxCross2 className="h-6 w-6 text-red-500" />
                )
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center font-semibold">Puzzle 2</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <input
                type="text"
                value={form.loginRoute}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, loginRoute: e.target.value };
                  })
                }
                placeholder="Login route"
                className={
                  "w-full rounded-full border border-gray-300 p-2 " +
                  (correct
                    ? correct.loginRoute
                      ? "border-2 border-green-500"
                      : "border-2 border-red-500"
                    : "")
                }
              />
              {correct ? (
                correct?.loginRoute ? (
                  <TiTick className="h-6 w-6 text-green-500" />
                ) : (
                  <RxCross2 className="h-6 w-6 text-red-500" />
                )
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center font-semibold">Puzzle 3</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <input
                type="text"
                value={form.shifts}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, shifts: e.target.value };
                  })
                }
                placeholder="Ceaser cipher key"
                className={
                    "w-full rounded-full border border-gray-300 p-2 " +
                    (correct
                      ? correct.shifts
                        ? "border-2 border-green-500"
                        : "border-2 border-red-500"
                      : "")
                  }
              />
              {correct ? (
                correct?.shifts ? (
                  <TiTick className="h-6 w-6 text-green-500" />
                ) : (
                  <RxCross2 className="h-6 w-6 text-red-500" />
                )
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center font-semibold">Puzzle 4</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <input
                type="text"
                value={form.playfairKey}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, playfairKey: e.target.value };
                  })
                }
                placeholder="Playfair cipher key"
                className={
                    "w-full rounded-full border border-gray-300 p-2 " +
                    (correct
                      ? correct.playfairKey
                        ? "border-2 border-green-500"
                        : "border-2 border-red-500"
                      : "")
                  }
              />
              {correct ? (
                correct?.playfairKey ? (
                  <TiTick className="h-6 w-6 text-green-500" />
                ) : (
                  <RxCross2 className="h-6 w-6 text-red-500" />
                )
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center font-semibold">Puzzle 5</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <input
                type="text"
                value={form.passcode}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, passcode: e.target.value };
                  })
                }
                placeholder="Admin password"
                className={
                    "w-full rounded-full border border-gray-300 p-2 " +
                    (correct
                      ? correct.passcode
                        ? "border-2 border-green-500"
                        : "border-2 border-red-500"
                      : "")
                  }
              />
              {correct !== undefined ? (
                correct?.passcode ? (
                  <TiTick className="h-6 w-6 text-green-500" />
                ) : (
                  <RxCross2 className="h-6 w-6 text-red-500" />
                )
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center font-semibold">
              Did you solve the captcha?
            </h2>
            <div className="flex w-full max-w-sm flex-row justify-center space-x-2">
              <div className="flex items-center">
                <input
                  id="radio1"
                  type="radio"
                  defaultChecked
                  onChange={(e) =>
                    setForm((p) => {
                      return { ...p, captchaSolved: true };
                    })
                  }
                  value="true"
                  name="captcharadio"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor="radio1"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="radio2"
                  type="radio"
                  value="false"
                  onChange={(e) =>
                    setForm((p) => {
                      return { ...p, captchaSolved: false };
                    })
                  }
                  name="captcharadio"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor="radio2"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  No
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center font-semibold">Puzzle 6</h2>
            <div className="flex w-full flex-row flex-wrap justify-center items-center gap-2">
              <div className="flex justify-center items-center flex-1 max-w-sm">
              <input
                type="text"
                value={form.hackerName}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, hackerName: e.target.value };
                  })
                }
                placeholder="Hacker name"
                className={
                    "flex-1 rounded-full border border-gray-300 p-2 " +
                    (correct
                      ? correct.hackerName
                        ? "border-2 border-green-500"
                        : "border-2 border-red-500"
                      : "")
                  }
              />
              {correct ? (
                correct?.hackerName ? (
                  <TiTick className="h-6 w-6 text-green-500" />
                ) : (
                  <RxCross2 className="h-6 w-6 text-red-500" />
                )
              ) : (
                <></>
              )}
              </div>
              <div className="flex justify-center items-center flex-1 max-w-sm">
              <input
                type="text"
                value={form.hackerLocation}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, hackerLocation: e.target.value };
                  })
                }
                placeholder="Hacker location"
                className={
                    "flex-1 rounded-full border border-gray-300 p-2 " +
                    (correct
                      ? correct.hackerLocation
                        ? "border-2 border-green-500"
                        : "border-2 border-red-500"
                      : "")
                  }
              />
              {correct ? (
                correct?.hackerLocation ? (
                  <TiTick className="h-6 w-6 text-green-500" />
                ) : (
                  <RxCross2 className="h-6 w-6 text-red-500" />
                )
              ) : (
                <></>
              )}
              </div>
              <div className="flex justify-center items-center flex-1 max-w-sm">
                <input
                type="text"
                value={form.hackerPin}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, hackerPin: e.target.value };
                  })
                }
                placeholder="Hacker pin"
                className={
                    "flex-1 rounded-full border border-gray-300 p-2 " +
                    (correct
                      ? correct.hackerPin
                        ? "border-2 border-green-500"
                        : "border-2 border-red-500"
                      : "")
                  }
              />
              {correct ? (
                correct?.hackerPin ? (
                  <TiTick className="h-6 w-6 text-green-500" />
                ) : (
                  <RxCross2 className="h-6 w-6 text-red-500" />
                )
              ) : (
                <></>
              )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center font-semibold">DE</h2>
            <div className="flex w-full flex-row items-center justify-center space-x-2">
              {Array.from({ length: 16 }, (_, index) => (
                <input
                  id={`de-input-${index}`}
                  key={index}
                  className={"h-8 w-8 border border-gray-300 text-center text-xl "+
                        (correct
                            ? correct.directEntry
                            ? "border-2 border-green-500"
                            : "border-2 border-red-500"
                            : "")
                        }
                  type="text"
                  maxLength={1}
                  value={de[index] ?? ""}
                  onChange={(e) => handleChange(e, index)}
                />
              ))}
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
