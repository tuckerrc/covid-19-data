function createCaseVsDelta(data, state) {
    var ctx = document.getElementById('cases_vs_delta');
    var dataset = [{
        label: 'Cases vs. Delta (' + state + ')',
        backgroundColor: data[state].color,
        data: data[state].data.map(x => {
            return {
                "x": x.cases,
                "y": x.c_delta,
            };
        })
    }]
    cases_vs_delta = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: dataset,
        },
        options: {
            scales: {
                yAxes: [{
                    type: 'logarithmic',
                    scaleLabel: {
                        display: true,
                        labelString: 'New Cases (log)'
                    }
                }],
                xAxes: [{
                    type: 'logarithmic',
                    scaleLabel: {
                        display: true,
                        labelString: 'Total Cases (log)'
                    }
                }]
            }
        }
    });
}

function createCaseVsDeaths(data, state) {
    var ctx = document.getElementById('cases_vs_deaths');
    var dataset = [{
        label: 'Cases vs. Deaths (' + state + ')',
        backgroundColor: data[state].color,
        data: data[state].data.map(x => {
            return {
                "x": x.cases,
                "y": x.deaths,
            };
        })
    }]
    cases_vs_deaths = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: dataset,
        },
        options: {
            scales: {
                yAxes: [{
                    type: 'logarithmic',
                    scaleLabel: {
                        display: true,
                        labelString: 'Total Deaths (log)'
                    }
                }],
                xAxes: [{
                    type: 'logarithmic',
                    scaleLabel: {
                        display: true,
                        labelString: 'Total Cases (log)'
                    }
                }]
            }
        }
    });
}

function createCasesTimeseries(data, state) {
    var ctx = document.getElementById('cases_time');
    var dataset = [{
        label: 'Cases ' + state,
        borderColor: data[state].color,
        fill: false,
        lineTension: 0.1,
        data: data[state].data.map(x => {
            return x.cases;
        })
    }]
    var labels = data[state].data.map(x => {
            return x.date;
        });
    cases_time = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: dataset,
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Total Cases'
                    }
                }]
            }
        }
    });
}

function createCasesLogarithmic(data, state) {
    var ctx = document.getElementById('cases_log');
    var dataset = [{
        label: 'Cases (log) ' + state,
        borderColor: data[state].color,
        fill: false,
        lineTension: 0.1,
        data: data[state].data.map(x => {
            return x.cases;
        })
    }]
    var labels = data[state].data.map(x => {
            return x.date;
        });
    cases_log = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: dataset,
        },
        options: {
            scales: {
                yAxes: [{
                    type: 'logarithmic',
                    scaleLabel: {
                        display: true,
                        labelString: 'Total Cases (log)'
                    }
                }]
            }
        }
    });
}

function createDeathsTimeseries(data, state) {
    var ctx = document.getElementById('deaths_time');
    var dataset = [{
        label: 'Deaths ' + state,
        borderColor: data[state].color,
        fill: false,
        lineTension: 0.1,
        data: data[state].data.map(x => {
            return x.deaths;
        })
    }]
    var labels = data[state].data.map(x => {
            return x.date;
        });
    deaths_time = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: dataset,
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Total Deaths'
                    }
                }]
            }
        }
    });
}

function createDeathsLogarithmic(data, state) {
    var ctx = document.getElementById('deaths_log');
    var dataset = [{
        label: 'Deaths (log) ' + state,
        borderColor: data[state].color,
        fill: false,
        lineTension: 0.1,
        data: data[state].data.map(x => {
            return x.deaths;
        })
    }]
    var labels = data[state].data.map(x => {
            return x.date;
        });
    deaths_log = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: dataset,
        },
        options: {
            scales: {
                yAxes: [{
                    type: 'logarithmic',
                    scaleLabel: {
                        display: true,
                        labelString: 'Total Deaths (log)'
                    }
                }]
            }
        }
    });
}

function createNewCasesBar(data, state) {
    var ctx = document.getElementById('cases_bar');
    var dataset = [{
        label: 'New Cases ' + state,
        backgroundColor: data[state].color,
        data: data[state].data.map(x => {
            return x.c_delta;
        })
    }]
    var labels = data[state].data.map(x => {
            return x.date;
        });
    cases_bar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: dataset,
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'New Cases'
                    }
                }]
            }
        }
    });
}

function createNewDeathsBar(data, state) {
    var ctx = document.getElementById('deaths_bar');
    var dataset = [{
        label: 'New Deaths ' + state,
        backgroundColor: data[state].color,
        data: data[state].data.map(x => {
            return x.d_delta;
        })
    }]
    var labels = data[state].data.map(x => {
            return x.date;
        });
    deaths_bar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: dataset,
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'New Deaths (log)'
                    }
                }]
            }
        }
    });
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
        selectList.appendChild(option);
    }
}

var data;
var cases_vs_delta, cases_vs_deaths, cases_time, cases_log, deaths_time, deaths_log, deaths_bar, cases_bar;
fetch("us-states.json")
  .then(response => response.json())
  .then(json => {
    createCaseVsDelta(json, 'Virginia')
    createCaseVsDeaths(json, 'Virginia')
    createCasesTimeseries(json, 'Virginia')
    createCasesLogarithmic(json, 'Virginia')
    createDeathsTimeseries(json, 'Virginia')
    createDeathsLogarithmic(json, 'Virginia')
    createNewCasesBar(json, 'Virginia')
    createNewDeathsBar(json, 'Virginia')
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
