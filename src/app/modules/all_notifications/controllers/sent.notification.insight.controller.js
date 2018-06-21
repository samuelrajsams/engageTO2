(function (angular) {
    'use strict';

    angular
            .module('allNotifications')
            .controller('SentNotificationInsightController', sentNotificationInsightController);

    sentNotificationInsightController.$inject = [
        '$scope',
        '$rootScope',
        '$state',
        'AllNotificationsService',
        '$stateParams',
        'AuthService',
        'InsightBrowserData',
        'InsightDeviceData',
        'InsightOperatingSystemData',
        'InsightGeoMapData'
    ];

    function sentNotificationInsightController(
            $scope,
            $rootScope,
            $state,
            AllNotificationsService,
            $stateParams,
            AuthService,
            InsightBrowserData,
            InsightDeviceData,
            InsightOperatingSystemData,
            InsightGeoMapData) {
        //active class for allNotification
        $rootScope.engagetoApp.setting.active = 'allNotifications';
        //initializing variables 
        $scope.notificationInsight = {
            image: '',
            title: '',
            message: '',
            url: '',
            cta: [],
            expiry: '',
            scheduled_at: '',
            duration: '',
            noOfSubscribers: 0,
            views: 0,
            clicks: 0,
            ctr: 0,
            noOfCTA1Clicks: 0,
            noOfCTA2Clicks: 0,
            notificationViewType: 'Notification Views Insights',
            browser: {
                isEmpty: false,
                defaultData: InsightBrowserData
            },
            device: {
                isEmpty: false,
                defaultData: InsightDeviceData
            },
            operatingSystem: {
                isEmpty: false,
                defaultData: InsightOperatingSystemData
            },
            geoInsights: {
                isEmpty: false,
                defaultData: InsightGeoMapData
            },
            onChangeInsight: onChangeInsight
        };
        var viewInsightData, clickInsightData;
        AllNotificationsService.getNotificationInsightById($stateParams.notificationId).then(function (response) {
            $scope.notificationInsight.title = response.data.data.title;
            $scope.notificationInsight.message = response.data.data.message;
            $scope.notificationInsight.image = response.data.data.logo;
            $scope.notificationInsight.url = response.data.data.url;
            $scope.notificationInsight.views = response.data.data.views;
            $scope.notificationInsight.clicks = response.data.data.clicks;
            $scope.notificationInsight.noOfCTA1Clicks = response.data.data.cta1_click;
            $scope.notificationInsight.noOfCTA2Clicks = response.data.data.cta2_click;
            $scope.notificationInsight.cta = response.data.data.cta;
            $scope.notificationInsight.expiry = response.data.data.expiry;
            $scope.notificationInsight.noOfSubscribers = response.data.data.total_subscribers;
            $scope.notificationInsight.scheduled_at = new Date(response.data.data.scheduled_at);
            $scope.notificationInsight.ctr = response.data.data.views !== 0 ? (response.data.data.views / response.data.data.clicks) * 100 : 0;
            viewInsightData = response.data.data['view_insight'];
//            response.data.data['click_insight'] ? getChartPlotted(response.data.data['click_insight'], 'click') : '';
            clickInsightData = response.data.data['click_insight'];
            getChartPlotted(response.data.data['view_insight'] || {}, 'view');
        }, function (error) {
            console.log(error);
            //authentication failed
            if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                AuthService.revokeAuth();
                $rootScope.engagetoApp.isAuthenticatedUser = false;
                $state.go('landing');
            }
        });

        /*
         * @author: sandeep
         * @created: 22 may 2017
         * @params: type(string)
         * @return: no
         * @purpose: on change insights
         */
        function onChangeInsight(type) {
            $rootScope.engagetoApp.isPageLoading = true;
            angular.element('#chart1').empty();
            angular.element('#chart2').empty();
            angular.element('#chart3').empty();
            angular.element('#world-map-chart').empty();
            if (type === 'view') {
                getChartPlotted(viewInsightData || {}, 'view');
            } else if (type === 'click') {
                getChartPlotted(clickInsightData || {}, 'click');
            }
        }
        /*
         * @author: shalini
         * @created: 22 may 2017
         * @params: chartData(object), type(string)
         * @return: no
         * @purpose: plotting chart for insights
         */
        function getChartPlotted(chartData, type) {
            var deviceData, countryData, browserData, osData;
            if (!chartData['device']) {
                deviceData = $scope.notificationInsight.device.defaultData;
                $scope.notificationInsight.device.isEmpty = true;
            } else {
                deviceData = chartData['device'];
                $scope.notificationInsight.device.isEmpty = false;
            }
            if (!chartData['country']) {
                countryData = $scope.notificationInsight.geoInsights.defaultData;
                $scope.notificationInsight.geoInsights.isEmpty = true;
            } else {
                countryData = chartData['country'];
                $scope.notificationInsight.geoInsights.isEmpty = false;
            }
            if (!chartData['browser']) {
                browserData = $scope.notificationInsight.browser.defaultData;
                $scope.notificationInsight.browser.isEmpty = true;
            } else {
                browserData = chartData['browser'];
                $scope.notificationInsight.browser.isEmpty = false;
            }
            if (!chartData['os']) {
                osData = $scope.notificationInsight.operatingSystem.defaultData;
                $scope.notificationInsight.operatingSystem.isEmpty = true;
            } else {
                osData = chartData['os'];
                $scope.notificationInsight.operatingSystem.isEmpty = false;
            }
            //----------------------DEVICE-PIE-START-------------------------------------
            var pie = d3.layout.pie()
                    .value(function (d) {
                        return (Math.floor(d.percent*100) / 100)
                    })
                    .sort(null)
                    .padAngle(.03);

            var w = 300, h = 220;

            var outerRadius = w / 3;
            var innerRadius = 60;

            var color3 = d3.scale.category10();
            var arc = d3.svg.arc()
                    .outerRadius(outerRadius)
                    .innerRadius(innerRadius);

            var svg3 = d3.select("#chart3")
                    .append("svg")
                    .attr('width', w)
                    .attr('height', h)
                    .append('g')
                    .attr('transform', 'translate(' + (w / 2.3) + ',' + (h / 2) + ')');

            var path = svg3.selectAll('path')
                    .data(pie(deviceData))
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    // d: arc,
                    .attr('fill', function (d, i) {
                        return color3(capitalizeFirstLetter(d.data.name));
                    }
                    );


            path.transition()
                    .duration(2000)
                    .attrTween('d', function (d) {
                        var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                        return function (t) {
                            return arc(interpolate(t));
                        };
                    });


            var restOfTheData = function () {
                var text = svg3.selectAll('text')
                        .data(pie(deviceData))
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
                            return (Math.floor(d.data.percent*100) / 100)+"%";
                        })
                        .style('fill', '#fff')
                        .style('font-size', '10px');


                var legendRectSize = 10;
                var legendSpacing = 5;
                var legendHeight = legendRectSize + legendSpacing;


                var legend = svg3.selectAll('.legend')
                        .data(color3.domain())
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
                        .style('fill', color3)
                        .style('stroke', color3);

                legend.append('text')
                        .attr('x', 20)
                        .attr('y', 10)
                        .text(function (d) {
                            return d;
                        })
                        .style('fill', 'black')
                        .style('font-size', '14px');
            };
            setTimeout(restOfTheData, 1000);
            //----------------------DEVICE-END-------------------------------------

            //----------------------OS-PIE-START-------------------------------------
            var pie = d3.layout.pie()
                    .value(function (d) {
                        return (Math.floor(d.percent*100) / 100)
                    })
                    .sort(null).padAngle(.03);

            var w = 300, h = 220;

            var outerRadius = w / 3;
            var innerRadius = 60;

            var color2 = d3.scale.category10();

            var arc = d3.svg.arc()
                    .outerRadius(outerRadius)
                    .innerRadius(innerRadius);
            var svg2 = d3.select("#chart2")
                    .append("svg")
                    .attr('width', w)
                    .attr('height', h)
                    .append('g')
                    .attr('transform', 'translate(' + (w / 2.3) + ',' + (h / 2) + ')');

            var path = svg2.selectAll('path')
                    .data(pie(osData)).enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function (d, i) {
                        return color2(capitalizeFirstLetter(d.data.name));
                    }
                    );
//                function capitalizeFirstLetter(string) {
//                    return string.charAt(0).toUpperCase() + (string.slice(1)).toLowerCase();
//                }
            path.transition()
                    .duration(2000)
                    .attrTween('d', function (d) {
                        var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                        return function (t) {
                            return arc(interpolate(t));
                        };
                    });


            var restOfTheData = function () {
                var text = svg2.selectAll('text')
                        .data(pie(osData))
                        .enter()
                        .append("text")
                        .transition()
                        .duration(200)
                        .attr("transform", function (d) {
                            return "translate(" + arc.centroid(d) + ")";
                        }).attr("dy", ".2em")
                        .attr("text-anchor", "middle")
                        .text(function (d) {
                            return (Math.floor(d.data.percent*100) / 100)+"%";
                        })
                        .style('fill', '#fff')
                        .style('font-size', '10px');


                var legendRectSize = 10;
                var legendSpacing = 5;
                var legendHeight = legendRectSize + legendSpacing;


                var legend = svg2.selectAll('.legend')
                        .data(color2.domain())
                        .enter().append('g')
                        .attr('class', 'legend')
                        .attr("transform", function (d, i) {
                            return "translate(-35," + ((i * legendHeight) - 30) + ")";
                        });

                legend.append('rect')
                        .attr('width', legendRectSize)
                        .attr('height', legendRectSize)
                        .attr('rx', 20)
                        .attr('ry', 20)
                        .style('fill', color2)
                        .style('stroke', color2);

                legend.append('text')
                        .attr('x', 20)
                        .attr('y', 10)
                        .text(function (d) {
                            return d;
                        })
                        .style('fill', 'black')
                        .style('font-size', '14px');
            };
            setTimeout(restOfTheData, 1000);
            //----------------------OS-PIE-END-------------------------------------
            //----------------------BROWSER-PIE-START-------------------------------------
            var pie = d3.layout.pie()
                    .value(function (d) {
                        return (Math.floor(d.percent*100) / 100)
                    })
                    .sort(null).padAngle(.03);

            var w = 300, h = 220;

            var outerRadius = w / 3;
            var innerRadius = 60;

            var color = d3.scale.category10();

            var arc = d3.svg.arc()
                    .outerRadius(outerRadius)
                    .innerRadius(innerRadius);
            var svg1 = d3.select("#chart1")
                    .append("svg")
                    .attr('width', w)
                    .attr('height', h)
                    .append('g')
                    .attr('transform', 'translate(' + (w / 2.3) + ',' + (h / 2) + ')');

            var path = svg1.selectAll('path')
                    .data(pie(browserData)).enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function (d, i) {
                        return color(capitalizeFirstLetter(d.data.name));
                    }
                    );
//                function capitalizeFirstLetter(string) {
//                    return string.charAt(0).toUpperCase() + (string.slice(1)).toLowerCase();
//                }
            path.transition()
                    .duration(2000)
                    .attrTween('d', function (d) {
                        var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                        return function (t) {
                            return arc(interpolate(t));
                        };
                    });


            var restOfTheData = function () {
                var text = svg1.selectAll('text')
                        .data(pie(browserData))
                        .enter()
                        .append("text")
                        .transition()
                        .duration(200)
                        .attr("transform", function (d) {
                            return "translate(" + arc.centroid(d) + ")";
                        }).attr("dy", ".2em")
                        .attr("text-anchor", "middle")
                        .text(function (d) {
                            return (Math.floor(d.data.percent*100) / 100)+"%";
                        })
                        .style('fill', '#fff')
                        .style('font-size', '10px');


                var legendRectSize = 10;
                var legendSpacing = 5;
                var legendHeight = legendRectSize + legendSpacing;


                var legend = svg1.selectAll('.legend')
                        .data(color.domain())
                        .enter().append('g')
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
                        .attr('x', 20)
                        .attr('y', 10)
                        .text(function (d) {
                            return d;
                        })
                        .style('fill', 'black')
                        .style('font-size', '14px');
            };
            setTimeout(restOfTheData, 1000);
            //----------------------BROWSER-PIE-END-------------------------------------
            //----------------------WORLD_MAP-START-------------------------------------
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

            var svg4 = d3.select("#world-map-chart").append("svg")
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
                            console.log('count: ', couValue.count);
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
                            div.text("Country : " + d.properties.name + " , " + "No.of subscribers :" + d.id)
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
            //----------------------WORLD_MAP-END-------------------------------------
            $rootScope.engagetoApp.isPageLoading = false;
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + (string.slice(1)).toLowerCase();
        }
    }
})(window.angular);