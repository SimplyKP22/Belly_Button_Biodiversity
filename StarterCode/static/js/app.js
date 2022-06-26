// Creating a function to select the dropdown menu and gather the 
// data from the sample.json file
function init() {

    // Select the dropdown 
    var selector = d3.select("#selDataset");

    // Build the list that should appear in the dropdown
    // d3.json used to access the samples.json file
    d3.json("samples.json").then((data) => {

      // log the initial data retrieved from the samples.json file to the console
      console.log(data);
      // Create a variable that will house the data from the "names" array
      var sampleNames = data.names;
      // the array.forEach() function acts like a for loop
      // we use this action to look at each object in the "names" array
      // and append the ids 
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      
      });
      // Build the list of datapoints that should be reflected for the first
      // Test Subject ID No. 
      var sampleOne = sampleNames[0];
      Metadata(sampleOne);
      
      // Build the first set of charts, based on the first Test Subject ID No. 
      newCharts(sampleOne)
    });


  }
  // Calling the init function
  init();
  

  // optionChanged function is called in the index.html
  function optionChanged(Sample) {
    // Print the Test Subject ID No. that prompted the change to the console
    console.log(Sample);
    // Call the Metadata function to change the display of the new demographic
    // data for the selected ID No. 
    Metadata(Sample);
    // Call the new Charts function to update the charts the relavant data for the
    // selected ID No. 
    newCharts(Sample);
  }

  // Metadata function
  function Metadata(Sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Create a variable that works to filter the data contained in the "metadata"
      // array 
      var resultsArray = metadata.filter(sampleObj => sampleObj.id == Sample);
      // Select the first sample object that is in the array
      var result = resultsArray[0]; 
      var demographicInfo = d3.select("#sample-metadata");

      // Clear any existing info in the Demographic Info section.
      demographicInfo.html(""); 

      // append the values needed for the selected sample
      demographicInfo.append("h6").text(`ID: ${result.id}`);
      demographicInfo.append("h6").text(`Ethnicity: ${result.ethnicity}`);
      demographicInfo.append("h6").text(`Gender: ${result.gender}`);
      demographicInfo.append("h6").text(`Age: ${result.age}`);
      demographicInfo.append("h6").text(`Location: ${result.location}`);
      demographicInfo.append("h6").text(`BBtype: ${result.bbtype}`);
      demographicInfo.append("h6").text(`Washing/week: ${result.wfreq}`);
    });
  }

  // newCharts function
  function newCharts(Sample) {
    d3.json("samples.json").then((data) => {
      var sampleData = data.samples;
      var resultsArray = sampleData.filter(sampleObj => sampleObj.id == Sample);
      var result = resultsArray[0]; 
      var otuIDs = result.otu_ids;
      var otuLabs = result.otu_labels;
      var sampleVals = result.sample_values; 
      
      // sorting and filtering the data to get the top 10 otu_ids for the bar chart
      // we reverse the top 10 so the data works with the Plotly's default settings
      var yticks = otuIDs.slice(0,10).reverse().map(function (elem) {return `OTU ${elem}`});
      var xticks = sampleVals.slice(0,10).reverse();
      var labels = otuLabs.slice(0,10).reverse();

      // Create the trace for the bar chart. 
      var barTrace = {
      x: xticks,
      y: yticks,
      type: 'bar',
      orientation: 'h',
      text: labels
      };
      // Bar Chart layout and title. 
      var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      };
      // Use Plotly to create the barchart and have it rendered 
      // the barTrace needs to be placed in an array
      Plotly.newPlot("bar", [barTrace], barLayout);

      // Create trace information for the bubble chart.
      var bubblechartTrace = {
      x: otuIDs,
      y: sampleVals,
      text: otuLabs,
      mode: 'markers',
      marker: {
        size: sampleVals,
        color: otuIDs
      }
      };
    
      // Create the layout for the bubble chart.
      var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"},
      showlegend: false
      };
    
      // Use Plotly to plot the data with the layout.
      // the bubblechartTrace needs to be placed in an array
      Plotly.newPlot("bubble", [bubblechartTrace], bubbleLayout);
    });
  }