Charts.bar = function (data, options) { 

	// Gets the basics out of the way
    var self = new Charts.base(data, {
        // Chart Defaults
    });

    self.options = _.extend(self.options, options || {});

    self.coords = function () { 

        if (self.options.timeseries == true) { 
            self.x = d3.time.scale().range([0, self.width]);

            if (self.options.axis.x.extent) { 
                var extent = self.options.axis.x.extent;
            } else {
                var extent = d3.extent(self.data, function(d) {
                   return self.access(self.options.axis.x.label, d);
                });
            }

            self.x.domain(extent);

        } else { 

            self.y = d3.scale.ordinal()
                .rangeBands([0, self.height], .1)
                .domain(self.data.map(function (d) { return self.access(self.options.axis.y.label, d); }));
        }

        self.x = d3.scale.linear()
            .rangeRound([0, self.width])
            .domain([0, d3.max(self.data, function(d) { 
               var y0 = 0;
               self.options.stack.forEach(function (s) { 

                    var m = d;
                    m.label = self.access(s.label, d);
                    m.key = self.access(s.key, d);
                    m.color = self.access(s.color, d);

                    m.y0 = y0;
                    m.y1 = y0 + m.key;

                    y0 = m.y1;

                    return y0;
                });
               return y0;
            })]);
    }

	self.draw = function () { 

        var bar = self.svg.selectAll(".bar")
            .data(self.data)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d, i) {
                return "translate(0," + self.y(self.access(self.options.axis.y.label, d)) + ")";
            });

        var segment = bar.selectAll(".segment")
            .data(function(d) {
                var y0 = 0;
                var m = [];
                var arr = [];

                self.options.stack.forEach(function (s, i) { 

                    var m = {
                        data: d,
                        label: self.access(s.label, d),
                        key: self.access(s.key, d),
                        color: self.access(s.color, d),
                        y0: y0
                    };
                    
                    m.y1 = y0 + m.key;
                    y0 = m.y1

                    if (m.y1 > m.y0) { arr.push(m); }
                });

                return arr;
            })

        segment.transition()
            .duration(750)
            .style("fill-opacity", 1e-6);

        segment.enter().append("g")
            .attr("class", function (d, i) { return "segment stack-"+i; })
            .attr("data-label", function (d) { return d.label; })
            .style("fill-opacity", 1e-6)
            .transition()
                .duration(750)
                .style("fill-opacity", 1);

        segment.exit()
            .attr("class", "exit")
            .transition()
                .duration(750)
                .style("fill-opacity", 1e-6)
                .remove();

        segment.append("rect")
            .attr("class", "poly")
            .attr("height", self.y.rangeBand())
            .attr("width", function(d) {
                return self.x(d.y1) - self.x(d.y0);
            })
            .attr("x", function(d) {
                return self.x(d.y0);
            })
            .style("fill", function(d) {
                return d.color; 
            });

        var label = segment.append("g")
            .attr("class", "label")
            .attr("x", function(d) { return self.x(d.y0)+4; })
            .attr("y", function (d, i) { return (i * 10) + 10; })
            .style("text-anchor", "left")
            .text(function(d, i) { return d.label; });

        label.append("rect")
            .attr("class", "label-background")
            .attr("x", function(d) { return self.x(d.y0)+4; })
            .attr("y", function (d, i) { return (i * 10) + 10; })
            .attr("width", 100)
            .attr("height", 20)
            .fill("#FFFFFF");

        label.append("text")
            .attr("class", "label-text")
            .attr("x", function(d) { return 4; })
            .attr("y", function (d, i) { return 4; })
            .style("text-anchor", "left")
            .text(function(d, i) { return d.label; });
	}

    if (self.options.create == true) { 
        self.create();  
    }

    return self;
};