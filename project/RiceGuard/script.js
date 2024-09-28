// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/svRQZ_U7F/";

let model, labelContainer, maxPredictions;

// Load the image model
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // append elements to the DOM
    labelContainer = document.getElementById("label-container");
}

async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async function(e) {
            const imageElement = new Image();
            imageElement.src = e.target.result;
            imageElement.onload = async function() {
                await predict(imageElement);
            };
        };
        reader.readAsDataURL(file);
    }
}

// run the image through the image model
async function predict(imageElement) {
    const prediction = await model.predict(imageElement);
    const highestPrediction = prediction.reduce((max, p) => p.probability > max.probability ? p : max, prediction[0]);
    labelContainer.innerHTML = `${highestPrediction.className}: ${highestPrediction.probability.toFixed(2)}`;
}

document.getElementById("upload").addEventListener("change", handleImageUpload);

// Initialize the model
init();
