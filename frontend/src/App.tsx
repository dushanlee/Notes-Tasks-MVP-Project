import { Routes, Route } from 'react-router'
import Layout from "./Layout"
import DashboardPage from "./pages/DashboardPage"
import NotesPage from "./pages/NotesPage"
import TasksPage from "./pages/TasksPage"
import NoteDetail from "./pages/NoteDetail"
import TaskDetail from "./pages/TaskDetail"
import CreateNote from "./pages/CreateNote"
import CreateTask from "./pages/CreateTask"
import EditNote from './pages/EditNote'
import EditTask from './pages/EditTask'
import './App.css'

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<DashboardPage />} />
                <Route path="notes" element={<NotesPage />} />
                <Route path="tasks" element={<TasksPage />} />
                <Route path="notes/:id" element={<NoteDetail />} />
                <Route path="tasks/:id" element={<TaskDetail />} />
                <Route path="notes/new" element={<CreateNote />} />
                <Route path="tasks/new" element={<CreateTask />} />
                <Route path="notes/:id/edit" element={<EditNote />} />
                <Route path="tasks/:id/edit" element={<EditTask />} />

            </Route>
        </Routes>
    )
}
export default App
