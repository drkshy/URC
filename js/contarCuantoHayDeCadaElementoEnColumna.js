// Funcion para contar cuanto hay de cada cosa en la columna de un csv        

function contarCuantoHayDeCadaElementoEnColumna(csvConvertidoAObjeto, columnaDeseada){
 
    var countDistinctCadaElemento = csvConvertidoAObjeto.reduce((acc, row) => { 

        var type = row[columnaDeseada];     

        if (type) {        

            if (acc[type] === undefined) { 
                acc[type] = 0;
            }
            acc[type]++; 
        }

        return acc;

    }, {}); 

    console.debug(countDistinctCadaElemento);

    return countDistinctCadaElemento;

}