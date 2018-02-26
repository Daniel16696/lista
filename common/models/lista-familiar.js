'use strict';

module.exports = function (Listafamiliar) {

    Listafamiliar.beforeRemote('create', function (context, Listafamiliar, next) {
        //  console.log(context);  --> Contiene todo el objeto entero
        // console.log(context.args.data.owner); --> Recoge el campo owner del POST /ListaFamiliars
        // console.log(context.req.accessToken.userId); --> Recoge el id del usuario que está Autenticado
        context.args.data.owner = context.req.accessToken.userId;
        //Al crear una lista se le asigna el id del usuario que la ha creado.
        next();
    });

};
