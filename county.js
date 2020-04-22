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
            scales: {
                yAxes: [{
                    type: 'logarithmic',
                    scaleLabel: {
                        display: true,
                        labelString: 'New Cases'
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
            var values = data[key].data.filter(x => x.cases >= 10)
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
                        labelString: 'Days since atleast 10 cases'
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
            var values = data[key].data.filter(x => x.cases >= 10)
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
                        labelString: 'Days since atleast 10 cases'
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
            var values = data[key].data.filter(x => x.cases >= 10)
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
                        labelString: 'Days since atleast 10 cases'
                    }
                }]
            }
        }
    });
}

function selectBox(states, initial) {
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
        if (list[i] == initial) {
            option.selected = true
        }
        selectList.appendChild(option);
    }
}

function checkBoxes(states) {
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
        checkbox.checked = true;
        checkbox.id = list[i].toLowerCase().replace(' ', '_')

        var label = document.createElement("label");
        label.htmlFor = list[i].toLowerCase().replace(' ','_');
        label.appendChild(document.createTextNode(list[i]));

        container.appendChild(checkbox);
        container.appendChild(label);
        checkboxes.appendChild(container);
    }
}

var data, cases_vs_delta, cases_vs_deaths, cases_time, cases_log, deaths_time, deaths_log, deaths_bar, cases_bar;
var state = 'New York'
fetch("us-counties.json")
  .then(response => response.json())
  .then(json => {
    var data = {};
    Object.keys(json).sort().forEach(function(key) {
      data[key] = json[key];
    });

    return data;
  })
  .then(json => {
    counties = Object.keys(json[state])
    data = json[state]
    createCaseVsDelta(data, counties)
    createCaseVsDeaths(data, counties)
    createCasesTimeseries(data, counties)
    createCasesLogarithmic(data, counties)
    createDeathsTimeseries(data, counties)
    createDeathsLogarithmic(data, counties)
    createNewCasesBar(data, counties)
    createNewDeathsBar(data, counties)
    return json;
  })
  .then(json => {
      selectBox(Object.keys(json), state);
      checkBoxes(Object.keys(json[state]));
      return json;
  })
  .then(json => {
      data = json;
  });


document.getElementById('state').addEventListener('change', (event) => {
    var state = event.target.value;
    var counties = Object.keys(data[state])
    var countyData =data[state]
    document.getElementById("checkboxes").innerHTML = ""
    checkBoxes(counties);

    cases_vs_delta.destroy();
    cases_vs_deaths.destroy();
    cases_log.destroy();
    cases_time.destroy();
    deaths_log.destroy();
    deaths_time.destroy();
    cases_bar.destroy();
    deaths_bar.destroy();
    createCaseVsDelta(countyData, counties);
    createCaseVsDeaths(countyData, counties);
    createCasesTimeseries(countyData, counties);
    createCasesLogarithmic(countyData, counties);
    createDeathsTimeseries(countyData, counties);
    createDeathsLogarithmic(countyData, counties);
    createNewCasesBar(countyData, counties)
    createNewDeathsBar(countyData, counties)
})

document.getElementById("submit").addEventListener('click', (event) => {
    var state = document.getElementById('state').value
    var checked = document.querySelectorAll('input[type=checkbox]:checked')

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
    createCaseVsDelta(data[state], states);
    createCaseVsDeaths(data[state], states);
    createCasesTimeseries(data[state], states);
    createCasesLogarithmic(data[state], states);
    createDeathsTimeseries(data[state], states);
    createDeathsLogarithmic(data[state], states);
    createNewCasesBar(data[state], states)
    createNewDeathsBar(data[state], states)
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
