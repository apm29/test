const {InfluxDB} = require('@influxdata/influxdb-client')

// You can generate an API token from the "API Tokens Tab" in the UI
const token = 'ajO_KP_yu7N_nTfY_rTwFrxoFsSo6pNEAtuIT6oNG7-4LmX744ESupYyxEMqR2b6hre3OBLrGnfkvkeikyyGfg=='
const org = 'atcc'
const bucket = '3fc_cf_sbzt'

const client = new InfluxDB({url: 'http://atcc-influxdb.autopaddle.com', token: token})

const queryApi = client.getQueryApi(org)

const query = `from(bucket: "3fc_cf_sbzt") |> range(start: -1h)`
queryApi.queryRows(query, {
  next(row, tableMeta) {
    const o = tableMeta.toObject(row)
    console.log(`${o._time} ${o._measurement}: ${o._field}=${o._value}`)
  },
  error(error) {
    console.error(error)
    console.log('Finished ERROR')
  },
  complete() {
    console.log('Finished SUCCESS')
  },
})
