

function filtrarObjetosALoSqlStartsWith(csvConvertidoAObjeto, columnaDeseada, valorBuscadoEnColumna) {

    console.debug("Filtrando objetos donde " + columnaDeseada + " comienza con " + valorBuscadoEnColumna);

    var objetosFiltrados = csvConvertidoAObjeto.filter(row => {
        //Aqui debes preguntarle a chatgpt como hacer cada filtro que quieras, en este caso startsWith podria ser contains, llength, o que quieras
        return row[columnaDeseada] && row[columnaDeseada].startsWith(valorBuscadoEnColumna);
    });

    //presiona F12 y ve a console en el navegador para ver los resultados
    
    console.debug("Objetos filtrados:");
    console.debug(objetosFiltrados);

    return objetosFiltrados;

}


function filtrarObjetosALoSqlContains(csvConvertidoAObjeto, columnaDeseada, valorBuscadoEnColumna) {

    console.debug("Filtrando objetos donde " + columnaDeseada + " contiene " + valorBuscadoEnColumna);


    var objetosFiltrados = csvConvertidoAObjeto.filter(row => {
        return row[columnaDeseada] && row[columnaDeseada].includes(valorBuscadoEnColumna);
    });

    //presiona F12 y ve a console en el navegador para ver los resultados
    
    console.debug("Objetos filtrados:");
    console.debug(objetosFiltrados);

    return objetosFiltrados;

}


//Aqui no te va a devolver solamente 1 columna, sino todas las columnas que conforman el objeto

//Array(5) [ {…}, {…}, {…}, {…}, {…} ]​
//0: Object { LATITUD_DEL_ESTADO: "21.8853", LONGITUD_DEL_ESTADO: "-102.2916", PODER_EJECUTIVO_ENTIDAD: "Aguascalientes", … }​
//1: Object { LATITUD_DEL_ESTADO: "28.632", LONGITUD_DEL_ESTADO: "-106.0691", PODER_EJECUTIVO_ENTIDAD: "Chihuahua", … }​
//2: Object { LATITUD_DEL_ESTADO: "21.019", LONGITUD_DEL_ESTADO: "-101.2574", PODER_EJECUTIVO_ENTIDAD: "Guanajuato", … }​
//3: Object { LATITUD_DEL_ESTADO: "20.5888", LONGITUD_DEL_ESTADO: "-100.3899", PODER_EJECUTIVO_ENTIDAD: "Queretaro", … }​
//4: Object { LATITUD_DEL_ESTADO: "20.9674", LONGITUD_DEL_ESTADO: "-89.5926", PODER_EJECUTIVO_ENTIDAD: "Yucatan", … }