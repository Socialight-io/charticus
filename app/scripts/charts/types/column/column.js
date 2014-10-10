Charts.column = function (data, options) { 

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

            self.x = d3.scale.ordinal()
                .rangeRoundBands([0, self.width], .1)
                .domain(self.data.map(function (d) { return self.access(self.options.axis.x.label, d); }));
        }

        var ymax = d3.max(self.data, function(d) { 
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
        });

        self.y = d3.scale.linear()
            .rangeRound([self.height, 0])
            .domain([0, ymax]);
    }

	self.draw = function () { 

        self.svg.attr("class", "column chart");
        
        var bar = self.svg.selectAll(".bar")
            .data(self.data)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d, i) {
                return "translate(" + self.x(self.access(self.options.axis.x.label, d)) + ", 0)";
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
            });

        segment.transition()
            .duration(750)
            .style("fill-opacity", 1e-6);

        segment.enter().append("g")
            .attr("class", function (d, i) { return "segment labelled stack-"+i; })
            .attr("title", function (d) { return d.label; })
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
            .attr("width", self.x.rangeBand())
            .attr("height", function(d) {
                return self.y(d.y0) - self.y(d.y1);
            })
            .attr("y", function(d) {
                return self.y(d.y1);
            })
            .style("fill", function (d) { 
                return self.access("color", d); 
            });
	}

    if (self.options.create == true) { 
        self.create();  
    }

    return self;
};