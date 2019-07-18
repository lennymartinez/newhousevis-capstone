d3.json("winning_drivers.json", (data) => {
	var dataset = {"children": data}
	var diameter = 600;
	var color = d3.scaleOrdinal(d3.schemeCategory20);

	var bubble = d3.pack(dataset)
					.size([diameter, diameter])
					.padding(1.5);

	var svg = d3.select("body")
		.append("svg")
		.attr("width", diameter)
		.attr("height", diameter)
		.attr("class", "bubble");

	var nodes = d3.hierarchy(dataset)
		.sum(d=> d.Count);

	var node = svg.selectAll(".node")
		.data(bubble(nodes).descendants())
		.enter()
		.filter(d => !d.children)
		.append("g")
		.attr("class", "node")
		.attr("transform", d => "translate(" + d.x + "," + d.y + ")");

	node.append("title")
		.text(d => d.Name + ": " + d.Count);

	node.append("circle")
		.attr("r", d => d.r)
		.style("fill", (d,i) => color(i));

	node.append("text")
		.attr("dy", ".2em")
		.style("text-anchor", "middle")
		.text(d => d.data.Name)
		.attr("font-family", "sans-serif")
		.attr("font-size", d => d.r/5)
		.attr("fill", "white");

	node.append("text")
		.attr("dy", "1.3em")
		.style("text-anchor", "middle")
		.text(d => d.data.Count)
		.attr("font-family", "sans-serif")
		.attr("font-size", d => d.r/5)
		.attr("fill", "white");

	d3.select(self.frameElement)
		.style("height", diameter + "px");
})