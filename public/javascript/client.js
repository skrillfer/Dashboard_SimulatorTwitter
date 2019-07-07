var pieChart = null;
var histoChart = null;
var zoomChartReference = null;
//-------------------------
var sourceChartPie = null; 
var sourceChartHis = null; 
function updateDashboard()
{
    //createPieChart();
    //createHistrogramChart();
    clickButtonUpdate();
}

function createPieChart(listUser,listCount,listColor){
    if (pieChart){
        pieChart.destroy();
    }
    sourceChartPie = {
        type: 'pie',
        data: {
        labels: listUser,
        datasets: [{
            label: "Population (millions)",
            backgroundColor: listColor,
            data: listCount
        }]
        },
        options: {
        title: {
            display: true,
            text: 'Usuario vs Cantidad'
        }
        }
    }
    pieChart = new Chart(document.getElementById('elementPieChart'), sourceChartPie);
}

function createHistrogramChart()
{
    if (histoChart){
        histoChart.destroy();
    }
    sourceChartHis = {
        type: 'bar',
        data: {
          labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: [2478,5267,734,784,433]
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
          }
        }
    };

    histoChart = new Chart(document.getElementById("elementHisChart"), sourceChartHis);
}

function zoomChart(id)
{
    $("#modalZoom").modal();
    if(zoomChartReference)
    {
        zoomChartReference.destroy();
    }
    if(id==1){
        zoomChartReference = new Chart(document.getElementById('elementChartZoom'), sourceChartPie);
    }else
    {
        zoomChartReference = new Chart(document.getElementById('elementChartZoom'), sourceChartHis);
    }
    
}

function clickButtonUpdate()
{
    socket.emit('update_dashboard',{});
}