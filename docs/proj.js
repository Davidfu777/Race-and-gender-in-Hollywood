const body = d3.select(".wrapper");
const titleSeq = body.append("div").style("position", "relative");

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
  titleSeq.remove()
   /* .style("position", "absolute")
    .transition()
    .duration(3000)
    .attr("transform", "translateY(900)"); */
  body.style('background-color', 'blue')
  body.append("a")
    .attr("href", "https://docs.google.com/presentation/d/1CH3mna8_6Ee5iGW3BLgbYrqBDriYEOpVKAjy__0UUjY/edit?usp=sharing")
    .style("font-size", "40px")
    .html("slides");
  
  console.log("https://docs.google.com/presentation/d/1CH3mna8_6Ee5iGW3BLgbYrqBDriYEOpVKAjy__0UUjY/edit?usp=sharing")
}
