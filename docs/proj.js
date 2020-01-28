const body = d3.select("body");
const wrapper = d3.select(".wrapper");
const titleSeq = wrapper.append("div").style("position", "relative");

titleSeq
  .append("h1")
  .text("Gender in Hollywood")
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
  d3.select(this).on("click", null);

  titleSeq
    .transition()
    .duration(3000)
    .style("opacity", "0")
    .remove();

  body
    .transition()
    .duration(3000)
    .style("background-color", "white");

  setTimeout(function() {
    makeMenu();
  }, 3000);
}
let MaleAdata = [];
let FemaleAdata = [];
let MaleVFemaleData = [];

let MaleRdata = [];
let FemaleRdata = [];
let RaceGenderAgeData = [];

function makeMenu() {
  wrapper
    .append("h1")
    .attr("class", "menu")
    .text("Table of Context");

  wrapper
    .append("svg")
    .attr("class", "menu")
    .attr("height", 500)
    .attr("width", 500)
    .attr("id", "menu-svg")
    .style("background-color", "white");

  let menuSVG = d3.select("#menu-svg");

  menuSVG
    .append("rect")
    .attr("class", "menu")
    .attr("x", 5)
    .attr("y", 75)
    .attr("height", 50)
    .attr("width", 150)
    .on("click", function() {
      d3.selectAll(".menu").remove();
      ReadRaceGenderAgeData();
    })
    .on("mouseover", function() {
      d3.select(this)
        .transition()
        .duration(1000)
        .style("fill", "#606060")
        .style("stroke-width", 10)
        .style("stroke", "#606060");

      d3.select("#menu-AG")
        .style("font-weight", "bold")
        .style("font-size", "18px");
    })
    .on("mouseleave", function() {
      d3.select(this)
        .transition()
        .duration(1000)
        .style("fill", "#d3d3d3")
        .style("stroke-width", null)
        .style("stroke", null);

      d3.select("#menu-AG")
        .style("font-weight", "normal")
        .style("font-size", "20px");
    })
    .style("fill", "#d3d3d3");

  menuSVG
    .append("rect")
    .attr("class", "menu")
    .attr("x", 265)
    .attr("y", 75)
    .attr("height", 50)
    .attr("width", 225)
    .on("click", function() {
      d3.selectAll(".menu").remove();
      ReadMaleVFemaleData();
    })
    .on("mouseover", function() {
      d3.select(this)
        .transition()
        .duration(1000)
        .style("fill", "#606060")
        .style("stroke-width", 10)
        .style("stroke", "#606060");

      d3.select("#menu-AG")
        .style("font-weight", "bold")
        .style("font-size", "18px");
    })
    .on("mouseleave", function() {
      d3.select(this)
        .transition()
        .duration(1000)
        .style("fill", "#d3d3d3")
        .style("stroke-width", null)
        .style("stroke", null);

      d3.select("#menu-AG")
        .style("font-weight", "normal")
        .style("font-size", "20px");
    })
    .style("fill", "#d3d3d3");

  menuSVG
    .append("text")
    .attr("class", "menu")
    .attr("x", 10)
    .attr("y", 105)
    .text("Race and Gender")
    .style("text-align", "center")
    .attr("fill", "white")
    .style("font-size", "20px")
    .on("click", function() {
      d3.selectAll(".menu").remove();
      ReadRaceGenderAgeData();
    });

  menuSVG
    .append("text")
    .attr("class", "menu")
    .attr("x", 270)
    .attr("y", 105)
    .text("Attractiveness and Gender")
    .style("text-align", "center")
    .attr("fill", "white")
    .attr("id", "menu-AG")
    .on("click", function() {
      d3.selectAll(".menu").remove();
      ReadMaleVFemaleData();
    })
    .style("font-size", "20px");
}

ReadMaleVFemaleData = () => {
  wrapper
    .append("h1")
    .style("opacity", 0)
    .transition()
    .duration(3000)
    .attr("id", "page-header")
    .style("opacity", 1)
    .text("Distribution of Attractiveness Across Male and Female Actors")
    .attr("class", "firstWave")
    .style("text-align", "center");

  wrapper.append("br").attr("class", "firstWave");

  wrapper
    .append("svg")
    .attr("id", "MaleVFemaleASvg")
    .style("margin-left", 100)
    .attr("width", 600)
    .attr("height", 1050);
  // .style("background-color", "gray");

  d3.csv("./data/Male-vs-Female-Attractiveness.csv")
    .then(data => {
      MaleVFemaleData = data;
    })
    .then(drawMaleVFemaleData);
};

ReadRaceGenderAgeData = () => {
  wrapper
    .append("h1")
    .style("opacity", 0)
    .transition()
    .duration(3000)
    .attr("id", "page-header")
    .style("opacity", 1)
    .text("Distribution of Race Across Male and Female Actors")
    .attr("class", "firstWave")
    .style("text-align", "center");

  wrapper.append("br").attr("class", "firstWave");

  wrapper
    .append("svg")
    .attr("id", "MaleVFemaleRSvg")
    .style("margin-left", 100)
    .attr("width", 600)
    .attr("height", 1050);
  // .style("background-color", "gray");

  d3.csv("./data/Gender-Race-and-Age.csv")
    .then(data => {
      RaceGenderAgeData = data.slice(0, 2);
    })
    .then(drawRaceGenderAgeData);
};

ReadMaleRdata = () => {
  wrapper
    .append("svg")
    .attr("id", "MaleRSvg")
    .attr("transform", "translate(" + -300 + "," + 0 + ")")
    //.attr("width", "100vw")
    // .attr("height", "150%")
    .style("viewBox", "0 0 800 2000")
    .transition()
    .duration(2000)
    .attr("transform", "translate(" + 0 + "," + 0 + ")");

  d3.csv("./data/Male-Race-vs-Age.csv")
    .then(data => {
      MaleRdata = data;
    })
    .then(drawMaleRdata);
};

ReadFemaleRdata = () => {
  wrapper
    .append("svg")
    .attr("id", "FemaleRSvg")
    .attr("transform", "translate(" + -300 + "," + 0 + ")")
    .attr("width", 800)
    .attr("height", "100%")
    .style("overflow-y", "scroll")
    .transition()
    .duration(2000)
    .attr("transform", "translate(" + 0 + "," + 0 + ")");

  d3.csv("./data/Female-Race-vs-Age.csv")
    .then(data => {
      FemaleRdata = data;
    })
    .then(drawFemaleRdata);
};

ReadMaleRdata = () => {
  wrapper
    .append("svg")
    .attr("id", "MaleRSvg")
    .attr("transform", "translate(" + -300 + "," + 0 + ")")
    .attr("width", 800)
    .attr("height", "100%")
    .style("overflow-y", "scroll")
    .transition()
    .duration(2000)
    .attr("transform", "translate(" + 0 + "," + 0 + ")");

  d3.csv("./data/Female-Race-vs-Age.csv")
    .then(data => {
      MaleRdata = data;
    })
    .then(drawMaleRdata);
};

ReadMaleAdata = () => {
  wrapper
    .append("svg")
    .attr("id", "MaleASvg")
    .attr("transform", "translate(" + -300 + "," + 0 + ")")
    .attr("width", 800)
    .attr("height", 1050)
    .transition()
    .duration(2000)
    .attr("transform", "translate(" + 0 + "," + 0 + ")");

  d3.csv("./data/Male-Attractiveness-vs-Age.csv")
    .then(data => {
      MaleAdata = data;
    })
    .then(drawMaleAdata);
};

ReadFemaleAdata = () => {
  wrapper
    .append("svg")
    .attr("id", "FemaleASvg")
    .attr("transform", "translate(" + -300 + "," + 0 + ")")
    .attr("width", 800)
    .attr("height", 1050)
    .transition()
    .duration(2000)
    .attr("transform", "translate(" + 0 + "," + 0 + ")");

  d3.csv("./data/Female-Attractiveness-vs-age.csv")
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

normalize = str => {
  let string = str.trim();
  string = string.replace(new RegExp(" ", "g"), "-");

  if (str.includes("/")) {
    string = string.replace(new RegExp("/", "g"), "-");
  }

  if (str.includes(".")) {
    string = string.split(".").join("");
  }
  return string;
};

drawMainSection = (svg, data, keys) => {
  let DataMale = data.filter(obj => {
    return obj.sex === "Male";
  })[0];

  let DataFemale = data.filter(obj => {
    return obj.sex === "Female";
  })[0];

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
      .selectAll("rect#" + normalize(section))
      .data(data)
      .enter()
      .append("rect")
      .on("mouseleave", function(d) {
        rectRegular(this, "vert");
      })
      .on("mouseover", function(d) {
        showStat(
          d3.mouse(this),
          svg,
          totals[d.sex],
          d[section],
          d.sex == "Male" ? " actors" : " actresses"
        );
        rectFocus(this, "vert");
      })
      .attr("y", d => 500)
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
      .selectAll("rect#" + normalize(section))
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
    .on("click", function(d) {
      d3.select(this).on("click", null);
      if (svg == "#MaleVFemaleRSvg") {
        d == "Male" ? toMaleRData(svg) : toFemaleRData(svg);
      } else {
        alert(svg);
        d == "Male" ? toMaleAData(svg) : toFemaleAData(svg);
      }
    })
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
      let self = d3.select(this);
      d3.select(svg)
        .append("text")
        .attr("x", self.attr("x") + 10)
        .attr("y", self.attr("y"))
        .text("Click for break down by age")
        .style("font-size", "46px");

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
    .on("click", function(d) {
      d3.select(this).on("click", null);
      if (svg == "#MaleVFemaleRSvg") {
        d == "Male" ? toMaleRData(svg) : toFemaleRData(svg);
      } else {
        alert(svg);
        d == "Male" ? toMaleAData(svg) : toFemaleAData(svg);
      }
    })
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

function toMaleAData(svg) {
  d3.select(svg)
    .transition()
    .duration(2000)
    .attr("transform", "translate(" + -30 + "," + 0 + ")")
    .transition()
    .duration(2000)
    .attr("transform", "translate(" + 2000 + "," + 0 + ")")
    .remove();

  setTimeout(function() {
    d3.select("#page-header").text(
      "Distribution of Attractiveness Among Actors by Age"
    );
    ReadMaleAdata();
  }, 4000);
}

function toFemaleAData(svg) {
  d3.select(svg)
    .transition()
    .duration(2000)
    .attr("transform", "translate(" + -30 + "," + 0 + ")")
    .transition()
    .duration(2000)
    .attr("transform", "translate(" + 2000 + "," + 0 + ")")
    .remove();

  console.log(d3.select("#page-header").style("font-size"));

  d3.select("#page-header")
    .transition()
    .duration(1000)
    .style("color", "white")
    .style("font-size", "4px")
    .transition()
    .duration(5000)
    .text("Distribution of attractiveness Among Actresses by Age")
    .style("font-size", "32px")
    .style("color", "black");

  setTimeout(function() {
    ReadFemaleAdata();
  }, 4000);
}

function toMaleRData(svg) {
  d3.select(svg)
    .transition()
    .duration(2000)
    .attr("transform", "translate(" + -30 + "," + 0 + ")")
    .transition()
    .duration(2000)
    .attr("transform", "translate(" + 2000 + "," + 0 + ")")
    .remove();

  setTimeout(function() {
    d3.select("#page-header").text("Distribution of Race Among Actors by Age");
    ReadMaleRdata();
  }, 4000);
}

function toFemaleRData(svg) {
  d3.select(svg)
    .transition()
    .duration(2000)
    .attr("transform", "translate(" + -30 + "," + 0 + ")")
    .transition()
    .duration(2000)
    .attr("transform", "translate(" + 2000 + "," + 0 + ")")
    .remove();

  console.log(d3.select("#page-header").style("font-size"));

  d3.select("#page-header")
    .transition()
    .duration(1000)
    .style("color", "white")
    .style("font-size", "4px")
    .transition()
    .duration(5000)
    .text("Distribution of Race Among Actresses by Age")
    .style("font-size", "32px")
    .style("color", "black");

  setTimeout(function() {
    ReadFemaleRdata();
  }, 4000);
}

function showStat(position, svg, total, section, sex) {
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
    .text(section + " out of " + total + sex)
    .style("color", "red")
    .style("font-size", "14px");
}
function rectFocus(element, orient) {
  d3.select(element)
    .transition()
    .duration(500)
    .attr(orient == "vert" ? "width" : "height", 17)
    .style("stroke-width", 6)
    .style("opacity", 0.4)
    .style("stroke", "gray");
}

function rectRegular(element, orient) {
  d3.select(element)
    .transition()
    .duration(500)
    .attr(orient == "vert" ? "width" : "height", 15)
    .style("stroke-width", 0)
    .style("opacity", 1)
    .style("stroke", null);

  d3.select("g").remove();
}

drawSubSection = (svg, data, section, offsetY, sex) => {
  let values = [];
  data.forEach(obj => {
    for (key in obj) {
      if (key != "age") values.push(obj[key]);
    }
  });
  total = values.reduce((a, b) => parseInt(a) + parseInt(b));

  let scale = d3
    .scaleLinear()
    .domain(d3.extent(values.map(Number)))
    .range([0, 300]);

  d3.select(svg)
    .selectAll("rect#" + normalize(section))
    .data(data)
    .enter()
    .append("rect")
    .on("mouseleave", function(d) {
      rectRegular(this, "horiz");
    })
    .on("mouseover", function(d) {
      showStat(
        d3.mouse(this),
        svg,
        total,
        d[section],
        sex == "Male" ? " actors" : " actresses"
      );
      rectFocus(this, "horiz");
    })
    .transition("init0")
    .duration(500)
    .call(() => console.log(section))
    .attr("x", 300)
    .attr("y", (d, i) => offsetY + i * 20)
    .transition("init1")
    .duration(4000)
    .attr("height", 15)
    .attr("width", d => scale(parseInt(d[section])))
    .style("fill", svg.includes("Female") ? "orange" : "red");

  d3.select(svg)
    .selectAll("rect#" + normalize(section))
    .data(data)
    .enter()
    .append("rect")
    .attr("x", 300)
    .attr("y", (d, i) => offsetY + i * 20)
    .attr("height", 15)
    .attr("width", 1)
    .style("fill", "black");

  d3.select(svg)
    .selectAll("text#" + normalize(section))
    .data(data)
    .enter()
    .append("text")
    .attr("x", 170)
    .attr("y", offsetY)
    .style("font-size", "4px")
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

drawRaceGenderAgeData = () => {
  console.log(RaceGenderAgeData);
  drawMainSection("#MaleVFemaleRSvg", RaceGenderAgeData, [
    "White",
    "African American/Black",
    "Hispanic/Latino",
    "Asian",
    "Non U.S. Nationality",
    "Middle Eastern",
    "Other",
    "Indian",
    "Multiracial",
    "Native American/American Indian/Alaskan Native"
  ]);
};

loopDraw = (svg, section, offsetY, timeout, data, sex) => {
  setTimeout(function() {
    drawSubSection(svg, data, section, offsetY, sex);
  }, timeout);
};

drawMaleRdata = () => {
  console.log(MaleRdata);
  keys = [
    "White",
    "African American/Black",
    "Hispanic/Latino",
    "Asian",
    "Non U.S. Nationality",
    "Middle Eastern",
    "Other",
    "Indian",
    "Multiracial",
    "Native American/American Indian/Alaskan Native"
  ];
  let offsetY = 0;
  let timeout = 2000;
  let diff = 2000;
  keys.forEach(section => {
    loopDraw("#MaleRSvg", section, offsetY, timeout, MaleRdata, "Male");
    diff -= diff * 0.2;
    timeout += diff;
    offsetY += 210;
  });
};

drawFemaleRdata = () => {
  console.log(MaleRdata);
  keys = [
    "White",
    "African American/Black",
    "Hispanic/Latino",
    "Asian",
    "Non U.S. Nationality",
    "Middle Eastern",
    "Other",
    "Indian",
    "Multiracial",
    "Native American/American Indian/Alaskan Native"
  ];
  let offsetY = 0;
  let timeout = 2000;
  let diff = 2000;
  keys.forEach(section => {
    loopDraw("#FemaleRSvg", section, offsetY, timeout, FemaleRdata, "Female");
    diff -= diff * 0.2;
    timeout += diff;
    offsetY += 210;
  });
};

drawMaleVFemaleData = () => {
  console.log(MaleVFemaleData);
  drawMainSection("#MaleVFemaleASvg", MaleVFemaleData, [
    "attractive",
    "average/attractive",
    "average",
    "unattractive/average",
    "unattractive"
  ]);
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
