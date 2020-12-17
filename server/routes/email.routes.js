const transporter = require('../configs/nodemailer.config')
const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {

    // const { owner, email, message } = req.body

    const room = req.body[0]

    const hour = req.body[1]

    const day = req.body[2]

    const month = req.body[3]

    const year = req.body[4]

    const members = req.body[5]

    const local = req.body[6]
    
    const subject = "reserva"
    
    let message = ` Tienes una reserva el ${day}/${month}/${year} a las ${hour} en ${local.name}. 
    La direccion es ${local.address}
    Te esperamos!!! !!
    
    `
    console.log("EL LOCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL", req.body)
    


    
    members.map(elm =>

        transporter
            .sendMail({
                from: '"Localator" <info.localator@gmail.com>',
                to: elm.memberMail,
                subject,
                text: message,
                html: `<bold>Hola ${elm.memberName}!${message}</bold><br><br><br>Podras cancelar la reserva en la web hasta 24h antes de la reserva. Pasado este tiempo, ponte en contacto con la sala ${local.telephone}`
            })

            .then((res) => (console.log(res)))
            .catch(error => console.log(error))
        


    )
})

module.exports = router