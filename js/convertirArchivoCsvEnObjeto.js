async function convertirArchivoCsvEnObjeto() {

        // Convierte el CSV en algo que Javascript puede entender    
        try {
            const response = await fetch('CTI_Entidades_Federativas_20240613.csv');
            const data = await response.text();
            var csvConvertidoAObjeto = Papa.parse(data, { header: true }).data;    
            console.debug("CSV convertido a objeto exitosamente!");
            return csvConvertidoAObjeto;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }

    }