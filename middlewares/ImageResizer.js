const download = require('image-downloader');
const path = require('path');
const fs = require('fs');
const resizeImg = require('resize-img');

module.exports = (req,res,next) => {
    let upload = path.extname(req.body.url);
    const cofig = {
        url: req.body.url,
        dest: './public/image/'
    };
    if(upload === '.jpeg' || upload === '.jpg' || upload ==='.png' || upload === '.bmp' ) {
        download.image(cofig)
            .then(({ photo }) => {
                resizeImg(
                    fs.readFileSync(photo),
                    {width: 50, height: 50}
                ).then(buf => {
                    let file = photo.split("\\").pop();
    
                    fs.writeFileSync("./public/images/thumbnails/" + file, buf);
                    res.json({
                        message : "Done"
                    });
                    next();
                })
            })
    } else {
        res.status(403);
        res.json ({
            Message : "invalid format"
        })
    }
};