import TasksCompleted from "./tasks-api";
export async function generateMetadata({ params }) {
  return {
    title: `Dashboard - ${params.task}`,
  };
}

export default function TasksCompletedOuter({params}) {
  return (
    <>
      <TasksCompleted data={params.task} />
    </>
  );
}
