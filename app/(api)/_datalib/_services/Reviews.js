import prisma from '../_prisma/client.js';

export default class Reviews {
    //CREATE
    static async create({ input }) {
        const { userId, movieId, content, rating, genres } = input;
        const review = await prisma.review.create({
            data: {
                userId,
                movieId,
                content,
                rating,
                genres:{ connect: genres.map((id) => ({ id })) },
            },
        });
        return review;
    }

    //READ
    static async find({ id }) {
        return prisma.review.findUnique({
            where: {
                id,
            },
        });
    }

    static async findMany({ ids }) {
        return prisma.review.findMany({
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
            await prisma.review.delete({
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
    static async getUser({ userId }) {
        return prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
    }

    static async getMovie({ movieId }) {
        return prisma.movie.findUnique({ 
            where: {
                id: movieId,
            },
        });
    }

    static async getGenres({ id }) {
        return prisma.genre.findMany({
            where: {
                reviews: {
                    some: {
                        id,
                    },
                },
            },
        });
    }
}