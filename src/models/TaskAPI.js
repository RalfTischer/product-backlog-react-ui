const TASK_API_URL = "https://ralftischer.pythonanywhere.com"
//const TASK_API_URL = "http://127.0.0.1:5000"
//const TASK_API_URL = "http://192.168.2.111:5555"

class TaskAPI {
    constructor(baseURL = TASK_API_URL) {
        this.baseURL = baseURL;
    }

    async getAllTasks(sortBy = null ) {
        let q_sortBy = "";
        if (sortBy) {
            q_sortBy = "?sort_by=" + sortBy;
        };
        const response = await fetch(`${this.baseURL}/tasks${q_sortBy}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }

    async getTaskById(id, sortBy) {
        const response = await fetch(`${this.baseURL}/tasks?ROWID=${id}&sort_by=${sortBy}`);
        return response.json();
    }

    async createTask(data) {
        const response = await fetch(`${this.baseURL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async updateTask(id, data) {
        const response = await fetch(`${this.baseURL}/tasks?ROWID=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async deleteTask(id) {
        const response = await fetch(`${this.baseURL}/tasks?ROWID=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.json();
    }
}

export default TaskAPI
