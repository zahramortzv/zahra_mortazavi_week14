import { useState } from "react";
import Modal from "./Modal";

function ContactsList({ contacts,setContacts, total }) {

  const [contactToDelete, setContactToDelete] = useState(null);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [error, setError] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);

   const confirmDelete = () => {
    setContacts((contacts) => contacts.filter((c) => c.id !== contactToDelete.id));
    setContactToDelete(null);
  };

  const confirmEdit= (e) => {
      e.preventDefault();
      if(!contactToEdit.name || !contactToEdit.lastName || !contactToEdit.email || !contactToEdit.phone){
      setError("لطفاً همه‌ی فیلدها را پر کنید");
      return; 
      }
      
       setContacts((contacts) =>
        contacts.map((c) => (c.id === contactToEdit.id ? contactToEdit : c))
      );
      setContactToEdit(null);
      setError("");
  };

    const changeHandler = (e) => {
    const { name, value } = e.target;
    setError("");
    setContactToEdit((contact) => ({ ...contact, [name]: value }));
  };

    const toggleSelect = (id)=>{
      setSelectedIds(ids => selectedIds.includes(id) ? setSelectedIds.filter((x) => x.id !== id) :  [...ids, id]);
    }

  const confirmBulkDelete = () =>{
    setContacts((contacts) => contacts.filter(contact => !selectedIds.includes(contact.id)));
    setSelectedIds([]);
    setShowBulkConfirm(false);
  }

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
  <>
      {selectedIds.length > 0 && (
      <div className="bulk">
        <span>
          <button className="btn soft" onClick={() => setSelectedIds([])}>لغو</button>{" "}
          <button className="btn danger" onClick={() => setShowBulkConfirm(true)}>حذف گروهی</button>
        </span>
      </div>
    )}
    <ul className="list">
      {contacts.map((c) => (
        <li key={c.id} className="item">
          <input type="checkbox" className="item-check" aria-label="انتخاب"
          checked={selectedIds.includes(c.id)}  onChange={() => toggleSelect(c.id)} />
          <span className="item-avatar">{c.name[0]}</span>
          <b className="item-cell">{c.name} {c.lastName}</b>
          <span className="item-cell" dir="ltr">{c.email}</span>
          <span className="item-cell" dir="ltr">{c.phone}</span>
          <div className="item-actions">
            <button className="icon-btn" title="ویرایش" aria-label="ویرایش" onClick={() => {setContactToEdit(c)}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4" />
              </svg>
            </button>

            <button className="icon-btn del" title="حذف" aria-label="حذف" onClick={() => setContactToDelete(c)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
              </svg>
            </button>
            </div>
        </li>
      ))}
    </ul>
    {contactToDelete && (
        <Modal title="تایید حذف" onClose={() => setContactToDelete(null)}>
          <p>
            آیا از حذف «{contactToDelete.name} {contactToDelete.lastName}» اطمینان دارید؟
            این کار قابل بازگشت نیست.
          </p>
          <div className="actions">
            <button className="btn soft" onClick={() => setContactToDelete(null)}>انصراف</button>
            <button className="btn danger" onClick={confirmDelete}>بله، حذف کن</button>
          </div>
        </Modal>
      )}
      {contactToEdit && (
        <Modal title="ویرایش مخاطب" onClose={() => setContactToEdit(null)}>
    
          <form noValidate onSubmit={confirmEdit}>
            <div className="row">
              <label className="field">
                <span>نام</span>
                <input name="name" value={contactToEdit.name} type="text" onChange={changeHandler} /> 
              </label>

              <label className="field">
                <span>نام خانوادگی</span>
                <input name="lastName" value={contactToEdit.lastName} type="text" onChange={changeHandler} />
              </label>
            </div>

            <label className="field">
              <span>ایمیل</span>
              <input name="email" type="email" dir="ltr" value={contactToEdit.email} onChange={changeHandler} />
            </label>

            <label className="field">
              <span>شماره موبایل</span>
              <input name="phone" inputMode="numeric" dir="ltr" maxLength={11} value={contactToEdit.phone} onChange={changeHandler} />
            </label>
            {error && <p className="form-error" role="alert">{error}</p>}   
            <div className="actions">
              <button type="button" className="btn soft" onClick={() => setContactToEdit(null)}>انصراف</button>
              <button className="btn primary" >ذخیره</button>
            </div>
        </form>
        </Modal>
      )}
      {showBulkConfirm && (
      <Modal title="تایید حذف گروهی" onClose={() => setShowBulkConfirm(false)}>
        <p>{selectedIds.length} مخاطب انتخاب‌شده حذف شوند؟ این کار قابل بازگشت نیست.</p>
        <div className="actions">
          <button className="btn soft" onClick={() => setShowBulkConfirm(false)}>انصراف</button>
          <button className="btn danger" onClick={confirmBulkDelete}>بله، حذف کن</button>
        </div>
      </Modal>
)}
    </>
  );
}

export default ContactsList;