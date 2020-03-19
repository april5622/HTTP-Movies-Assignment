import React, {useState, useEffect} from "react";
import axios from "axios";

const initialItem = {
    title: "",
    director: "",
    metascore:"",
    stars:[]
};

const UpdateForm = props => {
    const [movie, setMovie] = useState(initialItem);

    useEffect(() => {
        const movieToUpdate = props.movie.find(movie => {
            return `${movie.id}` === props.match.params.id;
        });

        console.log("movieToUpdate", movieToUpdate);

        if(movieToUpdate) {
            setMovie(movieToUpdate);
        }
    }, [props.movies, props.match.params.id]);

    const changeHandler = ev => {
        // e.persist();
        // let value = e.target.value;
        // if (e.target.name === "price") {
        //     value = parseInt(value, 10);
        // }

        setMovie({
            ...movie,
            [ev.target.name]: ev.target.value
        });
    };

    const handleSubmit = e => {
        e.prevent.Default();

        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log(res);
                props.updateMovies(res.data);
                //props.history.push("/");

            })
            .catch(err => {
                console.log(err);
            });
    }; // handleSubmit

    return(
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <input 
                type ="text"
                name="title"
                onChange={changeHandler}
                placeholder="Title"
                value={movie.name}
                />
                <div className="baseline" />

                <input 
                type="text"
                name="director"
                onChange={changeHandler}
                placeholder="Director"
                value={movie.director}
                />
                <div className="baseline" />

                <input 
                type="text"
                name="metascore"
                onChange={changeHandler}
                placeholder="Metascore"
                value={movie.metascore}
                />
                <div className="baseline" />

                <input 
                type="text"
                name="stars"
                onChange={changeHandler}
                placeholder="Stars"
                value={movie.stars}
                />
                <div className="baseline" />

                <button type="submit">Update</button>
            </form>
        </div>
    )



} // end of UpdateForm

export default UpdateForm;