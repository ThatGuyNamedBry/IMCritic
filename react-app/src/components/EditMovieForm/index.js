import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateMovieThunk } from '../../store/movie';
import { useModal } from '../../context/Modal';
import './EditMovieForm.css';

const EditMovieForm = ({ movie }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [title, setTitle] = useState(movie.title);
    const [release_year, setReleaseYear] = useState(movie.release_year);
    const [genre, setGenre] = useState(movie.genre);
    const [director, setDirector] = useState(movie.director);
    const [writer, setWriter] = useState(movie.writer);
    const [description, setDescription] = useState(movie.description);
    const [trailer, setTrailer] = useState(movie.trailer);
    const [img_url, setImgUrl] = useState(movie.img_url);
    const [errors, setErrors] = useState([]);

    const convertToEmbedURL = (url) => {
        if (url.includes('youtube.com/watch?v=')) {
            const videoId = url.split('v=')[1];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    };

    const validateTrailerURL = (url) => {
        if (!url.includes('youtube.com/embed/')) {
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

		const embedTrailer = convertToEmbedURL(trailer);

		if (!validateTrailerURL(embedTrailer)) {
			setErrors(['Trailer URL must be a valid YouTube embed URL.']);
			return;
		}

        const formData = {
            title,
            release_year,
            genre,
            director,
            writer,
            description,
            trailer: embedTrailer,
            img_url,
        };

        const data = await dispatch(updateMovieThunk(movie, formData));

        if (data.errors) {
            setErrors(data.errors);
        } else {
            closeModal();
        }
    };

    const handleCancel = () => {
        closeModal();
    }


    return (
        <div className="edit-movie-form-container">
            <h2>Edit Movie</h2>
            <form onSubmit={handleSubmit}>
                <ul className="errors">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
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
                <div className="button-container">
                <button type="submit">Save Changes</button>
                <button className="keep-button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditMovieForm;
