var containerArray = ['#chart1', '#chart2', '#chart3', '#chart4', '#chart5', '#chart6', '#chart7', '#chart8', '#chart9']

containerArray.forEach(function (element) {
	donut(element)
});

function donut(container) {
	var width = 300,
		height = 300,
		svg = d3.select(container).append("svg").attr('id', 'donut').attr('width', width).attr('height', height),
		radius = Math.min(width, height) / 2,
		g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var color = d3.scaleOrdinal(["#063e5a", "#1e7798", "#35a7d2", "#9fd8ee"]);

	var pie = d3.pie()
		.sort(null)
		.value(function (d) {
			return d.population;
		});

	var path = d3.arc()
		.outerRadius(radius - 10)
		.innerRadius(100)

	var label = d3.arc()
		.outerRadius(radius - 70)
		.innerRadius(radius - 70);

	d3.csv("data/data.csv", function (d) {
		d.population = +d.population;
		return d;
	}, function (error, data) {
		if (error) throw error;

		var arc = g.selectAll(".arc")
			.data(pie(data))
			.enter().append("g")
			.attr("class", "arc");

		var arcPath = arc.append("path")
			.attr("d", path)
			.attr("fill", function (d) {
				return color(d.data.age);
			});

		var tip = arc.append("text")
			.attr("transform", function (d) {
				return "translate(" + label.centroid(d) + ")";
			})
			.attr("dy", "0.35em")
			.style('fill', 'transparent')
			.text(function (d) {
				return d.data.population + '%';
			});

		var circle = svg.append('circle')
			.attr('cx', 150)
			.attr('cy', 150)
			.attr('r', 90)
			.style('fill', '#e9f4f9')
		var title = svg.append('text')
			.text('Data Culture')
			.attr('x', 150)
			.attr('y', 150)
			.attr('text-anchor', 'middle')
			.style('font-size', 17)
			.style('fill', '#71777a')

		function donutGrow() {
			var path2 = d3.arc()
				.outerRadius(radius - 10)
				.innerRadius(0);

			arcPath.transition()
				.duration(100)
				.attr('d', path2);
			circle.transition()
				.duration(100)
				.attr('r', 0)
			title.transition()
				.duration(100)
				.style('fill', 'transparent')
			tip.transition()
				.duration(100)
				.style('fill', 'white')
		}

		function donutShrink() {
			var path2 = d3.arc()
				.outerRadius(radius - 10)
				.innerRadius(100);

			arcPath.transition()
				.duration(100)
				.attr('d', path2);
			circle.transition()
				.duration(100)
				.attr('r', 90)
			title.transition()
				.duration(100)
				.style('fill', '#71777a')
			tip.transition()
				.duration(100)
				.style('fill', 'transparent')
		}

		svg.append('circle')
			.attr('cx', 150)
			.attr('cy', 150)
			.attr('r', 120)
			.style('cursor', 'pointer')
			.style('fill', 'transparent')
			.on("mouseover", donutGrow)
			.on("mouseout", donutShrink)
	});
}