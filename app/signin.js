"use client";
import React, { useEffect, useState } from "react";
import instance from "./axios";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [channelid, setChannelID] = useState("");
  const [serverid, setServerID] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [validation, setValidation] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(false);
    let value = localStorage.getItem("AuthObject");
    console.log(value);
    if (!value) {
      setShow(true);
    } else {
      router.push("/dashboard");
    }
  }, [router]);

  const check = () => {
    if (
      channelid.trim().length === 0 ||
      serverid.trim().length === 0 ||
      secretKey.trim().length === 0
    ) {
      return;
    }
    instance
      .post("/checkAuth", {
        channelId: channelid,
        serverId: serverid,
        secret: secretKey,
      })
      .then((res) => {
        if (res.status == 200) {
          setValidation(false);
          const obj = {
            channelid,
            serverid,
            secretKey,
          };
          localStorage.setItem("AuthObject", JSON.stringify(obj));
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
        setValidation(true);
      });
    setChannelID("");
    setServerID("");
    setSecretKey("");
  };

  return show ? (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://gcdnb.pbrd.co/images/OyRxxsyz7GDC.png?o=1"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Wolfrine Bot Dashboard
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="serverid"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Server ID
              </label>
              <div className="mt-2">
                <input
                  id="serverid"
                  name="serverid"
                  type="text"
                  onChange={(e) => {
                    setServerID(e.target.value);
                  }}
                  value={serverid}
                  autoComplete="off"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="channelid"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Channel ID
              </label>
              <div className="mt-2">
                <input
                  id="channelid"
                  name="channelid"
                  type="text"
                  autoComplete="off"
                  required
                  onChange={(e) => {
                    setChannelID(e.target.value);
                  }}
                  value={channelid}
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="secretKey"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Secret Key
              </label>
              <div className="mt-2">
                <input
                  id="secretKey"
                  name="secretKey"
                  type="text"
                  autoComplete="off"
                  required
                  onChange={(e) => {
                    setSecretKey(e.target.value);
                  }}
                  value={secretKey}
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={check}
              >
                Visit Dashboard
              </button>
            </div>
            {validation && (
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-500">
                Authentication Failed
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
      <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
    </div>
  );
}
