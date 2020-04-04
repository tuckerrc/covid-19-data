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
                state_data[row[1]].append({
                    header[0]: d,
                    header[3]: int(row[3]),
                    header[4]: int(row[4]),
                    "c_delta": int(row[3]) - prev[header[3]],
                    "d_delta": int(row[4]) - prev[header[4]],
                })
            else:
                state_data[row[1]].append({
                    header[0]: d,
                    header[3]: int(row[3]),
                    header[4]: int(row[4]),
                    "c_delta": int(row[3]),
                    "d_delta": int(row[4])
                })
    data = dict()
    count = 1
    for sd in state_data:
        data[sd] = {
            'data': state_data[sd],
            'color': 'hsla( {}, 100%, 50%, 1)'.format(count)
        }
        state_data[sd]
        count = count + 6
    with open('docs/us-states.json', 'w') as output:
        output.write(json.dumps(data))


if __name__ == "__main__":
    main()
