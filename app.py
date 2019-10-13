
from flask import Flask, request, jsonify
from flask_cors import CORS,cross_origin
import pandas as pd
import numpy as np
from flask import Flask, request
from flask_cors import CORS,cross_origin
import pandas as pd


app = Flask(__name__)
CORS(app, support_credentials=True)
#load csv files

recom=pd.read_csv('BPM2.csv')
recom.set_index(recom.columns[0], inplace=True)
persuade=pd.read_csv('persuade2.csv')
persuade.columns=['index','customer_id']
time=pd.read_csv('Time_hour.csv')
time.set_index('time_hour', inplace=True)
gb = time.groupby(['time_hour'])
result = gb['category_id'].unique()
fraud=pd.read_csv('fraud.csv')
fraud.set_index('customer_id',inplace=True)



def recommendation(customer_id):

    return recom.loc[customer_id].to_json()


def timehour(hour):
    return result.loc[hour].tolist()


def fraud1(customer_id):
    return fraud.loc[customer_id].to_json()


@app.route('/')
def hello():
    return "Welcome: Please put /recom for getting recommendation predictions"


@app.route('/recom',methods=['POST'])
def recommend():
    return recommendation(request.form.get('customer_id', type=int))


@app.route('/hour',methods=['POST'])
def hourtime():
    return jsonify(timehour(request.form.get('hour', type=int)))


@app.route('/persuade',methods=['GET'])
def pers():
    return persuade.loc[:10].to_json()


@app.route('/fraud',methods=['POST'])
def freud():
    return fraud1(request.form.get('customer_id', type=int))


if __name__ == '__main__':
    app.run()

