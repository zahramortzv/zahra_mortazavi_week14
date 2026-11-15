function ContactsList({ contacts, total }) {
  if (total === 0) {
    return (
      <div className="list-empty">
        <p>اولین مخاطب را اضافه کن تا اینجا نمایش داده شود.</p>
      </div>
    );
  }

  if (contacts.length === 0) {
    return <p className="list-empty">نتیجه‌ای پیدا نشد عبارت دیگری را جستجو کنید.</p>;
  }

  return (
    <ul className="list">
      {contacts.map((c) => (
        <li key={c.id} className="item">
          <span className="item-avatar">{c.name[0]}{c.lastName[0]}</span>
          <b className="item-cell">{c.name} {c.lastName}</b>
          <span className="item-cell" dir="ltr">{c.email}</span>
          <span className="item-cell" dir="ltr">{c.phone}</span>
        </li>
      ))}
    </ul>
  );
}

export default ContactsList;