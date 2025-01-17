import Swal from 'sweetalert2'
import moment from 'moment'

export async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const getYearList = (
  sort = 'asc',
  fromYear = 1950,
  toYear = new Date().getFullYear()
) => {
  let yearList = []
  for (let year = fromYear; year <= toYear; year++) {
    yearList.push(year)
  }
  if (sort === 'desc') {
    yearList.reverse()
  }

  return yearList
}

export function simpleAlert(text, outsideClose = true) {
  Swal.fire({
    title: text,
    allowOutsideClick: outsideClose,
    showCloseButton: true
  })
}

function defaultAlertTitle(type) {
  switch (type) {
    case 'success':
      return 'Success'
    case 'error':
      return 'Failed'
    case 'warning':
      return 'Warning'
    case 'info':
      return 'Information'
    default:
      return 'Notification'
  }
}

//Notif Handle//

export function showAlert(event = {}, outsideClose = true) {
  const isTitle = event.title || defaultAlertTitle(event.type)
  const timer = event.timer || 3000 // Timer for automatic closing
  const showCloseButton =
    event.showCloseButton !== undefined ? event.showCloseButton : true // Option to show close button
  const showConfirmButton = event.confirm ? true : false // Option to show cancel button
  const confirmButtonText = event.confirmLabel || 'Ok'
  const showCancelButton = event.cancel ? true : false // Option to show cancel button
  const cancelButtonText = event.cancelLabel || 'Batal' // Custom cancel button text

  Swal.fire({
    title: isTitle,
    text: event.text,
    icon: event.type,
    footer: event.footer,
    allowOutsideClick: outsideClose,
    showCloseButton: showCloseButton,
    showConfirmButton: showConfirmButton,
    confirmButtonText: confirmButtonText,
    showCancelButton: showCancelButton,
    cancelButtonText: cancelButtonText,
    timer: timer
  })
}

export function toastAlert(event = {}) {
  Swal.fire({
    position: 'top-end',
    icon: event.type,
    title: event.title,
    text: event.text,
    footer: event.footer,
    showConfirmButton: false,
    showCloseButton: event.close || false,
    allowOutsideClick: true,
    timer: event.timer || 1500
  })
}

export function confirmAlert(event = {}, outsideClose = false) {
  return Swal.fire({
    title: event.title,
    text: event.text,
    icon: event.type,
    showCancelButton: 'cancel' in event ? event.cancel : true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: event.cancelLabel || 'Batal',
    confirmButtonText: event.confirmLabel || 'Ok',
    allowOutsideClick: outsideClose,
    footer: event.footer
  })
}

export function loadingAlert(event = {}) {
  const textload = event.text || 'Memproses permintaan...'
  Swal.fire({
    allowOutsideClick: false,
    title: event.title,
    html: textload,
    footer: event.footer,
    timer: event.timer || false,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    }
  })
}

export function textAlert(event = {}) {
  const isText = event.text ? event.text : ''
  const actions = {
    new: `Data ${event.data} telah berhasil dibuat. ${isText}`,
    update: `Data ${event.data} telah berhasil diperbarui. ${isText}`,
    delete: `Data ${event.data} telah berhasil dihapus. ${isText}`,
    err_respone: `Gagal memproses data ${event.data}. ${isText}`,
    warning: `Gagal memproses data ${event.data}. ${isText}`,
    err_process: `Gagal memproses data ${event.data}. Silakan periksa data yang dikirim atau coba lagi. ${isText}`,
    error: `Gagal memproses data ${event.data}. Silakan periksa data yang dikirim atau coba lagi. ${isText}`,
    confirm_delete: `Apakah Anda yakin ingin menghapus data ${event.data}? ${isText}`,
    success: `Permintaan untuk ${event.data} telah berhasil diproses. ${isText}`,
    confirm_copy: `Apakah Anda yakin ingin menduplikasi data ${event.data}? ${isText}`,
    copy: `Data ${event.data} telah berhasil diduplikasi. ${isText}`
  }

  return actions[event.type] || ''
}

export function isValidURL(string) {
  const regex = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([\/a-zA-Z0-9#?.=&%~-]*)*$/;
  return regex.test(string)
}

export const getFirstName = (name) => {
  if (!name) return 'User'
  return name.trim().split(' ')[0]
}

export const stringToCapitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function dateFormat(
  value,
  format = 'DD/MM/YYYY hh:mm',
  isTimestamp = false
) {
  return isTimestamp
    ? moment.unix(value).format(format)
    : moment(value).format(format)
}

export function isValidDate(date) {
  return moment(date, 'YYYY-MM-DD', true).isValid()
}

export function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
}
export function isInArray(value, array) {
  return Array.isArray(array) && array.includes(value)
}

export function getYoutubeId(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?.*v=)|youtu\.be\/)([^&?\/\s]+)/
  const match = url.match(regex)
  return match ? match[1] : null
}

export const copyToClipboard = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
    showAlert({ type: 'success', text: 'Text copied to clipboard!' });
  } catch (err) {
    showAlert({ type: 'error', text: 'Failed to copy text. Please try again.' });
  }
};
