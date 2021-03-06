import csv
import json
from collections import defaultdict

def main():
    state_data = {}
    with open('us-counties.csv', 'r') as counties:
        reader = csv.reader(counties)
        header = next(reader)
        for row in reader:
            date = row[0]
            county = row[1]
            state = row[2]
            cases = int(row[4])
            deaths = int(row[5])
            '''
            {
                "State": {
                    "County": {
                        "data": [
                            {
                                date: 2020-01-21,
                                cases: 1,
                                deaths: 1,
                                c_delta: 1,
                                d_delta: 1
                            }
                        ],
                        "color": "hlsa()"
                    },
                    "County1": {
                        "data": [
                            {
                                date: 2020-01-21,
                                cases: 1,
                                deaths: 1,
                                c_delta: 1,
                                d_delta: 1
                            }
                        ],
                        "color": "hlsa()"
                    }
                }
            }
            '''
            if state in list(state_data.keys()):
                if county in list(state_data[state].keys()):
                    i = len(state_data[state][county]['data'])
                    prev = state_data[state][county]['data'][i-1]
                    c_delta = cases - prev[header[4]]
                    d_delta = deaths - prev[header[5]]
                    if (len(state_data[state][county]['data']) > 2):
                        ## Calculate 3 day mean for deltas
                        prev2 = state_data[state][county]['data'][i-2]
                        c_delta_mean = (prev["c_delta"] + prev2["c_delta"] + int(c_delta))/3
                        d_delta_mean = (prev["d_delta"] + prev2["d_delta"] + int(d_delta))/3
                    else:
                        c_delta_mean = 0
                        d_delta_mean = 0
                    state_data[state][county]['data'].append({
                        header[0]: date,
                        header[4]: cases,
                        header[5]: deaths,
                        "c_delta": c_delta,
                        "d_delta": d_delta,
                        "c_delta_mean": int(c_delta_mean),
                        "d_delta_mean": int(d_delta_mean)
                    })
                else:
                    count = len(list(state_data[state].keys())) + 1
                    state_data[state][county] = {
                        'data': [],
                        'color': 'hsla({}, 100%, 50%, 1)'.format(count * 6)
                    }
                    state_data[state][county]['data'].append({
                        header[0]: date,
                        header[4]: cases,
                        header[5]: deaths,
                        "c_delta": cases,
                        "d_delta": deaths,
                        "c_delta_mean": 0,
                        "d_delta_mean": 0,
                    })
            else:
                state_data[state] = {
                    county: {
                        'data': [{
                            header[0]: date,
                            header[4]: cases,
                            header[5]: deaths,
                            "c_delta": cases,
                            "d_delta": deaths,
                            "c_delta_mean": 0,
                            "d_delta_mean": 0,
                        }],
                        'color': 'hsla( {}, 100%, 50%, 1)'.format(1 * 6)
                    }
                }
    with open('us-counties.json', 'w') as output:
        output.write(json.dumps(state_data))


if __name__ == "__main__":
    main()
