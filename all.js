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

function createCaseVsDelta(data, states) {
    var ctx = document.getElementById('cases_vs_delta');
    var datasets = []
    for (var key in data) {
        if (states.indexOf(key) > -1) {
            var set = {
                label: key,
                borderColor: data[key].color,
                fill: false,
                data: data[key].data.map(x => {
                    return {
                        "x": x.cases,
                        "y": x.c_delta,
                    };
                })
            }
            datasets.push(set);
        }
    }
    cases_vs_delta = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: datasets,
        },
        options: {
            elements: {
                line: {
                    borderWidth: 2,
                    tension: 0.0001
                }
            },
            title: {
                display: true,
                text: "Total Cases Vs New Cases"
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    type: 'logarithmic',
                    scaleLabel: {
                        display: true,
                        labelString: 'New Cases (log)'
                    },
                    ticks: {
                        callback: logTick
                    }
                }],
                xAxes: [{
                    type: 'logarithmic',
                    scaleLabel: {
                        display: true,
                        labelString: 'Total Cases (log)'
                    },
                    ticks: {
                        callback: logTick
                    }
                }]
            }
        }
    });
}

function createCaseVsDeaths(data, states) {
    var ctx = document.getElementById('cases_vs_deaths');
    var datasets = []
    for (var key in data) {
        if (states.indexOf(key) > -1) {
            var set = {
                label: key,
                borderColor: data[key].color,
                fill: false,
                data: data[key].data.map(x => {
                    return {
                        "x": x.cases,
                        "y": x.deaths,
                    };
                })
            }
            datasets.push(set);
        }
    }
    cases_vs_deaths = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: datasets,
        },
        options: {
            elements: {
                line: {
                    borderWidth: 2,
                    tension: 0.0001
                }
            },
            title: {
                display: true,
                text: "Total Cases Vs Total Deaths"
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    type: 'logarithmic',
                    scaleLabel: {
                        display: true,
                        labelString: 'Total Deaths (log)'
                    },
                    ticks: {
                        callback: logTick
                    }
                }],
                xAxes: [{
                    type: 'logarithmic',
                    scaleLabel: {
                        display: true,
                        labelString: 'Total Cases (log)'
                    },
                    ticks: {
                        callback: logTick
                    }
                }]
            }
        }
    });
}

function createCasesTimeseries(data, states) {
    var ctx = document.getElementById('cases_time');
    var datasets = []
    for (var key in data) {
        if (states.indexOf(key) > -1) {
            var values = data[key].data.filter(x => x.cases >= 10)
            var set = {
                label: key,
                borderColor: data[key].color,
                fill: false,
                data: values.map(x => x.cases)
            }
            datasets.push(set);
        }
    }
    var longest = datasets.reduce( (acc, cur) => {
        return acc.data.length > cur.data.length ? acc : cur;
    })
    var labels = Array.from(Array(longest.data.length).keys())
    cases_time = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            elements: {
                line: {
                    borderWidth: 2,
                    tension: 0.0001
                }
            },
            title: {
                display: true,
                text: "Total Cases"
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    scaleLabel: {
                        display: true,
                        labelString: 'Total Cases'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Days since atleast 10 cases'
                    }
                }]
            }
        }
    });
}

function createCasesLogarithmic(data, states) {
    var ctx = document.getElementById('cases_log');
    var datasets = []
    for (var key in data) {
        if (states.indexOf(key) > -1) {
            var values = data[key].data.filter(x => x.cases >= 10)
            var set = {
                label: key,
                borderColor: data[key].color,
                fill: false,
                data: values.map(x => x.cases)
            }
            datasets.push(set);
        }
    }
    var longest = datasets.reduce( (acc, cur) => {
        return acc.data.length > cur.data.length ? acc : cur;
    })
    var labels = Array.from(Array(longest.data.length).keys())
    cases_log = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            elements: {
                line: {
                    borderWidth: 2,
                    tension: 0.0001
                }
            },
            title: {
                display: true,
                text: "Total Cases (logarithmic)",
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    type: 'logarithmic',
                    scaleLabel: {
                        display: true,
                        labelString: 'Total Cases'
                    },
                    ticks: {
                        callback: logTick
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Days since atleast 10 cases'
                    }
                }]
            }
        }
    });
}

function createDeathsTimeseries(data, states) {
    var ctx = document.getElementById('deaths_time');
    var datasets = []
    for (var key in data) {
        if (states.indexOf(key) > -1) {
            var values = data[key].data.filter(x => x.deaths >= 1)
            var set = {
                label: key,
                borderColor: data[key].color,
                fill: false,
                data: values.map(x => x.deaths)
            }
            datasets.push(set);
        }
    }
    var longest = datasets.reduce( (acc, cur) => {
        return acc.data.length > cur.data.length ? acc : cur;
    })
    var labels = Array.from(Array(longest.data.length).keys())
    deaths_time = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            elements: {
                line: {
                    borderWidth: 2,
                    tension: 0.0001
                }
            },
            title: {
                display: true,
                text: "Total Deaths"
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    scaleLabel: {
                        display: true,
                        labelString: 'Total Deaths'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Days since first death'
                    }
                }]
            }
        }
    });
}

function createDeathsLogarithmic(data, states) {
    var ctx = document.getElementById('deaths_log');
    var datasets = []
    for (var key in data) {
        if (states.indexOf(key) > -1) {
            var values = data[key].data.filter(x => x.deaths >= 1)
            var set = {
                label: key,
                borderColor: data[key].color,
                fill: false,
                data: values.map(x => x.deaths)
            }
            datasets.push(set);
        }
    }
    var longest = datasets.reduce( (acc, cur) => {
        return acc.data.length > cur.data.length ? acc : cur;
    })
    var labels = Array.from(Array(longest.data.length).keys())
    deaths_log = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            elements: {
                line: {
                    borderWidth: 2,
                    tension: 0.0001
                }
            },
            title: {
                display: true,
                text: "Total Deaths (logarithmic)",
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    type: 'logarithmic',
                    scaleLabel: {
                        display: true,
                        labelString: 'New Deaths'
                    },
                    ticks: {
                        callback: logTick
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Days since first death'
                    }
                }]
            }
        }
    });
}

function createNewCasesBar(data, states) {
    var ctx = document.getElementById('cases_bar');
    var datasets = []
    for (var key in data) {
        if (states.indexOf(key) > -1) {
            var values = data[key].data.filter(x => x.cases >= 10)
            var set = {
                label: key,
                backgroundColor: data[key].color,
                data: values.map(x => x.c_delta)
            }
            datasets.push(set);
        }
    }
    var longest = datasets.reduce( (acc, cur) => {
        return acc.data.length > cur.data.length ? acc : cur;
    })
    var labels = Array.from(Array(longest.data.length).keys())
    cases_bar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            title: {
                display: true,
                text: "New Cases (per day)"
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'New Cases'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Days since atleast 10 cases'
                    }
                }]
            }
        }
    });
}

function createNewDeathsBar(data, states) {
    var ctx = document.getElementById('deaths_bar');
    var datasets = []
    for (var key in data) {
        if (states.indexOf(key) > -1) {
            var values = data[key].data.filter(x => x.deaths >= 1)
            var set = {
                label: key,
                backgroundColor: data[key].color,
                data: values.map(x => x.d_delta)
            }
            datasets.push(set);
        }
    }
    var longest = datasets.reduce( (acc, cur) => {
        return acc.data.length > cur.data.length ? acc : cur;
    })
    var labels = Array.from(Array(longest.data.length).keys())
    deaths_bar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            title: {
                display: true,
                text: "New Deaths (per day)"
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'New Deaths'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Days since first death'
                    }
                }]
            }
        }
    });
}

function checkBoxes(states, checked) {
    var checkboxes = document.getElementById('checkboxes');
    var list = states.sort();
    for (var i=0; i < list.length; i++) {
        var container = document.createElement("div")
        container.classList.add("checkbox")

        var checkbox = document.createElement("input")
        checkbox.type = "checkbox";
        checkbox.class = 'checkbox'
        checkbox.name = list[i];
        checkbox.value = list[i];
        if (checked.indexOf(list[i]) > -1) {
            checkbox.checked = true;
        }
        checkbox.id = list[i].toLowerCase().replace(' ', '_')

        var label = document.createElement("label");
        label.htmlFor = list[i].toLowerCase().replace(' ','_');
        label.appendChild(document.createTextNode(list[i]));

        container.appendChild(checkbox);
        container.appendChild(label);
        checkboxes.appendChild(container);
    }
}

function createLegend(data, checked) {
    var container = document.getElementById('legend')

    var list = checked.sort();
    for (var i=0; i < list.length; i++) {
        var state = document.createElement('div')
        state.classList.add('legend-state');

        var color = document.createElement('div');
        color.classList.add('legend-color');
        color.style = 'background-color: ' + data[list[i]].color

        var label = document.createElement('div');
        label.classList.add('legend-label');
        label.appendChild(document.createTextNode(list[i]))

        state.appendChild(color);
        state.appendChild(label);
        container.appendChild(state);
    }
}

var data, cases_vs_delta, cases_vs_deaths, cases_time, cases_log, deaths_time, deaths_log,  deaths_bar, cases_bar;
var states = ['Virginia', 'Utah', 'Washington', 'Pennsylvania', 'New Mexico']
fetch("us-states.json")
  .then(response => response.json())
  .then(json => {
    var data = {};
    var keys = Object.keys(json).sort();
    for (var i = 0; i < keys.length; i++) {
        var values = json[keys[i]];
        data[keys[i]] = values;
    }
    return data;
  })
  .then(json => {
    createCaseVsDelta(json, states )
    createCaseVsDeaths(json, states )
    createCasesTimeseries(json, states)
    createCasesLogarithmic(json, states)
    createDeathsTimeseries(json, states)
    createDeathsLogarithmic(json, states)
    createNewCasesBar(json, states)
    createNewDeathsBar(json, states)
    createLegend(json, states);
    return json;
  })
  .then(json => {
      checkBoxes(Object.keys(json), states);
      return json;
  })
  .then(json => {
      data = json;
  });


document.getElementById("submit").addEventListener('click', (event) => {
    var checked = document.querySelectorAll('input[type=checkbox]:checked')
    document.getElementById("legend").innerHTML = ""

    var states = []
    checked.forEach( e => states.push(e.value))
    cases_vs_delta.destroy();
    cases_vs_deaths.destroy();
    cases_log.destroy();
    cases_time.destroy();
    deaths_log.destroy();
    deaths_time.destroy();
    cases_bar.destroy();
    deaths_bar.destroy();
    createCaseVsDelta(data, states);
    createCaseVsDeaths(data, states);
    createCasesTimeseries(data, states);
    createCasesLogarithmic(data, states);
    createDeathsTimeseries(data, states);
    createDeathsLogarithmic(data, states);
    createNewCasesBar(data, states)
    createNewDeathsBar(data, states)
    createLegend(data, states);
})

document.getElementById('check').addEventListener('click', (event) => {
    var checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(value => {
        value.checked = true;
    })
})

document.getElementById('uncheck').addEventListener('click', (event) => {
    var checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(value => {
        value.checked = false;
    })
})
