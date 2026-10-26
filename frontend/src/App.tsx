import { useEffect, useState } from "react"
import type { Application } from "./types/Application"
import './App.css'
import {
  getApplications,
  addApplication,
  updateApplication,
  deleteApplication,
} from "./api/applications"

import "./App.css"
import ApplicationList from "./components/ApplicationList"

export default function App() {
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    async function loadApplications() {
      const data = await getApplications()
      setApplications(data)
    }

    loadApplications()
  }, [])

  return (
    <div>
      <h1>Job Tracker</h1>
      <ApplicationList applications={applications}/>
    </div>
  )
}