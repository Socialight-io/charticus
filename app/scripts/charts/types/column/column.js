Charts.column = function (data, options) { 

	// Gets the basics out of the way
	var self = new Charts.base(data, options);

    self.coords = function () { 
        self.x = d3.scale.ordinal()
            .rangeRoundBands([0, self.width], .1)
            .domain(self.data.map(function (d) { return self.access(self.options.axis.x.label, d); }));

        self.y = d3.scale.linear()
            .rangeRound([self.height, 0])
            .domain([d3.max(self.data, function(d) { return d.total; }), 0]);
    }

	self.draw = function () { 

        var bar = self.svg.selectAll(".bar")
            .data(self.data)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function(d, i) {
                var yv = self.height - self.y(d.total);
                return "translate(" + self.x(self.access(self.options.axis.x.label, d)) + ", "+yv+")";
            });

        bar.selectAll("rect")
            .data(function(d) { return d.values; })
            .enter().append("rect")
            .attr("width", self.x.rangeBand())
            .attr("y", function(d) { return self.y(d.y0); })
            .attr("height", function(d) { return self.y(d.y1) - self.y(d.y0); })
            .style("fill", function(d) { return d.color; })

        bar.selectAll("text")
            .data(function(d) { return d.values; })
            .enter().append("text")
            .attr("y", function(d) { return self.y(d.y0)+14; })
            .attr("x", 6)
            .attr("class", "label")
            .style("text-anchor", "left")
            .text(function(d, i) { console.log(d); return self.access(self.options.stack[i].label, d); });

	}


    self.create = function () {

        self.setup();
        self.process();

        self.coords();
        self.draw();
        self.axis();
        self.legend();
    }

    if (self.options.create == true) { 
        self.create();  
    }

    return self;
};