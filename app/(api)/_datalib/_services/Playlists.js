import prisma from '../_prisma/client.js';

export default class Playlists {
    //CREATE
    static async create({ input }) {
        const { name, userId, movieIds = [], isPublic } = input;
        const playlist = await prisma.playlist.create({
            data: {
                name,
                userId,
                isPublic,
                movies: {
                    connect: movieIds.map((id) => ({ id }))
                },
            },
        });
        return playlist;
    }

    //READ
    static async find({ id }) {
        return prisma.playlist.findUnique({
            where: {
                id,
            },
        });
    }

    static async findMany({ userId }) {
        return prisma.playlist.findMany({
            where: {
                userId,
            },
        });
    }

    //UPDATE
    static async update({ id, input }) {
        const { name, movieIds, isPublic } = input;
        const playlist = await prisma.playlist.update({
            where: {
                id,
            },
            data: {
                name,
                isPublic,
                movies: movieIds ? {connect: movieIds.map((id) => ({ id })) } : undefined,
            },
        });
        return playlist;
    }

    //DELETE 
    static async delete({ id }) {
        try {
            await prisma.playlist.delete({
                where: {
                    id,
                },
            });
            return true;
        } catch (e) {
            return false;
        }
    }

    //OTHER
    static async addMovie({ playlistId, movieId }) {
        const addedMovie = await prisma.playlist.update({
            where: {
                id: playlistId
            },
            data: {
                movies: {connect: {id: movieId} }
            },
        });
        return addedMovie;
    }

    static async getUser({ userId }) {
        return prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
    }

    static async getMovies({ id }) {
        return prisma.movie.findMany({
            where: {
                playlists: {
                    some: {
                        id,
                    },
                },
            },
        });
    }
}