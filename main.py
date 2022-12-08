import flask
import datastore

app = flask.Flask(__name__)

manager = datastore.StoryManager()
stories = manager.init_data()
random_stories = manager.random_stories(stories)
tags = ['tag1', 'tag2']


@app.route("/")
@app.route("/index")
@app.route("/index.html")
def root():
    return flask.render_template('index.html', page_title='Home', stories=random_stories)

@app.route("/about")
@app.route("/about.html")
def about():
    return flask.render_template('about.html', page_title='About')

@app.route("/explore")
@app.route("/explore.html")
def explore():
    return flask.render_template('explore.html', page_title='Explore', stories=stories, tags=tags)

@app.route("/tell-your-story")
@app.route("/tell-your-story.html")
def tell_your_story():
    return flask.render_template('tell-your-story.html', page_title='Tell Your Story', tags=tags)

@app.route("/submit", methods=['POST'])
def submit():
    content = flask.request.form.get("content")
    title = flask.request.form.get("title")
    tags = flask.request.form.get("tags")
    agreement = flask.request.form.get("agreement")

    datastore.save_story(content, title, tags, agreement)

    return flask.redirect('/tell-your-story')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)