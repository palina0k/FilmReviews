import prisma from '../_prisma/client.js';

export default class Genres {
    //CREATE
    static async create({ input }) {
        const { name } = input;
        const genre = await prisma.genre. create({
            data: {
                name,
            },
        });
        return genre;
    }

    //READ
    static async find({ id }) {
        return prisma.genre.findUnique({
            where: {
                id,
            },
        });
    }

    static async findMany({ ids }){
        return prisma.genre.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }

    //DELETE 
    static async delete({ id }) {
        try {
            await prisma.genre.delete({
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
    static async getMovies({ id }) {
        return prisma.movie.findMany({
            where: {
                genres: {
                    some: {
                        id,
                    },
                },
            },
        });
    }

    static async getReviews({ id }) {
        return prisma.review.findMany({
            where: {
                genres: {
                    some: {
                        id,
                    },
                },
            },
        });
    }
}