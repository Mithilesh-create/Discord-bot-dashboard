"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar";
import instance from "../../../axios";

export default function TasksRegistered(props) {
  const [data, setdata] = useState({});
  useEffect(() => {
    instance
      .get(`/getuser/${props.data}`)
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
  }, [props.data]);
  return (
    <>
      <Sidebar>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-full">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  User
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Task Link
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Post Link
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {data.task?.map((e) => {
                return (
                    <tr className="hover:bg-gray-50" key={e._id}>
                      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="text-sm">
                          <div className="font-medium text-gray-700">
                            {data.username}
                          </div>
                          <div className="text-gray-400">{data.userid}</div>
                        </div>
                      </th>

                      <td className="px-6 py-4 text-blue-500">
                        <a href={e.taskurl}>Link</a>
                      </td>
                      <td className="px-6 py-4 text-blue-500">
                        <a href={e.posturl}>Link</a>
                      </td>
                      <td className="px-6 py-4">
                        {e.entry.split("T")[0] + " " + e.entry.split("T")[1].split(".")[0]}
                      </td>
                    </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Sidebar>
    </>
  );
}
