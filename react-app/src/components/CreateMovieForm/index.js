import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createMovieThunk } from '../../store/movie';
import './CreateMovieForm.css';

const CreateMovieForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
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
        const formData = { title, release_year, genre, director, writer, description, trailer, img_url };
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
                    />
                </label>
                <label>
                    Release Year:
                    <input
                        type="number"
                        value={release_year}
                        onChange={(e) => setReleaseYear(e.target.value)}
                    />
                </label>
                <label>
                    Genre:
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </label>
                <label>
                    Director:
                    <input
                        type="text"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                    />
                </label>
                <label>
                    Writer:
                    <input
                        type="text"
                        value={writer}
                        onChange={(e) => setWriter(e.target.value)}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Trailer URL:
                    <input
                        type="url"
                        value={trailer}
                        onChange={(e) => setTrailer(e.target.value)}
                    />
                </label>
                <label>
                    Image URL:
                    <input
                        type="url"
                        value={img_url}
                        onChange={(e) => setImgUrl(e.target.value)}
                    />
                </label>
                <button type="submit">Create Movie</button>
            </form>
            <ul className="errors-ul">
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
