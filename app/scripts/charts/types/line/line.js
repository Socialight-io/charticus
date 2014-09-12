Charts.line = function (data, options) { 

	// Gets the basics out of the way
	var self = new Charts.base(data, options);

    self.coords = function () { 
        self.x = d3.scale.ordinal()
            .rangeRoundBands([0, self.width], .1)
            .domain(self.data.map(function (d) { return self.access(self.options.axis.x.label, d); }));

        self.y = d3.scale.linear()
            .rangeRound([self.height, 0])
            .domain([0, d3.max(self.data, function(d) { return d.total; })]);
    }

	self.draw = function () { 

        if (self.options && self.options.stack) {
            self.options.stack.forEach(function(stack, i) {
                var line = d3.svg.line().interpolate("cardinal")
                    .x(function(d) {
                        return self.x(self.access(self.options.axis.x.label, d));
                    }).y(function(d) {
                        console.log(self.y(self.access(stack.key, d.label)));
                        return self.y(self.access(stack.key, d.label));
                    });

                self.svg.append("path")
                    .attr("class", "line")
                    .attr("d", line(data))
                    .style("fill", "none")
                    .style("stroke", stack.color)
                    .style("stroke-width", 5);
            });
        }
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