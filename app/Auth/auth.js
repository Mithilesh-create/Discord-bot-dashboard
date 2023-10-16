"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Auth(props) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    let value = localStorage.getItem("AuthObject");

    if (!value) {
      router.push("/");
    } else {
      setShow(true);
    }
  }, [router]);
  return show ? (
    <>{props.children}</>
  ) : (
    <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
      <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
    </div>
  );
}
