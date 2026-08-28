from abc import ABC, abstractmethod

class NotebookRepository(ABC):
    @abstractmethod
    def get_all(self):
        pass