import axios from 'axios';

const GITHUB_URL = `https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}`;
const GITHUB_TOKEN = `token ${process.env.GITHUB_TOKEN}`;

export const githubApi = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});
