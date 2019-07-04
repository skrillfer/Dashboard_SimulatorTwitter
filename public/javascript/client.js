var pieChart = null;
var histoChart = null;

function updateDashboard()
{
    createPieChart();
}

function createPieChart(){
    if (pieChart){
        pieChart.destroy();
    }
    sourceChart = {
        type: 'pie',
        data: {
        labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
        datasets: [{
            label: "Population (millions)",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: [2478,5267,734,784,433]
        }]
        },
        options: {
        title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
        }
        }
    }
    pieChart = new Chart(document.getElementById('elementPieChart'), sourceChart);
}

function createHistrogramChart()
{
    if (histoChart){
        histoChart.destroy();
    }
    histoChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}

function zoomChart()
{
    $("#modalZoom").modal()

    new Chart(document.getElementById('elementChartZoom'), sourceChart);
  
}