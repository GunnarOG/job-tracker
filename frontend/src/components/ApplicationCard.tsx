import type { Application } from "../types/Application";

type ApplicationCardProps = {
  application: Application;
};

export default function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <div>
      <h2>{application.company}</h2>
      <p>{application.position}</p>
      <p>{application.status}</p>
    </div>
  );
}
