function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  var metaData = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
  metaData.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
  d3.json(`/metadata/${sample}`).then((data) => {
    Object.entries(data).forEach(([key,value]) => {
    var line = metaData.append("h6");
    line.text(`${key} : ${value}`);
  });
});
    buildGauge(sample);
};

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var chartData = d3.json(`/samples/${sample}`)
    // @TODO: Build a Bubble Chart using the sample data
  chartData.then((bubble) => {
    var bubbleTrace = {
      x: bubble.otu_ids,
      y: bubble.sample_values,
      text: bubble.otu_labels,
      mode: "markers",
      marker:{
        color: bubble.otu_ids,
        colorscale:"Portland",
        size: bubble.sample_values,
        sizeref:1.4
      }
    };
    var bubbleData = [bubbleTrace];
    var layout = {
      xaxis:{title:"OTU IDs"}
    };
    Plotly.newPlot("bubble", bubbleData, layout);
  });
    // @TODO: Build a Pie Chart
    var pieData = chartData;
      pieData.then((data) => {
        var pieArray = [];
        for (i=0;i<80;i++) {
          var pieObj = {};
          Object.entries(data).forEach(function([key, value]) {
            pieObj[key] = value[i];
          });
          console.log(pieObj);
          pieArray[i]=pieObj;
        };
        pieArray.sort(function(a,b) {return b.sample_values - a.sample_values});
        console.log(pieArray);
        slice = pieArray.slice(0,10);
        console.log(slice);
        var pieTrace = {
          values: slice.map(d=>d.sample_values),
          labels: slice.map(d=>d.otu_ids),
          text: slice.map(d=>d.otu_labels),
          hoverinfo: "label+percent+value+text",
          textinfo: "percent",
          type:"pie"
        };
        var pieChart = [pieTrace];
        var layout = {margin: {
          l: 20,
          r: 20,
          b: 20,
          t: 20,}};
        Plotly.newPlot("pie", pieChart,layout);
  });
};
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
