const axios = require('axios');

class Jira {
    constructor({ protocol, host, email, token }) {
        // Validate required parameters.
        if (!protocol) {
            throw new Error('Jira protocol is required.');
        }

        if (!host) {
            throw new Error('Jira host is required.');
        }

        if (!email) {
            throw new Error('Jira email is required.');
        }

        if (!token) {
            throw new Error('Jira token is required.');
        }

        // Create an axios instance.
        this._requester = axios.create({
            baseURL: `${protocol}://${host}`
        });

        // Base64 encode.
        this._auth = Buffer.from(`${email}:${token}`).toString('base64')

        // Modify axios instance default to include Authorization header.
        this._requester.defaults.headers.common['Authorization'] = `Basic ${this._auth}`;
    }

    getVersions(projectId) {
        if (!projectId) {
            throw new Error('projectId is required.');
        }

        return this._requester.get(`/rest/api/3/project/${projectId}/versions`)
            .then(response => response.data)
            .catch((err) => {
                throw new Error('Failed to fetch versions');
            });
    }

    async getUnreleasedVersions(projectId) {
        if (!projectId) {
            throw new Error('projectId is required.');
        }

        const versions = await this.getVersions(projectId);
        const unreleasedVersions = versions.filter(version => !version.released && !version.archived);

        return unreleasedVersions;
    }
}

module.exports = Jira;
