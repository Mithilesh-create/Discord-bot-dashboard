import TasksRegistered from "./task-api";
export async function generateMetadata({ params }) {
  return {
    title: `Dashboard - ${params.task}`,
  };
}
export default function TasksRegisteredOuter({params}) {
  return (
    <>
      <TasksRegistered data={params.task}/>
    </>
  );
}
