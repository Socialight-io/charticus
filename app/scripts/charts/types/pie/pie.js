Charts.pie = function (data, options) { 

	// Gets the basics out of the way

    options = _.extend(self.defaults, { 
        // Chart Defaults
    }, options || {});

	var self = new Charts.base(data, options);

    // Declare Draw Function

	self.draw = function () { 
        var radius = Math.min(self.width, self.height) / 2;

        var color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var arc = d3.svg.arc()
            .outerRadius(radius * self.options.radius)
            .innerRadius(radius * self.options.innerRadius);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function (d) { return self.access(self.options.stack[0].key, d); });

        self.svg.attr("transform", "translate(" + (self.width / 2) + "," + (self.height / 2) + ")");

        var g = self.svg.selectAll(".arc")
            .data(pie(self.data))
            .enter().append("g")
            .attr("class", "chart-unit labelled")

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return d.data.color; });

        g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .attr("class", "label")
            .style("text-anchor", "middle")
            .text(function(d) { return self.access(self.options.stack[0].label, d); });

	}

    self.create = function () {
        self.setup();
        self.draw();
    }

    if (self.options.create == true) { 
        self.create();  
    }

    return self;
};