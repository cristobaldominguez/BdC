import Handlebars from 'handlebars'

Handlebars.registerHelper('formatDate', formatDate)
Handlebars.registerHelper('formatValue', formatValue)


function formatDate(date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return `${day}/${month}/${year} ${hours}:${minutes}`
}

function formatValue(value) {
    return new Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(value)
}

export default Handlebars
