from flask import Flask, render_template, jsonify
from flask_mysqldb import MySQL
import pandas as pd
import json

app = Flask(__name__)

#MySQL configurations
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'cookies25'
app.config['MYSQL_DB'] = 'HIV_AIDS'
app.config['MYSQL_HOST'] = 'localhost'
mysql = MySQL(app)

@app.route('/')
def home():
        return render_template ("hiv.html")

@app.route('/treatment')
def treatment():
        return render_template("treatments.html")

@app.route('/donate')
def donate():
        return render_template("donate.html")

@app.route('/prevention')
def prevention():
        return render_template("preventions.html")

@app.route('/death')
def death():
        return render_template("deaths.html")


@app.route('/life-expectancy')
def life_expectancy():
        cur = mysql.connection
        df = pd.read_sql('SELECT Entity, Year, Life_Expectancy FROM  Life_Expectancy', cur)

        jsonfiles = json.loads(df.to_json(orient='records'))

        return jsonify(jsonfiles)

@app.route('/deaths')
def deaths():
        cur = mysql.connection

        df = pd.read_sql('SELECT Entity, Year, Toddlers, Teens, Adults, Retired, Elderly FROM Death', cur)

        jsonfiles = json.loads(df.to_json(orient='records'))

        return jsonify(jsonfiles)
 

@app.route('/aids')
def aids():
        cur = mysql.connection
        
        df = pd.read_sql('SELECT Entity, Year, Deaths FROM AIDS', cur)

        jsonfiles = json.loads(df.to_json(orient='records'))
        return jsonify(jsonfiles)

@app.route('/art')
def art():
        cur = mysql.connection

        df = pd.read_sql('SELECT Entity,Year, `Percent_Living_With_HIV` FROM ART', cur)

        jsonfiles = json.loads(df.to_json(orient='records'))
        return jsonify(jsonfiles)


if __name__ == '__main__':
    app.run(debug=True)