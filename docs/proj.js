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
  body.style("background-color", "white");
  ReadMaleVFemaleData();
}
let MaleAdata = [];
let FemaleAdata = [];
let MaleVFemaleData = [];

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
      console.log(FemaleAdata);
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

drawMainSection = (svg, data) => {
  let DataMale = data.filter(obj => {
    return obj.sex === "Male";
  })[0];

  let DataFemale = data.filter(obj => {
    return obj.sex === "Female";
  })[0];

  let keys = [
    "attractive",
    "average/attractive",
    "average",
    "unattractive/average",
    "unattractive"
  ];

  totals = { Male: 0, Female: 0 };
  keys.forEach(section => {
    totals.Male += parseInt(DataMale[section]);
    totals.Female += parseInt(DataFemale[section]);
  });

  let scale = d3
    .scaleLinear()
    .domain(
      d3.extent(
        Object.values(DataMale)
          .concat(Object.values(DataFemale))
          .map(Number)
      )
    )
    .range([0, 500]);

  let offsetX = 0;

  keys.forEach(section => {
    d3.select(svg)
      .selectAll("rect#" + section.replace("/", "-"))
      .data(data)
      .enter()
      .append("rect")
      .on("mouseleave", function(d) {
        rectRegular(this, "vert");
      })
      .on("mouseover", function(d) {
        showStat(d3.mouse(this), svg, totals[d.sex], d[section]);
        rectFocus(this, "vert");
      })
      .transition("init")
      .duration(2000)
      .attr("x", (d, i) => offsetX + i * 20)
      .attr("width", 15)
      .transition()
      .duration(4000)
      .attr("y", d => 500 - scale(parseInt(d[section])))
      .attr("height", d => scale(parseInt(d[section])))
      .style("fill", d => (d.sex == "Male" ? "red" : "orange"));

    d3.select(svg)
      .selectAll("rect#" + section.replace("/", "-"))
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => offsetX + i * 20)
      .attr("y", 500)
      .attr("height", 1)
      .attr("width", 15)
      .style("fill", "black");

    /*d3.select(svg)
    .selectAll("text#" + section.replace("/", "-"))
    .data(data)
    .enter()
    .append("text")
    .style("text-anchor", "middle")
    .attr("x", offsetX)
    .attr("y", 510)
    .transition()
    .duration(2000)
    .attr("x", (d, i) => offsetX + i * 20)
    .text(titleCase(section))
    .attr("transform", (d, i) => {
      console.log(offsetX + i * 20 )
      return "180, "+ offsetX + i * 20 +", 510"
      })
    .style("color", "black")
    .style("font-size", "14px"); /*
/*
  d3.select(svg)
    .append("line")
    .attr("x1", 165)
    .attr("y1", offsetY)
    .attr("x2", 165)
    .attr("y2", offsetY)
    .transition()
    .duration(2000)
    .attr("x2", 165)
    .attr("y2", offsetY + 9 * 20)
    .attr("stroke", "black");

  d3.select(svg)
    .append("text")
    .attr("x", 0)
    .attr("y", offsetY + 80)
    .text(titleCase(section))
    .style("color", "black")
    .style("font-size", "14px");
    */
    offsetX += 80;
  });

  drawLegend(svg, 400, 100);
};

function drawLegend(svg, startX, startY) {
  var size = 20;
  let keys = ["Male", "Female"];

  // rectangles
  d3.select(svg)
    .selectAll("mydots")
    .data(keys)
    .enter()
    .append("rect")
    .on("click", d => (d == "Male" ? toMaleData(svg) : toFemaleData(svg)))
    .on("mouseover", function(d) {
      //mouseover
      d3.select("#" + d + "-label")
        .transition()
        .duration(100)
        .style("font-weight", "bold")
        .style("font-size", "24px")
        .style("color", "black");

      d3.select(this)
        .transition()
        .duration(100)
        .attr("height", size + 2)
        .attr("width", size + 2);
    })
    .on("mouseleave", function(d) {
      //mouseleave
      d3.select("#" + d + "-label")
        .transition()
        .duration(500)
        .style("font-weight", "bold")
        .style("font-size", "16px")
        .style("color", "black");

      d3.select(this)
        .transition()
        .duration(100)
        .attr("height", size)
        .attr("width", size);
    })
    .attr("x", startX)
    .attr("y", function(d, i) {
      return startY + i * (size + 5);
    })
    .attr("id", d => d + "-box")
    .attr("height", size)
    .transition()
    .duration(2000)
    .attr("width", size)
    .style("fill", d => (d == "Male" ? "red" : "orange"));

  // label part
  d3.select(svg)
    .selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
    .attr("id", d => d + "-label")
    .on("mouseover", function(d) {
      //mouseover
      d3.select(this)
        .transition()
        .duration(100)
        .style("font-weight", "bold")
        .style("font-size", "24px")
        .style("color", "black");

      d3.select("#" + d + "-box")
        .transition()
        .duration(100)
        .attr("height", size + 2)
        .attr("width", size + 2);
    })
    .on("mouseleave", function(d) {
      //mouseleave
      d3.select(this)
        .transition()
        .duration(500)
        .style("font-weight", "bold")
        .style("font-size", "16px")
        .style("color", "black");

      d3.select("#" + d + "-box")
        .transition()
        .duration(100)
        .attr("height", size)
        .attr("width", size);
    })
    .on("click", d => (d == "Male" ? toMaleData(svg) : toFemaleData(svg)))
    .attr("x", startX + size * 1.2)
    .attr("y", function(d, i) {
      return startY + i * (size + 5) + size / 2;
    })
    .transition("load")
    .duration(2000)
    .style("fill", d => (d == "Male" ? "red" : "orange"))
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .text(function(d) {
      return d;
    });
}

function toMaleData(svg) {
  d3.select(svg).remove();
  ReadMaleAdata();
}

function toFemaleData(svg) {
  d3.select(svg).remove();
  ReadFemaleAdata();
}

function showStat(position, svg, total, section) {
  let mouse = { x: position[0], y: position[1] };

  let popup = d3
    .select(svg)
    .append("g")
    .style("opacity", 0.3);
  /*
  popup
    .append("rect")
    .attr("x", mouse.x + 10)
    .attr("y", mouse.y)
    .attr("height", 50)
    .attr("width", 50)
    .style("fill", "black"); */

  popup
    .append("text")
    .attr("x", mouse.x)
    .attr("y", mouse.y + 30)
    .style("font-size", "6px")
    .transition()
    .duration(1000)
    .text(section + " of " + total)
    .style("color", "red")
    .style("font-size", "14px");
}
function rectFocus(element, orient) {
  d3.select(element)
    .transition()
    .duration(500)
    .attr(orient == "vert" ? "width": "height", 17)
    .style("stroke-width", 6)
    .style("opacity", 0.4)
    .style("stroke", "gray");
}

function rectRegular(element, orient) {
  d3.select(element)
    .transition()
    .duration(500)
    .attr(orient == "vert" ? "width": "height", 15)
    .style("stroke-width", 0)
    .style("opacity", 1)
    .style("stroke", null);

  d3.select("g").remove();
}

drawSubSection = (svg, data, section, offsetY) => {
  total = data.reduce((a, b) => a + (parseInt(b[section]) || 0), 0);


  let copy = JSON.parse(JSON.stringify(data));
 
  copy.forEach(obj=>{
  //   delete obj.age
   })



  console.log(total, section)
  let scale = d3
    .scaleLinear()
    .domain(d3.extent(copy.map(Number)))
    .range([0, 300]);
   console.log(scale.domain())
  d3.select(svg)
    .selectAll("rect#" + section.replace("/", "-"))
    .data(data)
    .enter()
    .append("rect")
    .on("mouseleave", function(d) {
      rectRegular(this, "horiz");
    })
    .on("mouseover", function(d) {
      showStat(d3.mouse(this), svg, total, d[section]);
      rectFocus(this, "horiz");
    })
    .transition()
    .duration(500)
    .attr("x", 300)
    .attr("y", (d, i) => offsetY + i * 20)
    .transition()
    .duration(4000)
    .attr("height", 15)
    .attr("width", d => scale(parseInt(d[section])))
    .style("fill", svg.includes("Female") ? "orange" : "red");

  d3.select(svg)
    .selectAll("rect#" + section.replace("/", "-"))
    .data(data)
    .enter()
    .append("rect")
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
    .attr("x", 170)
    .attr("y", offsetY)
    .transition()
    .duration(2000)
    .attr("y", (d, i) => offsetY + i * 20 + 10)
    .text(d => d.age)
    .style("color", "black")
    .style("font-size", "14px");

  d3.select(svg)
    .append("line")
    .attr("x1", 165)
    .attr("y1", offsetY)
    .attr("x2", 165)
    .attr("y2", offsetY)
    .transition()
    .duration(2000)
    .attr("x2", 165)
    .attr("y2", offsetY + 9 * 20)
    .attr("stroke", "black");

  d3.select(svg)
    .append("text")
    .attr("x", 0)
    .attr("y", offsetY + 80)
    .text(titleCase(section))
    .style("color", "black")
    .style("font-size", "14px");
};

drawMaleVFemaleData = () => {
  console.log(MaleVFemaleData);
  drawMainSection("#MaleVFemaleASvg", MaleVFemaleData);
};

drawMaleAdata = () => {
  console.log(MaleAdata);

  drawSubSection("#MaleASvg", MaleAdata, "attractive", 0);
  setTimeout(function() {
    drawSubSection("#MaleASvg", MaleAdata, "average/attractive", 210);
  }, 2000);
  setTimeout(function() {
    drawSubSection("#MaleASvg", MaleAdata, "average", 420);
  }, 3500);
  setTimeout(function() {
    drawSubSection("#MaleASvg", MaleAdata, "unattractive/average", 630);
  }, 4500);
  setTimeout(function() {
    drawSubSection("#MaleASvg", MaleAdata, "unattractive", 840);
  }, 5000);
};

drawFemaleAdata = () => {
  drawSubSection("#FemaleASvg", FemaleAdata, "attractive", 0);

  setTimeout(function() {
    drawSubSection("#FemaleASvg", FemaleAdata, "average/attractive", 210);
  }, 2000);

  setTimeout(function() {
    drawSubSection("#FemaleASvg", FemaleAdata, "average", 420);
  }, 3500);

  setTimeout(function() {
    drawSubSection("#FemaleASvg", FemaleAdata, "unattractive/average", 630);
  }, 4500);

  setTimeout(function() {
    drawSubSection("#FemaleASvg", FemaleAdata, "unattractive", 840);
  }, 5000);
};
