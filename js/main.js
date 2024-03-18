let separador="=====================================";
const contactos = [];
class Contacto{
    constructor(nombre, telefono){
        this.nombre=nombre,
        this.telefono=telefono
    }
    mostrarDatos(){
        return '  - Nombre: ' + this.nombre + "\n  - Telefono: " + this.telefono;
    }
    mostrarDatosParaLista(){
        return this.nombre+', '+this.telefono;
    }
}

datosPorDefecto();
menuPrincipal();

/////////////////////////////////////////////////////////////////////////////////////////////////
function datosPorDefecto(){
    const contacto1 = new Contacto("Antonio","1111");
    const contacto2 = new Contacto("Leonardo","2222");
    const contacto3 = new Contacto("Pedro","3333");
    contactos.push(contacto1);
    contactos.push(contacto2);
    contactos.push(contacto3);
}
function menuPrincipal(){
    let pantalla, respuesta
    pantalla = "AGENDA TELEFONICA"
    pantalla = pantalla + "\n" + separador
    pantalla = pantalla + "\n1-Nuevo contacto"
    pantalla = pantalla + "\n2-Eliminar contacto"
    pantalla = pantalla + "\n3-Buscar contacto"
    pantalla = pantalla + "\n4-Listar contactos"
    pantalla = pantalla + "\n5-Salir [Cancelar]"
    pantalla = pantalla + "\n" + separador
    pantalla = pantalla + "\nIngrese una opción del sistema [1-5]: "
    respuesta   =prompt(pantalla);

    if(respuesta==="1"){
        nuevoContacto();
    }else if(respuesta==="2"){
        eliminarContacto();
    }else if(respuesta==="3"){
        buscarContacto();
    }else if(respuesta==="4"){
        listarContacto();
    }else if(respuesta===null || respuesta==="5"){4
    }else {
        alert("La opción ingresada no es valida.")
        menuPrincipal()
    }
}
function nuevoContacto(){
    let pantalla, position;
    const contacto=new Contacto("", "");

    do{
        pantalla = "NUEVO CONTACTO"
        pantalla = pantalla + "\n" + separador;
        pantalla = pantalla + "\n" + contacto.mostrarDatos();
        pantalla = pantalla + "\n" + separador;
        pantalla = pantalla + "\n" + "Ingrese Nombre: "
        contacto.nombre = prompt(pantalla);
        if(contacto.nombre!==null){
            position=buscarPorNombre(contacto.nombre);
            if(position>=0){
                pantalla = "El contacto ["+contacto.nombre+"] ya EXISTE en el sistema.";
                pantalla = pantalla +"\n"+ separador;
                pantalla = pantalla +"\n"+ contactos[position].mostrarDatos();
                pantalla = pantalla +"\n"+ separador;
                contacto.nombre="";
                alert(pantalla);
            }
        }
    }while(contacto.nombre!==null && contacto.nombre.length===0);

    if(contacto.nombre!==null){
        do{
            pantalla = "NUEVO CONTACTO";
            pantalla = pantalla + "\n" + separador;
            pantalla = pantalla + "\n" + contacto.mostrarDatos();
            pantalla = pantalla + "\n" + separador;
            pantalla = pantalla + "\n" + "Ingrese Telefono: ";
            contacto.telefono=prompt(pantalla)
            if(contacto.telefono!==null){
                position=buscarPorTelefono(contacto.telefono);
                if(position>=0){
                    pantalla = "El telefono ["+contacto.telefono+"] ya EXISTE en el sistema.";
                    pantalla = pantalla +"\n"+ separador;
                    pantalla = pantalla +"\n"+ contactos[position].mostrarDatos();
                    pantalla = pantalla +"\n"+ separador;
                    contacto.telefono="";
                    alert(pantalla);
                }
            }
        }while(contacto.telefono!==null && contacto.telefono.length===0);

        if(contacto.telefono!==null){
            contactos.push(contacto);

            pantalla = "CONTACTO REGISTRADO"
            pantalla = pantalla +"\n"+ separador
            pantalla = pantalla +"\n"+ contacto.mostrarDatos()
            pantalla = pantalla +"\n"+ separador
            alert(pantalla);
        }
    }    
    menuPrincipal();
}
function listarContacto(){
    let pantalla='LISTA DE CONTACTOS';
    let contactoNumero=0;
    pantalla=pantalla + "\n" + separador;
    //pantalla=contactos.join("\n");
    
    for(const contacto of contactos){
        contactoNumero++;
        pantalla=pantalla + "\n" + contactoNumero.toString() + ".-" + contacto.mostrarDatosParaLista();
    }
    
    pantalla=pantalla + '\n' + separador;
    alert(pantalla)
    menuPrincipal();
}
function buscarContacto(){
    let nombreTelefono, respuesta;

    do{
        pantalla = "BUSCAR CONTACTO"
        pantalla = pantalla + '\n' + separador;
        pantalla = pantalla + '\n' + "Ingrese nombre o telefono: "
        nombreTelefono = prompt(pantalla);
    }while(nombreTelefono!==null && nombreTelefono.length===0);

    if(nombreTelefono!==null){
        respuesta = buscarPorNombre(nombreTelefono);
        if(respuesta===-1){
            respuesta = buscarPorTelefono(nombreTelefono);
        }
        if(respuesta===-1){
            pantalla = separador;
            pantalla = pantalla + '\n' + "El contacto NO EXISTE.";
            pantalla = pantalla + '\n' + separador;
            alert(pantalla)
        }else{
            pantalla = "CONTACTO ENCONTRADO"
            pantalla = pantalla +'\n'+ separador
            pantalla = pantalla +'\n'+ mostrarContacto(respuesta) +'\n'+ separador;
            alert(pantalla);
        }
    }
    menuPrincipal();
}
function buscarPorNombre(nombre){
    let position=-1;
    for(let i=0; i<contactos.length;i++){
        if(contactos[i].nombre.toUpperCase()===nombre.toUpperCase()){
            position=i;
            i=contactos.length;
        }
    }
    return position;
}
function buscarPorTelefono(telefono){
    let position=-1;
    for(let i=0; i<contactos.length;i++){
        if(contactos[i].telefono.toUpperCase()===telefono.toUpperCase()){
            position=i;
            i=contactos.length;
        }
    }
    return position
}
function mostrarContacto(ubicacionContacto){
    return contactos[ubicacionContacto].mostrarDatos();
}
function eliminarContacto(){
    let nombreTelefono, ubicacionContacto, confirmacion;
    pantalla = "ELIMINAR CONTACTO"
    pantalla = pantalla + '\n' + separador;
    pantalla = "Ingrese nombre o telefono: "
    nombreTelefono = prompt(pantalla);
    if(nombreTelefono!==null){
        ubicacionContacto = buscarPorNombre(nombreTelefono);

        if(ubicacionContacto===-1){
            ubicacionContacto = buscarPorTelefono(nombreTelefono);
        }
    
        if(ubicacionContacto===-1){
            alert("El contacto no EXISTE.")
        }else{
            do{
                pantalla = "ELIMINAR CONTACTO"
                pantalla = pantalla +'\n'+ separador
                pantalla = pantalla +'\n'+ mostrarContacto(ubicacionContacto) +'\n'+ separador;
                pantalla = pantalla +'\n'+ '¿Esta seguro de ELIMINAR?\n  - Ingrese "si" para confirmar eliminación.\n  - Ingrese "no" para cancelar eliminación.';
                pantalla = pantalla +'\n'+ separador
                confirmacion = prompt(pantalla);
            }while(confirmacion!==null && (confirmacion.toUpperCase()!=="NO")&&(confirmacion.toUpperCase()!=="SI"))
    
            if(!(confirmacion===null || confirmacion.toUpperCase()!=="SI")){
                contactos.splice(ubicacionContacto,1);
                pantalla = separador;
                pantalla = pantalla + "\nEl contacto ha sido ELIMINADO.";
                pantalla = pantalla + "\n" + separador;
                alert(pantalla);
            }
        }
    }
    menuPrincipal();
}
