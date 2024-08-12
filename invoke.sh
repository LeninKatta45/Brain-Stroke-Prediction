curl -X POST http://0.0.0.0:8080/predict \
     -H "Content-Type: application/json" \
     -d '{
    "gender": 1,
    "age": 67,
    "hypertension": 0,
    "heart_disease": 1,
    "ever_married": 1,
    "work_type": "Private",
    "Residence_type": 1,
    "avg_glucose_level": 228.69,
    "bmi": 36.6,
    "smoking_status": "formerly smoked"
}'