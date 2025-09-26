import { useState } from 'react';

export default function SearchBar({
    placeholder = 'Search...',
    onSearch,
}: SearchBarProps) {
    const [query, setQuery] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSearch(query);
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4 w-full">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full border-2 border-black/10 rounded-xl p-3 bg-white/80 shadow focus:outline-none focus:ring-2 focus:ring-black/10 transition placeholder:text-gray-700 dark:placeholder:text-gray-50"
            />
        </form>
    );
}
