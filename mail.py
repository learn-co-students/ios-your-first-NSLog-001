import sendgrid

sg = sendgrid.SendGridClient('app50439062@heroku.com', 'yankees87')

message = sendgrid.Mail()
message.add_to('John Doe ')
message.set_subject('Example')
message.set_text('Body')
message.set_from('Doe John ')
status, msg = sg.send(message)