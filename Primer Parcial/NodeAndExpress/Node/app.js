var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Incluimos la libreria , es importante poner el ./ para que no busque en la carpeta
//node_modules, porque por defecto express busca en esa carpeta
var arreglos = require('./lib/libreria.js');
var routes = require('./routes/index');
var users = require('./routes/users');

//Requerimos el formulario que tenemos en la carpeta routes
var form = require('./routes/form');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view cache', true);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.showTests  = app.get('env') !== 'production' &&
  req.query.test === '1';

  console.log(res.locals.showTests);
  next();
});
//app.use('/', routes);

//usamos el form, el primer parametro significa la ruta que se pone el explorador
//y el segundo parametro es el objeto form que declaramos arriba
app.use('/form', form);
app.use('/users', users);


app.get('/', function(req, res){
  res.render("home");
});

app.get('/miRuta', function(req, res) {
  //algunas funciones del objeto req
  console.log("Ip", req.ip);
  console.log("Ruta" , req.path);
  console.log("Host" , req.host);
  //res.redirect('/about');
  res.send("Estoy en miRuta");


})

//uso de parametros en las rutas
app.get('/about/:envivo', function(req, res){
  //lo que se escriba despues de about en la ruta del explorador localhost:3000/about/nombreCualquiera
  //se almacenara en la variable envivo que esta dentro del objeto req, en el atributo params
  console.log(req.params.envivo);

  // USO DE QUerys, este es el valor que colocamos en la ruta con el signo ?
  //por ejemplo la ruta tendria que ser localhost:3000/about/algo?valor=100
  // lo que se setea en valor, pasa a la variable req en su atributo valor
  valor = req.query.valor;
  var acerca = {
    "titulo": "Empresa dedicada a xyz",
    "año": 2015,
    "direccion": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "mision" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  };
  console.log(req.query.valor);

  /* PARA CAMBIAR DE LAYOUT, SOLO SE ESCRIBE UN ATRIBUTO AL DOCUMENTO JSON CON EL LAY OUT
  QUE SE QUIERE MOSTRAS, Y EN CASO QUE NO SE QUIERA MOSTRAR ALGUN LAYOUT SE ESCRIBE "NULL"*/
  res.render("about", {valor, acerca, arreglos:arreglos.getArreglo(), layout:"layout2" });


});

app.get('/headers', function(req,res){
  res.set('Content-Type','text/plain');
  var s = '';
  for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
  res.send(s);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render("404")
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('500', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
