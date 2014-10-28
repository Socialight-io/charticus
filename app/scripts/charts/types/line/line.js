Charts.line = function (data, options) { 

	// Gets the basics out of the way

	var self = new Charts.base(data, options);

    options = _.extend(self.defaults, (options || {}));

    // Declare Draw Function

    self.coords = function () { 

        if (self.options.timeseries == true) { 
            self.x = d3.time.scale().range([0, self.width]);

            if (self.options.axis.x.extent) { 
                var extent = self.options.axis.x.extent;
            } else {
                var extent = d3.extent(data, function(d) {
                   return self.access(self.options.axis.x.label, d);
                });
            }

            self.x.domain(extent);

        } else { 
            self.x = d3.scale.ordinal()
                .rangePoints([0, self.width], .1)
                .domain(self.data.map(function (d) { return self.access(self.options.axis.x.label, d); }));
        }

        var ymax = d3.max(self.options.stack, function(d) { 
                return d3.max(self.data, function (e) { return self.access(d.key, e); }); 
            });

        self.y = d3.scale.linear()
            .rangeRound([self.height, 0])
            .domain([0 - (ymax * .05), ymax]);
    }



	self.draw = function () { 

        self.svg.attr("class", "chart line");

        if (self.options && self.options.stack) {

            var markers = [];
            self.options.stack.forEach(function(stack, i) {

                var lineData = self.data.map(function (d) { 
                    return {
                        x: self.access(self.options.axis.x.label, d),
                        y: self.access(stack.key, d),
                        label: self.access(stack.label, d)
                    }
                });

                if (self.options.area) { 
                   self.line = d3.svg.area().interpolate(self.options.interpolate || "cardinal")
                        .x(function(d) {
                            return self.x(d.x);
                        })
                        .y0(self.options.height - self.options.margin.bottom - self.options.margin.top)
                        .y1(function(d) {
                            return self.y(d.y);
                        });
                   var lineClass = "area";
                } else { 
                   self.line = d3.svg.line().interpolate(self.options.interpolate || "cardinal")
                        .x(function(d) {
                            return self.x(d.x);
                        })
                        .y(function(d) {
                            return self.y(d.y);
                        });

                   var lineClass = "line";
                }

                if (!self.options.timeseries) {
                    var vx = self.x(self.access(self.options.axis.x.label, self.data[1]))/2;
                } else { 

                    if (self.options.axis.x.extent) { 
                        var extent = self.options.axis.x.extent;
                    } else { 
                        var extent = d3.extent(data, function(d) {
                           return self.access(self.options.axis.x.label, d);
                        });
                    }

                    var range = d3.time.day.range(extent[0], extent[1]);

                    if (self.options.axis.x.fill == true) { 
                        range.forEach(function (e) { 
                            var d = range[d];
                            var n = 0; 
                            lineData.forEach(function (d) { 
                                if (d.x.toISOString().substr(0, 10) == e.toISOString().substr(0, 10)) { 
                                    n++;
                                }
                            }); 
                            if (n == 0) { 
                                lineData.push({
                                    x: new Date(e.toISOString().substr(0, 10)),
                                    y: 0,
                                    label: null
                                });
                            }
                        });
                    }

                    lineData = lineData.sort(function (d, e) { 
                        return d.x - e.x;
                    });

                    var vx = 0;  
                }

                var g = self.svg.append("g")
                    .attr("class", "line-obj");

                var line = g.append("path")
                    // .attr("transform", "translate(" + vx + ", 0)")
                    .attr("class", lineClass)
                    .attr("d", self.line(lineData))
                    .style("stroke", function (d) { return self.access(stack.color, d); })
                    .style("fill", function (d) { return self.access(stack.color, d); });


                if (self.options.marker) { 
                    var marker = g.selectAll('.marker')
                      .data(lineData)
                      .enter().append("g")
                      .attr("class", "marker")

                    marker.append("circle")
                      .attr("cx", function (d) { return self.x(d.x); })
                      .attr("cy", function (d) { return self.y(d.y); })
                      .attr('r', function (d) { return self.access(stack.marker, d) || 4; })
                      .style('fill', function (d) { return self.access(stack.color, d); })
                      .style('stroke', function (d) { return self.access(stack.color, d); })
                      .attr("class", "labelled")
                      .attr("title", function(d, i) { return d.label; });

                    markers.push(marker[0]);
                }
            });
        }
	}



    if (self.options.create == true) { 
        self.create();  
    }

    return self;
};