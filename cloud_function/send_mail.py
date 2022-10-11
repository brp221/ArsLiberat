
import smtplib
from email.message import EmailMessage

# Create an email
msg = EmailMessage()
msg['Subject'] = 'An Example Subject'
msg['From'] = "p99bratislav@gmail.com"
msg['To'] = "brp221@lehigh.edu"
msg.set_content("Hi, this is an email.")

# Send the message
s = smtplib.SMTP('smtp.gmail.com', 587)
s.starttls()
s.login("p99bratislav@gmail.com", "mcuxiswrernudoan") # one time pwd
s.send_message(msg)
s.quit()