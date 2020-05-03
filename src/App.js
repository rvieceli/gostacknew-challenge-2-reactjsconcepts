import React, { useState, useEffect } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await api.get(`/repositories`);

      setRepositories(data);
    }

    load();
  }, []);

  async function handleAddRepository() {
    try {
      const { data } = await api.post(`/repositories`, {
        title: "new from front",
        url: "front.com",
        techs: ["Restjs", "Nodejs"],
      });

      setRepositories([data, ...repositories]);
    } catch {
      alert("Não foi possivel");
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    } catch {
      alert("Não foi possivel");
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
