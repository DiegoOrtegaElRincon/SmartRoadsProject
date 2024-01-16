// server side script fetching remote data and preparing report data source
const http = require('http');

// call remote http rest api
function fetchActiveElements() {
    return new Promise((resolve, reject) => {
        http.get('http://localhost:3000/activeelements/jsreport',
        (result) => {
            console.log(result)
            var str = '';
            result.on('data', (b) => str += b);
            result.on('error', reject);
            result.on('end', () => resolve(JSON.parse(str)));
        });
    })
}

// group the data for report
async function prepareDataSource() {
    const activeElements = await fetchActiveElements();
    console.log(activeElements)
    const elementsByType = activeElements.reduce((a, v) => {
        a[v.Type] = a[v.Type] || [];
        a[v.Type].push(v);
        return a;
    }, {});

    return Object.keys(elementsByType).map((type) => {
        const elementsInType = elementsByType[type];

        const accumulated = {}

        elementsInType.forEach((e) => {
            const key = e.Status
            accumulated[key] = accumulated[key] || {
                value: 0,
            };
            accumulated[key].value++;
        });

        return {
            rows: elementsInType,
            group: type, // Cambio realizado aquí
            accumulated
        };

    }).slice(0, 2)
}

// add jsreport hook which modifies the report input data
async function beforeRender(req, res) {
    req.data.activeElements = await prepareDataSource();
}
