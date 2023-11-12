import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { env } from "~/env.mjs";

interface LoginPageContent {
  loginTitle: string;
  username: string;
  password: string;
  loginButton: string;
  usernamePlaceholder: string;
  passwordPlaceholder: string;
}

export default function Login() {
  // get query paramater user ,
  // if 'guest' show login page with password and username in the order
  // whole page encrypted with ceaser cipher first with expect "Try different number of shifts"
  // after correct ceaser cipher key everthing is correct expect the "Try different number of shifts"===encrypted password(play fair cipher))
  // and if 'admin' show login page with password and insolvable captcha
  // cookies we hide playfair cipher key
  // successfull login leads to mail page where we get list of mails
  const router = useRouter();
  const { user, error } = router.query;
  const [cipherKey, setCipherKey] = useState<number>(() => 0);
  const [captchaSolved, setCaptchaSolved] = useState<boolean>(() => false);
  const [encryptedPassword, setEncryptedPassword] = useState<string>(
    () => "Try different number of shifts",
  );
  const [loginContent, setLoginContent] = useState<LoginPageContent>(() => ({
    loginTitle: "Advxc",
    username: "Jhtgcpbt",
    password: "Ephhldgs",
    loginButton: "Advxc",
    usernamePlaceholder: "Tbpxa dg Ewdct",
    passwordPlaceholder: "***********",
  }));
  const recaptcha = useRef<ReCAPTCHA>(null);
  //   const sitekey = process.env.SITE_KEY;
  //   console.log(sitekey);
  const changeWords = (str: string, value: number) => {
    let result = "";
    for (const char of str) {
      if (
        "A".charCodeAt(0) <= char.charCodeAt(0) &&
        char.charCodeAt(0) <= "Z".charCodeAt(0)
      )
        result += String.fromCharCode(
          ((char.charCodeAt(0) - "A".charCodeAt(0) + value) % 26) +
            "A".charCodeAt(0),
        );
      else if (
        "a".charCodeAt(0) <= char.charCodeAt(0) &&
        char.charCodeAt(0) <= "z".charCodeAt(0)
      )
        result += String.fromCharCode(
          ((char.charCodeAt(0) - "a".charCodeAt(0) + value) % 26) +
            "a".charCodeAt(0),
        );
      else {
        result += char;
      }
    }
    return result;
  };

  const changeCipher = (value: number) => {
    const val = value - cipherKey + 26;
    console.log(val);
    setCipherKey(() => value);
    const p: LoginPageContent = {
      loginTitle: changeWords(loginContent.loginTitle, val),
      username: changeWords(loginContent.username, val),
      password: changeWords(loginContent.password, val),
      loginButton: changeWords(loginContent.loginButton, val),
      usernamePlaceholder: changeWords(loginContent.usernamePlaceholder, val),
      passwordPlaceholder: changeWords(loginContent.passwordPlaceholder, val),
    };
    setLoginContent(() => p);
  };

  function onChange() {
    if (recaptcha.current !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      if (recaptcha.current.getValue()) setCaptchaSolved(true);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      recaptcha.current.reset();
    }
  }
  useEffect(() => {
    if (cipherKey === 11) {
      setEncryptedPassword("FVMUIKLY");
    }
  }, [cipherKey]);
  const { status: status } = useSession();

  if (status === "unauthenticated") {
    router.push("/",undefined).catch((e)=>console.log(e))
    return <></>
  }
  if (status === "loading") {
    return <></>;
  }
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <section className="w-1/3 rounded-xl bg-gray-100 px-10 py-6 shadow-xl">
        <h2 className="text-center text-5xl font-semibold text-black">
          {loginContent.loginTitle}
        </h2>
        {error && <div className="text-center text-red-600 text-sm">wrong password</div>}
        <form
          method="POST"
          action="/api/login2093"
          className="flex flex-col gap-5 pt-8"
        >
          <span className="flex flex-col gap-2">
            <label htmlFor="password">{loginContent.password}</label>
            <input
              name="password"
              type="password"
              placeholder={loginContent.usernamePlaceholder}
            />
          </span>
          {user !== "admin" && (
            <>
              <span className="flex flex-col gap-2">
                <label htmlFor="username">{loginContent.username}</label>
                <input
                  name="username"
                  type="text"
                  placeholder={loginContent.passwordPlaceholder}
                />
              </span>
            </>
          )}
          <span className="flex flex-col gap-2">
            {user === "admin" && (
              <ReCAPTCHA
                sitekey={env.NEXT_PUBLIC_RECAPTCHA_KEY}
                onChange={onChange}
                type="image"
                ref={recaptcha}
              />
            )}
          </span>
          <button
            type="submit"
            className="pt-5"
            {...(user !== "admin" || captchaSolved ? { disabled: true } : {})}
          >
            {loginContent.loginButton}
          </button>
        </form>

        <section className="space-x-4 pt-5">
          <label htmlFor="cipher">{encryptedPassword}</label>

          <select
            name="cipher"
            value={cipherKey}
            onChange={(e) => changeCipher(Number(e.target.value))}
          >
            {[...Array(26).keys()].map((i: number, key: number) => (
              <option value={i} key={key}>
                {i}
              </option>
            ))}
          </select>
        </section>
      </section>
    </main>
  );
}
