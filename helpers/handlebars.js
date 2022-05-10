import Handlebars from 'handlebars'

Handlebars.registerHelper('formatDate', formatDate)
Handlebars.registerHelper('formatValue', formatValue)


function formatDate(date) {
    const options = { hour: 'numeric', minute: 'numeric' }
    return date.toLocaleDateString('en-GB', options)
}

function formatValue(value) {
    return new Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(value)
}

export default Handlebars
