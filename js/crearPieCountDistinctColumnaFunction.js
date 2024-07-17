function crearPieCountDistinctColumnaFunction(cuantoHayDeCadaElemento, elementoHtmlParaDepositarGrafico, tituloDelGrafico, handlePieClick) {    

    var elementoEnHtml = document.getElementById(elementoHtmlParaDepositarGrafico).getContext('2d'); 

    const labels = Object.keys(cuantoHayDeCadaElemento);
    const { backgroundColors, borderColors } = generateColors(labels.length);

    new Chart(elementoEnHtml, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: Object.values(cuantoHayDeCadaElemento),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: tituloDelGrafico
                }
            },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    var clickedElementIndex = elements[0].index;
                    var label = this.data.labels[clickedElementIndex];
                    handlePieClick(label);
                }
            }
        }
    });
}

function insertHtml(label) {
    const container = document.getElementById('myHtmlContainer'); // The container element for the HTML content
    const newElement = document.createElement('div');
    newElement.innerHTML = `${label} clicked!`;
    container.appendChild(newElement);
}

function generateRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}`;
}

function generateColors(n) {
    const backgroundColors = [];
    const borderColors = [];
    for (let i = 0; i < n; i++) {
        const color = generateRandomColor();
        backgroundColors.push(`${color}, 0.2)`);
        borderColors.push(`${color}, 1)`);
    }
    return { backgroundColors, borderColors };
}