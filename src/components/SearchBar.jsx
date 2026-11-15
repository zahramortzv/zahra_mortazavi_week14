function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrap">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4" />
      </svg>
      <input className="search" placeholder="جستجو با نام، نام خانوادگی یا ایمیل…"
        value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export default SearchBar;