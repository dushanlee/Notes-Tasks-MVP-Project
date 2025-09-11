import { useState } from "react"

export default function SearchBar({ placeholder = "Search...", onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("")

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setQuery(value)
        onSearch(value)
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        onSearch(query)
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-gray-300"
            />
        </form>
    )
}
