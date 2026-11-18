import { useState } from "react";

function Contacts({setContacts,onClose }) {

  const [error, setError] = useState("");
  const [contact, setContact] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setError("");
    setContact((contact) => ({ ...contact, [name]: value }));
  };

  const addHandler = (e) => {
    e.preventDefault();
    if(!contact.name || !contact.lastName || !contact.email || !contact.phone){
    setError("لطفاً همه‌ی فیلدها را پر کنید");
    return; 
    }
    setError("");
    const newContact = { ...contact, id: crypto.randomUUID() };
    setContacts((contacts) => [...contacts, newContact]);
     onClose(); 
  }

 const onCancel = () => onClose();

  return (
    <>
    <form noValidate onSubmit={addHandler}>
      <div className="row">
        <label className="field">
          <span>نام</span>
          <input name="name" value={contact.name} type="text" onChange={changeHandler} /> 
        </label>

        <label className="field">
          <span>نام خانوادگی</span>
          <input name="lastName" value={contact.lastName} type="text" onChange={changeHandler} />
        </label>
      </div>

      <label className="field">
        <span>ایمیل</span>
        <input name="email" type="email" dir="ltr" value={contact.email} onChange={changeHandler} />
      </label>

      <label className="field">
        <span>شماره موبایل</span>
        <input name="phone" inputMode="numeric" dir="ltr" maxLength={11} value={contact.phone} onChange={changeHandler} />
      </label>

      <div className="actions">
        <button type="button" className="btn soft" onClick={onCancel}>انصراف</button>
        <button className="btn primary" >ذخیره</button>
      </div>
    </form>
        {error && <p className="form-error" role="alert">{error}</p>}
    </>
  );
}

export default Contacts;