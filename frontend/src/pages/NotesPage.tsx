import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { getAllNotes } from "../connections/noteApi";
import { deleteNotesBulk } from "../connections/noteDeleteApi";
import type { Note } from "../vite-env";

export default function NotesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getAllNotes().then((data) => {
      if (!data) {
        setError("Couldn't load notes");
        setLoading(false);
        return;
      }
      setNotes(data);
      setFilteredNotes(data);
      setLoading(false);
    });
  }, []);

  function handleSearch(query: string) {
    if (!query.trim()) {
      setFilteredNotes(notes);
    } else {
      const lower = query.toLowerCase();
      setFilteredNotes(
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(lower) ||
            note.content.toLowerCase().includes(lower)
        )
      );
    }
    setSelectedIds([]);
    setSelectAll(false);
  }

  function handleSelectId(id: number, checked: boolean) {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((nid) => nid !== id)
    );
  }

  function handleSelectAll(checked: boolean) {
    setSelectAll(checked);
    setSelectedIds(checked ? filteredNotes.map((n) => n.id) : []);
  }

  async function handleDeleteSelected() {
    if (selectedIds.length === 0) return;
    setDeleting(true);
    const ok = await deleteNotesBulk(selectedIds);
    if (ok) {
      const newNotes = notes.filter((n) => !selectedIds.includes(n.id));
      setNotes(newNotes);
      setFilteredNotes(newNotes);
      setSelectedIds([]);
      setSelectAll(false);
    } else {
      alert("Failed to delete selected notes.");
    }
    setDeleting(false);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className="flex w-full h-full flex-1 bg-white rounded-xl">
      <div className="w-full space-y-6 px-4 md:px-8 border-2 border-black/10 dark:border-gray-700 rounded-xl shadow bg-white/70 dark:bg-gray-800 flex flex-col pt-8">
        <div className="flex items-center justify-between w-full mb-8 relative">
          <h1 className="text-2xl font-bold text-black dark:text-white text-center w-full">
            Notes
          </h1>
          <button
            className="absolute right-0 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl px-6 py-3 font-semibold text-lg shadow hover:bg-gray-100 dark:hover:bg-gray-800 transition border-2 border-black/10 dark:border-gray-700 whitespace-nowrap"
            onClick={() => navigate("/notes/new")}
          >
            + New Note
          </button>
        </div>
        {notes.length === 0 ? (
          <p className="text-center w-full mt-4 mb-8">
            No notes available. Create a new note!
          </p>
        ) : (
          <>
            <div className="w-full">
              <SearchBar
                placeholder="Search notes..."
                onSearch={handleSearch}
              />
            </div>
            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
              <span className="text-sm text-gray-600 font-semibold">
                Total Notes: {notes.length}
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  aria-label="Select all notes"
                />
                <span className="text-xs">Select All</span>
                <button
                  className="ml-2 px-3 py-1 rounded bg-red-500 text-white text-xs font-semibold disabled:opacity-50"
                  disabled={selectedIds.length === 0 || deleting}
                  onClick={handleDeleteSelected}
                >
                  {deleting
                    ? "Deleting..."
                    : `Delete Selected (${selectedIds.length})`}
                </button>
              </div>
            </div>
            <div className="w-full">
              <NoteList
                notes={filteredNotes}
                selectedIds={selectedIds}
                onSelectId={handleSelectId}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
