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
            text: 'Los usuarios con mas tweets'
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
            text: 'Los tags mas ingresados'
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

function showTableModel(data)
{ 
    // Get the <ul> element with id="myList"
    var list = document.getElementById("bodyTable");

    // If the <ul> element has any child nodes, remove its first child node
    while(list.hasChildNodes()) {
        list.removeChild(list.childNodes[0]);
    }
    var html ='';
    data.forEach(element => {
        html+= '<tr>'+
                    '<td>'+element.name+'</td>'+
                    '<td>'+element.user+'</td>'+
                    '<td>'+element.txt+'</td>'+
                    '<td>'+element.tag+'</td>'+
                '</tr>';
    });
        
    document.getElementById("bodyTable").innerHTML+=html;
    $("#modalTable").modal();
}