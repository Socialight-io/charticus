Charts.line = function (data, options) { 

	// Gets the basics out of the way
	var self = new Charts.base(data, options);



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

        self.y = d3.scale.linear()
            .rangeRound([self.height, 0])
            .domain([0, d3.max(self.data, function(d) { return d.total; })]);
    }



	self.draw = function () { 

        if (self.options && self.options.stack) {

            var markers = [];
            self.options.stack.forEach(function(stack, i) {

               self.line = d3.svg.line().interpolate(self.options.interpolate || "cardinal")
                    .x(function(d) {
                        return self.x(self.access(self.options.axis.x.label, d));
                    }).y(function(d) {
                        return self.y(self.access(stack.key, d.label));
                    });

                if (!self.options.timerseries) {
                    var vx = self.x(self.access(self.options.axis.x.label, self.data[1]))/2
                } else { var vx = 0; }

                var g = self.svg.append("g")
                    .attr("class", "line-obj");

                var line = g.append("path")
                    // .attr("transform", "translate(" + vx + ", 0)")
                    .attr("class", "line")
                    .attr("d", self.line(self.data))
                    .style("fill", "none")
                    .style("stroke", stack.color)
                    .style("stroke-width", 1);

                var marker = g.selectAll('circle')
                  .data(self.data)
                  .enter().append("circle")
                  .attr("cx", function (d) { return self.x(self.access(self.options.axis.x.label, d)); })
                  .attr("cy", function (d) { return self.y(self.access(stack.key, d.label)); })
                  .attr('r', 3)
                  .style('fill', '#666')
                  .style('pointer-events', 'none')

                var label = g.selectAll('text')
                  .data(self.data)
                  .enter().append("text")
                    .attr("x", function (d) { return self.x(self.access(self.options.axis.x.label, d)); })
                    .attr("y", function (d) { return self.y(self.access(stack.key, d.label)); })
                    .attr("class", "label")
                    .style("text-anchor", "left")
                    .text(function(d, i) { return self.access(stack.label, d.label); });

                markers.push(marker[0]);
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