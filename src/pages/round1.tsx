import React, { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

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

export default function Round1() {
  const [de, setDe] = useState<string>("");
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
  const addForm=api.round1.submitForm.useMutation()
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
    addForm.mutate(form,{
        onSuccess:()=>{
            alert("Form submitted successfully")
        },
        onError:(err)=>{
            alert("Error submitting form")
        }
    })
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
      <div className="mx-3 mt-3 flex flex-col">
        <h1 className="mb-4 text-center text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
          Round 1
        </h1>

        <form onSubmit={submit}>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center">Puzzle 1</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                value={form.hiddenRoute}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, hiddenRoute: e.target.value };
                  })
                }
                type="text"
                placeholder="Hidden route"
                className="pl-2"
              />
            </div>
          </div>
          <hr className="my-2 h-px border-0 bg-gray-200 dark:bg-gray-700" />
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center">Puzzle 2</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                value={form.loginRoute}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, loginRoute: e.target.value };
                  })
                }
                placeholder="Login route"
                className=" pl-2"
              />
            </div>
          </div>
          <hr className="my-2 h-px border-0 bg-gray-200 dark:bg-gray-700" />
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center">Puzzle 3</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                value={form.shifts}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, shifts: e.target.value };
                  })
                }
                placeholder="Ceaser cipher key"
                className=" pl-2"
              />
            </div>
          </div>
          <hr className="my-2 h-px border-0 bg-gray-200 dark:bg-gray-700" />
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center">Puzzle 4</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                value={form.playfairKey}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, playfairKey: e.target.value };
                  })
                }
                placeholder="Playfair cipher key"
                className=" pl-2"
              />
            </div>
          </div>
          <hr className="my-2 h-px border-0 bg-gray-200 dark:bg-gray-700" />
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center">Puzzle 5</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                value={form.passcode}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, passcode: e.target.value };
                  })
                }
                placeholder="Admin password"
                className=" pl-2"
              />
            </div>
          </div>
          <hr className="my-2 h-px border-0 bg-gray-200 dark:bg-gray-700" />
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center">Did you solve the captcha?</h2>
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
          <hr className="my-2 h-px border-0 bg-gray-200 dark:bg-gray-700" />
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center">Puzzle 6</h2>
            <div className="flex w-full flex-row items-center space-x-2">
              <Input
                type="text"
                value={form.hackerName}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, hackerName: e.target.value };
                  })
                }
                placeholder="Hacker name"
                className=" pl-2"
              />
              <Input
                type="text"
                value={form.hackerLocation}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, hackerLocation: e.target.value };
                  })
                }
                placeholder="Hacker location"
                className=" pl-2"
              />
              <Input
                type="text"
                value={form.hackerPin}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, hackerPin: e.target.value };
                  })
                }
                placeholder="Hacker pin"
                className=" pl-2"
              />
            </div>
          </div>
          <hr className="my-2 h-px border-0 bg-gray-200 dark:bg-gray-700" />
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center">DE</h2>
            <div className="flex w-full flex-row items-center justify-center space-x-2">
              {Array.from({ length: 16 }, (_, index) => (
                <input
                  id={`de-input-${index}`}
                  key={index}
                  className="mx-2 h-8 w-8 border border-gray-300 text-center text-xl"
                  type="text"
                  maxLength={1}
                  value={de[index] ?? ""}
                  onChange={(e) => handleChange(e, index)}
                />
              ))}
            </div>
          </div>
          <div className="mt-2 flex justify-center">
            <Button type="submit" className="bg-[#10b981] text-white">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
