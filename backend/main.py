from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, field_validator
from typing import Literal

app = FastAPI()

class Application(BaseModel):
    company: str
    position: str
    status: str
    
class StatusUpdate(BaseModel):
    status:Literal["Applied", "Interview", "Rejected"]
    
    @field_validator("status", mode="before")
    def normalize_status(cls, value):
        return value.capitalize()
    
applications = [
        {
            "id":1,
            "company":"Volvo",
            "position": "Frontend",
            "status":"applied"
         },
        {
            "id":2,
            "company":"Ericsson",
            "position":"Backend",
            "status": "Interview"
        }]

@app.get("/applications")
def get_applications():
    return applications
    
@app.post("/applications")
def add_application(incoming_application:Application):
    new_application = incoming_application.model_dump()
    new_application["id"] = len(applications)+1
    applications.append(new_application)
    return new_application
    
@app.delete("/applications/{id}")
def delete_application(id:int):
    for application in applications:
        if (application["id"] == id):
            applications.remove(application)
            return("success")
        
    raise HTTPException(status_code = 404, detail= "item not found")

@app.patch("/applications/{id}")
def update_status(id:int, incoming_status:StatusUpdate):
    for application in applications:
        if (application["id"] == id):
            application["status"] = StatusUpdate.status
            return("succesfully updated the status")
        
    raise HTTPException(status_code = 404, detail="item not found")
    
    
    