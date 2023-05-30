IMAGE_URL="https://static.wikia.nocookie.net/mkwikia/images/e/ee/Predator_render.png/revision/latest?cb=20160904031753"
BACKGROUND_URL="https://wallpaperaccess.com/full/2621614.jpg"

curl "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"

npx autocannon --renderStatusCodes -c500 "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"