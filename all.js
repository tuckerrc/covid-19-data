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
