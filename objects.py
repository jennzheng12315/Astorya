class Story:
    def __init__(self, id, content, title="Untitled", tags=[], dayToDelete=None):
        self.id = id
        self.content = content
        self.title = title
        self.tags = tags
        self.dayToDelete = dayToDelete