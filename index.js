const util = require('util');

const obterEnderecoAsync = util.promisify(obterEndereco);


function obterUsuario(){
    return new Promise(function resolverUsuario(resolve, reject) {
        setTimeout(function(){
            return resolve({
                id: 1,
                nome: "alandim",
                dataNasc: new Date()
            })
        }, 1000)
    })

}

function obterTelefone(idUsuario){
    return new Promise(function resolverTelefone(resolve, reject) {
        setTimeout(function(){
            return resolve({
                ddd: '11',
                numero:'5225-9988'
            })
        })
    })
}

function obterEndereco(idUsuario, callback){
    setTimeout(() =>{
        return callback(null, {
            rua: 'jaguare',
            numero:0 
        })
    }, 2000);
}

async function main(){
    try{
        console.time('medida-prmise')
        const usuario = await obterUsuario()
        //const telefone = await obterTelefone(usuario.id)
        //const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const endereco = resultado[1]
        const telefone = resultado[0]

        console.log(`
            Nome: ${usuario.nome},
            Logradouro: ${endereco.rua}, ${endereco.numero},
            Telefone: (${telefone.ddd})${telefone.numero}  
        `)
        console.timeEnd('medida-prmise')
    }catch(error){
        console.log('Msg erro', error)
    }
}

main()
/*
obterUsuario()
.then(usuario => {
    return obterTelefone(usuario.id)
    .then(function resolverTelefone(resultado) {
        return {
            usuario: {
                nome: usuario.nome,
                id: usuario.id
            },
            telefone: resultado
        }
    })
    
})
.then(function(resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id)
    return endereco.then(function resolverEndereco(result) {
        return {
            usuario: resultado.usuario,
            telefone:resultado.telefone,
            endereco:result
        }
    })
})
.then(resultado =>{
    console.log(`
    Nome: ${resultado.usuario.nome},
    Telefone: DDD: ${resultado.telefone.ddd}-${resultado.telefone.numero},
    Logradouro:${resultado.endereco.rua}, ${resultado.endereco.numero}
    `)
})
.catch(erro => {
    console.log('Msg erro: ', erro)
})

*/