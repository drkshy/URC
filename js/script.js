document.addEventListener('DOMContentLoaded', function() {

    var elementoHtmlParaDepositarLeyenda = document.querySelector('.contenedor_leyendas');

    // var elementoHtmlEbrios = document.getElementById('ingenebrios'); 


    
    // Este es el punto de entrada de tu programa

    window.onload = async function() {
      

        //Partimos cada caracteristica en una funcion para poderla reusar facilmente
        //En este caso ya no es necesario leer 2 veces el csv, una para el mapa y otra para el pie, con leerlo 1 vez es suficiente
        

        var csvConvertidoAObjeto = await convertirArchivoCsvEnObjeto();     


 
        /*****************************/
        //Creacion Pies clicables
        /*****************************/

        crearPieClickeableEstadosClickTipoOrganismo(csvConvertidoAObjeto)

        crearPieClickeableGenero(csvConvertidoAObjeto)

        crearPieClickeableInnovacion(csvConvertidoAObjeto)

        crearPieClickeablePresupuestocsv(csvConvertidoAObjeto)

        crearPieClickeableAccesoAbiertocsv(csvConvertidoAObjeto)
        
        crearPieClickeableVinculacioncsv(csvConvertidoAObjeto)

        crearPieClickeableLeyCTIcsv(csvConvertidoAObjeto)


        /*****************************/
        //Creacion Mapas
        /*****************************/

        var map = crearObjetoInicialMapa();

        agregarColoresYLeyendaAMapa(csvConvertidoAObjeto, map, elementoHtmlParaDepositarLeyenda);    

        agregarMarcadoresEntidadesAMapa(csvConvertidoAObjeto, map)


    };   


    

   
});
