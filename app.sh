export MONGO_URL=mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_SERVICE}:${MONGO_SERVICE_PORT}/ \
    FLASK_APP=$PWD/app/http/api/endpoints.py \
    FLASK_ENV=${ENV:-development} \
    PORT=${APIPORT:-8080}

python -m flask run --host 0.0.0.0 --port ${PORT}
