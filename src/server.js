import fastify from "fastify";
import { certificateRoutes } from "./routes/certificateRoutes/certificateRoutes.js";

const app = fastify();

app.register(certificateRoutes, {
    prefix: 'certificates',
})


app.listen({ port: 3000 }).then(() => {
    console.log('Servidor rodando na porta 3000');
}).catch((err) => {
    console.error('Erro ao iniciar o servidor:', err);
});