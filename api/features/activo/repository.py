from abc import ABC, abstractmethod

class ActivoRepository(ABC):
    @abstractmethod
    def get_all(self):
        pass

    @abstractmethod
    def get_by_id(self, activo_id: int):
        pass

    @abstractmethod
    def create(self, activo_data: dict):
        pass
    
    @abstractmethod
    def update(self, activo_id: int, activo_data: dict):
        pass
    
    @abstractmethod
    def delete(self, activo_id: int):
        pass