from flask import Flask, render_template
from store import StoryManager

app = Flask(__name__)

manager = StoryManager()
stories = manager.init_data()
random_stories = manager.random_stories(stories)
tags = ['tag1', 'tag2']

@app.route("/")
@app.route("/index")
@app.route("/index.html")
def root():
    return render_template('index.html', page_title='Home', stories=random_stories)

@app.route("/about")
@app.route("/about.html")
def about():
    return render_template('about.html', page_title='About')

@app.route("/explore")
@app.route("/explore.html")
def explore():
    return render_template('explore.html', page_title='Explore', stories=stories, tags=tags)

@app.route("/tell-your-story")
@app.route("/tell-your-story.html")
def tell_your_story():
    return render_template('tell-your-story.html', page_title='Tell Your Story', tags=tags)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)