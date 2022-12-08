from objects import Story
import random

class StoryManager:
    def __init__(self):
        pass

    def init_data(self):
        data = []
        for i in range(20):
            s = "<p>Story" + str(i) + "</p>"
            data.append(Story(i, s, "title"+str(i), ["tag1", "tag2", "tag3"]))
        return data
    
    def random_stories(self, stories):
        selected = []
        for i in range(5):
            num = random.randint(0, len(stories)-1)
            while num in selected:
                num = random.randint(0, len(stories)-1)
            selected.append(num)
        return [stories[selected[0]], stories[selected[1]], stories[selected[2]], stories[selected[3]], stories[selected[4]]]
