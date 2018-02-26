'use strict';

module.exports = function (ListaFamiliar) {
    //Haz que el id del usuario que ejecuta un POST /ListasFamiliares se le asocie como 'owner'.
    ListaFamiliar.beforeRemote('create', function (context, listafamiliar, next) {
        //console.log(context); --> Contiene todo el objeto entero
        // console.log(context.args.data.owner); --> Recoge el campo owner del POST /ListaFamiliars
        // console.log(context.req.accessToken.userId); --> Recoge el id del usuario que está Autenticado
        context.args.data.owner = context.req.accessToken.userId;
        //Al crear una lista se le asigna el id del usuario que la ha creado.
        next();
    });

    //Una vez que se ha creado una lista familiar, busca su id y asócialo al usuario autenticado,
    //guardando, posteriormente, los nuevos datos del usuario.
    ListaFamiliar.afterRemote('create', function (context, listafamiliar, next) {
        //console.log(context);  --> Contiene todo el objeto entero
        //console.log(context.args.data.owner); --> Recoge el campo owner del POST /ListaFamiliars
        //console.log(context.req.accessToken.userId); --> Recoge el id del usuario que está Autenticado
        var app = listafamiliar.app;
        var userId = context.req.accessToken.userId;
        var Usuario = Listafamiliar.app.models.Usuario;
        //console.log(app); -->No devuelve nada
        console.log(userId);
        //console.log(Usuario); -->No devuelve nada
        Usuario.findById(userId, function (err, instance) {
            //console.log(instance);
            //console.log(instance.listaFamiliarId);
            //console.log(listafamiliar);
            instance.listaFamiliarId = listafamiliar.id;
            //console.log(instance.listaFamiliarId);
            instance.save(function (err) {
                next();
            });
        });
    });

    ListaFamiliar.prototype.crearSolicitudes = function (context, callback) {
        var salidaArray;
        var idUser = context.req.accessToken.userId;
        var idLista = this.id;
        //console.log(idUser);
        //console.log(idLista);
        //console.log(this.Solicitud);

        this.Solicitud.add(idUser,function (err) {
            if (err) callback(err);
            salidaArray = {
                listaFamiliarId: idLista,
                usuarioId:idUser
            }
            callback(null, salidaArray);
        });
    };

};
