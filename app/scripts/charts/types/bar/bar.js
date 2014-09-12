Charts.bar = function (data, options) { 

	// Gets the basics out of the way
	var self = new Charts.base(data, options);

	self.draw = function () { 

        var bar = self.svg.selectAll(".state")
            .data(data)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function(d, i) {
                return "translate(0," + self.y(self.access(self.options.axis.y.label, d)) + ")";
            });

        bar.selectAll("rect")
            .data(function(d) {
                return d.values;
            })
            .enter().append("rect")
            .attr("height", self.y.rangeBand())
            .attr("x", function(d) {
                return self.x(d.y0);
            })
            .attr("width", function(d) {
                return self.x(d.y1) - self.x(d.y0);
            })
            .style("fill", function(d) {
                return d.color;
            });
	}

    self.create = function () {

        self.setup();
        self.process();

        self.coords();
        self.draw();
        self.axis();
        self.legend();
    }

    self.create();
};