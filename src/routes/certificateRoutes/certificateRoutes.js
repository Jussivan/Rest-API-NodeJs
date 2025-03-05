import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function certificateRoutes(app) {
    app.post('/', async (request, reply) => {
        try {
            let { name, description, imageUrl, certificateUrl, tags, createdAt } = request.body;
            createdAt = new Date(createdAt).toISOString();
            await prisma.certificate.create({
                data: {
                    name,
                    description,
                    imageUrl,
                    certificateUrl,
                    tags,
                    createdAt
                }
            });
            return reply.status(201).send('Certificado criado com sucesso!');
        } catch(err) {
            return reply.status(409).send(err);
        }
    });

    app.get('/', async (request,reply) => {
        try {
            let certificates = await prisma.certificate.findMany();
            return reply.status(200).send({
                message: 'Certificados listados com sucesso!',
                data: certificates
            });
        } catch(err) {
            return reply.status(409).send(err);
        }
    });

    app.post('/findCertificate', async (request,reply) => {
        try {
            let { id } = request.body;
            let certificate = await prisma.certificate.findMany({where: {id : id}});
            return reply.status(200).send({
                message: 'Certificados listado com sucesso!',
                data: certificate
            });
        } catch(err) {
            return reply.status(409).console.send(err);
        }
    });

    app.put('/', async (request,reply) => {
        try {
            let { id, name, description, imageUrl, certificateUrl, tags, createdAt } = request.body;
            const certificate = await prisma.certificate.update({
                where: { id: id },
                data: {
                    name,
                    description,
                    imageUrl,
                    certificateUrl,
                    tags,
                    createdAt: new Date(createdAt).toISOString()
                }
            });
            return reply.status(200).send({
                message: 'Certificados atualizado com sucesso!',
                data: certificate
            });
        } catch(err) {
            return reply.status(409).console.send(err);
        }
    });

    app.delete('/', async (request,reply) => {
        try {
            const { id } = request.body;
            await prisma.certificate.delete({where: {id : id}});
            return reply.status(200).send('Certificado excluído com sucesso!');
        } catch(err) {
            return reply.status(209).console.send(err);
        }
    })
}