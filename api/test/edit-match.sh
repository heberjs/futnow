curl -X PUT -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjM0ZGY1ZDEwNjFlNTIwZmUwN2Q2OWEiLCJyb2xlIjoibWFuYWdlciIsImlhdCI6MTcxNDc0Mjg3NCwiZXhwIjoxNzE0NzQ2NDc0fQ.y_c6WEe-Hr2f-EtajKJp7yDKTSmHmNluKNLQlGsbY28" -H "Content-Type: application/json" -d '{"title":"bestia", "description":"hola como va", "date":"2024/12/12"}' "http://localhost:8080/matches/edit/6634df5d1061e520fe07d69e" -v