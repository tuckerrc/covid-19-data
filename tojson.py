import csv
import json
from collections import defaultdict

def main():
    state_data = defaultdict(list)
    with open('us-states.csv', 'r') as states:
        reader = csv.reader(states)
        header = next(reader)
        for row in reader:
            d = row[0]
            if len(state_data[row[1]]) > 0:
                i = len(state_data[row[1]])
                prev = state_data[row[1]][i-1]
                c_delta = int(row[3]) - prev[header[3]]
                d_delta = int(row[4]) - prev[header[4]]
                if (len(state_data[row[1]]) > 2):
                    ## Calculate 3 day mean for deltas
                    prev2 = state_data[row[1]][i-2]
                    c_delta_mean = (prev["c_delta"] + prev2["c_delta"] + int(c_delta))/3
                    d_delta_mean = (prev["d_delta"] + prev2["d_delta"] + int(d_delta))/3
                else:
                    c_delta_mean = 0
                    d_delta_mean = 0
                state_data[row[1]].append({
                    header[0]: d,
                    header[3]: int(row[3]),
                    header[4]: int(row[4]),
                    "c_delta": int(row[3]) - prev[header[3]],
                    "d_delta": int(row[4]) - prev[header[4]],
                    "c_delta_mean": int(c_delta_mean),
                    "d_delta_mean": int(d_delta_mean)
                })
            else:
                state_data[row[1]].append({
                    header[0]: d,
                    header[3]: int(row[3]),
                    header[4]: int(row[4]),
                    "c_delta": int(row[3]),
                    "d_delta": int(row[4]),
                    "c_delta_mean": 0,
                    "d_delta_mean": 0
                })
    ## Add Total Country Data
    with open('us.csv', 'r') as states:
        reader = csv.reader(states)
        header = next(reader)
        for row in reader:
            d = row[0]
            if len(state_data['United States']) > 0:
                i = len(state_data['United States'])
                prev = state_data['United States'][i-1]
                c_delta = int(row[1]) - prev[header[1]]
                d_delta = int(row[2]) - prev[header[2]]
                if (len(state_data['United States']) > 2):
                    ## Calculate 3 day mean for deltas
                    prev2 = state_data['United States'][i-2]
                    c_delta_mean = (prev["c_delta"] + prev2["c_delta"] + int(c_delta))/3
                    d_delta_mean = (prev["d_delta"] + prev2["d_delta"] + int(d_delta))/3
                else:
                    c_delta_mean = 0
                    d_delta_mean = 0
                state_data['United States'].append({
                    header[0]: d,
                    header[1]: int(row[1]),
                    header[2]: int(row[2]),
                    "c_delta": int(row[1]) - prev[header[1]],
                    "d_delta": int(row[2]) - prev[header[2]],
                    "c_delta_mean": int(c_delta_mean),
                    "d_delta_mean": int(d_delta_mean)
                })
            else:
                state_data['United States'].append({
                    header[0]: d,
                    header[1]: int(row[1]),
                    header[2]: int(row[2]),
                    "c_delta": int(row[1]),
                    "d_delta": int(row[2]),
                    "c_delta_mean": 0,
                    "d_delta_mean": 0
                })

    ## Add color values to json data
    data = dict()
    count = 1
    for sd in state_data:
        data[sd] = {
            'data': state_data[sd],
            'color': 'hsla( {}, 100%, 50%, 1)'.format(count)
        }
        state_data[sd]
        count = count + 6

    with open('us-states.json', 'w') as output:
        output.write(json.dumps(data))


if __name__ == "__main__":
    main()
