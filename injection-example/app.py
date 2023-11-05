# Written by: Marc Malonzo
# This is a simple quiz app that stores user scores and questions in a database.
# The app is vulnerable to SQLI due to improper sanitization of user input.

from flask import Flask, request, render_template, redirect
import sqlite3

app = Flask(
    __name__,
    template_folder='templates',
)

@app.route('/', methods=['GET'])
def root():
    return render_template('index.html')

@app.route('/quiz', methods=['POST'])
def start_quiz():
    user_name = request.form.get('name')
    if user_name:
        conn = sqlite3.connect('quiz_app.db')
        cursor = conn.cursor()
        # SQL Injection Vulnerable: 
        # x', '0'); update users set score = score + 9999 where id=1; -- Gives User Bob 9999 points
        cursor.executescript("INSERT INTO users (user_name, score) VALUES ('{0}', '{1}')".format(user_name, 0))
        conn.commit()
        conn.close()

        conn = sqlite3.connect('quiz_app.db')
        cursor = conn.cursor()
        cursor.execute('SELECT id, question_text, correct_answer FROM questions ORDER BY RANDOM() LIMIT 1')
        data = cursor.fetchone()
        question = {"quiz_id": data[0], "question_text": data[1], "correct_answer": data[2]}
        conn.close()
        return render_template('quiz.html', user_name=user_name, question=question)
    return redirect('/')

@app.route('/submit_answer', methods=['POST'])
def submit_answer():
    user_name = request.form.get('name')
    user_answer = request.form.get('answer')

    if user_name and user_answer:
        correct_answer = request.form.get('correct_answer')

        if user_answer == correct_answer:
            conn = sqlite3.connect('quiz_app.db')
            cursor = conn.cursor()
            cursor.execute('UPDATE users SET score = score + 1 WHERE user_name = ?', (user_name,))
            conn.commit()
            conn.close()

        conn = sqlite3.connect('quiz_app.db')
        cursor = conn.cursor()
        cursor.execute('SELECT score FROM users WHERE user_name = ?', (user_name,))
        score = cursor.fetchone()[0]
        conn.close()
        
    return render_template('result.html', score=score)

if __name__ == '__main__':
    app.run(host="localhost", port=8080)
