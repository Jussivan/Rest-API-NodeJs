import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function projectRoutes(app) {
    app.post('/', async (request, reply) => {
        try {
            let { name, description, imageUrl, projectUrl, tags, createdAt } = request.body;
            createdAt = new Date(createdAt).toISOString();
            await prisma.project.create({
                data: {
                    name,
                    description,
                    imageUrl,
                    projectUrl,
                    tags,
                    createdAt
                }
            });
            return reply.status(201).send('Projeto criado com sucesso!');
        } catch(err) {
            return reply.status(409).send(err);
        }
    });

    app.get('/', async (request,reply) => {
        try {
            let projects = await prisma.project.findMany();
            return reply.status(200).send({
                message: 'Projetos listados com sucesso!',
                data: projects
            });
        } catch(err) {
            return reply.status(409).send(err);
        }
    });

    app.post('/findProject', async (request,reply) => {
        try {
            let { id } = request.body;
            let project = await prisma.project.findMany({where: {id : id}});
            return reply.status(200).send({
                message: 'Projeto listado com sucesso!',
                data: project
            });
        } catch(err) {
            return reply.status(409).console.send(err);
        }
    });

    app.put('/', async (request,reply) => {
        try {
            let { id, name, description, imageUrl, projectUrl, tags, createdAt } = request.body;
            const project = await prisma.project.update({
                where: { id: id },
                data: {
                    name,
                    description,
                    imageUrl,
                    projectUrl,
                    tags,
                    createdAt: new Date(createdAt).toISOString()
                }
            });
            return reply.status(200).send({
                message: 'Projeto atualizado com sucesso!',
                data: project
            });
        } catch(err) {
            return reply.status(409).console.send(err);
        }
    });

    app.delete('/', async (request,reply) => {
        try {
            const { id } = request.body;
            await prisma.project.delete({where: {id : id}});
            return reply.status(200).send('Projeto excluído com sucesso!');
        } catch(err) {
            return reply.status(209).console.send(err);
        }
    })
}