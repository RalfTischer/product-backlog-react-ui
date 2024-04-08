# Product Backlog React UI

By Ralf Tischer, 2023-2024.

React user interface to work with simplified product backlogs.
Application code and `README.md` documentation are _work in progress_.

<!-- MD-TOC START LEVEL 1 -->

## Table of Contents

- [TODO](#todo)
- [Links](#links)
- [Technical Background](#technical-background)
- [Available Scripts](#available-scripts)
- [Author](#author)

<!-- MD-TOC END --> 

# TODO

* Responsive design, hamburger menu (see code below)
* Next time: Mobile first!
* [User login](https://www.perplexity.ai/search/Implement-a-user-MD3mJx7ETuWIxXuyFeVAKA) 
* Allow multiple projects
* Rethink where to place new tasks

```js
// Hamburger menu

import React, { useState } from 'react';

function TaskItem({ myKey, myTask, onEdit, onDelete, onDownwards, onUpwards, onToTop }) {
  const [showTaskActions, setShowTaskActions] = useState(false);

  const toggleTaskActions = () => {
    setShowTaskActions(!showTaskActions);
  };

  return (
    <div key={myKey} onDoubleClick={onEdit}>
      <div className="task-info">
        <div className="task-info-main">
          <div className="task-cell task-task">{myTask.task}</div>
        </div>
        <div className="task-info-sub">
          <div className="task-cell task-pos">{myTask.pos}</div>
          <div className="task-cell task-prio">{myTask.prio}</div>
          <div className="task-cell task-time">{myTask.time}</div>
          <div className="task-cell task-status">{myTask.status}</div>
          <div className="task-cell task-actions">
            <button onClick={toggleTaskActions} className={showTaskActions ? 'hide-on-large' : ''}>
              &#9776;
            </button>
          </div>
        </div>
      </div>
      <div className={`task-cell task-action-cell ${showTaskActions ? '' : 'hide-on-large'}`}>
        <div className="task-action">
          <button className="task-button" onClick={onEdit}>
            |...|
          </button>
          <button className="task-button" onClick={onDelete}>
            |←
          </button>
          <button className="task-button" onClick={onDownwards}>
            ▼
          </button>
          <button className="task-button" onClick={onUpwards}>
            ▲
          </button>
          <button className="task-button" onClick={onToTop}>
            ▲▲
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
```

```css
/* Hamburger menu */

/* Small screens */
.task-cell.task-action-cell {
  display: none;
}

.hide-on-large {
  display: block;
}

/* Large screens */
@media (min-width: 768px) {
  .task-cell.task-action-cell {
    display: block;
  }

  .hide-on-large {
    display: none;
  }
}
```

# Links

* Product Backlog UI on GitHub Pages: [https://ralftischer.github.io/product-backlog-react-ui/](https://ralftischer.github.io/product-backlog-react-ui/)
* Product Backlog Backend GitHub (private) repository: [https://github.com/RalfTischer/product-backlog-flask-api](https://github.com/RalfTischer/product-backlog-flask-api)

# Technical Background

The [React app](https://ralftischer.github.io/product-backlog-react-ui/) calls a Flask API to access a simple SQLite database.


# Available Scripts

In the project directory, you can run:

## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## `npm run deploy`

Deploy project tp GitHub Pages to the `gh-pages` branch of this repository.


 ```bash
 $ npm run deploy -- -m "Deploy React app to GitHub Pages"
 ```

## `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

# Author
Ralf Tischer
2023-2024
