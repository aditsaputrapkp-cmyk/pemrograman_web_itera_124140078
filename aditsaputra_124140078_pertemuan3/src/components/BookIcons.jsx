import PropTypes from "prop-types";

const drawings = {
  collection: (
    <>
      <path d="M12 7.2C9.2 5.7 6.8 5.3 4.3 6v12.5c2.7-.7 5.2-.3 7.7 1.2V7.2Z" />
      <path d="M12 7.2c2.8-1.5 5.2-1.9 7.7-1.2v12.5c-2.7-.7-5.2-.3-7.7 1.2V7.2Z" />
      <path d="M7 9.2c1.1 0 2.1.3 3 .8M7 12c1.1 0 2.1.3 3 .8m7-3.6c-1.1 0-2.1.3-3 .8m3 2c-1.1 0-2.1.3-3 .8" />
    </>
  ),
  notes: (
    <>
      <path d="M6 4.5h8l4 4v10.8a1.2 1.2 0 0 1-1.2 1.2H6a1.5 1.5 0 0 1-1.5-1.5V6A1.5 1.5 0 0 1 6 4.5Z" />
      <path d="M14 4.8v4h3.7M8 12h7.5M8 15.5h7.5M8 19h4" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 2.8 14.1 9l6.1 3-6.1 2.1-2.1 6.1L9.9 14 3.8 12l6.1-3 2.1-6.2Z" />
      <path d="m19 2 .5 1.5L21 4l-1.5.5L19 6l-.5-1.5L17 4l1.5-.5L19 2Z" />
    </>
  ),
  heart: (
    <path d="M12 20s-8-4.7-8-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8 2.8C20 15.3 12 20 12 20Z" />
  ),
  books: (
    <>
      <path d="M4 6.5h4.2v12H4zM9.9 4.5h4.2v14H9.9zM15.8 7h4.2v11.5h-4.2z" />
      <path d="M5.2 9h1.8m4.1-1.5h1.8m4.1 2h1.8M3.5 20.5h17" />
    </>
  ),
  reading: (
    <>
      <path d="M4 6.5c2.8-.8 5.3-.4 8 1.1v11.7c-2.6-1.5-5.2-1.8-8-.9V6.5Zm16 0c-2.8-.8-5.3-.4-8 1.1v11.7c2.6-1.5 5.2-1.8 8-.9V6.5Z" />
      <path d="M16.5 9v3.5l-1.6-1-1.5 1V9" />
    </>
  ),
  owned: (
    <>
      <path d="M5.2 4.5h11.5l2.1 2.1v12.9H5.2a1.7 1.7 0 0 1-1.7-1.7V6.2a1.7 1.7 0 0 1 1.7-1.7Z" />
      <path d="M8 8.5h6.5m-6.5 3h4m1 4 1.5 1.5 3.2-3.4" />
    </>
  ),
  add: (
    <>
      <path d="M4 6.2c2.7-.8 5.2-.4 8 1.1v12c-2.7-1.5-5.3-1.9-8-1V6.2Z" />
      <path d="M12 7.3c1-.5 2-.9 3.1-1" />
      <circle cx="18" cy="16.5" r="4.2" />
      <path d="M18 14.5v4m-2-2h4" />
    </>
  ),
  arrow: <path d="M4 12h14m-5-5 5 5-5 5m2.5-10.5 3.5 1" />,
  search: (
    <>
      <circle cx="10.7" cy="10.7" r="6.3" />
      <path d="m15.4 15.4 4.1 4.1M8.2 9h5m-5 3.3h3.5" />
    </>
  ),
  edit: (
    <>
      <path d="m5 16.8-.8 3 3-.8L19 7.2 16.8 5 5 16.8Z" />
      <path d="m14.8 7 2.2 2.2M5.5 20h13" />
    </>
  ),
  remove: (
    <>
      <path d="M5 7h14l-1 13H6L5 7Z" />
      <path d="M3.5 4.5h17M9 4.5V3h6v1.5M9 10v6m6-6v6" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  bookmark: (
    <>
      <path d="M6 4.5h12v16l-6-3.8-6 3.8v-16Z" />
      <path d="m12 8 .8 1.7 1.9.3-1.4 1.3.3 1.9-1.6-.9-1.6.9.3-1.9-1.4-1.3 1.9-.3L12 8Z" />
    </>
  ),
  pages: (
    <>
      <path d="M5 5.5c2.4-.7 4.7-.3 7 1v12c-2.3-1.3-4.6-1.6-7-.9v-12Zm14 0c-2.4-.7-4.7-.3-7 1v12c2.3-1.3 4.6-1.6 7-.9v-12Z" />
      <path d="M8 9h1.5m-1.5 3h1.5m7-3h-1.5m1.5 3h-1.5" />
    </>
  ),
};

export default function BookIcon({ name, className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={`book-icon ${className}`.trim()}
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
    >
      {drawings[name]}
    </svg>
  );
}

BookIcon.propTypes = {
  name: PropTypes.oneOf(Object.keys(drawings)).isRequired,
  className: PropTypes.string,
};
