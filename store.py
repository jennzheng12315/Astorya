class Story:
    def __init__(self, id, content, title="Untitled", tags=[], dayToDelete=None):
        self.id = id
        self.content = content
        self.title = title
        self.tags = tags
        self.dayToDelete = dayToDelete

class StoryManager:
    def __init__(self):
        pass

    def init_data(self):
        data = []
        for i in range(10):
            data.append(Story(i, f"<p>Story {i}</p>"))
        return data
