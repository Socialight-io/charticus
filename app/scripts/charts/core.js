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

		self.process = function (data) { 
	        
	        self.data.forEach(function(d, i) {

	        	var y0 = 0;
	        	if (!self.data[i].label) { 

		            self.data[i] = {
		                label: d
		            };

		            if (self.options.stack) {

		                self.options.stack.forEach(function(v) {

		                    self.data[i].values = self.data[i].values || [];

		                    var value = { label: v.label, color: v.color, value: self.access(v.key, d), data: d };
		                    
		                    value.y0 = y0;
		                    value.y1 = y0 += self.access(v.key, d);

		                    self.data[i].values.push(value);
		                });

		            } else { 
		            	console.log("No stack specified");
		            	return false;
		            }

		            if (self.data[i].values && self.data[i].values.length) {
		                self.data[i].total = self.data[i].values[self.data[i].values.length - 1].y1;
		            } else {
		                self.data[i].total = 0;
		            }
	        	}

	        });

	        // Allow for advanced sorting using accessors

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
	                    return d.color;
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
		self.setup = function () {

			// Grab the dom object or fail
			if (self.options.dom) { 
				self.element = $(self.options.dom);
				self.element.children("svg").remove();
			} else { return false; }

			// Calculate the width and height of the chart
			if (self.options.width) {
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

			self.element.css({
				width: self.options.width,
				height: self.options.height
			});

			self.element = d3.selectAll(self.options.dom);

	        self.svg = self.element.append("svg")
	            .attr("width", self.width + self.options.margin.left + self.options.margin.right)
	            .attr("height", self.height + self.options.margin.top + self.options.margin.bottom)
	            .append("g")
	            .attr("class", "holder")
	            .attr("transform", "translate(" + self.options.margin.left + "," + self.options.margin.top + ")");

			return self.element;
		}

		self.update = function () { }
		self.resize = function () { }

		self.defaults = {
			dom: "#options",
			create: true, // If this option is true, the chart is created on init
	        height: 400,
	        width: false,
	        margin: {
	            top: 20,
	            right: 20,
	            bottom: 20,
	            left: 40
	        },
	        label: function (d) { return d.label; },
	        stack: [{
	            key: "count",
	            label: "Count",
	            color: "#006699"
	        }, {
	            key: "likes",
	            label: "Comments",
	            color: "#996600"
	        }, {
	            key: "comments",
	            label: "Likes",
	            color: "#FF0099"
	        }],
	        legend: true,
	        chartLabel: false,
	        axis: {
	            x: {
	                show: true,
	                label: function (d) { return String(d.label._id.created.year); }
	            },
	            y: {
	                show: true,
	                label: function (d) { return String(d.label._id.created.year); }
	            }
	        },
	        sort: function (d, e) { return e.label._id.created.year - d.label._id.created.year; },
	        limit: false
		};

		// Options
		self.options = _.extend(self.defaults, options);

		return self;
	}
}();