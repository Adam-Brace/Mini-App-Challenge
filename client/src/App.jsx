import React, { useState, useEffect } from "react";
import {
	Container,
	Typography,
	TextField,
	Button,
	List,
	ListItem,
	ListItemText,
	Checkbox,
	Box,
} from "@mui/material";
import "./App.css";

function App() {
	const [movies, setMovies] = useState([]);
	const [newMovie, setNewMovie] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredMovies, setFilteredMovies] = useState([]);

	// Fetch movies from the backend
	const fetchMovies = async () => {
		try {
			const response = await fetch("http://localhost:3001/api/movies");
			const data = await response.json();
			setMovies(data);
			setFilteredMovies(data);
		} catch (error) {
			console.error("Error fetching movies:", error);
		}
	};

	// Add a new movie
	const addMovie = async () => {
		if (!newMovie.trim()) return;
		try {
			const response = await fetch("http://localhost:3001/api/movies", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title: newMovie }),
			});
			const data = await response.json();
			setMovies([...movies, data]);
			setFilteredMovies([...movies, data]);
			setNewMovie("");
		} catch (error) {
			console.error("Error adding movie:", error);
		}
	};

	// Search for movies
	const searchMovies = () => {
		if (!searchQuery.trim()) {
			setFilteredMovies(movies);
			return;
		}
		const filtered = movies.filter((movie) =>
			movie.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredMovies(filtered);
	};

	// Toggle the "watched" status of a movie
	const toggleWatched = async (id) => {
		try {
			const response = await fetch(
				`http://localhost:3001/api/ratings/${id}/toggle-watched`,
				{
					method: "PATCH",
				}
			);
			const data = await response.json();
			const updatedMovies = movies.map((movie) =>
				movie.id === id ? data : movie
			);
			setMovies(updatedMovies);
			setFilteredMovies(updatedMovies);
		} catch (error) {
			console.error("Error toggling watched status:", error);
		}
	};

	useEffect(() => {
		fetchMovies();
	}, []);

	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				Movie List
			</Typography>

			{/* Add Movie */}
			<Box display="flex" gap={2} mb={3}>
				<TextField
					label="Add a Movie"
					variant="outlined"
					value={newMovie || ""} // Ensure value is always a string
					onChange={(e) => setNewMovie(e.target.value)}
					fullWidth
				/>
				<Button variant="contained" color="primary" onClick={addMovie}>
					Add
				</Button>
			</Box>

			{/* Search Movies */}
			<Box display="flex" gap={2} mb={3}>
				<TextField
					label="Search Movies"
					variant="outlined"
					value={searchQuery || ""} // Ensure value is always a string
					onChange={(e) => setSearchQuery(e.target.value)}
					fullWidth
				/>
				<Button
					variant="contained"
					color="secondary"
					onClick={searchMovies}
				>
					Search
				</Button>
			</Box>

			{/* Movie List */}
			<List>
				{filteredMovies.map((movie) => (
					<ListItem key={movie.id} divider>
						<Checkbox
							checked={!!movie.watched} // Ensure checked is always a boolean
							onChange={() => toggleWatched(movie.id)}
						/>
						<ListItemText
							primary={movie.title}
							secondary={movie.watched ? "Watched" : "To Watch"}
						/>
					</ListItem>
				))}
			</List>
		</Container>
	);
}

export default App;
