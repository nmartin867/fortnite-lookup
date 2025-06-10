import React, { useState } from 'react';
import { useLookup } from '../hooks/useLookup';

const UserList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [submittedTerm, setSubmittedTerm] = useState('');

    const {
        data: apiResponse,
        isLoading,
        isError,
        error
    } = useLookup(submittedTerm);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittedTerm(searchTerm);
    };

    return (
        <div style={{ padding: '1rem' }}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search users by name"
                />
                <button type="submit">Search</button>
            </form>

            {isLoading && <p>Loading...</p>}
            {isError && <p style={{ color: 'red' }}>Error: {error.message}</p>}

            {apiResponse && apiResponse?.matches.length === 0 && <p>No users found.</p>}

            <ul>
                {apiResponse?.matches.map(user => (
                    <li key={user.id}>
                        {user.name} – {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
