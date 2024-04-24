//const TASK_API_URL = "https://ralftischer.pythonanywhere.com"
const TASK_API_URL = "http://127.0.0.1:5000"
//const TASK_API_URL = "http://192.168.2.111:5555"

class TaskAPI {
    constructor(baseURL = TASK_API_URL) {
        this.baseURL = baseURL;
    }

    async getAllLists(token, sortBy = null) {
        let url = `${this.baseURL}/lists`; 
        
        // Add sort by
        if (sortBy) {
            url += "&sort_by=" + sortBy;
        };

        console.log("url:", url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        return await response.json();
    }

    async getAllTasks(token, plList = 0, sortBy = null) {
        let url = `${this.baseURL}/tasks` + "?list_id=" + plList; 
        
        // Add sort by
        if (sortBy) {
            url += "&sort_by=" + sortBy;
        };

        console.log("url:", url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        return await response.json();
    }

    async getTaskById(token, id, sortBy) {
        const response = await fetch(`${this.baseURL}/tasks?ROWID=${id}&sort_by=${sortBy}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        return response.json();
    }

    async createTask(token, data) {
        const response = await fetch(`${this.baseURL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
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
                'Authorization': token
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
                'Authorization': token
            },
        });
        return response.json();
    }

    async login(username, password) {
        console.log("Starting login");

        if (!username || !password) {
            return false;
        }
        
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
        
        if (data && data.message === "Login succesful" && data.token) {
        console.log("Login successful.");
        return data;
        } else {
        console.log("Login incorrect.");
        return data;
        }
    }
}

export default TaskAPI;
