import React, { useState, useEffect } from 'react';

const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setSortedUsers(data);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSortedUsers(filteredUsers);
    setSearchHistory((prevHistory) => [...prevHistory, searchTerm]);
  };

  const handleSort = () => {
    const sortedUsersByName = [...sortedUsers].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setSortedUsers(sortedUsersByName);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleSort}>Sort by Name</button>
      <button onClick={clearSearchHistory}>Clear Search History</button>

      <div>
        <div>
          <strong>Search History:</strong>
          <ul>
            {searchHistory.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <ul>
          {sortedUsers.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;
