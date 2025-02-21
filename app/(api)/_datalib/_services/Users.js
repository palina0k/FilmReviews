import prisma from '../_prisma/client.js';
import bcrypt from 'bcrypt';

export default class Users {
    //CREATE
    static async create({ input }) {
        const { username, email, password } = input;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
          },
        });
        return user;
      }

    //READ
    static async find({ id }) {
        return prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    static async findMany({ ids }) {
        return prisma.user.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }

    static async findByEmail({ email }) {
        return prisma.user.findUnique({
          where: { email },
        });
    }

    //UPDATE
    static async update({ id, input }) {
        try {
            const user = await prisma.user.update({
                where: {
                    id,
                },
                data: input,
            });
            return user;
        } catch (e) {
            return null;
        }
    }

    //DELETE
    static async delete({ id }) {
        try {
            await prisma.user.delete({
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
    static async getPlaylists({ id }) {
        return prisma.playlist.findMany({
            where: {
                userId: id,
            },
        });
    }

    static async getReviews({ id }) {
        return prisma.review.findMany({
            where: {
                userId: id,
            },
        });
    }
}