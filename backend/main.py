from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Application(BaseModel):
    company: str
    position: str
    status: str
    
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
def update_status(id:int):
    
    
    