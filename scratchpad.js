const nodemailer = require('nodemailer');
const logger = require('morgan');
app.use(logger('dev'));

app.post('/send', (req,res) => {
    const output = 
    `<p>You have a new contact request</p>
    <h3> Contact Details </h3>
    <ul>
      <li>Email:${req.body.email} </li>
    </ul>
    <h3> Message</h3>
    <p><${req.body.message}/p>
    `;
  
  
    let transporter = nodemailer.createTransport({
      host: 'mail.google.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: process.env.REQUEST_EMAIL, // generated ethereal user
          pass: process.env.EMAIL_PSWRD, // generated ethereal password
      },
      tls: {
        rejectUnauthorized:false
      }
  });
  
  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Yo-Da 👻" <foo@example.com>', // sender address
      to: 'edoardo.paluan@hotmail.com, edoardo.paluan@hotmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
      res.render('contact', {msg: 'Email has been sent!'})
  })
  });







// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });  