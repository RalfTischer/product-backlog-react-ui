//const TASK_API_URL = "https://ralftischer.pythonanywhere.com"
const TASK_API_URL = "http://127.0.0.1:5000"
//const TASK_API_URL = "http://192.168.2.111:5555"

class TaskAPI {
    constructor(baseURL = TASK_API_URL) {
        this.baseURL = baseURL;
    }

    async getAllTasks(token, sortBy = null ) {
        let q_sortBy = "";
        if (sortBy) {
            q_sortBy = "?sort_by=" + sortBy;
        };
        const response = await fetch(`${this.baseURL}/tasks${q_sortBy}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    }

    async getTaskById(token, id, sortBy) {
        const response = await fetch(`${this.baseURL}/tasks?ROWID=${id}&sort_by=${sortBy}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.json();
    }

    async createTask(token, data) {
        const response = await fetch(`${this.baseURL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async updateTask(token, id, data) {
        const response = await fetch(`${this.baseURL}/tasks?ROWID=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async deleteTask(token, id) {
        const response = await fetch(`${this.baseURL}/tasks?ROWID=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return response.json();
    }

    async login(username, password) {
        console.log("Starting login");
        
        const response = await fetch(`${this.baseURL}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username,
              password
            }),
          });

          const data = await response.json();
          console.log(data);
          
          if (data.token) {
            console.log("Login recieved", data);
            return data.token; 
          } else {
            return false;
          }
    }
}

export default TaskAPI
