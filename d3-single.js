/**
 * Modified from the ChartJS core.ticks library.
 * https://github.com/chartjs/Chart.js/blob/v2.9.3/src/core/core.ticks.js#L67
 */
function logTick(tickValue, index, values) {
    if (tickValue === 0) {
        return '0';
    }
    const remain = tickValue / (Math.pow(10, Math.floor(Math.log10(tickValue))));
    if (remain === 1 || remain === 2 || remain === 5) {
        return tickValue;
    }
    return '';

}


function convertDataToD3(data, state, keys) {
    var return_data = [];
    data[state].data.forEach(e => {
        let x
        if (keys['x'] == 'date') {
            x = new Date(e[keys['x']])
        } else {
            x = e[keys['x']]
        }
        let point = [
            x,
            e[keys['y']]
        ]
        return_data.push(point);
    })
    return return_data;
}

function createCaseVsDelta(data, state) {}

function createCaseVsDeaths(data, state) {
}

function createCasesTimeseries(data, state) {
}

function createCasesLogarithmic(data, state) {
}

function createDeathsTimeseries(data, state) {
}

function createDeathsLogarithmic(data, state) {
}

function createNewCasesBar(d, state) {
    var data = d[state].data;
    var color = d[state].color;
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    console.log(data)

    cases_bar = d3.select('#cases_bar')
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d3.timeParse("%Y-%m-%d")(d.date); }))
        .range([0, width]);
    cases_bar.append('g')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.c_delta; })])
        .range([height, 0]);
    cases_bar.append('g')
        .call(d3.axisLeft(y));

    cases_bar.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x(function(d) { return x(new Date(d.date)) })
            .y(function(d) { return y(d.c_delta) })
        )

}

function createNewDeathsBar(data, state) {
}

function selectBox(states) {
    var selectList = document.getElementById('state');
    var list = states.sort();
    var option = document.createElement("option");
    option.value = "--";
    option.text = "Select a State";
    selectList.appendChild(option);
    for (var i=0; i < list.length; i++) {
        var option = document.createElement("option");
        option.value = list[i];
        option.text =list[i];
        if (list[i] == 'United States') {
            option.selected = true;
        }
        selectList.appendChild(option);
    }
}

var data;
var cases_vs_delta, cases_vs_deaths, cases_time, cases_log, deaths_time, deaths_log, deaths_bar, cases_bar;
fetch("us-states.json")
  .then(response => response.json())
  .then(json => {
//    createCaseVsDelta(json, 'United States')
//    createCaseVsDeaths(json, 'United States')
//    createCasesTimeseries(json, 'United States')
//    createCasesLogarithmic(json, 'United States')
//    createDeathsTimeseries(json, 'United States')
//    createDeathsLogarithmic(json, 'United States')
    createNewCasesBar(json, 'United States')
//    createNewDeathsBar(json, 'United States')
    return json;
  })
  .then(json => {
      selectBox(Object.keys(json));
      return json;
  })
  .then(json => {
      data = json;
  });


document.getElementById('state').addEventListener('change', (event) => {
    //cases_vs_delta.destroy();
    //cases_vs_deaths.destroy();
    //cases_log.destroy();
    //cases_time.destroy();
    //deaths_log.destroy();
    //deaths_time.destroy();
    d3.select('svg').remove();
    //deaths_bar.destroy();
    createCaseVsDelta(data, event.target.value);
    createCaseVsDeaths(data, event.target.value);
    createCasesTimeseries(data, event.target.value);
    createCasesLogarithmic(data, event.target.value);
    createDeathsTimeseries(data, event.target.value);
    createDeathsLogarithmic(data, event.target.value);
    createNewCasesBar(data, event.target.value)
    createNewDeathsBar(data, event.target.value)
})
