import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createActorThunk } from '../../store/actors';
import './CreateActorForm.css';

const CreateActorForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [name, setName] = useState('');
  const [img_url, setImgUrl] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      user_id: user.id,
      name,
      img_url,
    };

    const data = await dispatch(createActorThunk(formData));

    if (data.errors) {
      setErrors(data.errors);
    } else {
      history.push(`/actors/${data.payload.id}`);
    }
  };

  return (
    <div className="create-actor-container">
      <h2>Create a New Actor</h2>
      <form onSubmit={handleSubmit}>
        <ul className="errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
          />
        </label>
        <label>
          Image URL:
          <input
            type="url"
            value={img_url}
            onChange={(e) => setImgUrl(e.target.value)}
            placeholder='Image URL'
          />
        </label>
        <div className='button-container'>
          <button type="submit">Create Actor</button>
          <button type="button" className='cancel-button' onClick={() => history.goBack()}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateActorForm;
