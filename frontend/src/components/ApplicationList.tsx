import type { Application } from "../types/Application";
import ApplicationCard from "./ApplicationCard";

type ApplicationListProps = {
  applications: Application[];
};

export default function ApplicationList({
  applications,
}: ApplicationListProps) {
  return applications.map((application) => (
    <ApplicationCard application={application} key={application.id} />
  ));
}
