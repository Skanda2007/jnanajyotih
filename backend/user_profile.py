class UserProfile:
    def __init__(self):
        self.skill_score = 50  # starts neutral
        self.common_errors = set()

    def update(self, user_input: str):
        if any(word in user_input.lower() for word in ["vibhakti", "lakāra", "kāraka"]):
            self.skill_score += 5
        if len(user_input.split()) < 4:
            self.skill_score -= 2

        self.skill_score = max(0, min(100, self.skill_score))
