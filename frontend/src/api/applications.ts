import type { Application } from "../types/Application";

async function getApplications(): Promise<Application[]> {
  const response = await fetch("http://127.0.0.1:8000/applications");
  if (!response.ok) {
    throw new Error("Cannot retrieve Applications");
  }

  const data = await response.json();
  return data;
}

async function addApplication(
  newApplication: Application,
): Promise<Application> {
  const response = await fetch("http://127.0.0.1:8000/applications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newApplication),
  });
  if (!response.ok) {
    throw new Error("Failed to add Application");
  }
  const createdApplication = await response.json();
  return createdApplication;
}

async function updateApplication(
  id: number,
  status: string,
): Promise<Application> {
  const response = await fetch(`http://127.0.0.1:8000/applications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error("Failed to update Status");
  }
  const updatedApplication = await response.json();
  return updatedApplication;
}

async function deleteApplication(id: number): Promise<void> {
  const response = await fetch(`http://127.0.0.1:8000/applications/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete application");
  }
}
