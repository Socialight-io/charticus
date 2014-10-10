Charts.pie = function (data, options) { 

	// Gets the basics out of the way

    var self = new Charts.base(data, options);

    options = _.extend(self.defaults, { 
        // Chart Defaults
    }, options || {});

    // Declare Draw Function

	self.draw = function () { 

        self.svg.attr("class", "pie chart");

        var radius = Math.min(self.width, self.height) / 2;

        var color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var arc = d3.svg.arc()
            .outerRadius(radius * (self.options.radius || 1))
            .innerRadius(radius * (self.options.innerRadius || .5));

        var pie = d3.layout.pie()
            .sort(null)
            .value(function (d) { return self.access(self.options.stack[0].key, d); });

        self.svg.attr("transform", "translate(" + (self.width / 2) + "," + (self.height / 2) + ")");

        var g = self.svg.selectAll(".arc")
            .data(pie(self.data))
            .enter().append("g")
            .attr("class", "chart-unit");

        g.append("path")
            .attr("d", arc)
            .attr("class", "labelled")
            .style("fill", function(d) { return self.access(self.options.stack[0].color, d); })
            .attr("title", function(d) { return self.access(self.options.stack[0].label, d); });

	}

    if (self.options.create == true) { 
        self.create();  
    }

    return self;
};