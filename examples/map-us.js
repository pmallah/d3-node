import topojson from "topojson";
import us from "./data/us-states.json" assert { type: "json" };
import { D3Node } from "../src/index.js";
import * as d3 from "d3";

// adapted from: https://bl.ocks.org/mbostock/6406992
var options = {
  svgStyles:
    ".mesh{fill: none;stroke: #333;stroke-width: .5px;stroke-linejoin: round;}",
  d3Module: d3,
};

var d3n = new D3Node(options);

var width = 960,
  height = 500;

var path = d3.geoPath().projection(null);

var svg = d3n
  .createSVG(width, height)
  .append("path")
  .datum(topojson.mesh(us))
  .attr("class", "mesh")
  .attr("d", path);

// create output files
import output from "./lib/output.js";
output("map-us", d3n);
