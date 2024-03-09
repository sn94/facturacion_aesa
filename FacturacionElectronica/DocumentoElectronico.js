const path = require('path');
const xmlgen = require('facturacionelectronicapy-xmlgen');
const setApi = require('facturacionelectronicapy-setapi');
const xmlsign = require('facturacionelectronicapy-xmlsign');
const qrgen = require('facturacionelectronicapy-qrgen');


var env = 'test'


const credentials = {
    path: path.resolve(__dirname, "../certs/F1T_24921.p12"),
    key: '8OX%Rx2N'
};

async function generarXML(dataforxml) {

    try {

        const params = dataforxml.dataEmpresa ? dataforxml.dataEmpresa : {};
        //Data
        const receivedData = dataforxml.documento;
        const data = dataforxml.documento
        const options = {

        };

        //  return { status: true, message: { params, data } }
        const DATAXML = await xmlgen.default.generateXMLDE(params, data, options);
        return { status: true, message: DATAXML };
    } catch (er) {
        console.log(er)

        const { establecimiento, punto, numero } = dataforxml.documento;

        return {
            status: false,
            message: "Error para " + establecimiento + punto + numero + " " +
                String(er).split(".").join("\n")
        };
    }

}


async function firmarXML(xmlString) {

    try {

        let cert_path = credentials.path;
        let key = credentials.key;
        const xmlFirmado = await xmlsign.default.signXML(xmlString, cert_path, key);

        return { status: true, message: xmlFirmado };
    } catch (e) {
        return { status: false, message: String(e) };
    }
}



async function generarQR(xml) {
    try {
        let xmlSigned = xml;
        let idCSC1_test = '1';
        let CSC1_test = "ABCD0000000000000000000000000000";
        let idCSC2_test = 2;
        let CSC2_test = "EFGH000000000000000000000000000";

        let idCSC1_prod = '';
        let CSC1_prod = '';

        let idCSC = env == "test" ? idCSC1_test : idCSC1_prod;
        let CSC = env == "test" ? CSC1_test : CSC1_prod;


        const qrresult = await qrgen.default.generateQR(xmlSigned, idCSC, CSC, env);
        const gCamFuFD = /(<gCamFuFD>\s*.+\s*<\/gCamFuFD>)/.exec(qrresult);
        let gCamFuFDTag = '';
        if (gCamFuFD.length > 0) gCamFuFDTag = gCamFuFD[0].replace(/\s+/g, "");


        let pos = xml.indexOf("</rDE>");

        let xmlWithQr = xml.substr(0, pos) + gCamFuFDTag + xml.substr(pos);

        return { status: true, message: xmlWithQr };

    } catch (e) {
        return { status: false, message: String(e) };
    }

}
/*
 Retorna el DOCUMENTO XML CON QR 
 */
async function enviarDE(xmlSigned) {
    try {
        // env  "test" | "prod"
        //PKCS#12 MAC could not be verified. Invalid password?
        let cert_path = credentials.path;

        let key = credentials.key;
        let id = 1; //Identificador de envio, debe ser generado ..


        let result = await setApi.default
            .recibe(id, xmlSigned, env, cert_path, key); //recibe




        //codigo 0300 es OK
        let message = result['ns2:rRetEnviDe']['ns2:rProtDe'];
        return { status: message['ns2:dEstRes'] != "Rechazado", message: JSON.stringify(message['ns2:gResProc'], null, 4) + ' - Fecha de proceso: ' + message['ns2:dFecProc'] };


    } catch (e) {

        return { status: false, message: String(e) }
    }
}




//send lot
async function enviarLoteDE(xmlsigned) { //array
    try {

        // env  "test" | "prod"
        let cert_path = credentials.path;

        let key = credentials.key;
        let iden_envio = 1;

        let result = await setApi.default
            .recibeLote(iden_envio, xmlsigned, env, cert_path, key);
        //codigo 0300 es OK
        console.log(JSON.stringify(result, null, 4));
        let message = result['ns2:rResEnviLoteDe'];
        let ok = message['ns2:dCodRes'] == "0300";

        return { status: ok, message: "CodRes. " + message['ns2:dCodRes'] + " - " + message['ns2:dMsgRes'] + ' - Fecha de proceso: ' + message['ns2:dFecProc'] };

    } catch (e) { return { status: false, message: String(e) }; }
}






async function consultarRUC(ruc) {
    //Sin digito verificador...
    try {
        let id = 1;
        let cert_path = credentials.path;
        let key = credentials.key;
        const result = await setApi.default.consultaRUC(id, ruc, env, cert_path, key)

        return {
            status: result["ns2:rResEnviConsRUC"]["ns2:dCodRes"] == '0502',
            message: result
        };
    } catch (e) {
        return { status: false, message: String(e) };
    }
}


async function consultarLote(numeroLote) {
    try {
        let cert_path = credentials.path;
        let key = credentials.key;
        let id = 1;

        let resp = await setApi.default.consultaLote(id, numeroLote, env, cert_path, key);

        console.log("XML con QR", resp);
        return { status: true, message: resp };
    } catch (er) {
        console.log(er);
        return { status: false, message: String(er) };
    };

}








module.exports = {
    generarXML,
    firmarXML,
    generarQR,
    enviarDE,
    enviarLoteDE,
    consultarRUC,
    consultarLote
}