const program = require('commander')
const CoinbasePro = require('coinbase-pro')
const config = require('./configuration')
const Historical = require('./src/historical')

const now = new Date()
const yesterday = new Date(now.getTime() - (24 * 60 * 60 * 1e3))

function toDate(val) {
    return new Date(val * 1e3)
}

program.version('1.0.0')
    .option('-i, --interval [interval]', 'Interval in seconds for candlestick', parseInt)
    .option('-p, --product [product]', 'Product identifier', 'BTC-GBP')
    .option('-s, --start [start]', 'Start time in unix seconds', toDate, yesterday)
    .option('-e, --end [end]', 'End time in unix seconds', toDate, now)
    .parse(process.argv)

const main = async function() {
    const { interval, product, start, end } = program
       
    const service = new Historical({ 
        start, 
        end, 
        interval, 
        product
    })
    
    const data = await service.getData()
    console.log(data);
    
}

main()
  