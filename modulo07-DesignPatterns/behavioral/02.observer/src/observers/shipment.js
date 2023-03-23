export default class Shipment {
    update({ id, userName }) {
        //importante lembrar que o [update] é responsável por gerenciar seus erros/exceptions
        // nao deve-se ter await no notify pq a responsabilidade do notify é só emitir eventos
        // só notificar todo mundo
        console.log(`[${id}]: [shipment] will pack the users order to [${userName}]`)
    }
}