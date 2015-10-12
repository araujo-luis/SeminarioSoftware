var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:envivo', function(req, res, next) {
  console.log("Entra");
  var valor = req.query.valor;
  console.log(req.params.envivo);
  res.render('form', { title: 'Formulario Empleado' ,
    "document": {name: "Luis", lastname:"araujo", age: "21"}
 });
});

router.post('/', function(req, res){
  var errores= [];
  var otro = [];


  if (req.body.txtNombre === "") {
    otro[0]= "luis";

    errores.push("Nombre Vacio");
  }

  if (req.body.txtApellido === "") {
    otro[1]= "araujo";
    errores.push("Apellido Vacio");
  }

   if (req.body.txtTelefono ==="") {
    errores.push("Telefono Vacio");
  }

   if (req.body.txtEmail ==="") {
    errores.push("Email Vacio");
  }

  if(errores.length <1){
    errores.push("Datos validos");
  }


  res.render("form", {
    "txtNombre" : req.body.txtNombre,
    "txtApellido" : req.body.txtApellido,
    "txtTelefono" : req.body.txtTelefono,
    "txtEmail" : req.body.txtEmail,
    "errores" : errores,
    "otro" : otro

  });
})

module.exports = router;
