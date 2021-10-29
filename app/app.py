from logging import error
from flask import Flask, g, request, jsonify, abort, session, redirect
from flask_bcrypt import check_password_hash
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import psycopg
from werkzeug.security import generate_password_hash, check_password_hash
from os import environ


# load the environment variables for loading database password kind of things
load_dotenv()
host = environ['POSTGRES_HOST']
dbname = environ['POSTGRES_DB']
user = environ['POSTGRES_USER']
password = environ['POSTGRES_PASSWORD']
app = Flask(__name__)
app.secret_key = environ['SESSION_SECRET']
CORS(app, origins=['http://localhost:3000'], support_credentials=True)


def get_db():
    if 'db' not in g:
        g.db = psycopg.connect(f'host={host} dbname={dbname} user={user} password={password}',
                               row_factory=psycopg.rows.dict_row)

    return g.db


def single_query(query_string, params, returner):
    conn = get_db()
    with conn.cursor() as cur:
        cur.execute(query_string, params)
        ans = returner(cur)
        conn.commit()
    return ans


def fetchone(cur): return cur.fetchone()
def fetchall(cur): return cur.fetchall()
def rowcount(cur): return cur.rowcount

@app.route("/")
@cross_origin(supports_credentials=True)
def Hello():
    return jsonify({'name': 'Hello', 'admin': True, 'fav': 32})


@app.route("/signup", methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def signup():
    # passing variables from frontend
    email = request.json['user']
    password = request.json['userpass']
    typeuser = request.json['typeuser']
    # Hashing of password and storing them in database
    p_hash = generate_password_hash(password)
    # p_hash=password
    res = single_query(
        '''SELECT email FROM users WHERE email = %s;''', (email,), rowcount)
    if res == 0:
        res = single_query('''INSERT INTO users(email,password,typeuser) VALUES(%(email)s,%(password)s,%(typeuser)s)''', {
                           'email': email, 'password': p_hash, 'typeuser': typeuser}, lambda cur: cur.rowcount)
        return jsonify(error=False)
    else:

        return jsonify(error=True)


@app.route("/login", methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def login():
    username = request.json['user']
    password = request.json['userpass']    
    res = single_query(
        '''SELECT email FROM users WHERE email = %s;''', (username,), rowcount)
    # print(username, password, res)
    if res == 1:
        result = single_query(
            '''SELECT password FROM users WHERE email = %s;''', (username,), fetchone)
        if(check_password_hash(result['password'],password)):
            session['email'] = username
            session['password']=password
            
            # session['password'] = password
            typeuser = single_query('''SELECT typeuser FROM users WHERE email= %s''',
                                    (username,), fetchall)
            print(typeuser[0]['typeuser'])
            return jsonify(typeuser=typeuser[0]['typeuser'], error=False)
        else:
            return jsonify(error=True)
    else:
        abort(400, 'No matches found in Database')


if __name__ == "__main__":
    app.run(debug=True)
