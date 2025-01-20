'use client'

import { useEffect, useState } from 'react';
import { gql } from 'graphql-tag';
import sendApolloRequest from '@utils/sendApolloRequest';
import styles from './PlaylistSection.module.scss';

interface Playlist {
    id: string;
    name: string;
    userId: string;
    isPublic: boolean;
}

const GET_USER_PLAYLISTS = gql`
    query GetUserPlaylists($userId: ID!) {
        playlistsByUser(userId: $userId){
            id
            name
            isPublic
            movies {
                id
                title
                description
                releaseDate
            }
        }
    }
`;

const CREATE_PLAYLIST_MUTATION = gql`
    mutation CreatePlaylist($input: CreatePlaylistInput!) {
        createPlaylist(input: $input) {
            id
            name
        }
    }
`;

const CREATE_MOVIE_MUTATION = gql`
    mutation CreateMovie($input: CreateMovieInput!) {
        createMovie(input: $input) {
            id
            title
            description
            releaseDate
        }
    }
`;

const ADD_MOVIE_TO_PLAYLIST_MUTATION = gql`
    mutation AddMovieToPlaylist($playlistId: String!, $movieId: String!) {
        addMovieToPlaylist(playlistId: $playlistId, movieId: $movieId) {
            id
            name
            movies {
                id
                title
                description
                releaseDate
            }
        }
    }
`;


export default function PlaylistSection({ userId }: { userId: string }) {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [newPlaylist, setNewPlaylist] = useState({ name: '', isPublic: true });
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
    const [newMovie, setNewMovie] = useState({ title: '', description: '', releaseDate: ''});
    const [isAddingPlaylist, setIsAddingPlaylist] = useState(false);
    const [isViewingPlaylist, setIsViewingPlaylist] = useState(false);


    useEffect(() => {
        const fetchPlaylists = async () => {
          try {
            const { data } = await sendApolloRequest(GET_USER_PLAYLISTS, { userId });
            if (data?.playlistsByUser) {
                setPlaylists(data.playlistsByUser || []);
            }
          } catch (error) {
            console.error('Error fetching playlists:', error);
          }
        };
    
        fetchPlaylists();
    }, [userId]);
    
    const handleAddPlaylist = async () => {
        try{
            const { data } = await sendApolloRequest(CREATE_PLAYLIST_MUTATION, { input: { ...newPlaylist, userId, isPublic: true }, });
            if (data?.createPlaylist) {
                setPlaylists((prev) => [ ...prev, data.createPlaylist]);
                setNewPlaylist({ name: '', isPublic: true });
                setIsAddingPlaylist(false);
            }
        } catch (error) {
            console.error('Error creating playlist:', error);
        }
    };

    const handleAddMovie = async (playlistId: string) => {
        try {
            const { data: movieData } = await sendApolloRequest(CREATE_MOVIE_MUTATION, { input: newMovie });
            const { data: updatedPlaylistData } = await sendApolloRequest(ADD_MOVIE_TO_PLAYLIST_MUTATION, {
              playlistId,
              movieId: movieData.createMovie.id,
            });
            if (updatedPlaylistData?.addMovieToPlaylist) {
                const { data } = await sendApolloRequest(GET_USER_PLAYLISTS, { userId });
                setPlaylists(data.playlistsByUser || []);
                setSelectedPlaylist(data.playlistsByUser.find((p: Playlist) => p.id === playlistId));
            }
            setNewMovie({ title: '', description: '', releaseDate: '' })
        } catch (error) {
            console.error('Error adding movie to playlist:', error);
        }
    };


    return (
        <div className={styles.playlistSection}>
            <h2>Your Playlists:</h2>
            <ul className={styles.playlistList}>
                {playlists.map((playlist) => (
                    <li key={playlist.id} className={styles.playlistItem} onClick={() => { setSelectedPlaylist(playlist); setIsViewingPlaylist(true); }}>
                        {playlist.name}
                    </li>
                ))}
                <button onClick={() => setIsAddingPlaylist(true)} className={styles.playlistButton}>+</button>
            </ul>
            {isAddingPlaylist && (
                <div className={styles.modal}>
                    <h3>Create New Playlist</h3>
                    <input
                        type="text"
                        value={newPlaylist.name}
                        onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
                        placeholder="Playlist Name"
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={newPlaylist.isPublic}
                            onChange={(e) => setNewPlaylist({ ...newPlaylist, isPublic: e.target.checked })}
                        />
                        Public
                    </label>
                    <button onClick={handleAddPlaylist}>Create</button>
                    <button onClick={() => setIsAddingPlaylist(false)}>Cancel</button>
                </div>
            )}
            {isViewingPlaylist && selectedPlaylist && (
                <div className={styles.modalContainer}>
                    {/* Left Modal: Playlist Details */}
                    <div className={styles.playlistModal}>
                        <div className={styles.header}>
                            <h3>{selectedPlaylist.name}</h3>
                            <button onClick={() => setIsViewingPlaylist(false)}>Close</button>
                        </div>
                        <ul>
                            {(selectedPlaylist.movies || []).map((movie) => (
                                <li key={movie.id} className={styles.movieItem}>
                                    <strong>{movie.title}</strong> ({movie.releaseDate})
                                    <p>{movie.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Right Modal: Add Movie */}
                    <div className={styles.addMovieModal}>
                        <h4>Add Movie to "{selectedPlaylist.name}"</h4>
                        <input
                            type="text"
                            value={newMovie.title}
                            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                            placeholder="Title"
                            className={styles.input}
                        />
                        <textarea 
                            value={newMovie.description}
                            onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                            placeholder="Description"
                            className={styles.textarea}
                        />
                        <input
                            type="text"
                            value={newMovie.releaseDate}
                            onChange={(e) => setNewMovie({ ...newMovie, releaseDate: e.target.value })}
                            placeholder="Release Date (e.g., 2025)"
                            className={styles.input}
                        />
                        <button onClick={() => handleAddMovie(selectedPlaylist.id)} className={styles.addButton}>Add Movie</button>
                    </div>
                </div>
            )}
        </div>
    );
}