# Written by: Marc Malonzo
# This is a simple app that takes a number and returns the number + 10. 
# It also logs the request to a file.
# The app is vulnerable to log injection due to improper logging.

from flask import Flask, request, render_template

app = Flask(
    __name__,
    template_folder='templates',
)

log_file = open('app.log', 'a')

@app.route('/', methods=['GET'])
def root():
    log_file.write("200 INFO: GET /\n")
    log_file.flush()
    return render_template('index.html')

@app.route('/number', methods=['GET'])
def get_number():
    number = request.args.get('number')
    try:
      result = int(number)
      log_file.write("200 INFO: GET /number?number=" + number + '\n')
      log_file.flush()
      return render_template('index.html', result = result + 10)
    except ValueError:
      # This is vulnerable to log injection due to log format and since 
      # the value of number can be manipulated
      # As an example you can use the URL to create a fake log:
      # http://127.0.0.1:8080/number?number=c%0A200%20INFO%3A+GET+%2Fnumber%3Fnumber%3Dnotreallog
      log_file.write("400 ERROR: Failed to parse value GET /number?number=" + number + '\n')
      log_file.flush()
      return render_template('index.html', result = 'Invalid number')
      

if __name__ == '__main__':
  app.run(host="localhost", port=8080)
