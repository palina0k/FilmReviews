import prisma from '../_prisma/client.js';

export default class Movies {
    //CREATE 
    static async create({ input }) {
        const { title, description, releaseDate } = input;
        const movie = await prisma.movie.create({
            data: {
                title,
                description,
                releaseDate,
            },
        });
        return movie;
    }

    //READ
    static async find({ id }) {
        return prisma.movie.findUnique({
            where: {
                id,
            },
        });
    }

    static async findMany({ ids }){
        return prisma.movie.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }

    //UPDATE
    static async update({ id, input }) {
        try {
            const movie = await prisma.movie.update({
                where: {
                    id,
                },
                data: input,
            });
            return movie;
        } catch (e) {
            return null;
        }
    }

    //DELETE
    static async delete({ id }) {
        try {
            await prisma.movie.delete({
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
    static async getReviews({ id }) {
        return prisma.review.findMany({
            where: {
                movieId: id,
            },
        });
    }

    static async getGenres({ id }) {
        return prisma.genre.findMany({
            where: {
                movies: {
                    some: {
                        id,
                    },
                },
            },
        });
    }

    static async search({ search }) {
        return prisma.movie.findMany({
            where: {
                OR: [
                    { title: {contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            },
        });
    }
}