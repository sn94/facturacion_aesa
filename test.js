const { enviarLoteDE, generarXML, firmarXML } = require("./FacturacionElectronica/DocumentoElectronico");


async function sendlote() {

    //2 datos de facturas para testear..Con los campos solicitados por la lib facturacionelectronicapy-xmlgen
    let dataFactura = [

        {
            "dataEmpresa": {
                "version": 150,
                "ruc": "80047317-5",
                "razonSocial": "A+E S.A.",
                "nombreFantasia": "A+E S.A.",
                "departamento": 8,
                "departamentoDescripcion": "ITAPUA",
                "actividadesEconomicas": [{
                    "codigo": 68100,
                    "descripcion": "ACTIVIDADES INMOBILIARIAS REALIZADAS CON BIENES PROPIOS O ARRENDADOS"
                }],
                "timbradoNumero": "80047317",
                "timbradoFecha": "2024-02-29",
                "tipoContribuyente": 2,
                "tipoRegimen": 8,
                "establecimientos": [{
                    "denominacion": "MATRIZ",
                    "codigo": "001",
                    "numeroCasa": 0,
                    "departamento": 8,
                    "departamentoDescripcion": "ITAPUA",
                    "distrito": 87,
                    "distritoDescripcion": "ENCARNACION",
                    "ciudad": 2275,
                    "ciudadDescripcion": "SAN JUAN DEL PARANA",
                    "barrio": "",
                    "barrioDescripcion": "",
                    "direccion": "CALLE, AVDA FULGENCIO YEGROS",
                    "telefono": "(021)7285400",
                    "email": "info@aguavista.com.py"
                }]
            },
            "documento": {
                "tipoDocumento": 1,
                "establecimiento": "001",
                "codigoSeguridadAleatorio": "204814000",
                "punto": "001",
                "numero": "0045656",
                "descripcion": "",
                "observacion": "",
                "fecha": "2024-03-08T00:00:00",
                "tipoEmision": 1,
                "tipoTransaccion": 3,
                "tipoImpuesto": 1,
                "moneda": "PYG",
                "condicionAnticipo": 1,
                "condicionTipoCambio": 1,
                "descuentoGlobal": 0,
                "anticipoGlobal": 0,
                "cambio": 0,
                "cliente": {
                    "contribuyente": false,
                    "ruc": null,
                    "razonSocial": "NORA EMMA PEREZ",
                    "nombreFantasia": null,
                    "tipoOperacion": 2,
                    "direccion": null,
                    "numeroCasa": "0",
                    "departamento": 1,
                    "departamentoDescripcion": null,
                    "distrito": 1,
                    "distritoDescripcion": null,
                    "ciudad": 1,
                    "ciudadDescripcion": null,
                    "pais": "PRY",
                    "paisDescripcion": "Paraguay",
                    "tipoContribuyente": 1,
                    "documentoTipo": 1,
                    "documentoNumero": "10267917",
                    "telefono": null,
                    "celular": null,
                    "email": null,
                    "codigo": "000000000002019"
                },
                "usuario": {
                    "documentoTipo": 1,
                    "documentoNumero": "4747132",
                    "nombre": "SONIA TOLEDO",
                    "cargo": "CAJERO"
                },
                "complementarios": {
                    "ordenCompra": "",
                    "ordenVenta": "",
                    "numeroAsiento": "",
                    "carga": {
                        "ordenCompra": "",
                        "ordenVenta": "",
                        "numeroAsiento": ""
                    }
                },
                "condicion": {
                    "tipo": 2,
                    "entregas": [{
                        "tipo": 1,
                        "tipoDescripcion": "Efectivo",
                        "monto": 0,
                        "moneda": "PYG",
                        "cambio": 0
                    }],
                    "credito": {
                        "tipo": 1,
                        "plazo": "30 dias"
                    }
                },
                "items": [{
                        "codigo": "GTO0005",
                        "descripcion": "SERVICIO DE INTERNET sep/23 09/12 L:50A(9) m2: 1000.00",
                        "observacion": "SERVICIO DE INTERNET sep/23 09/12 L:50A(9) m2: 1000.00",
                        "unidadMedida": 77,
                        "cantidad": 1,
                        "precioUnitario": "165000.000000",
                        "cambio": 0,
                        "descuento": 0,
                        "anticipo": 0,
                        "pais": "PRY",
                        "paisDescripcion": "Paraguay",
                        "ivaTipo": 1,
                        "ivaBase": 100,
                        "iva": 10
                    },
                    {
                        "codigo": "GTO0006",
                        "descripcion": "RECOLECCION DE BASURA sep/23 09/12 L:50A(9) m2: 1000.00",
                        "observacion": "RECOLECCION DE BASURA sep/23 09/12 L:50A(9) m2: 1000.00",
                        "unidadMedida": 77,
                        "cantidad": 1,
                        "precioUnitario": "50000.000000",
                        "cambio": 0,
                        "descuento": 0,
                        "anticipo": 0,
                        "pais": "PRY",
                        "paisDescripcion": "Paraguay",
                        "ivaTipo": 1,
                        "ivaBase": 100,
                        "iva": 10
                    },
                    {
                        "codigo": "GTO0004",
                        "descripcion": "AGUA CORRIENTE sep/23 09/12 L:50A(9) m2: 100 Ant:2303 Act:2328 - agosto",
                        "observacion": "AGUA CORRIENTE sep/23 09/12 L:50A(9) m2: 100 Ant:2303 Act:2328 - agosto",
                        "unidadMedida": 77,
                        "cantidad": 1,
                        "precioUnitario": "110000.000000",
                        "cambio": 0,
                        "descuento": 0,
                        "anticipo": 0,
                        "pais": "PRY",
                        "paisDescripcion": "Paraguay",
                        "ivaTipo": 1,
                        "ivaBase": 100,
                        "iva": 10
                    },
                    {
                        "codigo": "GTO0003",
                        "descripcion": "ENERGIA ELECTRICA sep/23 09/12 L:50A(9) m2: 100 Ant:38165 Act:38622 - agosto",
                        "observacion": "ENERGIA ELECTRICA sep/23 09/12 L:50A(9) m2: 100 Ant:38165 Act:38622 - agosto",
                        "unidadMedida": 77,
                        "cantidad": 1,
                        "precioUnitario": "228500.000000",
                        "cambio": 0,
                        "descuento": 0,
                        "anticipo": 0,
                        "pais": "PRY",
                        "paisDescripcion": "Paraguay",
                        "ivaTipo": 1,
                        "ivaBase": 100,
                        "iva": 10
                    }
                ],
                "factura": {
                    "presencia": 2,
                    "fechaEnvio": null
                }
            },
            "codigoInterno": 204814
        },


        {
            "dataEmpresa": {
                "version": 150,
                "ruc": "80047317-5",
                "razonSocial": "A+E S.A.",
                "nombreFantasia": "A+E S.A.",
                "departamento": 8,
                "departamentoDescripcion": "ITAPUA",
                "actividadesEconomicas": [{
                    "codigo": 68100,
                    "descripcion": "ACTIVIDADES INMOBILIARIAS REALIZADAS CON BIENES PROPIOS O ARRENDADOS"
                }],
                "timbradoNumero": "80047317",
                "timbradoFecha": "2024-02-29",
                "tipoContribuyente": 2,
                "tipoRegimen": 8,
                "establecimientos": [{
                    "denominacion": "MATRIZ",
                    "codigo": "001",
                    "numeroCasa": 0,
                    "departamento": 8,
                    "departamentoDescripcion": "ITAPUA",
                    "distrito": 87,
                    "distritoDescripcion": "ENCARNACION",
                    "ciudad": 2275,
                    "ciudadDescripcion": "SAN JUAN DEL PARANA",
                    "barrio": "",
                    "barrioDescripcion": "",
                    "direccion": "CALLE, AVDA FULGENCIO YEGROS",
                    "telefono": "(021)7285400",
                    "email": "info@aguavista.com.py"
                }]
            },
            "documento": {
                "tipoDocumento": 1,
                "establecimiento": "001",
                "codigoSeguridadAleatorio": "213432000",
                "punto": "001",
                "numero": "0001527",
                "descripcion": "",
                "observacion": "",
                "fecha": "2024-03-08T00:00:00",
                "tipoEmision": 1,
                "tipoTransaccion": 3,
                "tipoImpuesto": 1,
                "moneda": "PYG",
                "condicionAnticipo": 1,
                "condicionTipoCambio": 1,
                "descuentoGlobal": 0,
                "anticipoGlobal": 0,
                "cambio": 0,
                "cliente": {
                    "contribuyente": true,
                    "ruc": "1007978-5",
                    "razonSocial": "ANDRES YOSHIKI NAGAMI SUSUKI",
                    "nombreFantasia": "ANDRES YOSHIKI NAGAMI SUSUKI",
                    "tipoOperacion": 2,
                    "direccion": null,
                    "numeroCasa": "0",
                    "departamento": 1,
                    "departamentoDescripcion": null,
                    "distrito": 1,
                    "distritoDescripcion": null,
                    "ciudad": 1,
                    "ciudadDescripcion": null,
                    "pais": "PRY",
                    "paisDescripcion": "Paraguay",
                    "tipoContribuyente": 1,
                    "documentoTipo": null,
                    "documentoNumero": null,
                    "telefono": null,
                    "celular": null,
                    "email": null,
                    "codigo": "000000000000458"
                },
                "usuario": {
                    "documentoTipo": 1,
                    "documentoNumero": "4747132",
                    "nombre": "SONIA TOLEDO",
                    "cargo": "CAJERO"
                },
                "complementarios": {
                    "ordenCompra": "",
                    "ordenVenta": "",
                    "numeroAsiento": "",
                    "carga": {
                        "ordenCompra": "",
                        "ordenVenta": "",
                        "numeroAsiento": ""
                    }
                },
                "condicion": {
                    "tipo": 2,
                    "entregas": [{
                        "tipo": 1,
                        "tipoDescripcion": "Efectivo",
                        "monto": 0,
                        "moneda": "PYG",
                        "cambio": 0
                    }],
                    "credito": {
                        "tipo": 1,
                        "plazo": "30 dias"
                    }
                },
                "items": [{
                        "codigo": "A00938",
                        "descripcion": "MUNICH CHOPP VASO",
                        "observacion": "MUNICH CHOPP VASO",
                        "unidadMedida": 77,
                        "cantidad": 1,
                        "precioUnitario": "8000.000000",
                        "cambio": 0,
                        "descuento": 0,
                        "anticipo": 0,
                        "pais": "PRY",
                        "paisDescripcion": "Paraguay",
                        "ivaTipo": 1,
                        "ivaBase": 100,
                        "iva": 10
                    },
                    {
                        "codigo": "A02363",
                        "descripcion": "Tragos Clasico Floresta",
                        "observacion": "Tragos Clasico Floresta",
                        "unidadMedida": 77,
                        "cantidad": 1,
                        "precioUnitario": "50000.000000",
                        "cambio": 0,
                        "descuento": 0,
                        "anticipo": 0,
                        "pais": "PRY",
                        "paisDescripcion": "Paraguay",
                        "ivaTipo": 1,
                        "ivaBase": 100,
                        "iva": 10
                    },
                    {
                        "codigo": "A00708",
                        "descripcion": "AGUA KING SIN GAS 500 ML",
                        "observacion": "AGUA KING SIN GAS 500 ML",
                        "unidadMedida": 77,
                        "cantidad": 1,
                        "precioUnitario": "5000.000000",
                        "cambio": 0,
                        "descuento": 0,
                        "anticipo": 0,
                        "pais": "PRY",
                        "paisDescripcion": "Paraguay",
                        "ivaTipo": 1,
                        "ivaBase": 100,
                        "iva": 10
                    }
                ],
                "factura": {
                    "presencia": 2,
                    "fechaEnvio": null
                }
            },
            "codigoInterno": 213432
        }
    ];

    let xmls = [];
    //generar xml 
    for (let i = 0; i < dataFactura.length; i++) {
        let resultGenXml = await generarXML(dataFactura[i]);
        if (resultGenXml.status == false)
            console.log(JSON.stringify(resultGenXml, null, 4));
        else {
            //firma
            const resultFirma = await firmarXML(resultGenXml['message']);
            if (resultFirma.status == false)
                console.log(JSON.stringify(resultFirma, null, 4));
            else xmls.push(resultFirma['message']);

        }
    }
    //enviar en un lote ..
    //recibe un arreglo de los xmls firmados
    const resultEnvio = await enviarLoteDE(xmls);

    console.log(JSON.stringify(resultEnvio, null, 4));


}



sendlote();