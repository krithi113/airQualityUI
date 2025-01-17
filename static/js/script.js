async function predict() {
    const formData = {
        region: document.getElementById('region').value,
        temperature: document.getElementById('temperature').value,
        humidity: document.getElementById('humidity').value,
        pm25: document.getElementById('pm25').value,
        pm10: document.getElementById('pm10').value,
        no2: document.getElementById('no2').value,
        so2: document.getElementById('so2').value,
        co: document.getElementById('co').value,
        proximityToIndustrialAreas: document.getElementById('proximityToIndustrialAreas').value,
        populationDensity: document.getElementById('populationDensity').value
    };
 
    const response = await fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
 
    const result = await response.json();
 
    const resultDiv = document.getElementById('result');
    const body = document.body;
 
    if (result.prediction.toLowerCase() === 'good') {
        body.style.backgroundImage = "url('./static/js/good.jpg')";
        resultDiv.innerText = 'Air Quality: Good. You are safe. Enjoy your day!';
    } else if (result.prediction.toLowerCase() === 'poor') {
        body.style.backgroundImage = "url('./static/js/poor.jpg')";
        resultDiv.innerText = 'Air Quality: Poor. You are not safe. Suggestions: \n' +
            '- Avoid outdoor activities.\n' +
            '- Use air purifiers indoors.\n' +
            '- Wear a mask when stepping outside.\n' +
            '- Plant trees to improve local air quality.\n' +
            '- Monitor air quality using reliable sources.\n' +
            'Potential risks: Respiratory issues, irritation in the eyes, and fatigue.';
    } else {
        resultDiv.innerText = 'Error in prediction. Please try again.';
    }
}