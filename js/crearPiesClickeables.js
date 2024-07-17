

function crearPieClickeableEstadosClickTipoOrganismo(csvConvertidoAObjeto){

    var distinctOrganismos = contarCuantoHayDeCadaElementoEnColumna(csvConvertidoAObjeto, 'TIPO_ORGANISMO');   

    const cuandoHagaClick = (label) => {
        
        console.debug("Para el tipo de organismo " + label + " los elementos son:");

        var estadosConTipoOrganismo = filtrarObjetosALoSqlStartsWith(csvConvertidoAObjeto, 'TIPO_ORGANISMO', label);   
        
        inyectarTablaEnHtml('contenedor_tabla_pie', "Entidades con presencia del organismo '" + label + "'", estadosConTipoOrganismo, 'PODER_EJECUTIVO_ENTIDAD')

    };

    crearPieCountDistinctColumnaFunction(distinctOrganismos, 'dist_tipo_organismo_clic_graf', 'Haga click en cada organismo', cuandoHagaClick);

}



function crearPieClickeableGenero(csvConvertidoAObjeto){

    var distinctGeneros = contarCuantoHayDeCadaElementoEnColumna(csvConvertidoAObjeto, 'genero_CTI');   

    console.debug("distinctGeneros: " + distinctGeneros)

    const cuandoHagaClick = (label) => {
        
        console.debug("Para el " + label + " los elementos son:");

        var estadosConTipoOrganismo = filtrarObjetosALoSqlStartsWith(csvConvertidoAObjeto, 'genero_CTI', label);   
        
        inyectarTablaEnHtml('contenedor_tabla_pie_2', "La ley regula el tema de Genero '" + label + "'", estadosConTipoOrganismo, 'PODER_EJECUTIVO_ENTIDAD')

    };

    crearPieCountDistinctColumnaFunction(distinctGeneros, 'dist_genero_clic_graf', 'Haga click en la parte del pay que desea ver', cuandoHagaClick);

}


function crearPieClickeableInnovacion(csvConvertidoAObjeto){

    var distinctInnovacion = contarCuantoHayDeCadaElementoEnColumna(csvConvertidoAObjeto, 'Innovacion');   

    console.debug("distinctInnovacion: " + distinctInnovacion)

    const cuandoHagaClick = (label) => {
        
        console.debug("Para el " + label + " los elementos son:");

        var estadosConTipoOrganismo = filtrarObjetosALoSqlStartsWith(csvConvertidoAObjeto, 'Innovacion', label);   
        
        inyectarTablaEnHtml('contenedor_tabla_pie_2', "Entidades con mencion de Innovacion '" + label + "'", estadosConTipoOrganismo, 'PODER_EJECUTIVO_ENTIDAD')

    };

    crearPieCountDistinctColumnaFunction(distinctInnovacion, 'dist_innovacion_clic_graf', 'Haga click en la parte del pay que desea ver', cuandoHagaClick);

}

function crearPieClickeableLeyCTIcsv(csvConvertidoAObjeto){

    var distinctLeyCTI = contarCuantoHayDeCadaElementoEnColumna(csvConvertidoAObjeto, 'Ley_de_CTI');   

    console.debug("distinctLeyCTI: " + distinctLeyCTI)

    const cuandoHagaClick = (label) => {
        
        console.debug("Para el " + label + " los elementos son:");

        var estadosConTipoOrganismo = filtrarObjetosALoSqlStartsWith(csvConvertidoAObjeto, 'Ley_de_CTI', label);   
        
        inyectarTablaEnHtml('contenedor_tabla_pie_2', "Existencia de Ley de CTI " + label + "'", estadosConTipoOrganismo, 'PODER_EJECUTIVO_ENTIDAD')

    };

    crearPieCountDistinctColumnaFunction(distinctLeyCTI, 'dist_leycti_clic_graf', 'Haga click en la parte del pay que desea ver', cuandoHagaClick);

}


function crearPieClickeableAccesoAbiertocsv(csvConvertidoAObjeto){

    var distinctAccesoAbierto = contarCuantoHayDeCadaElementoEnColumna(csvConvertidoAObjeto, 'Acceso_Abierto');   

    console.debug("distinctAccesoAbierto: " + distinctAccesoAbierto)

    const cuandoHagaClick = (label) => {
        
        console.debug("Para el " + label + " los elementos son:");

        var estadosConTipoOrganismo = filtrarObjetosALoSqlStartsWith(csvConvertidoAObjeto, 'Acceso_Abierto', label);   
        
        inyectarTablaEnHtml('contenedor_tabla_pie_2', "Entidades con mencion de Acceso Abierto '" + label + "'", estadosConTipoOrganismo, 'PODER_EJECUTIVO_ENTIDAD')

    };

    crearPieCountDistinctColumnaFunction(distinctAccesoAbierto, 'dist_accesoAbierto_clic_graf', 'Haga click en la parte del pay que desea ver', cuandoHagaClick);

}

function crearPieClickeablePresupuestocsv(csvConvertidoAObjeto){

    var distinctPresupuesto = contarCuantoHayDeCadaElementoEnColumna(csvConvertidoAObjeto, 'Presupuesto');   

    console.debug("distinctPresupuesto: " + distinctPresupuesto)

    const cuandoHagaClick = (label) => {
        
        console.debug("Para el " + label + " los elementos son:");

        var estadosConTipoOrganismo = filtrarObjetosALoSqlStartsWith(csvConvertidoAObjeto, 'Presupuesto', label);   
        
        inyectarTablaEnHtml('contenedor_tabla_pie_2', "Entidades con mencion de Presupuesto '" + label + "'", estadosConTipoOrganismo, 'PODER_EJECUTIVO_ENTIDAD')

    };

    crearPieCountDistinctColumnaFunction(distinctPresupuesto, 'dist_presupuesto_clic_graf', 'Haga click en la parte del pay que desea ver', cuandoHagaClick);

}


function crearPieClickeableVinculacioncsv(csvConvertidoAObjeto){

    var distinctVinculacion = contarCuantoHayDeCadaElementoEnColumna(csvConvertidoAObjeto, 'Vinculacion');   

    console.debug("distinctVinculacion: " + distinctVinculacion)

    const cuandoHagaClick = (label) => {
        
        console.debug("Para el " + label + " los elementos son:");

        var estadosConTipoOrganismo = filtrarObjetosALoSqlStartsWith(csvConvertidoAObjeto, 'Vinculacion', label);   
        
        inyectarTablaEnHtml('contenedor_tabla_pie_2', "La Ley permite Vinculación con el sector productivo " + label + "'", estadosConTipoOrganismo, 'PODER_EJECUTIVO_ENTIDAD')

    };

    crearPieCountDistinctColumnaFunction(distinctVinculacion, 'dist_vinculacion_clic_graf', 'Haga click en la parte del pay que desea ver', cuandoHagaClick);

}
