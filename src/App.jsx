import { useState } from "react";
import "./App.css";
import Contacts from "./components/Contacts";
import ContactsList from "./components/ContactsList";
import SearchBar from "./components/SearchBar";
import Modal from "./components/Modal";

function App() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = contacts.filter((c) => {
    const s = search.trim().toLowerCase();
    return (
      `${c.name} ${c.lastName}`.toLowerCase().includes(s) ||
      c.email.toLowerCase().includes(s)
    );
  });

  return (
    <div className="app" dir="rtl">
      <header className="top">
        <h1>Contact App</h1>
        <p> تعداد مخاطبین: {contacts.length}</p>
      </header>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <button className="btn primary add-btn" onClick={() => setShowForm(true)}>
          + افزودن
        </button>
      </div>

    <ContactsList contacts={filtered} setContacts={setContacts} total={contacts.length} onAdd={() => setShowForm(true)} />
      {showForm && (
        <Modal title="مخاطب جدید" onClose={() => setShowForm(false)}>
          <Contacts setContacts={setContacts} onClose={() => setShowForm(false)}/>
        </Modal>
      )}
    </div>
  );
}

export default App;