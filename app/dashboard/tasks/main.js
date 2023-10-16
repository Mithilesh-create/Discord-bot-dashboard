"use client";
import EditModal from "../../components/editmodal";
import DeleteModal from "../../components/deletemodal";
import Sidebar from "../../components/sidebar";
import React, { useEffect, useState } from "react";
import instance from "../../axios";

export default function Tasks() {
  const [show, setShow] = React.useState(false);

  const [showEdit, setShowEdit] = React.useState(false);
  const [data, setdata] = useState({});
  const [dataID, setID] = useState("");
  const [Title, setTitle] = useState("");

  useEffect(() => {
    let value = JSON.parse(localStorage.getItem("AuthObject"));
    if (!value) return;
    instance
      .post("/gettask", {
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
  const deleteTask = async () => {
    instance
      .put("/deletetask", {
        taskid: dataID,
        id: data._id,
      })
      .then((res) => {
        if (res.status == 200) {
          data.task = data.task.filter((e) => e._id != dataID);
          setdata(data);
          setShow(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
      });
  };
  const editTask = async () => {
    if (Title.trim() === "") return;

    instance
      .put("/edittask", {
        taskid: dataID,
        id: data._id,
        title: Title,
      })
      .then((res) => {
        if (res.status == 200) {
          var index = data.task.findIndex((e) => e._id === dataID);
          data.task[index].title = Title;
          setdata(data);
          setShowEdit(false);
          setTitle("");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
      });
  };
  return (
    <>
      <Sidebar>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-full">
          {data.task?.length > 0 ? (
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
                    Task Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Created At
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  ></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {data.task?.map((e) => {
                  return (
                    <tr className="hover:bg-gray-50" key={e._id}>
                      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="text-sm">
                          <div className="font-medium text-gray-700">
                            {data.title}
                          </div>
                        </div>
                      </th>

                      <td className="px-6 py-4">{e.title}</td>
                      <td className="px-6 py-4">
                        {e.createdAt.split("T")[0] +
                          " " +
                          e.createdAt.split("T")[1].split(".")[0]}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-4">
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              setID(e._id);
                              setShow(true);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-6 w-6"
                              x-tooltip="tooltip"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              setID(e._id);
                              setShowEdit(true);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-6 w-6"
                              x-tooltip="tooltip"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No Tasks</p>
          )}
        </div>
        {showEdit ? (
          <EditModal
            closeModal={() => {
              setShowEdit(false);
            }}
            data={dataID}
            taskTitle={Title}
            onchangeTitle={(e) => setTitle(e.target.value)}
            editChanges={() => {
              editTask();
            }}
          />
        ) : null}
        {show ? (
          <DeleteModal
            closeModal={() => {
              setShow(false);
            }}
            data={dataID}
            deleteID={() => deleteTask()}
          />
        ) : null}
      </Sidebar>
    </>
  );
}
