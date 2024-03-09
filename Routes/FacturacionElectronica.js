const express = require('express');
const { generarXML, firmarXML, enviarDE, enviarLoteDE, consultarRUC, crearEntradaFacturaEnProceso, listarEntradasFactura, eliminarEntradaFactura, generarQR, consultarLote } = require('../FacturacionElectronica/DocumentoElectronico');
const kudegen = require('facturacionelectronicapy-kude');

const { performance } = require('perf_hooks');
const fs = require('fs');
const xml = require('xml');

var router = express.Router();

var env = "test";


router.get('/envios', function(req, res) {

    //query params
    let queryparam = req.query ? req.query : {};
    try {
        const result = listarEntradasFactura(queryparam);
        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({ status: false, message: String(err) })
    }

});
router.delete('/envios/:DocEntry', function(req, res) {


    const routeparams = req.params ? req.params : {};
    let DocEntry = routeparams.DocEntry

    try {
        const result = eliminarEntradaFactura(DocEntry);
        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({ status: false, message: String(err) })
    }

});


router.post('/generar-xml', async function(req, res) {
    //recibir post data
    const payload = req.body;
    //generar xml ..
    try {
        let xmlContent = await generarXML(payload);

        res.status(200).json(xmlContent);

    } catch (e) {
        res.status(200).json({ status: false, message: String(e) });
    }

});
router.post('/firmar-xml', async function(req, res) {

    //recibir post data
    const payload = req.body;

    //generar xml ..
    try {
        let xmlContentResult = await generarXML(payload);
        let xmlContent = xmlContentResult.message;
        if (xmlContentResult.status === false)
            res.status(200).json(xmlContentResult);
        else {

            let xmlSIgned = await firmarXML(xmlContent);
            /*  if (xmlSIgned.status) {
                 res.set('Content-Type', 'text/xml');
                 res.send(xml(xmlSIgned.message));
             } else */
            res.status(200).json(xmlSIgned);

        }

    } catch (e) {
        res.status(200).json({ status: false, message: String(e) });

    }

});

router.post('/generar-kude', async function(req, res) {

    //recibir post data
    const payload = req.body;

    //generar xml ..
    try {
        let xmlContentResult = await generarXML(payload);
        let xmlContent = xmlContentResult.message;
        if (xmlContentResult.status === false)
            res.status(200).json(xmlContentResult);
        else {

            let xmlSIgnedResult = await firmarXML(xmlContent);
            if (xmlSIgnedResult.status === false)
                res.status(200).json(xmlSIgnedResult);
            else {
                //obtener KUDE
                let java8path = "C:\\java\\jdk1.8.0_321";
                let xmlSigned = xmlSIgnedResult.message.trim();
                let urlLogo = "";
                let ambiente = env;
                const kuderesult = await kudegen.default.generateKUDE(java8path, xmlSigned,
                    "C:\\XAMP_PROJ_BCKS\\agua_vista_sap_node\\node_modules\\facturacionelectronicapy-kude\\dist\\DE",
                    "C:\\Users\\proye\\Downloads", "");


                res.json(kuderesult);

            }

        }

    } catch (e) {
        res.status(200).json({ status: false, message: String(e) })

    }

});

router.post('/generar-qr', async function(req, res) {

    //recibir post data
    const payload = req.body;

    //generar xml ..
    try {
        let xmlContentResult = await generarXML(payload);
        let xmlContent = xmlContentResult.message;
        if (xmlContentResult.status === false)
            res.status(200).json(xmlContentResult);
        else {

            let xmlSIgnedResult = await firmarXML(xmlContent);
            if (xmlSIgnedResult.status === false)
                res.status(200).json(xmlSIgnedResult);
            else {
                let xmlSigned = xmlSIgnedResult.message;
                let qrresultxml = await generarQR(xmlSigned);
                res.status(200).json(qrresultxml);
            }

        }

    } catch (e) {
        res.status(200).json({ status: false, message: String(e) })

    }

});

router.post('/generar-pdf', async function(req, res) {


    try {
        const response = "<h1>Hello</h1>";
        const htmlContent = response;
        pdf.create(htmlContent).toFile(".", (err, res) => {
            if (err) return console.log(err);
            console.log('PDF generated successfully:', res);
        });
    } catch (error) {
        console.error('Error fetching URL:', error);
    }
    res.send('saved')

});





//enviar...
router.post('/enviar-lote-xmlsigned', async function(req, res) {


    //recibir post data
    const payload = req.body;
    if (!('xmls' in payload)) res.status(200).json({ status: false, message: "EL CONTENIDO DE XML FIRMADO ES OBLIGATORIO" });
    else {
        let codigosInternos = Object.keys(payload.xmls);
        let xmls = Object.values(payload.xmls);


        try {
            var t0 = performance.now();
            let sentResult = await enviarLoteDE(xmls, codigosInternos);

            var t1 = performance.now();
            console.log("Respuesta sifen - Envio de lote en ms " + (t1 - t0));

            res.status(200).json(sentResult);

        } catch (e) {
            res.status(200).json({ status: false, message: String(e) });

        }
    }

});


// Procesa , genera y firma xml...enviar
router.post('/enviar', async function(req, res) {

    //recibir post data
    const payload = req.body;
    //generar xml ..
    let xmlContent = await generarXML(payload);

    if (xmlContent.status == false)
        res.status(200).json({ status: false, response: { message: xmlContent.message } })

    //firmar.. 
    let xmlSigned = await firmarXML(xmlContent.message);
    if (xmlSigned.status === false)
        res.status(200).json({ status: false, response: { message: xmlSigned.message } })

    let codigoInterno = payload.codigoInterno;

    let newentries = crearEntradaFacturaEnProceso([codigoInterno]);
    if (newentries.status) {
        let sentResult = await enviarDE(xmlSigned.message, { lote: newentries.lote });
        res.status(200).json(sentResult);
    } else res.status(200).json(newentries);


});




//Consultas

router.get('/consultar-ruc/:ruc', async function(req, res) {

    let ruc = req.params.ruc;



    const result = await consultarRUC(ruc);
    if (result.status === false)
        res.status(200).json({ status: false, response: { message: result.message } })
    else
        res.send(result)


});
router.get('/consultar-lote/:lote', async function(req, res) {

    let lote = req.params.lote;
    const result = await consultarLote(lote);
    res.status(200).json(result);

});



module.exports = router