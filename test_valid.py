    
from main import transf
import numpy as np
def test_predict_no_stroke():
    trans,classifier=transf()
        
    x=trans.transform([[
    1.0,
    20.5,
    1.0,
    0.0,
    1.0,
    "Private",
    0.0,
    203.2,
    20.0,
    "never smoked"]])

    prediction = classifier.predict(x)
    assert isinstance(prediction[0], np.int64)

