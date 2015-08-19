var usuarios= [];
var modif = [];
var usuarioActual = [];
var clientes= new Array();
var Facturas= new Array();
var Trabajos= new Array();
var Chambas= Chambas ||{
  User: function (name, user, password, acceso) {
    this. name = name;
    this.user = user;
    this.password = password;
    this.acceso = acceso;
  },
  Client: function(idx,name, phone ){
    this.idx = idx;
    this.name = name;
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
   this.notes = notes;
 },
 /*-------------------------------------------------------Login---------------------------------------------------*/
 Login: function (){
   var user = document.getElementById('UserName').value;
   var password = document.getElementById('Password').value;
   var incorrect =false;
   debugger
   var usuarios = JSON.parse(localStorage.getItem("usuarios"));
   if (user == 'admin' && password == '$uper4dmin') {
    console.log(user, password);
    /*document.getElementById('login').action ="dashboard.html"*/
    usuarioActual = new Chambas.User("admin", "User", "$uper4dmin","SuperAdmin");
    localStorage.removeItem("usuarioActual");
    var d = JSON.stringify(usuarioActual);
    localStorage.setItem("usuarioActual", d);
    location.href = "dashboard.html";
    incorrect = true;
  }
  for (i in usuarios) {
    if (usuarios[i].user == user && usuarios[i].password == password) {
      location.href = "dashboard.html";
      localStorage.removeItem("usuarioActual");
      usuarioActual = usuarios[i];
      var d = JSON.stringify(usuarioActual);
      localStorage.setItem("usuarioActual", d);
      incorrect = true;
    };
  };
  if (incorrect == false){ alert("Usuario o contraseña incorrect, por favor intentelo de nuevo");};
},
UsuarioLabel: function(){
  debugger
  usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
  document.getElementById("UserLogin").innerHTML = usuarioActual.user;
  document.getElementById("UserLogin1").innerHTML = usuarioActual.user;
  if (usuarioActual.acceso == "SuperAdmin") {
    document.getElementById('Usuariosdiv').style.display = 'block';
  };
},
/*----------------------------------------------------Usuarios-----------------------------------------------------*/
ObtenerDatosUsuraio: function(){
  console.log("Hola1;")
  var nombre = document.getElementById("nameU").value;
  var user = document.getElementById("user").value;
  var password = document.getElementById("password").value;
  var rpassword = document.getElementById("passwordR").value;
  var acceso = document.getElementById("accesoI").value;
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
  debugger
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
    link.setAttribute("onClick", "Chambas.editarUsuario(this)");
    link.setAttribute("id", id);
  // crea el elemento imagen
  var x = document.createElement("i");
  x.setAttribute("class","fa fa-pencil");

    // se lo agrega al elemento link que creo antes
    link.appendChild(x);
    var link2 = document.createElement("A");
    /*link2.setAttribute("href", "eliminarfacturas.html");*/
    link2.setAttribute("onClick", "Chambas.eliminarUsuario(this)");
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
eliminarUsuario: function (obj){
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
  CargarSelectU: function(){
      usuarios = JSON.parse(localStorage.getItem("usuarios"));
      var data = document.getElementById("selectusuario");
      for (var i=0;i<usuarios.length;i++) {
        data.options[i] = new Option(usuarios[i].name,'valor :'+i);

      };
    /*document.getElementById("select2").options[document.getElementById("select2").options.length]=new Option(arrayValores[i][2], arrayValores[i][1]);*/
  },
  editarU: function(){
    debugger
    var data = document.getElementById("selectusuario");
    var obj = data.selectedIndex;
    var i;
    usuarios = JSON.parse(localStorage.getItem("usuarios"));
    for (i in usuarios)
      if (i == obj){
        modif = usuarios[i];
        var tr = JSON.stringify(modif);
        localStorage.setItem("modif", tr);
        localStorage.setItem("ubicacion", obj.id);
        location.href="editarusuario.html";
      }
  },
  editarUsuario: function(obj){
    debugger;
    var i;
    usuarios = JSON.parse(localStorage.getItem("usuarios"));
    for (i in usuarios)
      if (i == obj.id){
        modif = usuarios[i];
        var tr = JSON.stringify(modif);
        localStorage.setItem("modif", tr);
        localStorage.setItem("ubicacion", obj.id);
        location.href="editarusuario.html";
      }
    },
    CargarInputsUsuario: function(){
      modif = JSON.parse(localStorage.getItem("modif"));
      document.getElementById("nameU").value =modif.name;
      document.getElementById("user").value =modif.user;
      document.getElementById("password").value =modif.password;
      document.getElementById("passwordR").value =modif.password;
      document.getElementById("accesoI").value =modif.acceso;
    },
    GuardarCambiosUsuario: function(){
      var location = localStorage.getItem("ubicacion");
      debugger
      var nombre = document.getElementById("nameU").value;
      var user = document.getElementById("user").value;
      var password = document.getElementById("password").value;
      var rpassword = document.getElementById("passwordR").value;
      var acceso = document.getElementById("accesoI").value;
      if (nombre == null || user == null || password == null || rpassword == null){
        alert("Por favor inserte todos los datos solicitados");
      }else{
        if (password === rpassword) {
          var usuario1 = new Chambas.User(nombre, user, password, acceso);
          usuarios = JSON.parse(localStorage.getItem("usuarios"));
          usuarios[location] = usuario1;
          var us = JSON.stringify(usuarios);
          localStorage.setItem("usuarios", us);
          location.href = "usuario.html";
        }else{
          alert("Las contraseñas no coinciden");
        };
      }
    },
    /*--------------------------------------------Clientes-----------------------------------------------------------------*/
    ObtenerDatosClientes: function(){
      debugger
      var idx = document.getElementById("idx").value;
      var nombre = document.getElementById("name").value;
      var tel = document.getElementById("tel").value;
      debugger
      if (idx == null || nombre == null || tel == null){
        alert("Por favor inserte todos los datos solicitados");
      }else{
        var cliente1 = new Chambas.Client(idx, nombre, tel);
        if(JSON.parse(localStorage.getItem("clientes")) == null){
          var clientes = [];
        }else{
          clientes = JSON.parse(localStorage.getItem("clientes"));
        }
        clientes.push(cliente1);
        var cl = JSON.stringify(clientes);
        location.href = "cliente.html";
        localStorage.setItem("clientes", cl);
      };
    },
    MostrarClientes: function(){ 
      clientes = JSON.parse(localStorage.getItem("clientes"));
      var table = document.getElementById("tblTablaClientes");
      var i;
      var id = 0;
      for (i in clientes) {
       var row = table.insertRow(1);
       var cell1 = row.insertCell(0);
       var cell2 = row.insertCell(1);
       var cell3 = row.insertCell(2);
       var cell4 = row.insertCell(3);
       cell1.innerHTML = clientes[i].idx;
       cell2.innerHTML = clientes[i].name;
       cell3.innerHTML = clientes[i].phone;
    // crea un elemento "a" que va a ser el q encapsule a la imagen
    var link = document.createElement("A");
    link.setAttribute("onClick", "Chambas.editarClientes(this)");
    link.setAttribute("id", id);
  // crea el elemento imagen
  var x = document.createElement("i");
  x.setAttribute("class","fa fa-pencil");

    // se lo agrega al elemento link que creo antes
    link.appendChild(x);
    var link2 = document.createElement("A");
    /*link2.setAttribute("href", "eliminarfacturas.html");*/
    link2.setAttribute("onClick", "Chambas.eliminarClientes(this)");
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
eliminarClientes: function (obj){
  debugger;
  var i;
  clientes= JSON.parse(localStorage.getItem("clientes"));
  for (i in clientes)
    if (i == obj.id){
      var r = confirm("Esta seguro de que desea eliminar "+ clientes[i].name+"?");
      if (r == true) {
        clientes.splice(i, 1);
        var cl = JSON.stringify(clientes);
        localStorage.setItem("clientes", cl);
        jQuery("#tblTablaClientes").find("tr:gt(0)").remove();
        Chambas.MostrarClientes();
      } 
    }
  },
  CargarSelectCl: function(){
      debugger
      clientes = JSON.parse(localStorage.getItem("clientes"));
      var data = document.getElementById("selectclientes");
      for (var i=0;i<=usuarios.length;i++) {
        data.options[i] = new Option(clientes[i].name,'valor :'+i);

      };
    /*document.getElementById("select2").options[document.getElementById("select2").options.length]=new Option(arrayValores[i][2], arrayValores[i][1]);*/
  },
  editarC: function(){
    debugger
    var data = document.getElementById("selectclientes");
    var obj = data.selectedIndex;
    var i;
    clientes = JSON.parse(localStorage.getItem("clientes"));
    for (i in clientes)
      if (i == obj){
        modif = clientes[i];
        var tr = JSON.stringify(modif);
        localStorage.setItem("modif", tr);
        localStorage.setItem("ubicacion", obj.id);
        location.href="editarclientes.html";
      }
  },
  editarClientes: function(obj){
    var i;
    clientes = JSON.parse(localStorage.getItem("clientes"));
    for (i in clientes)
      if (i == obj.id){
        modif = clientes[i];
        var tr = JSON.stringify(modif);
        localStorage.setItem("modif", tr);
        localStorage.setItem("ubicacion", obj.id);
        location.href="editarclientes.html";
      }
    },
    CargarInputsClientes: function(){
      modif = JSON.parse(localStorage.getItem("modif"));
      debugger
      document.getElementById("idx").value = modif.idx;
      document.getElementById("phone").value = modif.phone;
      document.getElementById("name").value = modif.name;
    },
    GuardarCambiosClientes: function(){
      debugger
      var location = localStorage.getItem("ubicacion");
      var idx = document.getElementById("idx").value;
      var name = document.getElementById("name").value;
      var phone = document.getElementById("phone").value;
      if (idx == null || name == null ||phone == null){
        alert("Por favor inserte todos los datos solicitados");
      }else{
        var Client1 = new Chambas.Client(idx, name, phone);
        clientes = JSON.parse(localStorage.getItem("clientes"));
        clientes[location] = Client1;
        var fc = JSON.stringify(clientes);
        localStorage.setItem("clientes", fc);
        location.href = "clientes.html";
      };
    },
    /*---------------------Trabajos---------------------------------------------------------------------------*/
    CargarDatalist: function(){
      clientes = JSON.parse(localStorage.getItem("clientes"));
      var data = document.getElementById("clientedatalist");
      for (i in clientes) {
        var x = document.createElement("option");
        x.setAttribute("value", clientes[i].name);
        data.appendChild(x);
      };
    },
    ObtenerDatosTrabajas: function(){
      debugger
      var Client1 = $("input[id=clientesI]").val();
      var descripcion = document.getElementById("descripcion").value;
      var date = document.getElementById("fecha").value;
      var notes = document.getElementById("notas").value;
      if (Client1 == null || descripcion == null || date == null || notes == null){
        alert("Por favor inserte todos los datos solicitados");
      }else{
        var trabajo1 = new Chambas.Trabajo(Client1, descripcion, date, notes);
        if(JSON.parse(localStorage.getItem("trabajo")) == null){
          var Trabajos = [];
        }else{
          Trabajos = JSON.parse(localStorage.getItem("trabajo"));
        }
        Trabajos.push(trabajo1);
        var tb = JSON.stringify(Trabajos);
        location.href = "chamba.html";
        localStorage.setItem("trabajo", tb);
      };
    },
    MostrarTrabajo: function(){ 
      trabajo = JSON.parse(localStorage.getItem("trabajo"));
      var table = document.getElementById("tblTablaTrabajos");
      var i;
      var id = 0;
      for (i in trabajo) {
       var row = table.insertRow(1);
       var cell1 = row.insertCell(0);
       var cell2 = row.insertCell(1);
       var cell3 = row.insertCell(2);
       var cell4 = row.insertCell(3);
       var cell5 = row.insertCell(4);
       cell1.innerHTML = trabajo[i].Client;
       cell2.innerHTML = trabajo[i].descripcion;
       cell3.innerHTML = trabajo[i].date;
       cell4.innerHTML = trabajo[i].notes;
    // crea un elemento "a" que va a ser el q encapsule a la imagen
    var link = document.createElement("A");
    link.setAttribute("onClick", "Chambas.editarTrabajo(this)");
    link.setAttribute("id", id);
  // crea el elemento imagen
  var x = document.createElement("i");
  x.setAttribute("class","fa fa-pencil");

    // se lo agrega al elemento link que creo antes
    link.appendChild(x);
    var link2 = document.createElement("A");
    /*link2.setAttribute("href", "eliminarfacturas.html");*/
    link2.setAttribute("onClick", "Chambas.eliminarTrabajos(this)");
    link2.setAttribute("id", id);

  // crea el elemento imagen
  var x2 = document.createElement("i");
  x2.setAttribute("class","fa fa-trash");
    // se lo agrega al elemento link que creo antes
    link2.appendChild(x2);
    // agrega el elmento al body o a quién sea donde se va a agregar, podria ser un div
    cell5.appendChild(document.body.appendChild(link));
    cell5.appendChild(document.body.appendChild(link2));
    id++;
  }
},
eliminarTrabajos: function (obj){
  var i;
  Trabajos= JSON.parse(localStorage.getItem("trabajo"));
  for (i in Trabajos)
    if (i == obj.id){
      var r = confirm("Esta seguro de que desea eliminar "+ Trabajos[i].Client+"?");
      if (r == true) {
        Trabajos.splice(i, 1);
        var cl = JSON.stringify(Trabajos);
        localStorage.setItem("trabajo", cl);
        jQuery("#tblTablaTrabajos").find("tr:gt(0)").remove();
        Chambas.MostrarTrabajo();
      } 
    }
  },
  CargarSelectCh: function(){
      debugger
      Trabajos = JSON.parse(localStorage.getItem("trabajo"));
      var data = document.getElementById("selectchambas");
      for (var i=0;i<Trabajos.length;i++) {
        data.options[i] = new Option(Trabajos[i].descripcion,'valor :'+i);

      };
    /*document.getElementById("select2").options[document.getElementById("select2").options.length]=new Option(arrayValores[i][2], arrayValores[i][1]);*/
  },
  editarCh: function(){
    debugger
    var data = document.getElementById("selectchambas");
    var obj = data.selectedIndex;
    var i;
    Trabajos = JSON.parse(localStorage.getItem("trabajo"));
    for (i in Trabajos)
      if (i == obj){
        modif = Trabajos[i];
        var tr = JSON.stringify(modif);
        localStorage.setItem("modif", tr);
        localStorage.setItem("ubicacion", obj.id);
        location.href="editarchamba.html";
      }
  },
  editarTrabajo: function(obj){
    var i;
    Trabajos = JSON.parse(localStorage.getItem("trabajo"));
    for (i in Trabajos)
      if (i == obj.id){
        modif = Trabajos[i];
        var tr = JSON.stringify(modif);
        localStorage.setItem("modif", tr);
        localStorage.setItem("ubicacion", obj.id);
        location.href="editarchamba.html";
      }
    },
    CargarInputsTrabajo: function(){
      modif = JSON.parse(localStorage.getItem("modif"));
      /*document.getElementById("clientesI").value= modif.Client;*/
      $("input[id=clientesI]").val(modif.Client);
      document.getElementById("descripcion").value = modif.descripcion;
      document.getElementById("fecha").value = modif.date;
      document.getElementById("notas").value = modif.notes;
    },
    GuardarCambiosTrabajo: function(){
      debugger
      var location = localStorage.getItem("ubicacion");
      var Client1 = $("input[id=clientesI]").val();
      var descripcion = document.getElementById("descripcion").value;
      var date = document.getElementById("fecha").value;
      var notes = document.getElementById("notas").value;
      if (Client1 == null || descripcion == null || date == null || notes == null){
        alert("Por favor inserte todos los datos solicitados");
      }else{
        var Trabajo1 = new Chambas.Trabajo(Client1, descripcion, date, notes);
        Trabajos = JSON.parse(localStorage.getItem("trabajo"));
        Trabajos[location] = Trabajo1;
        var fc = JSON.stringify(Trabajos);
        localStorage.setItem("trabajo", fc);
        location.href = "chamba.html";
      };
    },
    /*------------------------------Facturas----------------------------------------------------------------------------------*/
    ObtenerDatosFacturas: function(){
      var Client1 = $("input[id=clientesI]").val();
      var descripcion = document.getElementById("descripcion").value;
      var date = document.getElementById("fecha").value;
      var monto = document.getElementById("monto").value;
      if (Client1 == null || descripcion == null || date == null || monto == null){
        alert("Por favor inserte todos los datos solicitados");
      }else{
        var factura1 = new Chambas.Factura(Client1, descripcion, date, monto);
        if(JSON.parse(localStorage.getItem("factura")) == null){
          var Facturas = [];
        }else{
          Facturas = JSON.parse(localStorage.getItem("factura"));
        }
        Facturas.push(factura1);
        var tb = JSON.stringify(Facturas);
        location.href = "facturas.html";
        localStorage.setItem("factura", tb);
      };
    },
    MostrarFactura: function(){ 
      factura = JSON.parse(localStorage.getItem("factura"));
      var table = document.getElementById("tblTablaFacturas");
      var i;
      var id = 0;
      for (i in factura) {
       var row = table.insertRow(1);
       var cell1 = row.insertCell(0);
       var cell2 = row.insertCell(1);
       var cell3 = row.insertCell(2);
       var cell4 = row.insertCell(3);
       var cell5 = row.insertCell(4);
       cell1.innerHTML = factura[i].Client;
       cell2.innerHTML = factura[i].descripcion;
       cell3.innerHTML = factura[i].date;
       cell4.innerHTML = factura[i].monto;
    // crea un elemento "a" que va a ser el q encapsule a la imagen
    var link = document.createElement("A");
    link.setAttribute("onClick", "Chambas.editarFactura(this)");
    link.setAttribute("id", id);
  // crea el elemento imagen
  var x = document.createElement("i");
  x.setAttribute("class","fa fa-pencil");

    // se lo agrega al elemento link que creo antes
    link.appendChild(x);
    var link2 = document.createElement("A");
    /*link2.setAttribute("href", "eliminarfacturas.html");*/
    link2.setAttribute("onClick", "Chambas.eliminarfacturas(this)");
    link2.setAttribute("id", id);

  // crea el elemento imagen
  var x2 = document.createElement("i");
  x2.setAttribute("class","fa fa-trash");
    // se lo agrega al elemento link que creo antes
    link2.appendChild(x2);
    // agrega el elmento al body o a quién sea donde se va a agregar, podria ser un div
    cell5.appendChild(document.body.appendChild(link));
    cell5.appendChild(document.body.appendChild(link2));
    id++;
  }
},
eliminarfacturas: function (obj){
  var i;
  Facturas= JSON.parse(localStorage.getItem("factura"));
  for (i in Facturas)
    if (i == obj.id){
      var r = confirm("Esta seguro de que desea eliminar "+ Facturas[i].Client+"?");
      if (r == true) {
        Facturas.splice(i, 1);
        var cl = JSON.stringify(Facturas);
        localStorage.setItem("factura", cl);
        jQuery("#tblTablaFacturas").find("tr:gt(0)").remove();
        Chambas.MostrarFactura();
      } 
    }
  },
  CargarSelectF: function(){
      Facturas = JSON.parse(localStorage.getItem("factura"));
      var data = document.getElementById("selectfacturas");
      for (var i=0;i<Facturas.length;i++) {
        data.options[i] = new Option(Facturas[i].descripcion,'valor :'+i);

      };
    /*document.getElementById("select2").options[document.getElementById("select2").options.length]=new Option(arrayValores[i][2], arrayValores[i][1]);*/
  },
  editarf: function(){
    debugger
    var data = document.getElementById("selectfacturas");
    var obj = data.selectedIndex;
    var i;
    Facturas = JSON.parse(localStorage.getItem("factura"));
    for (i in Facturas)
      if (i == obj){
        modif = Facturas[i];
        var tr = JSON.stringify(modif);
        localStorage.setItem("modif", tr);
        localStorage.setItem("ubicacion", obj.id);
        location.href="editarfacturas.html";
      }
  },
  editarFactura: function(obj){
    var i;
    facturas = JSON.parse(localStorage.getItem("factura"));
    for (i in facturas)
      if (i == obj.id){
        modif = facturas[i];
        var tr = JSON.stringify(modif);
        localStorage.setItem("modif", tr);
        localStorage.setItem("ubicacion", obj.id);
        location.href="editarfacturas.html";
      }
    },
    CargarInputsFactura: function(){
      modif = JSON.parse(localStorage.getItem("modif"));
      debugger
      /*document.getElementById("clientesI").value= modif.Client;*/
      $("input[id=clientesI]").val(modif.Client);
      document.getElementById("descripcion").value = modif.descripcion;
      document.getElementById("fecha").value = modif.date;
      document.getElementById("monto").value = modif.monto;
    },
    GuardarCambiosFactura: function(){
      var location = localStorage.getItem("ubicacion");
      var Client1 = $("input[id=clientesI]").val();
      var descripcion = document.getElementById("descripcion").value;
      var date = document.getElementById("fecha").value;
      var monto = document.getElementById("monto").value;
      if (Client1 == null || descripcion == null || date == null || monto == null){
        alert("Por favor inserte todos los datos solicitados");
      }else{
        var facturas1 = new Chambas.Factura(Client1, descripcion, date, monto);
        facturas = JSON.parse(localStorage.getItem("factura"));
        facturas[location] = facturas1;
        var fc = JSON.stringify(facturas);
        localStorage.setItem("factura", fc);
        location.href = "facturas.html";
      };
    },
  };
