const glob = require("glob")

try {
    entries = glob('src/pages/**/*.js', {sync: true})
} catch (err) {
    entries = []
    console.log('读取目录出错！')
    throw err
}


let pages = {}
let commonConfig = {
    template:'public/index.html',
}

entries.forEach(page=>{
    // let name = page.split('/')[2]
    var filename = page.substring(page.lastIndexOf('\/') + 1, page.lastIndexOf('.'))
    pages[filename] = {
        entry: page,
        filename: filename + '.html',
        // chunks: ['chunk-vendors', 'chunk-common', 'public_app', filename],
        ...commonConfig
    }
})

module.exports = pages
