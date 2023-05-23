echo $'\n\n[Request: normal request]'
curl -i localhost:3000 -X POST --data '{ "name": "Vingador", "age": 80 }'

echo $'\n\n[Request: long age]'
curl -i localhost:3000 -X POST --data '{ "name": "Vingador", "age": 18 }'

echo $'\n\n[Request: long name]'
curl -i localhost:3000 -X POST --data '{ "name": "V", "age": 80 }'

echo $'\n\n[Request: all invalid]'
curl -i localhost:3000 -X POST --data '{ "name": "V", "age": 18 }'

echo $'\n\n[Request: connectionError]'
curl -i localhost:3000 -X POST --data '{ "connectionError": "V" }'