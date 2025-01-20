'use client';

import { useState } from 'react';
import { gql } from 'graphql-tag';
import sendApolloRequest from '@utils/sendApolloRequest';
import styles from './page.module.scss';
import Image from 'next/image';


const GET_SEARCH_RESULTS = gql`
    query SearchMoviesAndPlaylists($search: String!) {
        searchMovies(search: $search) {
            id
            title
            description
            releaseDate
        }
        searchPlaylists(search: $search) {
            id
            name
            movies {
                id
                title
            }
            user {
                username
            }
            isPublic
            createdAt
            updatedAt
        }
    }
`;

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSearch = async (searchQuery: string) => {
        setQuery(searchQuery);

        if (!searchQuery.trim()) {
            setMovies([]);
            setPlaylists([]);
            return;
        }

        if (searchQuery) {
            try {
                const { data } = await sendApolloRequest(GET_SEARCH_RESULTS, { search: searchQuery }, { path: '/' });

                if (data) {
                    setMovies(data.searchMovies || []);
                    setPlaylists(data.searchPlaylists || []);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        } else {
            setMovies([]);
            setPlaylists([]);
        }
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const closeDetails = () => {
        setSelectedItem(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.img_container}>
                <Image src="/index/movie_theater.jpg" fill alt="movie theater" style={{ objectFit: 'cover', opacity: '0.9' }} />
            </div>
            <h1>Search Movies and Playlists</h1>
            <div className={styles.searchBarContainer}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch(query);
                    }}
                    className={styles.searchBar}
                >
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onBlur={() => handleSearch(query)}
                        placeholder="Title, description, release date..."
                        className={styles.searchInput}
                    />
                </form>
            </div>
            <p>Use keywords such as titles, descriptions, or names of playlists.</p>
            <div className={styles.resultsContainer}>
                {movies.length > 0 && (
                   <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Movies:</h2>
                        <ul className={styles.resultList}>
                            {movies.map((movie) => (
                                <li key={movie.id} className={styles.resultItem} onClick={() => handleItemClick({ type: 'movie', data: movie })}>
                                    <h3>{movie.title}</h3>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {playlists.length > 0 && (
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Playlists:</h2>
                        <ul className={styles.resultList}>
                            {playlists.map((playlist) => (
                                <li key={playlist.id} className={styles.resultItem} onClick={() => handleItemClick({ type: 'playlist', data: playlist })}>
                                    <h3>{playlist.name}</h3>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {selectedItem && (
                <div className={styles.detailsContainer}>
                    <button onClick={closeDetails} className={styles.closeButton}>Close</button>
                    {selectedItem.type === 'movie' && (
                        <div className={styles.details}>
                            <h2>{selectedItem.data.title}</h2>
                            <p>{selectedItem.data.description}</p>
                            <p>Release Date: {selectedItem.data.releaseDate}</p>
                        </div>
                    )}
                    {selectedItem.type === 'playlist' && (
                        <div className={styles.details}>
                            <h2>{selectedItem.data.name}</h2>
                            <p>Created by: {selectedItem.data.user.username}</p>
                            <ul>
                                {selectedItem.data.movies.map((movie) => (
                                    <li className={styles.detailsList} key={movie.id}>{movie.title}</li>
                                ))}
                            </ul>
                            <p>Public: {selectedItem.data.isPublic ? 'Yes' : 'No'}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}