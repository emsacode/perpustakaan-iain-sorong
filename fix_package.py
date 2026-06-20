import json

with open('package.json', 'r') as f:
    data = json.load(f)

data['engines']['node'] = ">=18.14.1"
data['dependencies']['astro'] = "^4.14.0"

with open('package.json', 'w') as f:
    json.dump(data, f, indent=2)
