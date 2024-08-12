import uvicorn
from fastapi import FastAPI
import numpy as np
import pickle
from pydantic import BaseModel
import pandas as pd
import json
# 2. Create the app object
from fastapi.middleware.cors import CORSMiddleware
with open("feature.json", "r") as json_fil:
    loaded_feature = json.load(json_fil)
# Add CORS middleware to allow requests from all origins

class BrainStroke(BaseModel):
    gender: float
    age: float
    hypertension: float
    heart_disease: float
    ever_married: float
    work_type: str
    Residence_type: float
    avg_glucose_level: float
    bmi: float
    smoking_status: str
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],

    allow_methods=["*"],
    allow_headers=["*"],
)
pickle_in = open("Stroke.pickle4","rb")
trans,classifier=pickle.load(pickle_in)
def transf():
    return trans,classifier
@app.get('/')
def index():
    return {'message': 'Hello, World'}
with open("brain.json", "r") as jso:
    item = json.load(jso)

@app.get('/get_smoking')
def get_smoking():
    response = json.dumps({
        'status': item["smoking_status"]
    })
    smoker = json.loads(response)
    return smoker
@app.get('/get_work')
def get_work():
    response1 = json.dumps({
        'status': item["work_type"]
    })
    worker=json.loads(response1)
    return worker
@app.post('/predict')
def predict(data: BrainStroke):
    gender =data.gender
    age = data.age
    hypertension = data.hypertension
    heart_disease = data.heart_disease
    ever_married = data.ever_married
    work_type = data.work_type
    Residence_type = data.Residence_type
    avg_glucose_level = data.avg_glucose_level
    bmi = data.bmi
    smoking_status = data.smoking_status
    x=trans.transform([[gender,
    age,
    hypertension,
    heart_disease,
    ever_married,
    work_type,
    Residence_type,
    avg_glucose_level,
    bmi,
    smoking_status]])

    prediction = classifier.predict(x)
    if(prediction[0]==1):
        prediction="STROKE DETECTED SEEK MEDICAL ASSISTANCE"
    else:
        prediction="NO STROKE - YOU ARE SAFE"
    return {
        'prediction': prediction
    }

if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='0.0.0.0')    