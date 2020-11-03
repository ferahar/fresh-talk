fs = require('fs');
const path = require('path')
const stylus = require('stylus');

const source = path.resolve(__dirname, 'src');
const destination = path.resolve(__dirname, 'dist');

try {
    if (!fs.existsSync(destination)){
        fs.mkdirSync(destination)
    }
} catch (err) {
    console.error(err)
}


function creatDist(source, destination) {
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
                    try {
                        fs.writeFileSync(`${dest}/${file.name}.css`, css, { flag: 'a+' })
                      } catch (err) {
                        console.error(err)
                      }
                    console.log("\x1b[32m", css);
                 });
            }
            
        }
        console.log("\x1b[0m", fileName);
    })
}

creatDist(source, destination)
