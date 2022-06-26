// Creating a function to select the dropdown menu and gather the 
// data from the sample.json file prior to 
function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();

  // optionChanged function is called in the index.html
  function optionChanged(Sample) {
    console.log(Sample);
    Metadata(Sample);
    buildCharts(Sample);
  }

  // Metadata function called in optionChanged
  function Metadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultsArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultsArray[0]; 
      var shortDisplay = d3.select("#sample-metadata");

      shortDisplay.html(""); 
      shortDisplay.append("h6").text(`ID: ${result.id}`);
      shortDisplay.append("h6").text(`Ethnicity: ${result.ethnicity}`);
      shortDisplay.append("h6").text(`Gender: ${result.gender}`);
      shortDisplay.append("h6").text(`Age: ${result.age}`);
      shortDisplay.append("h6").text(`Location: ${result.location}`);
      shortDisplay.append("h6").text(`BBtype: ${result.bbtype}`);
      shortDisplay.append("h6").text(`Washing/week: ${result.wfreq}`);
    });
  }