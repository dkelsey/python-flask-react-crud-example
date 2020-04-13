FLASK_APP=$PWD/app/http/api/endpoints.py \
    FLASK_ENV=${ENV:-development} \
    PORT=${APIPORT:-8080}  \
    python -m flask run --port ${PORT}
