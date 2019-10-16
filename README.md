# jira-js

## Installation

Install with npm:

```
npm install --save jvu009/jira-js
```

## Examples

### Create the JIRA client

```js
const JiraClient = require('jira-js');

const jira = new JiraClient({
    protocol: 'https',
    host: 'yourdomain.atlassian.net',
    email: 'your.email@yourdomain.com',
    token: 'your-jira-api-token'
});
```

### Get all unreleased versions

```js
const PROJECT_ID = '1000';

jira.getUnreleasedVersions(PROJECT_ID)
    .then((versions) => {
        console.log(versions)
    })
    .catch(console.error);
```
