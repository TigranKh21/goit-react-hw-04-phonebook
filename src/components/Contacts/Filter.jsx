import css from './Contact.module.css';

export const Filter = ({ handleFindChange, filterData }) => {
  return (
    <div className={css.contactForm}>
      <label className={css.contactNameLabel}>Find contact by name</label>
      <input
        className={css.inputField}
        type="text"
        placeholder="search..."
        name="filter"
        value={filterData}
        onChange={handleFindChange}
      />
    </div>
  );
};
