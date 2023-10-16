"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "../../components/sidebar";
import instance from "../../axios";

export default function Completed() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    let value = JSON.parse(localStorage.getItem("AuthObject"));
    if (!value) return;
    instance
      .post("/getcompleted", {
        channelId: value.channelid,
        serverId: value.serverid,
      })
      .then((res) => {
        if (res.status == 200) {
          setdata(res.data.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
      });
  }, []);
  return (
    <>
      <Sidebar>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-full">
          {data.length>0 ? (
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    User
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    No. of tasks
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Tasks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {data.map((e) => {
                  return (
                    <tr className="hover:bg-gray-50" key={e._id}>
                      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="text-sm">
                          <div className="font-medium text-gray-700">
                            {e.username}
                          </div>
                          <div className="text-gray-400">{e.userid}</div>
                        </div>
                      </th>

                      <td className="px-6 py-4">{e.task.length}</td>

                      <td className="px-6 py-4 text-blue-700">
                        {e.task.length > 0 ? (
                          <Link href={`/dashboard/completed-users/${e._id}`}>
                            Link
                          </Link>
                        ) : (
                          <div className="cursor-pointer text-gray-600">
                            Link
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No Completed Users</p>
          )}
        </div>
      </Sidebar>
    </>
  );
}
