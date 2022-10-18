
import smtplib
from email.message import EmailMessage


def send_email(email_from, email_to, subject, content):
    # Create an email
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = email_from
    msg['To'] = email_to
    msg.set_content(content)

    # Send the message
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login("p99bratislav@gmail.com", "mcuxiswrernudoan") # one time pwd - not sure where i got this
    s.send_message(msg)
    s.quit()