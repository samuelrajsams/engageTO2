(function (angular) {

    'use strict';

    angular
            .module('notification')
            .controller('NewPushNotificationController', newPushNotificationController);

    newPushNotificationController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService',
        'NotificationService',
        'SigninModalService',
        '$localStorage',
        '$state'
    ];

    function newPushNotificationController(
            $scope,
            $rootScope,
            AuthService,
            NotificationService,
            SigninModalService,
            $localStorage,
            $state) {
        console.log('NewPushNotificationController');
        //active notification dashboard
        $rootScope.engagetoApp.setting.active = 'notification';
        $rootScope.engagetoApp.isPageLoading = false;
        $scope.notification = {
            date: {startDate: new Date(), endDate: new Date().setDate(new Date().getDate() + 30)},
            options: {
                applyClass: 'btn-apply',
                locale: {
                    applyLabel: "Apply",
                    fromLabel: "From",
                    format: "YYYY-MM-DD", //will give you 2017-01-06
                    //format: "D-MMM-YY", //will give you 6-Jan-17
                    //format: "D-MMMM-YY", //will give you 6-January-17
                    toLabel: "To",
                    cancelLabel: 'Cancel',
                    customRangeLabel: 'Custom range'
                },
                ranges: {
                    'Yesterday': [moment().subtract(1, 'days'), moment()],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().subtract(29, 'days'), moment()],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
            }
        };

        // getting subscriber details
        NotificationService.getSubscriberDetails().then(function (response) {
            $scope.totalSubscriber = response.data.data.total_subcribers;
            $scope.activeSubscriber = response.data.data.active_subcribers;
            devicePie('chart7',response.data.data.stats.device);
            osPie('chart5',response.data.data.stats.os);
            browserPie('chart6',response.data.data.stats.browser);
            worldChart('example5',response.data.data.stats.country)
        }, function (error) {
            console.log(error);
            if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                AuthService.revokeAuth();
                $rootScope.engagetoApp.isAuthenticatedUser = false;
                $state.go('landing');
            }
        });
        
         NotificationService.getAllNotificationDetails().then(function (response) {
            $scope.totalNotificationSent = response.data.data.total_sent_notifications;
            $scope.totalClickCount= response.data.data.total_click_count;
            $scope.totalViewCount=response.data.data.total_view_count;
            devicePie('chart3',response.data.data.view_insight.device);
            osPie('chart2',response.data.data.view_insight.os);
            browserPie('chart1',response.data.data.view_insight.browser);
            worldChart('example4',response.data.data.view_insight.country);
        }, function (error) {
            console.log(error);
            if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                AuthService.revokeAuth();
                $rootScope.engagetoApp.isAuthenticatedUser = false;
                $state.go('landing');
            }
        });

        //----------------------DEVICE-PIE-START-------------------------------------

        function devicePie(id,response) {
            response = {device: response};
            JSON.stringify(response)
            $.each(response, function (key, value) {
                var pie = d3.layout.pie()
                        .value(function (d) {
                            return d.percent
                        })
                        .sort(null)
                        .padAngle(.03);

                var w = 300, h = 220,divider=1.5;
                if(id=='chart7')
                    divider=2;
                    

                var outerRadius = w / 3;
                var innerRadius = 60;

                var color = d3.scale.category10();

                var arc = d3.svg.arc()
                        .outerRadius(outerRadius)
                        .innerRadius(innerRadius);

                var svg = d3.select("#"+id)
                        .append("svg")
                        .attr('width', w)
                        .attr('height', h)
                        .append('g')
                        .attr('transform', 'translate(' + (w / divider) + ',' + (h / 2) + ')');

                var path = svg.selectAll('path')
                        .data(pie(value))
                        .enter()
                        .append('path')
                        .attr('d', arc)
                        // d: arc,
                        .attr('fill', function (d, i) {
                            return color(capitalizeFirstLetter(d.data.name));
                        }
                        );
                function capitalizeFirstLetter(string) {
                    return string.charAt(0).toUpperCase() + (string.slice(1)).toLowerCase();
                }

                path.transition()
                        .duration(1000)
                        .attrTween('d', function (d) {
                            var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                            return function (t) {
                                return arc(interpolate(t));
                            };
                        });


                var restOfTheData = function () {
                    var text = svg.selectAll('text')
                            .data(pie(value))
                            .enter()
                            .append("text")
                            .transition()
                            .duration(200)
                            .attr("transform", function (d) {
                                return "translate(" + arc.centroid(d) + ")";
                            })
                            .attr("dy", ".2em")
                            .attr("text-anchor", "middle")
                            .text(function (d) {
                                return d.data.percent + "%";
                            })
                            .style('fill', '#fff')
                            .style('font-size', '10px');


                    var legendRectSize = 20;
                    var legendSpacing = 5;
                    var legendHeight = legendRectSize + legendSpacing;


                    var legend = svg.selectAll('.legend')
                            .data(color.domain())
                            .enter()
                            .append('g')
                            .attr('class', 'legend')
                            // class: 'legend',
                            .attr("transform", function (d, i) {
                                return "translate(-35," + ((i * legendHeight) - 35) + ")";
                            });

                    legend.append('rect')
                            .attr('width', legendRectSize)
                            .attr('height', legendRectSize)
                            .attr('rx', 20)
                            .attr('ry', 20)
                            .style('fill', color)
                            .style('stroke', color);

                    legend.append('text')
                            .attr('x', 25)
                            .attr('y', 15)
                            .text(function (d) {
                                return d;
                            })
                            .style('fill', 'black')
                            .style('font-size', '14px');
                };
                setTimeout(restOfTheData, 1000);
            });
        }

        //----------------------DEVICE-END-------------------------------------
        //----------------------OS-PIE-START-------------------------------------
        function osPie(id,response) {
            response={os:response}
            JSON.stringify(response);
            $.each(response, function (key, value) {
                var pie = d3.layout.pie()
                        .value(function (d) {
                            return d.percent
                        })
                        .sort(null)
                        .padAngle(.03);

                var w = 300, h = 220,divider=1.5;
                if(id=='chart5')
                    divider=2;
                    

                var outerRadius = w / 3;
                var innerRadius = 60;

                var color = d3.scale.category10();

                var arc = d3.svg.arc()
                        .outerRadius(outerRadius)
                        .innerRadius(innerRadius);

                var svg = d3.select("#"+id)
                        .append("svg")
                        .attr('width', w)
                        .attr('height', h)
                        .append('g')
                        .attr('transform', 'translate(' + (w / divider) + ',' + (h / 2) + ')');

                var path = svg.selectAll('path')
                        .data(pie(value))
                        .enter()
                        .append('path')
                        .attr('d', arc)
                        .attr('fill', function (d, i) {
                            return color(capitalizeFirstLetter(d.data.name));
                        }
                        );
                function capitalizeFirstLetter(string) {
                    return string.charAt(0).toUpperCase() + (string.slice(1)).toLowerCase();
                }

                path.transition()
                        .duration(1000)
                        .attrTween('d', function (d) {
                            var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                            return function (t) {
                                return arc(interpolate(t));
                            };
                        });


                var restOfTheData = function () {
                    var text = svg.selectAll('text')
                            .data(pie(value))
                            .enter()
                            .append("text")
                            .transition()
                            .duration(200)
                            .attr("transform", function (d) {
                                return "translate(" + arc.centroid(d) + ")";
                            })
                            .attr("dy", ".2em")
                            .attr("text-anchor", "middle")
                            .text(function (d) {
                                return d.data.percent + "%";
                            })
                            .style('fill', '#fff')
                            .style('font-size', '10px');


                    var legendRectSize = 20;
                    var legendSpacing = 5;
                    var legendHeight = legendRectSize + legendSpacing;


                    var legend = svg.selectAll('.legend')
                            .data(color.domain())
                            .enter()
                            .append('g')
                            .attr('class', 'legend')
                            .attr("transform", function (d, i) {
                                return "translate(-35," + ((i * legendHeight) - 30) + ")";
                            });

                    legend.append('rect')
                            .attr('width', legendRectSize)
                            .attr('height', legendRectSize)
                            .attr('rx', 20)
                            .attr('ry', 20)
                            .style('fill', color)
                            .style('stroke', color);

                    legend.append('text')
                            .attr('x', 25)
                            .attr('y', 15)
                            .text(function (d) {
                                return d;
                            })
                            .style('fill', 'black')
                            .style('font-size', '14px');
                };
                setTimeout(restOfTheData, 1000);
            });
        }

        //----------------------OS-PIE-END-------------------------------------
        //----------------------BROWSER-PIE-START-------------------------------------
         function browserPie(id,response) {
             response={browser:response};
             JSON.stringify(response);
                $.each(response, function (key, value) {

                    var pie = d3.layout.pie()
                            .value(function (d) {
                                return d.percent
                            })
                            .sort(null)
                            .padAngle(.03);

                    var w = 300, h = 220,divider=1.5;
                if(id=='chart6')
                    divider=2;

                    var outerRadius = w / 3;
                    var innerRadius = 60;

                    var color = d3.scale.category10();

                    var arc = d3.svg.arc()
                            .outerRadius(outerRadius)
                            .innerRadius(innerRadius);

                    var svg = d3.select("#"+id)
                            .append("svg")
                            .attr('width', w)
                            .attr('height', h)
                            .append('g')
                            .attr('transform', 'translate(' + (w / divider) + ',' + (h / 2) + ')');

                    var path = svg.selectAll('path')
                            .data(pie(value))
                            .enter()
                            .append('path')
                            .attr('d', arc)
                            .attr('fill', function (d, i) {
                                return color(capitalizeFirstLetter(d.data.name));
                            }
                            );
                    function capitalizeFirstLetter(string) {
                        return string.charAt(0).toUpperCase() + (string.slice(1)).toLowerCase();
                    }

                    path.transition()
                            .duration(1000)
                            .attrTween('d', function (d) {
                                var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                                return function (t) {
                                    return arc(interpolate(t));
                                };
                            });


                    var restOfTheData = function () {
                        var text = svg.selectAll('text')
                                .data(pie(value))
                                .enter()
                                .append("text")
                                .transition()
                                .duration(200)
                                .attr("transform", function (d) {
                                    return "translate(" + arc.centroid(d) + ")";
                                })
                                .attr("dy", ".2em")
                                .attr("text-anchor", "middle")
                                .text(function (d) {
                                    return d.data.percent + "%";
                                })
                                .style('fill', '#fff')
                                .style('font-size', '10px');


                        var legendRectSize = 20;
                        var legendSpacing = 5;
                        var legendHeight = legendRectSize + legendSpacing;


                        var legend = svg.selectAll('.legend')
                                .data(color.domain())
                                .enter()
                                .append('g')
                                .attr('class', 'legend')
                                .attr("transform", function (d, i) {
                                    return "translate(-35," + ((i * legendHeight) - 35) + ")";
                                });

                        legend.append('rect')
                                .attr('width', legendRectSize)
                                .attr('height', legendRectSize)
                                .attr('rx', 20)
                                .attr('ry', 20)
                                .style('fill', color)
                                .style('stroke', color);

                        legend.append('text')
                                .attr('x', 25)
                                .attr('y', 15)
                                .text(function (d) {
                                    return d;
                                })
                                .style('fill', 'black')
                                .style('font-size', '14px');
                    };
                    setTimeout(restOfTheData, 1000);
                });
            }
        //----------------------BROWSER-PIE-END-------------------------------------
        //----------------------NOTIFICATION-PIE-START-------------------------------------
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "app/shared/data/pieNotification.json",
            success: function (response) {
                $.each(response, function (key, value) {

                    var pie = d3.layout.pie()
                            .value(function (d) {
                                return d.percent
                            })
                            .sort(null)
                            .padAngle(.03);

                    var w = 300, h = 200;

                    var outerRadius = w / 3;
                    var innerRadius = 60;

                    var color = d3.scale.category10();

                    var arc = d3.svg.arc()
                            .outerRadius(outerRadius)
                            .innerRadius(innerRadius);

                    var svg = d3.select("#chart4")
                            .append("svg")
                            .attr('width', w)
                            .attr('height', h)
                            .append('g')
                            .attr('transform', 'translate(' + (w / 1.5) + ',' + (h / 2) + ')');

                    var path = svg.selectAll('path')
                            .data(pie(value))
                            .enter()
                            .append('path')
                            .attr('d', arc)
                            .attr('fill', function (d, i) {
                                return color(capitalizeFirstLetter(d.data.name));
                            }
                            );
                    function capitalizeFirstLetter(string) {
                        return string.charAt(0).toUpperCase() + (string.slice(1)).toLowerCase();
                    }

                    path.transition()
                            .duration(1000)
                            .attrTween('d', function (d) {
                                var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                                return function (t) {
                                    return arc(interpolate(t));
                                };
                            });


                    var restOfTheData = function () {
                        var text = svg.selectAll('text')
                                .data(pie(value))
                                .enter()
                                .append("text")
                                .transition()
                                .duration(200)
                                .attr("transform", function (d) {
                                    return "translate(" + arc.centroid(d) + ")";
                                })
                                .attr("dy", ".2em")
                                .attr("text-anchor", "middle")
                                .text(function (d) {
                                    return d.data.percent + "%";
                                })
                                .style('fill', '#fff')
                                .style('font-size', '10px');


                        var legendRectSize = 20;
                        var legendSpacing = 5;
                        var legendHeight = legendRectSize + legendSpacing;


                        var legend = svg.selectAll('.legend')
                                .data(color.domain())
                                .enter()
                                .append('g')
                                .attr('class', 'legend')
                                .attr("transform", function (d, i) {
                                    return "translate(-45," + ((i * legendHeight) - 35) + ")";
                                });

                        legend.append('rect')
                                .attr('width', legendRectSize)
                                .attr('height', legendRectSize)
                                .attr('rx', 20)
                                .attr('ry', 20)
                                .style('fill', color)
                                .style('stroke', color);

                        legend.append('text')
                                .attr('x', 25)
                                .attr('y', 15)
                                .text(function (d) {
                                    return d;
                                })
                                .style('fill', 'black')
                                .style('font-size', '14px');
                    };
                    setTimeout(restOfTheData, 1000);
                });
            }
        });
        //----------------------NOTIFICATION-PIE-END-------------------------------------
        
        //----------------------WORLD CHART START----------------------------------------
        
        function worldChart(id,countryData){
          var width = 950,
                    height = 400;

            // var legend_labels = ["0", "2"];
            var color4 = d3.scale.category20()

            //  var color = d3.scale.threshold()
            // .domain(color_domain)
            // .range(["#239185", "#D62728", "#FF7F0E", "#1F77B4", "#2CA02C", "#9467BD"]);

            var div = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);

            var svg4 = d3.select("#"+id).append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .append("g")
                    .style("margin", "10px auto");

                       var projection = d3.geo.equirectangular()
                    .center([0, 5])
                    .scale(150)
                    .translate([width / 2, height / 2])
                    .rotate([0, 0])
                    .precision(9);


            var path = d3.geo.path().projection(projection);

            //Reading map file and data

            queue()
                    .defer(d3.json, "app/shared/data/world-110m.json")
                    .defer(d3.tsv, "app/shared/data/world-country-names.tsv")
                    .await(ready);

            //Start of Choropleth drawing

            function ready(error, map,data) {
                var cId  = {};
                var nameById = {};
                data.forEach(function (d) {
                    cId[d.id] = +d.subscribers;
                    nameById[d.id] = d.RegionName;
                });
                angular.forEach(countryData, function (couValue, couKey) {
                    angular.forEach(map.objects.countries.geometries, function (geoValue, geoKey) {
                        if(couValue.name === geoValue.properties.name){
                            geoValue.properties.id = couValue.count;
                        }
                    });
                })
                // 
                //Drawing Choropleth
                svg4.append("g")

                        .attr("class", "region")
                        .selectAll("path")
                        //.data(topojson.object(map, map.objects.russia).geometries)

                        .data(topojson.feature(map, map.objects.countries).features)
                        .enter()
                        .append("path")
                        .attr("d", path)
                        .style("fill", function (d) {
                            return color4(d.id);


                        })
                        .style("opacity", 0.8)

                        //Adding mouseevents
                        .on("mouseover", function (d) {
                            d3.select(this)
                                    .transition()
                                    .duration(300)
                                    .style("opacity", 1);
                            div.transition()
                                    .duration(300)
                                    .style("opacity", 1)

                            // div.text(nameById[d.id])//+""+cId[d.Population] // + " " + cid[d.Population])
                            div.text("Country : " + d.properties.name + " , " + "No.of subscribers :" + d.properties.id)
                                    .style("left", (d3.event.pageX) + "px")
                                    .style("top", (d3.event.pageY - 30) + "px");
                        })
                        .on("mouseout", function () {
                            d3.select(this)
                                    .transition().duration(300)
                                    .style("opacity", 0.8);
                            div.transition().duration(300)
                                    .style("opacity", 0);
                        })

            }// <-- End of Choropleth drawing

            //Adding legend for our Choropleth

            var legend = svg4.selectAll("g.legend")
                    .data(countryData)
                    .enter().append("g")
                    .attr("class", "legend");

            var ls_w = 20, ls_h = 20;

            legend.append("rect")
                    .attr("x", 20)
                    .attr("y", function (d, i) {
                        return height - (i * ls_h) - 2 * ls_h;
                    })
                    .attr("width", ls_w)
                    .attr("height", ls_h)
                    .style("fill", function (d, i) {
                        return color4(d.count);
                    })
                    .style("opacity", 0.8);

            legend.append("text")
                    .attr("x", 50)
                    .attr("y", function (d, i) {
                        return height - (i * ls_h) - ls_h - 4;
                    })
                    .text(function (d, i) {
                        return d.count;
                    });
                }
                    //-----------------------WORLD CHART END-----------------------------
    }
})(window.angular);