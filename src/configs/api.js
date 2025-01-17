import axios from 'axios'
import qs from 'qs'
import { sleep, showAlert } from '@/helpers'
import store from '@/configs/store'

const is_production = true
export const api_url = is_production
  ? 'http://localhost/fotivault.api'
  : 'http://localhost/fotivault.api'

const openAiConfig = {
  key: import.meta.env.VITE_BOT_API_KEY,
  url: 'https://api.openai.com/v1/chat/completions',
}

function getHeaderData(attribute = null) {
  const stateAuth = store.getters.stateAuth
  const api_public_secret = '';
  const api_private_secret = null
  const contentType =
    attribute && attribute.urlencoded ? 'application/x-www-form-urlencoded' : ''
  const headers = {
    'X-Token-Public': api_public_secret,
    ...(api_private_secret && { 'X-Token-Private': api_private_secret }),
    ...(contentType && { 'Content-Type': contentType })
  }
  return headers
}

function handleResponseData(response = null, type = 'error') {
  const msgError =
    'Gagal memuat data atau memproses permintaan (silakan periksa juga koneksi internet Anda)'
  const msgSuccess = 'Berhasil memuat data atau memproses permintaan'
  let msg = type === 'success' ? msgSuccess : msgError
  let data = null,
    attribute = null,
    isSuccess = false,
    title = 'Failed!',
    reLogin = false

  if (response) {
    if (response.data) {
      const responseData = response.data
      msg = responseData.message ? `${responseData.message}` : msg
      const resDataInner = responseData.data
      const resultData = resDataInner?.result || resDataInner

      if (type === 'error') {
        if ('is_authorized' in responseData && !responseData.is_authorized) {
          msg = 'Akses login telah kedaluwarsa atau akun tidak lagi tersedia'
          showAlert({ type: 'warning', title: 'Not Allowed', text: msg })
          store.commit('destroyAuth')
          window.location.href = '/login'
        }
      } else {
        isSuccess = true
        title = 'Success!'
        data = resultData
        attribute = {
          count:
            resDataInner.total_rows ||
            (resultData.length ? resultData.length : 0),
          limit: resDataInner.per_page || 20
        }
      }
    }
  }

  return { success: isSuccess, type, title, msg, data, attribute, reLogin }
}

export async function fetchData(
  method = 'get',
  url = '',
  data = null,
  attribute = null
) {
  if (!url) {
    return handleResponseData(null, 'error')
  }

  const setHeader = getHeaderData(attribute)
  const setData = attribute && attribute.urlencoded ? qs.stringify(data) : data
  await sleep(200)

  let fetchCall
  switch (method) {
    case 'get':
      fetchCall = getData(url, setHeader)
      break
    case 'post':
      fetchCall = postData(url, setHeader, setData)
      break
    case 'put':
      fetchCall = putData(url, setHeader, setData)
      break
    case 'del':
      fetchCall = delData(url, setHeader)
      break
    case 'delete':
      fetchCall = deleteData(url, setHeader, setData)
      break
    case 'blob':
      return getBlob(url, setHeader)
    default:
      return handleResponseData(null, 'error')
  }

  if (fetchCall) {
    return fetchCall
      .then((response) => {
        return !response.data.error
          ? handleResponseData(response, 'success')
          : handleResponseData(response, 'warning')
      })
      .catch((error) => {
        return handleResponseData(error.response, 'error')
      })
  } else {
    return handleResponseData(null, 'error')
  }
}

export function getData(url, header = '') {
  return axios.get(`${api_url}/${url}`)
}

export function postData(url, header = '', data = null) {
  return axios.post(`${api_url}/${url}`, data)
}

export function delData(url, header = '') {
  return axios.post(`${api_url}/${url}`, '')
}

export function deleteData(url, header = '', data = null) {
  const readyData = data && Object.keys(data).length !== 0
  return axios.delete(`${api_url}/${url}`, {
    data: readyData ? data : undefined,
  })
}

export function getBlob(url, header = '') {
  return axios.get(`${api_url}/${url}`, {
    responseType: 'blob'
  })
}

export async function downloadBlob(blob, fileName = 'file') {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export const sendMessageToOpenAI = async (messages) => {
  try {
    const response = await axios.post(
      openAiConfig.url,
      {
        model: 'gpt-4o',
        messages: messages,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${atob(openAiConfig.key)}`,
        },
      }
    );
    return {success: true, msg:'Message ready', respone: response.data.choices[0].message.content}
  } catch (error) {
    return {success: false, msg:'Failed send message', respone: error}
  }
};