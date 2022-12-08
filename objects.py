class Story:
    def __init__(self, id, content, title="Untitled", tags=[], dayToDelete=None, approved=False, agreement=True):
        self.id = id
        self.content = content
        self.title = title
        self.tags = tags
        self.dayToDelete = dayToDelete
        self.approved = approved
        self.agreement = agreement