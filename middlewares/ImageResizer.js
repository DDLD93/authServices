const download = require('image-downloader');
const path = require('path');
const fs = require('fs');
const resizeImg = require('resize-img');


//image resizer function
module.exports = function imageResizer (req,res,next)  {

    let upload = path.extname(req.body.url);
    const cofig = {
        url: req.body.url,
        dest: './public/image/'
    };
    //checking support file format only jpeg,jpj,png ang bmp allowed
    if(upload === '.jpeg' || upload === '.jpg' || upload ==='.png' || upload === '.bmp' ) {
        download.image(cofig)
            .then(({ photo }) => {
                resizeImg(
                    //reading file and resizing to 50x50
                    fs.readFileSync(photo),
                    {width: 50, height: 50}
                ).then(buf => {
                    let file = photo.split("\\").pop();
                        //writing resized image to public 
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

