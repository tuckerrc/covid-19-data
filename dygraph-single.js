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

function convertDataToDygraphs(data, state, keys) {
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

function createCaseVsDelta(data, state) {
    var dyData = convertDataToDygraphs(data, state, {'x':'cases', 'y':'c_delta'});
    cases_vs_delta = new Dygraph(
        document.getElementById('cases_vs_delta'),
        dyData,
        {
            title: 'Cases vs New Cases (' + state + ')',
            color: data[state].color,
            labels: ['Cases', 'New Cases'],
            xlabel: 'Cases',
            ylabel: 'New Cases',
            logscale: true,
            drawPoints: true,
            axes: {
                x: {
                valueFormatter: function(x) {
                    return 'Cases: ' + x;
                },
                    logscale: true,
                }
            }
        }
    )
}

function createCaseVsDeaths(data, state) {
    var dyData = convertDataToDygraphs(data, state, {'x':'cases', 'y':'deaths'});
    cases_vs_deaths = new Dygraph(
        document.getElementById('cases_vs_deaths'),
        dyData,
        {
            title: 'Cases vs Deaths (' + state + ')',
            color: data[state].color,
            xlabel: 'Cases',
            ylabel: 'Deaths',
            drawPoints: true,
            logscale: true,
            axes: {
                x: {
                    logscale: true
                }
            }
        }
    )
}

function createCasesTimeseries(data, state) {
    var dyData = convertDataToDygraphs(data, state, {'x':'date', 'y':'cases'});
    cases_time = new Dygraph(
        document.getElementById('cases_time'),
        dyData,
        {
            title: 'Cases Timeseries (' + state + ')',
            color: data[state].color,
            ylabel: 'Total Cases',
            drawPoints: true,
        }
    )
}

function createCasesLogarithmic(data, state) {
    var dyData = convertDataToDygraphs(data, state, {'x':'date', 'y':'cases'});
    cases_log = new Dygraph(
        document.getElementById('cases_log'),
        dyData,
        {
            title: 'Total Cases (' + state + ')',
            color: data[state].color,
            ylabel: 'Total Cases (log)',
            logscale: true,
            drawPoints: true,
        }
    )
}

function createDeathsTimeseries(data, state) {
    var dyData = convertDataToDygraphs(data, state, {'x':'date', 'y':'cases'});
    deaths_time = new Dygraph(
        document.getElementById('deaths_time'),
        dyData,
        {
            title: 'Deaths Timeseries(' + state + ')',
            color: data[state].color,
            ylabel: 'Total Deaths',
            drawPoints: true,
        }
    )
}

function createDeathsLogarithmic(data, state) {
    var dyData = convertDataToDygraphs(data, state, {'x':'date', 'y':'cases'});
    deaths_log = new Dygraph(
        document.getElementById('deaths_log'),
        dyData,
        {
            title: 'Total Deaths (' + state + ')',
            color: data[state].color,
            ylabel: 'Total Deaths (log)',
            logscale: true,
            drawPoints: true,
        }
    )
}

function createNewCasesBar(data, state) {
    var dyData = convertDataToDygraphs(data, state, {'x':'date', 'y':'c_delta'});
    cases_bar = new Dygraph(
        document.getElementById('cases_bar'),
        dyData,
        {
            title: 'New Cases (' + state + ')',
            color: data[state].color,
            ylabel: 'New Cases',
            drawPoints: true,
        }
    )
}

function createNewDeathsBar(data, state) {
    var dyData = convertDataToDygraphs(data, state, {'x':'date', 'y':'d_delta'});
    deaths_bar = new Dygraph(
        document.getElementById('deaths_bar'),
        dyData,
        {
            title: 'New Deaths (' + state + ')',
            color: data[state].color,
            ylabel: 'New Deaths',
            drawPoints: true,
        }
    )
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
    createCaseVsDelta(json, 'United States')
    createCaseVsDeaths(json, 'United States')
    createCasesTimeseries(json, 'United States')
    createCasesLogarithmic(json, 'United States')
    createDeathsTimeseries(json, 'United States')
    createDeathsLogarithmic(json, 'United States')
    createNewCasesBar(json, 'United States')
    createNewDeathsBar(json, 'United States')
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
    cases_vs_delta.destroy();
    cases_vs_deaths.destroy();
    cases_log.destroy();
    cases_time.destroy();
    deaths_log.destroy();
    deaths_time.destroy();
    cases_bar.destroy();
    deaths_bar.destroy();
    createCaseVsDelta(data, event.target.value);
    createCaseVsDeaths(data, event.target.value);
    createCasesTimeseries(data, event.target.value);
    createCasesLogarithmic(data, event.target.value);
    createDeathsTimeseries(data, event.target.value);
    createDeathsLogarithmic(data, event.target.value);
    createNewCasesBar(data, event.target.value)
    createNewDeathsBar(data, event.target.value)
})
