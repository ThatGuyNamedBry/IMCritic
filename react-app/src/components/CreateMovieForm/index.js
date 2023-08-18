import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createMovieThunk } from '../../store/movie';
import './CreateMovieForm.css';

const CreateMovieForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [title, setTitle] = useState('');
    const [release_year, setReleaseYear] = useState('');
    const [genre, setGenre] = useState('');
    const [director, setDirector] = useState('');
    const [writer, setWriter] = useState('');
    const [description, setDescription] = useState('');
    const [trailer, setTrailer] = useState('');
    const [img_url, setImgUrl] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            user_id: user.id,
            title,
            release_year,
            genre,
            director,
            writer,
            description,
            trailer,
            img_url
        };

        // if (description.length < 50 || description.length > 1000) {
        //     setErrors([ "Description length must be between 50 and 1000 characters"]);
        // }

        const data = await dispatch(createMovieThunk(formData));

        if (data.errors) {
            setErrors(data.errors);
        } else {
            history.push(`/movies/${data.payload.id}`);
        }
    }

    return (
        <div className='create-movie-container'>
            <h2>Create a New Movie</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title'
                    />
                </label>
                <label>
                    Release Year:
                    <input
                        type="number"
                        value={release_year}
                        onChange={(e) => setReleaseYear(e.target.value)}
                        placeholder='Release Year'
                    />
                </label>
                <label>
                    Genre:
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        placeholder='Genre'
                    />
                </label>
                <label>
                    Director:
                    <input
                        type="text"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                        placeholder='Director'
                    />
                </label>
                <label>
                    Writer:
                    <input
                        type="text"
                        value={writer}
                        onChange={(e) => setWriter(e.target.value)}
                        placeholder='Writer'
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Description'
                    />
                </label>
                <label>
                    Trailer URL:
                    <input
                        type="url"
                        value={trailer}
                        onChange={(e) => setTrailer(e.target.value)}
                        placeholder='Trailer URL'
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
                <button type="submit">Create Movie</button>
            </form>
            <ul className="errors">
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
        </div>
    );

};

export default CreateMovieForm;

{/* <ul>
{Object.values(errors).map((error, idx) => (
    <li key={idx}>{error}</li>
))}
</ul> */}
