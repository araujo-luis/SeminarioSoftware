var arreglo = [
  "Maria Cuestas",
  "Jenny Sosa",
  "Andrea Granados",
  "Daniela Figueroa",
  "Rancell Barahona"
];


exports.getArreglo=function(){
  var id = Math.floor(Math.random()*arreglo.length);
  return arreglo[id];
}
