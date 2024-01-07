import css from './Contact.module.css';

export const ContactForm = ({ handleAddContact }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const name = e.currentTarget.elements.name.value;
    const number = e.currentTarget.elements.number.value;

    const formData = {
      name,
      number,
    };
    handleAddContact(formData);
    e.target.reset();
  };
  return (
    <div>
      <form className={css.contactForm} onSubmit={handleSubmit}>
        <label className={css.contactNameLabel}>Name</label>
        <input
          className={css.inputField}
          type="text"
          placeholder="Contact name"
          name="name"
          required
        />
        <label className={css.contactNameLabel}>Number</label>
        <input
          className={css.inputField}
          type="tel"
          placeholder="Phone number"
          name="number"
          required
        />
        <button type="submit" className={css.contactBtn}>
          Add contact
        </button>
      </form>
    </div>
  );
};
