var usuarios= [];
var clients= new Array();
var Facturas= new Array();
var Trabajos= new Array();
var Chambas= Chambas ||{
  User: function (name, user, password, acceso) {
    this. name = name;
    this.user = user;
    this.password = password;
    this.acceso = acceso;
  },
  Client: function(name,id, phone ){
    this.name = name;
    this.id = id;
    this.phone = phone;
  },
  Factura: function(Client, descripcion, date, monto){
    this.Client = Client;
    this.descripcion = descripcion;
    this.date = date;
    this.monto = monto;
  },
  Trabajo: function(Client, descripcion, date, notes){
   this.Client = Client;
   this.descripcion = descripcion;
   this.date = date;
   this.notes;
 },
 Login: function (){
   var user = document.getElementById('UserName').value;
   var password = document.getElementById('Password').value;
   if (user == 'admin' && password == '$uper4dmin') {
    console.log(user, password);
    /*document.getElementById('login').action ="dashboard.html"*/
    location.href = "dashboard.html";
  }
  else 
  {
    alert("usuario incorrecto, Vuelva a intentar");
  };
},
ObtenerDatosUsuraio: function(){
  console.log("Hola1;")
  var nombre = document.getElementById("nameU").value;
  var user = document.getElementById("user").value;
  var password = document.getElementById("password").value;
  var rpassword = document.getElementById("passwordR").value;
  var acceso = document.getElementById("accesoI").value;
  debugger
  if (nombre == null || user == null || password == null || rpassword == null){
    alert("Por favor inserte todos los datos solicitados");
  }else{
    if (password === rpassword) {
      var usuario1 = new Chambas.User(nombre, user, password, acceso);
      if(JSON.parse(localStorage.getItem("usuarios")) == null){
        var usuarios = [];
      }else{
        usuarios = JSON.parse(localStorage.getItem("usuarios"));
      }
      usuarios.push(usuario1);
      var us = JSON.stringify(usuarios);
      location.href = "usuario.html";
      localStorage.setItem("usuarios", us);
      User.MostrarUsuario();
    }else{
      alert("Las contraseñas no coinciden");
    };
    /*document.getElementById("passwordR").setAttribute('value','My default value');*/
  };
},
MostrarUsuario: function(){ 
  usuarios = JSON.parse(localStorage.getItem("usuarios"));
  var table = document.getElementById("tblTablaUsuario");
  var i;
  var id = 0;
  for (i in usuarios) {
   var row = table.insertRow(1);
   var cell1 = row.insertCell(0);
   var cell2 = row.insertCell(1);
   var cell3 = row.insertCell(2);
   var cell4 = row.insertCell(3);
   cell1.innerHTML = usuarios[i].name;
   cell2.innerHTML = usuarios[i].user;
   cell3.innerHTML = usuarios[i].acceso;
    // crea un elemento "a" que va a ser el q encapsule a la imagen
    var link = document.createElement("A");
    link.setAttribute("onClick", "Chambas.editar()");
    link.setAttribute("id", id);
  // crea el elemento imagen
  var x = document.createElement("i");
  x.setAttribute("class","fa fa-pencil");

    // se lo agrega al elemento link que creo antes
    link.appendChild(x);
    var link2 = document.createElement("A");
    /*link2.setAttribute("href", "eliminarfacturas.html");*/
    link2.setAttribute("onClick", "Chambas.eliminar(this)");
    link2.setAttribute("id", id);

  // crea el elemento imagen
  var x2 = document.createElement("i");
  x2.setAttribute("class","fa fa-trash");
    // se lo agrega al elemento link que creo antes
    link2.appendChild(x2);
    // agrega el elmento al body o a quién sea donde se va a agregar, podria ser un div
    cell4.appendChild(document.body.appendChild(link));
    cell4.appendChild(document.body.appendChild(link2));
    id++;
  }
},
eliminar: function (obj){
  debugger;
  var i;
  usuarios = JSON.parse(localStorage.getItem("usuarios"));
  for (i in usuarios)
    if (i == obj.id){
      var r = confirm("Esta seguro de que desea eliminar "+ usuarios[i].name+"?");
      if (r == true) {
        usuarios.splice(i, 1);
        var us = JSON.stringify(usuarios);
        localStorage.setItem("usuarios", us);
        jQuery("#tblTablaUsuario").find("tr:gt(0)").remove();
        Chambas.MostrarUsuario();
      } 
    }
  },
/*  modificar: function(obj){
    var z;
    var t = obj.id;
    usuarios = JSON.parse(localStorage.getItem("usuarios"));
    debugger
    for (z in usuarios)
      if (z == t){
        usuariom = usuarios[z];
        var ust = JSON.stringify(usuariom);
        localStorage.setItem("modificar", ust);
        location.href = "editarusuario.html";
      }

    },
    agregardatos: function(){
    debugger
    usuariom = JSON.parse(localStorage.getItem("modificar"));
    var p;
    for (p in usuariom) {
      var y = usuariom[p];
      if(p=="name"){
        $(nameU).val(y);
      }
      if (p=="user") {
        $(user).val(y);
      }
      if (p=="password") {
        $(password).val(y);
        $(passwordR).val(y);
      }
      if (p=="acceso") {
        $(accesoI).val(y);
      };
    };
    },
    guardarCambios: function(){
      usuariom.name = document.getElementById("nameU").value; 
      usuariom.user = document.getElementById("user").value;
      usuariom.password = document.getElementById("password").value;
      usuariom.acceso = document.getElementById("acceso").value; 
      var us = JSON.stringify(usuariom);
      localStorage.setItem("usuarios", us);
      Chambas.MostrarUsuario();
    },*/
  };