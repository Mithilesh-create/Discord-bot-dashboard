import Dashboard from "./dashboard-api-call";

export const metadata = {
  title: "Dashboard - Home",
};

export default function DashboardOuter() {
  return (
    <>
      <Dashboard/>
    </>
  );
}
