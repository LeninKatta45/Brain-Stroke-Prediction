function getRepeat(name1) {
    var repeat = document.getElementsByName(name1);
    for (var i in repeat) {
        if (repeat[i].checked) {
            return parseFloat(i);
        }
    }
    return -1;
}
function onClick() {
    const showImageButton = document.getElementById("showImageButton");
    const showImageButto = document.getElementById("showImageButto"); // Get the second button

    const imageContainer = document.getElementById("imageContainer");
    const blurBackground = document.getElementById("blurBackground");
    const imageUrl = "https://www.ifafitness.com/book/images/BMI-chart.jpg";

    showImageButton.addEventListener("click", () => {
        const isImageVisible = imageContainer.style.display === "block";

        if (!isImageVisible) {
            // Display the image and hide the second button
            imageContainer.innerHTML = `<img src="${imageUrl}" alt="Displayed Image">`;
            imageContainer.style.display = "block";
            blurBackground.style.display = "block";
            showImageButto.style.display = "none"; // Hide the second button
        }
    });

    blurBackground.addEventListener("click", () => {
        // Reset the state when clicking outside the image
        imageContainer.innerHTML = "";
        imageContainer.style.display = "none";
        blurBackground.style.display = "none";
        showImageButto.style.display = "block"; // Show the second button again
    });
}
function onClic() {
    
    const showImageButto = document.getElementById("showImageButto");
    const imageContaine = document.getElementById("imageContaine");
    const blurBackgroun = document.getElementById("blurBackgroun");
    const imageUrl1 = "https://assets-global.website-files.com/622154d5a1d5c02e596f4511/62f2bee4de0117f1ec10c745_BloodGlucoseChart.jpeg";
    
    showImageButto.addEventListener("click", () => {
        const isImageVisible1 = imageContaine.style.display === "block";

        if (!isImageVisible1) {
            imageContaine.innerHTML = `<img src="${imageUrl1}" alt="Displayed Image">`;
            imageContaine.style.display = "block";
            blurBackgroun.style.display = "block";
        }
    });

    blurBackgroun.addEventListener("click", () => {
        imageContaine.innerHTML = "";
        imageContaine.style.display = "none";
        blurBackgroun.style.display = "none";
    });
}
function onClickedEstimatePrice() {
    var estFraud = document.getElementById("uiEstimatedPrice");
    const postData = {
        gender: getRepeat("gender"),
        age: parseFloat(document.getElementById("age").value),
        hypertension: getRepeat("Hyper"),
        heart_disease: getRepeat("heart"),
        ever_married: getRepeat("marry"),
        work_type: document.getElementById("uiWork").value,
        Residence_type: getRepeat("residence"),
        avg_glucose_level: parseFloat(document.getElementById("bls").value),
        bmi: parseFloat(document.getElementById("bmi").value),
        smoking_status: document.getElementById("uiSmoke").value
        
    };
    $.ajax({
        url: 'http://127.0.0.1:8000/predict',
        type: 'POST',
        data: JSON.stringify(postData),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            console.log(data.prediction);
            estFraud.innerHTML = "<h2>" + data.prediction + "</h2>";
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}

function onPageLoad() {
    console.log("document loaded");
    $.ajax({
        url: "http://127.0.0.1:8000/get_smoking",
        type: 'GET',
        
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data) {
                var smokes = data.status;
                var uiSmoke = document.getElementById("uiSmoke");
                $('#uiSmoke').empty();
                for (var i in smokes) {
                    var opt = new Option(smokes[i]);
                    $('#uiSmoke').append(opt);
                }
            }
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
    $.ajax({
        url: "http://127.0.0.1:8000/get_work",
        type: 'GET',

        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data) {
                var work = data.status;
                var uiWork = document.getElementById("uiWork");
                $('#uiWork').empty();
                for (var i in work) {
                    var opt = new Option(work[i]);
                    $('#uiWork').append(opt);
                }
            }
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}

window.onload = onPageLoad;
