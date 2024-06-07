var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:  'safwene.essayes@ensi-uma.tn',
    pass: '14035265'
  }
});
/*var mailOptions = {
    from: 'safwene.essayes@ensi-uma.tn',
    to: 'safwene.essayes@ensi-uma.tn',
    subject: 'mail de confirmation',
    html: `<a href="http://localhost:8081/confirm/${activationCode}">cliquer ici</a>`

  };*/


//exporter la methode sendConfirmationEmail
module.exports.sendConfirmationEmail=(email,activationCode)=>{
    transporter.sendMail({
        from: 'safwene.essayes@ensi-uma.tn',
        to: 'safwene.essayes@ensi-uma.tn',
        subject: 'mail de confirmation',
        html: `<a href="http://localhost:8081/confirm/${activationCode}">cliquer ici</a>`
    
      }, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}

















