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

function createHistrogramChart(listTag,listCount,listColor)
{
    listCount.push(0);
    if (histoChart){
        histoChart.destroy();
    }
    sourceChartHis = {
        type: 'bar',
        data: {
          labels: listTag,
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: listColor,
              data: listCount
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Tags vs Cantidad'
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


function clickButtonSearch()
{
    var wordSearch = document.getElementById("elementInputSearch").value;
    socket.emit('mysqlLike',{'word':wordSearch});
}