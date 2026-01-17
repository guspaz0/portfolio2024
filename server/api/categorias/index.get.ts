import categoriaService from '~/server/entities/categorias/categoria.service';

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;
    return await categoriaService.findAll()
});