



function plotStat(stat,kwd){
		
    var vnx = document.getElementById("statistics");
    while(vnx.firstChild){
        vnx.removeChild(vnx.firstChild);
    }
    var h3 = document.createElement("H3");
    h3.innerHTML="Statistics";
    vnx.appendChild(h3);
    var wch = document.createElement("CANVAS");
    wch.setAttribute("id","myChart");
    wch.setAttribute("width",200);
    wch.setAttribute("height",40);
    oHash = getStatBysform(stat,kwd);
    var backgroundColor = [
                                   'rgba(255, 99, 132, 0.2)',
                                   'rgba(54, 162, 235, 0.2)',
                                   'rgba(255, 206, 86, 0.2)',
                                   'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                            ];
    var borderColor= [
                                    'rgba(255,99,132,1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                            ];
    var bgcolor = [];
    var bdcolor = [];
    for (i=0;i<oHash["lexemes"].length;i++){
        var num = i%6;
        bgcolor.push(backgroundColor[num]);
        bdcolor.push(borderColor[num]);
    }
    var ctx = wch.getContext('2d');
    wchart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: oHash["lexemes"],
            datasets: [{
                label: '# of '+kwd,
                data: oHash["counts"],
                backgroundColor: bgcolor,
                borderColor: bdcolor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            onClick: function(evt){
                var activePoints = wchart.getElementsAtEvent(evt);
                var firstPoint = activePoints[0];
                var label = wchart.data.labels[firstPoint._index];
                var value = wchart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
                var wpos = label.split(" ");
                findConc(kwd,wpos[0],wpos[1]);
                }
        }
    });
vnx.appendChild(wch);

}