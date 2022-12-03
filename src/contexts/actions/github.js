import axios from "axios";

const URL = "http://localhost:7999/auth";
const CLIENT_ID = "e39ab73c8dbf62e29503";

export const GetCode = async () => {
  window.location.assign(`
      https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}
    `);
};

export const getAccessToken = async (code) => {
  const res = await axios.get(`${URL}/github?code=${code}`);
  const dat = res.data;
  const params = new URLSearchParams(dat);
  const json = Object.fromEntries(params.entries());
  localStorage.setItem("token", json.access_token);
  return json.access_token;
};

export const getGithubUser = async (token) => {
  if (!token) return;
  const res = await axios.get(`${URL}/getuser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchPublicRepos = async (token) => {
  if (!token) return;
  const res = await axios.get(`${URL}/getRepos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchRepoDetails = async (token, repo) => {
  if (!token) return;
  const res = await axios.get(`${URL}/getRepoDetails?repo=${repo}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchRepoContributors = async (token, repo) => {
  if (!token) return;
  const res = await axios.get(`${URL}/getRepoContributors?repo=${repo}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
