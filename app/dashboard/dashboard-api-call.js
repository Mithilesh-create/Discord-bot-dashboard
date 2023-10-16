"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import instance from "../axios";

export default function Dashboard() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    let value = JSON.parse(localStorage.getItem("AuthObject"));
    if (!value) return;
    instance
      .post("/getevent", {
        channelId: value.channelid,
        serverId: value.serverid,
      })
      .then((res) => {
        if (res.status == 200) {
          setdata(res.data.data);
          console.log(res.data.data);
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
          {data.length > 0 ? (
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Event Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    State
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Start Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    End Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Created By
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    No of submissions
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
                              {e.title}
                            </div>
                          </div>
                        </th>
                        <td className="px-6 py-4">
                          {e.active ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-red-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                              In Active
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          {e.startdate.split("T")[0]}
                        </td>
                        <td className="px-6 py-4">{e.enddate.split("T")[0]}</td>
                        <td className="px-6 py-4">{e.createduser}</td>
                        <td className="px-6 py-4">{e.numberOfSubmissions}</td>
                      </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No Events</p>
          )}
        </div>
      </Sidebar>
    </>
  );
}
