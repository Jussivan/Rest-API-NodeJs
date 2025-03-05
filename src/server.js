import fastify from "fastify";
import { certificateRoutes } from "./routes/certificateRoutes/certificateRoutes.js";
import { projectRoutes } from "./routes/projectRoutes/projectRoutes.js";

const app = fastify();

app.register(certificateRoutes, {
    prefix: 'certificates',
});
app.register(projectRoutes, {
    prefix: 'projects',
});

app.listen({ port: 3000 }).then(() => {
    console.log('Servidor rodando na porta 3000');
}).catch((err) => {
    console.error('Erro ao iniciar o servidor:', err);
});