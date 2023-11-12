import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      <div className="mx-3 mt-3 flex flex-col">
        <h1 className="mb-4 text-center text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
          Round 2
        </h1>
        <form onSubmit={submit}>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center">Puzzle 1</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                value={form.firstWord}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, firstWord: e.target.value };
                  })
                }
                placeholder="First word"
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
                value={form.secondWord}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, secondWord: e.target.value };
                  })
                }
                placeholder="Second word"
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
                value={form.thirdWord}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, thirdWord: e.target.value };
                  })
                }
                placeholder="Third word"
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
                value={form.hexahue}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, hexahue: e.target.value };
                  })
                }
                placeholder="** ** ** ** ** ** ** ** ** ** **"
                className=" pl-2"
              />
            </div>
          </div>
          <hr className="my-2 h-px border-0 bg-gray-200 dark:bg-gray-700" />
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center">Puzzle 5</h2>
            <div className="flex w-full flex-row items-center space-x-2">
              <Input
                type="text"
                value={form.latitude}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, latitude: e.target.value };
                  })
                }
                placeholder="Latitude"
                className=" pl-2"
              />
              <Input
                type="text"
                value={form.longitude}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, longitude: e.target.value };
                  })
                }
                placeholder="Longitude"
                className=" pl-2"
              />
            </div>
          </div>
          <hr className="my-2 h-px border-0 bg-gray-200 dark:bg-gray-700" />
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center">Puzzle 6</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                value={form.asciiResult}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, asciiResult: e.target.value };
                  })
                }
                placeholder="Passcode"
                className=" pl-2"
              />
            </div>
          </div>
          <hr className="my-2 h-px border-0 bg-gray-200 dark:bg-gray-700" />
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center">Puzzle 7</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                value={form.badge}
                onChange={(e) =>
                  setForm((p) => {
                    return { ...p, badge: e.target.value };
                  })
                }
                placeholder="Badge"
                className=" pl-2"
              />
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
