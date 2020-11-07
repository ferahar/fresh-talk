fs = require('fs');
const path = require('path')
const stylus = require('stylus');

const source = path.resolve(__dirname, 'src');
const destination = path.resolve(__dirname, 'dist');
const styleFolder = path.resolve(__dirname, 'dist/style');


try {
    if (!fs.existsSync(destination)){
        fs.mkdirSync(destination)
        fs.mkdirSync(styleFolder)
    }
} catch (err) {
    console.error(err)
}


function creatDist(source, destination) {
    let styleContent = []
    fs.readdirSync(source).forEach(fileName => {
        const data = path.join(source, fileName)
        const dir = path.join(destination, fileName)
        if (fs.lstatSync(data).isDirectory()) {
            try {
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir)
                }
            } catch (err) {
                console.error(err)
            }
            creatDist(data, dir)    
        } else {
            const file = path.parse(data)
            const dest = path.parse(dir).dir
            if (file.ext.match(/(.html|.css)/gmi) !== null) {
                fs.copyFileSync(data, dir)
            } else if ( file.ext === '.styl' ) {
                const str = fs.readFileSync(data, 'utf8')
                stylus(str)
                  .set('filename', `build.css`)
                  .render(function(err, css){
                    if (err) throw err;
                    styleContent.push(css)
                    // try {
                    //     const fileStyl = `${styleFolder}\/index.css`
                    //     if (fs.existsSync( fileStyl )){
                    //         fs.appendFileSync(fileStyl, css, { flag: 'a+' })
                    //     } else {
                    //         fs.writeFileSync(fileStyl, content)
                    //     }
                        
                    // } catch (err) {
                    //     console.error(err)
                    // }
                    console.log("\x1b[32m", css);
                 });
            }
            
        }
        console.log("\x1b[0m", fileName);
    })
    try {
        const fileStyl = `${styleFolder}\/index.css`
        const content = styleContent.join('\n')
        fs.writeFileSync(fileStyl, content, { flag: 'a' })
    } catch (err) {
        console.error(err)
    }
}

creatDist(source, destination)
