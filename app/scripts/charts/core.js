var Charts = new function () { 

	this.base = function (data, options) { 

		var self = {};
		self.data = data;

		// Methods
		self.draw = function () { }
		self.tooltips = function () { }
		self.labels = function () { }
		self.axes = function () { }

		// Helpers
		self.access = function (accessor, data) { 
			if (typeof(data) == "Array") {
				if (typeof(accessor) == "function") { 
					return d3.map(data, accessor);
				} else { 
					return d3.map(data, function (d) { return d[accessor]; });
				}
			} else { 
				return typeof(accessor) == "function" ? accessor(data) : data[accessor];
			}
		}

	        // Allow for advanced sorting using accessors

	    self.sort = function () { 
	        if (self.options.sort && typeof(self.options.sort) == "function") {
	            self.data = self.data.sort(self.options.sort);
	        } else if (self.options.sort) {
	            self.data.sort(function(a, b) {
	                if (self.options.sort == "desc") {
	                    return b.total - a.total;
	                } else {
	                    return a.total - b.total;
	                }
	            });
	        }
	    }

	    self.offset = function () {

	        // Allow offsets and limits
	        
	        if (self.options.limit && typeof(self.data.slice) == "function") {
	            self.data = self.data.slice(0, self.options.limit);
	        }
	        return self.data;
		}

		self.coords = function () { 
	        self.y = d3.scale.ordinal()
	            .rangeRoundBands([self.options.margin.top, self.height], .1)
	            .domain(self.data.map(function (d) { return self.access(self.options.axis.y.label, d); }));

	        self.x = d3.scale.linear()
	            .rangeRound([self.width, 0])
	            .domain([d3.max(self.data, function(d) { return d.total; }), 0]);
		}
		
		self.legend = function () { 
	        if (self.options.legend) {
	            var legend = self.svg.selectAll(".legend")
	                .data(self.options.stack)
	                .enter().append("g")
	                .attr("class", "legend")
	                .attr("transform", function(d, i) {
	                    return "translate(-20," + i * 20 + ")";
	                });

	            legend.append("rect")
	                .attr("x", self.width - 18)
	                .attr("width", 18)
	                .attr("height", 18)
	                .style("fill", function(d) {
	                    return self.access(d.color, d);
	                });

	            legend.append("text")
	                .attr("x", self.width - 24)
	                .attr("y", 9)
	                .attr("dy", ".35em")
	                .style("text-anchor", "end")
	                .text(function(d) {
	                    return d.legend;
	                });
	        }
		}

		self.axis = function () {

	        self.yAxis = d3.svg.axis()
	            .scale(self.y)
	            .orient("left");

	        self.xAxis = d3.svg.axis()
	            .scale(self.x)
	            .orient("bottom")
	            // .tickFormat(d3.format(".2s"));

	        if (self.options.axis.x.show) {
	            self.svg.append("g")
	                .attr("class", "x axis")
	                .attr("transform", "translate(0," + self.height + ")")
	                .call(self.xAxis);
	        }

	        if (self.options.axis.y.show) {
	            var yaxis = self.svg.append("g")
	                .attr("class", "y axis")
	                .call(self.yAxis)
	                .append("text")
	                .attr("transform", "rotate(-90)")
	                .attr("y", 6)
	                .attr("dy", ".71em")
	                .style("text-anchor", "end");
	        }
		}

		// Init
		self.setup = function (resize) {

			// Grab the dom object or fail
			if (self.options.dom) { 
				self.element = $(self.options.dom);
				self.element.children("svg").remove();
			} else { return false; }

			// Calculate the width and height of the chart
			if (self.options.width && !resize) {
				self.width = self.options.width - (self.options.margin.left + self.options.margin.right);
			} else {
				self.options.width = self.element.width();
				self.width = self.element.width() - (self.options.margin.left + self.options.margin.right);
			}

			if (self.options.height) {
				self.height = self.options.height - (self.options.margin.left + self.options.margin.right);
			} else {
				self.options.height = self.element.height();
				self.height = self.element.height() - (self.options.margin.left + self.options.margin.right);
			}

			self.element = d3.selectAll(self.options.dom);

	        self.svg = self.element.append("svg")
	            .attr("width", self.width + self.options.margin.left + self.options.margin.right)
	            .attr("height", self.height + self.options.margin.top + self.options.margin.bottom)
	            .append("g")
	            .attr("class", "chart")
	            .attr("transform", "translate(" + self.options.margin.left + "," + self.options.margin.top + ")");


	        self.sort();
	        self.offset();

	        self.coords();
	        self.axis();
	        self.legend();

			return self.element;
		}

		self.events = function () { 
			self.options.stack.forEach(function (stack, i) { 
				if (stack.click) { 
					self.svg.selectAll(".stack-"+i).on("click", stack.click);
				}
				if (stack.mouseover) { 
					self.svg.selectAll(".stack-"+i).on("mouseenter", stack.mouseover);
				}
				if (stack.mouseout) { 
					self.svg.selectAll(".stack-"+i).on("mouseleave", stack.mouseout);
				}
			});
		}

	    self.update = function (data) { 
	        self.data = data;
	        self.draw();
	    }

	    self.resize = function () { 
	        self.setup(true);
	        self.draw();
	    }

	    self.create = function () {
	        self.setup();
	        self.draw();
	        self.events();
	    }

		self.defaults = {
			create: false,
	        height: false,
	        width: false,
	        margin: {
	            top: 20,
	            right: 20,
	            bottom: 20,
	            left: 20
	        },
	        label: "",
	        stack: [],
	        legend: true,
	        chartLabel: true,
	        axis: {
	            x: {
	                show: true,
	            },
	            y: {
	                show: true,
	            }
	        },
	        limit: false
		};

		// Options
		self.options = _.extend(self.defaults, options || {});

		return self;
	}
}();