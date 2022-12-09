import objects
import random
from google.cloud import datastore

_STORY_ENTITY = "Story"
_TAGS_ENTITY = "Tag"

def _get_client():
    return datastore.Client()

def _load_key(client, entity_type, entity_id=None):
    """Load a datastore key using a particular client, and if known, the ID.
    Note that the ID should be an int - we're allowing datastore to generate
    them in this example."""

    key = None
    if entity_id:
        key = client.key(entity_type, entity_id)
    else:
        # this will generate an ID
        key = client.key(entity_type)
    return key

def _load_entity(client, entity_type, entity_id):
    """Load a datstore entity using a particular client, and the ID."""

    key = _load_key(client, entity_type, entity_id)
    entity = client.get(key)
    return entity

def _entity_to_story(entity):
    """Translate the entity to a regular old Python object."""

    id = entity['id']
    content = entity['content']
    title = entity['title']
    tags = entity['tags']
    dayToDelete = entity['dayToDelete']
    approved = entity['approved']
    agreement = entity['agreement']

    arr = tags.split(',')
    temp = []
    for x in arr:
        temp.append(x)
    tags = temp

    story = objects.Story(id, content, title, tags, dayToDelete, approved, agreement)

    return story

def load_story(id):
    """Load a story from the datastore, based on the id."""

    client = _get_client()
    entity = _load_entity(client, _STORY_ENTITY, id)
    story = _entity_to_story(entity)

    return story


def save_story(content, title, tags, agreement, dayToDelete=None):
    """Save the story to the datastore."""

    client = _get_client()
    key = _load_key(client, _STORY_ENTITY)
    entity = datastore.Entity(key)
    entity['id'] = entity.key.id
    entity['content'] = content
    entity['title'] = title
    entity['tags'] = tags
    entity['dayToDelete'] = dayToDelete
    entity['approved'] = False
    entity['agreement'] = agreement

    client.put(entity)

    all_tags = load_all_tags()
    tags_arr = tags.split(',')
    for tag in tags_arr:
        if tag not in all_tags:
            save_tag(tag)

def save_tag(tag):
    """Save the tag to the datastore"""
    client = _get_client()
    entity = datastore.Entity(_load_key(client, _TAGS_ENTITY))
    entity["name"] = tag
    entity["approved"] = False
    client.put(entity)

def load_random_stories():
    stories = load_all_stories()
    random_stories = []

    num_of_stories = 5
    if len(stories) <= num_of_stories:
        return stories

    for i in range(num_of_stories):
        index = random.randint(0, len(stories)-1)
        while index in random_stories:
            index = random.randint(0, len(stories)-1)
        random_stories.append(index)
    
    for i in range(5):
        random_stories[i] = stories[random_stories[i]]
    
    return random_stories

def load_all_stories():
    """Load all of the stories."""

    client = _get_client()
    q = client.query(kind=_STORY_ENTITY)
    q.add_filter('approved', '=', True)

    result = []
    for story in q.fetch():
        story_obj = _entity_to_story(story)
        result.append(story_obj)
    return result

def load_all_tags():
    """Load all of the tags"""

    client = _get_client()
    q = client.query(kind=_TAGS_ENTITY)
    q.add_filter('approved', '=', True)


    result = []
    for tag in q.fetch():
        result.append(tag['name'])
    return result

class StoryManager:
    def __init__(self):
        pass

    def init_data(self):
        data = []
        for i in range(20):
            s = "<p>Story" + str(i) + "</p>"
            data.append(objects.Story(i, s, "title"+str(i), ["tag1", "tag2", "tag3"]))
        return data
    
    def random_stories(self, stories):
        selected = []
        for i in range(5):
            num = random.randint(0, len(stories)-1)
            while num in selected:
                num = random.randint(0, len(stories)-1)
            selected.append(num)
        return [stories[selected[0]], stories[selected[1]], stories[selected[2]], stories[selected[3]], stories[selected[4]]]
