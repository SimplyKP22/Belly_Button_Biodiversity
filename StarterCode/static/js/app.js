// Creating a function to select the dropdown menu and gather the 
// data from the sample.json file
function init() {

    // Select the dropdown 
    var selector = d3.select("#selDataset");

    // Build the list that should appear in the dropdown
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      
      });
      // Build the list of datapoints that should be reflected for the first
      // Test Subject ID No. 
      var metadata = data.metadata;
      var resultsArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultsArray[0]; 
      var demographicInfo = d3.select("#sample-metadata");

      demographicInfo.html(""); 
      demographicInfo.append("h6").text(`ID: ${result.id}`);
      demographicInfo.append("h6").text(`Ethnicity: ${result.ethnicity}`);
      demographicInfo.append("h6").text(`Gender: ${result.gender}`);
      demographicInfo.append("h6").text(`Age: ${result.age}`);
      demographicInfo.append("h6").text(`Location: ${result.location}`);
      demographicInfo.append("h6").text(`BBtype: ${result.bbtype}`);
      demographicInfo.append("h6").text(`Washing/week: ${result.wfreq}`);
    })


}

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
    // newCharts(Sample);
  }

  // Metadata function called in optionChanged
  function Metadata(Sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultsArray = metadata.filter(sampleObj => sampleObj.id == Sample);
      var result = resultsArray[0]; 
      var demographicInfo = d3.select("#sample-metadata");

      demographicInfo.html(""); 
      demographicInfo.append("h6").text(`ID: ${result.id}`);
      demographicInfo.append("h6").text(`Ethnicity: ${result.ethnicity}`);
      demographicInfo.append("h6").text(`Gender: ${result.gender}`);
      demographicInfo.append("h6").text(`Age: ${result.age}`);
      demographicInfo.append("h6").text(`Location: ${result.location}`);
      demographicInfo.append("h6").text(`BBtype: ${result.bbtype}`);
      demographicInfo.append("h6").text(`Washing/week: ${result.wfreq}`);
    });
  }