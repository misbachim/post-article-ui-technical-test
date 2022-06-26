import axios from "axios";

const baseURL = 'http://localhost:8090/api/v1';

export const fetchArticles = async (limit, offset, status) => {
  try {
    const response = await axios.get(`${baseURL}/article/${limit}/${offset}?status=${status}`);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

export const fetchCountArticle = async (status) => {
  try {
    const response = await axios.get(`${baseURL}/article/count?status=${status}`);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

export const fetchArticle = async (articleId) => {
  try {
    const response = await axios.get(`${baseURL}/article/${articleId}`);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

export const postArticle = async (article) => {
  try {
    const response = await axios.post(`${baseURL}/article`, article);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

export const putArticle = async (article) => {
  try {
    const response = await axios.put(`${baseURL}/article/${article.id}`, article);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

export const deleteArticle = async (articleId) => {
  try {
    const response = await axios.delete(`${baseURL}/article/${articleId}`);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

