from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
@app.route("/index")
@app.route("/index.html")
def root():
    return render_template('index.html', page_title='Home')

@app.route("/about")
@app.route("/about.html")
def about():
    return render_template('about.html', page_title='About')

@app.route("/explore")
@app.route("/explore.html")
def explore():
    return render_template('explore.html', page_title='Explore')

@app.route("/tell-your-story")
@app.route("/tell-your-story.html")
def tell_your_story():
    return render_template('tell-your-story.html', page_title='Tell Your Story')