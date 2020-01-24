const body = d3.select("body");
const wrapper = d3.select(".wrapper");
const titleSeq = wrapper.append("div").style("position", "relative");

titleSeq
  .append("h1")
  .text("Race and Gender in Hollywood")
  .style("font-size", "8px")
  .style("opacity", ".1")
  .transition()
  .duration(5000)
  .style("font-size", "80px")
  .style("opacity", "1")
  .attr("align", "center")
  .style("color", "white")
  .on("end", pulse);

titleSeq
  .append("h1")
  .text("Collobaorators: David Fu, Enoch Mwesigwa")
  .style("font-size", "8px")
  .style("opacity", ".1")
  .transition()
  .duration(5000)
  .style("font-size", "50px")
  .style("opacity", "1")
  .attr("align", "center")
  .style("color", "white");

function pulse() {
  d3.selectAll("h1")
    .transition()
    .duration(2000)
    .style("opacity", ".3")
    .transition()
    .duration(2000)
    .style("opacity", "1")
    .on("end", pulse);
}

function focus() {
  d3.select("#continue")
    .style("font-weight", 10000)
    .style("font-size", "24px")
    .style("opacity", "1")
    .style(
      "text-shadow",
      "0 0 15px rgba(255,255,255,.5), 0 0 10px rgba(255,255,255,.5)"
    );
}

function unfocus() {
  d3.select("#continue")
    .style("font-weight", 700)
    .style("font-size", "18px")
    .style("text-shadow", null);
}

titleSeq
  .append("h3")
  .style("opacity", "0")
  .on("mouseover", focus)
  .on("mouseleave", unfocus)
  .on("click", leaveTitle)
  .attr("id", "continue")
  .style("font-weight", 700)
  .text("click to continue")
  .attr("align", "center")
  .style("color", "white")
  .style("font-size", "18px")
  .transition()
  .duration(10000)
  .style("opacity", "1");

function leaveTitle() {
  titleSeq.remove();
  /* .style("position", "absolute")
    .transition()
    .duration(3000)
    .attr("transform", "translateY(900)"); */
  body.style("background-color", "white")
  ReadMaleAdata();
}
let MaleAdata = [];
let FemaleAdata = [];
let MaleVFemaleData= []

ReadMaleVFemaleData = () => {
  wrapper
    .append("svg")
    .attr("id", "MaleVFemaleASvg")
    .attr("width", 600)
    .attr("height", 1050);
  //.style("background-color", "gray");

  d3.csv("../data/Male-vs-Female-Attractiveness.csv")
    .then(data => {
      MaleVFemaleData = data;
    })
    .then(drawMaleVFemaleData);
};


ReadMaleAdata = () => {
  wrapper
    .append("svg")
    .attr("id", "MaleASvg")
    .attr("width", 600)
    .attr("height", 1050);

  d3.csv("../data/Male-Attractiveness-vs-Age.csv")
    .then(data => {
      MaleAdata = data;
    })
    .then(drawMaleAdata);
};

ReadFemaleAdata = () => {
  wrapper
    .append("svg")
    .attr("id", "FemaleASvg")
    .attr("width", 600)
    .attr("height", 1050);
  d3.csv("../data/Female-Attractiveness-vs-age.csv")
    .then(data => {
      FemaleAdata = data;
      console.log(FemaleAdata)
    })
    .then(drawFemaleAdata);
};

titleCase = str => {
  if (str.includes("/")) {
    let word = str.split("/");
    return (
      word[0].charAt(0).toUpperCase() +
      word[0].substring(1) +
      " / " +
      word[1].charAt(0).toUpperCase() +
      word[1].substring(1)
    );
  }
  return str.charAt(0).toUpperCase() + str.substring(1);
};

drawMainSection=(svg, data, section, offsetY)=>{
  
}

drawSubSection = (svg, data, section, offsetY) => {
  let scale = d3
  .scaleLinear()
  .domain(d3.extent(data.map(d => d[section]).map(Number)))
  .range([0, 300]);

  d3.select(svg)
    .selectAll("rect#" + section.replace("/", "-"))
    .data(data)
    .enter()
    .append("rect")
    .transition()
    .duration(2000)
    .attr("x", 300)
    .attr("y", (d, i) => offsetY + i * 20)
    .attr("height", 15)
    .attr("width", d => scale(parseInt(d[section])))
    .style("fill", "red");

  d3.select(svg)
    .selectAll("rect#" + section.replace("/", "-"))
    .data(data)
    .enter()
    .append("rect")
    .transition()
    .duration(2000)
    .attr("x", 300)
    .attr("y", (d, i) => offsetY + i * 20)
    .attr("height", 15)
    .attr("width", 1)
    .style("fill", "black");

  d3.select(svg)
    .selectAll("text#" + section.replace("/", "-"))
    .data(data)
    .enter()
    .append("text")
    .transition()
    .duration(2000)
    .attr("x", 170)
    .attr("y", (d, i) => offsetY + i * 20 + 10)
    .text(d => d.age)
    .style("color", "black")
    .style("font-size", "14px");

  d3.select(svg)
    .append("line")
    .attr("x1", 165)
    .attr("y1", offsetY)
    .attr("x2", 165)
    .attr("y2", offsetY + 9 * 20)
    .attr("stroke", "black");

  d3.select(svg)
    .append("text")
    .transition()
    .duration(2000)
    .attr("x", 0)
    .attr("y", offsetY + 80)
    .text(titleCase(section))
    .style("color", "black")
    .style("font-size", "14px");
};

drawMaleVFemaleData=()=>{
  console.log(MaleVFemaleData)
  drawMainSection("#MaleVFemaleASvg", MaleVFemaleData, "attractive", 0)
}

drawMaleAdata = () => {
  console.log(MaleAdata);

  drawSubSection("#MaleASvg", MaleAdata, "attractive", 0);
  setTimeout(function() {
    drawSubSection(
      "#MaleASvg",
      MaleAdata,
      "average/attractive",
      210
    );
  }, 2000);
  setTimeout(function() {
    drawSubSection("#MaleASvg", MaleAdata, "average", 420);
  }, 3500);
  setTimeout(function() {
    drawSubSection(
      "#MaleASvg",
      MaleAdata,
      "unattractive/average",
      630
    );
  }, 4500);
  setTimeout(function() {
    drawSubSection("#MaleASvg", MaleAdata, "unattractive", 840);
  }, 5000);
};


drawFemaleAdata = () => {

  drawSubSection("#FemaleASvg", FemaleAdata, "attractive", 0);

  setTimeout(function() {
    drawSubSection(
      "#FemaleASvg",
      FemaleAdata,
      "average/attractive",
      210
    );
  }, 2000);

  setTimeout(function() {
    drawSubSection("#FemaleASvg", FemaleAdata, "average", 420);
  }, 3500);

  setTimeout(function() {
    drawSubSection(
      "#FemaleASvg",
      FemaleAdata,
      "unattractive/average",
      630
    );
  }, 4500);

  setTimeout(function() {
    drawSubSection("#FemaleASvg", FemaleAdata, "unattractive", 840);
  }, 5000);
};

