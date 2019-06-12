from flask import Flask, render_template, jsonify
from flask_mysqldb import MySQL
import pandas as pd


app = Flask(__name__)

#MySQL configurations
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'cookies25'
app.config['MYSQL_DB'] = 'HIV'
app.config['MYSQL_HOST'] = 'localhost'
mysql = MySQL(app)

@app.route('/')
def home():
    return render_template ("hiv.html")

@app.route('/life-expectancy')
def life_expectancy():
        cur = mysql.connection.cursor()
        cur.execute('SELECT Entity as Country, Code, Year, Life_Expectancy, Country_ID FROM  Life_Expectancy')
        # rv = cur.fetchall()
        life = [dict(zip(['Country', 'Code' ,'Year', 'Life Expectancy'], row)) for row in cur.fetchall()]
        # trace = {
        #     "x": life["Year"].values.tolist(),
        #     "y": life["Life_Expectancy"].values.tolist()
        # }
        return jsonify(life)

@app.route('/death')
def death():
        cur = mysql.connection.cursor()
        cur.execute('SELECT Entity, Year, `(1-4)`, `(5-14)`, `(15-49)`, `(50-69)`, `(70+)`, Country_ID FROM Death')
        
        death = [dict(zip(['Country', 'Year' ,'Ages 1-4', 'Ages 5-14', 'Ages 15-49', 'Ages 50-69', 'Ages 70+'], row)) for row in cur.fetchall()]
        
        return jsonify(death)

@app.route('/aids')
def aids():
        cur = mysql.connection.cursor()
        cur.execute('SELECT Entity, Code, Year, Deaths, New_Infections, `HIV_Incidents(tens)`, Country_ID FROM AIDS')

        aids = [dict(zip(['Country', 'Code' ,'Year', 'Death', 'New Infections', 'HIV Incidents(tens)'], row)) for row in cur.fetchall()]

        return jsonify(aids)

@app.route('/art')
def art():
        cur = mysql.connection.cursor()
        cur.execute('SELECT Entity, Code, Year, `Percent_Living_With_HIV`, Country_ID FROM ART')
        
        art = [dict(zip(['Country', 'Code' ,'Year', '% of People Living with HIV'], row)) for row in cur.fetchall()]

        
        # rv = cur.fetchall()
        return jsonify(art)


if __name__ == '__main__':
    app.run(debug=True)
