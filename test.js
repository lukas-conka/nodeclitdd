const {
    deepEqual,
    ok
} = require("assert")

const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: "Flash",
    poder: "Speed",
    id:1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: "Lanterna Verde",
    poder: "Anel",
    id: 2
}

describe('Suite manipulacao de Herois', () =>{
    before(async ()=>{
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    })

    it('deve pesquisar um heroi usando arquivos', async () =>{
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)

        deepEqual(resultado, expected)
    })
    it('deve cadastrar um heroi, usando arquivos', async () =>{
        const expected = {
            ...DEFAULT_ITEM_CADASTRAR,
            id: 2,
            nome: 'batman'
        }
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)

        deepEqual(actual, expected)
    })

    it('deve remover um herou por id', async () => {
        const expected = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)

        deepEqual(resultado, expected)
    })

    it('deve atualizar um heroi por id', async () =>{
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: "Batman",
            poder: "Dinheiro"
        }

        const novoDado = {
            nome: "Batman",
            poder: "Dinheiro"
        }

        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const resultado = database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(resultado, expected)
    
    })
})  