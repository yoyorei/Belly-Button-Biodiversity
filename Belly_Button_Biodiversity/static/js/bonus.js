function buildGauge(sample) {
    var chartData = d3.json(`/wfreq/${sample}`)
    // @TODO: Build a Bubble Chart using the sample data
  chartData.then((gauge)=> {
    var level = gauge.WFREQ * 20;
    var degrees = 180 - level,
    radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    var mainPath = "M -.0 -0.025 L .0 0.025 L",
    pathX = String(x),
    space = " ",
    pathY = String(y),
    pathEnd = " Z";
    var path = mainPath.concat(pathX,space,pathY,pathEnd);
    var data = [
        {type: "scatter",
        x: [0], 
        y:[0],
        marker: {size: 28, color:"850000"},
        showlegend: false,
        text: gauge.WFREQ,
        hoverinfo: "text"},
        {values: [81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
        rotation: 90,
        text: ["8-9","7-8","6-7", "5-6", "4-5", "3-4",
                "2-3", "1-2", "0-1",""],
        textinfo: "text",
        textposition:"inside",
        marker: {colors:["rgba(14, 69, 0, .5)","rgba(65, 100, 0, .5)",
                        "rgba(87, 127, 0, .5)", "rgba(110, 154, 22, .5)",
                            "rgba(170, 202, 42, .5)", "rgba(202, 209, 95, .5)",
                            "rgba(210, 206, 145, .5)", "rgba(232, 226, 202, .5)",
                            "rgba(252, 246, 220, .5)","rgba(255, 255, 255, 0)"]},
        labels: ["8-9","7-8","6-7", "5-6", "4-5", "3-4",
        "2-3", "1-2", "0-1"," "],
        hoverinfo: "label",
        hole: .5,
        type: "pie",
        showlegend: false}
    ];
    var layout = {
        title: "Belly Button Washing Frequency <br> Scrubs per Week",
        shapes:[{
            type: "path",
            path: path,
            fillcolor: "850000",
            line: {
            color: "850000"
            }
        }],
        xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        margin: {
            b:20,
            l:20,
            r:20
        }
        };
    Plotly.newPlot("gauge", data, layout);
  });
}

    
    
    
    

    

    
