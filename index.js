const express = require('express')
const os = require('os')


if (os.platform == 'linux')
    process.env.java8_home = "/home/aguavista/public_html/openlogic-openjdk-8u402-b06-linux-x64";

process.env.TZ = "America/Asuncion";

const env = 'test';

const app = express()
const port = env == 'test' ? 3001 : 3000;

//grupo de rutas
const CustomerRoutes = require('./Routes/Customer')
const InvoiceRoutes = require('./Routes/Invoice')
const FullInvoiceRoutes = require('./Routes/FullInvoice')
const PaymentsRoutes = require('./Routes/Payments')
const MetadataRoutes = require('./Routes/MetaData')
const SourcesRoutes = require('./Routes/Sources')
const FacturacionElectronicaRoutes = require("./Routes/FacturacionElectronica");
const e = require('express');


app.use(express.json());




app.use('/customers', CustomerRoutes)
app.use('/invoices', InvoiceRoutes)
app.use('/fullinvoices', FullInvoiceRoutes)
app.use('/payments', PaymentsRoutes)
app.use('/facturacion-electronica', FacturacionElectronicaRoutes)

app.use('/test', MetadataRoutes)


//FUENTES DE DATOS
app.use('/sources', SourcesRoutes);



app.listen(port, (err) => {

    if (err) console.log("Error in server setup", err);
    else
        console.log(`AGUAVISTA & SAP - API is listening on port ${port}`)
});

// set the request timeout to 5 seconds
//app.requestTimeout = 60000;