from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Skin type data
skin_type_data = {
    "oily": {
        "recommended": ["Salicylic Acid", "Niacinamide", "Clay"],
        "avoid": ["Heavy Oils"]
    },
    "dry": {
        "recommended": ["Hyaluronic Acid", "Glycerin", "Ceramides"],
        "avoid": ["Alcohol"]
    },
    "combination": {
        "recommended": ["Niacinamide", "Green Tea"],
        "avoid": ["Heavy Oils"]
    },
    "normal": {
        "recommended": ["Vitamin C", "Aloe Vera"],
        "avoid": ["Harsh Alcohol"]
    },
    "sensitive": {
        "recommended": ["Centella Asiatica", "Oat Extract"],
        "avoid": ["Fragrance", "Alcohol"]
    }
}

# Concern data
concern_data = {
    "acne": ["Salicylic Acid", "Tea Tree"],
    "pigmentation": ["Vitamin C", "Alpha Arbutin"],
    "aging": ["Retinol", "Peptides"],
    "dryness": ["Hyaluronic Acid"],
    "redness": ["Allantoin"],
    "darkspots": ["Kojic Acid"]
}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/recommend", methods=["POST"])
def recommend():

    data = request.json
    skin_type = data["skinType"]
    concerns = data["concerns"]

    recommended = set(skin_type_data[skin_type]["recommended"])
    avoid = set(skin_type_data[skin_type]["avoid"])

    for concern in concerns:
        recommended.update(concern_data.get(concern, []))

    recommended = list(recommended - avoid)

    return jsonify({
        "recommended": recommended,
        "avoid": list(avoid)
    })

if __name__ == "__main__":
    app.run(debug=True)