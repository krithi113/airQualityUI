from flask import Flask, request, jsonify, render_template
import joblib
from preprocess import process_data, process_features, make_predictions

app = Flask(__name__, template_folder='templates', static_folder='static')


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Extract data from the JSON request
    data = request.json
    region = data['region']
    temperature = data['temperature']
    humidity = data['humidity']
    pm25 = data['pm25']
    pm10 = data['pm10']
    no2 = data['no2']
    so2 = data['so2']
    co = data['co']
    proximity_to_industrial_areas = data['proximityToIndustrialAreas']
    population_density = data['populationDensity']

    # Prepare the feature array for prediction
    features = [[region, temperature, humidity, pm25, pm10, no2, so2, co,
                proximity_to_industrial_areas, population_density]]

    scaled_data = process_data(data)

    preprocessed_data = process_features(scaled_data)

    prediction = make_predictions(preprocessed_data) 

    # Return the prediction result as JSON
    return jsonify({'prediction': prediction})#int(prediction[0])

if __name__ == "__main__":
    app.run(debug=True)
