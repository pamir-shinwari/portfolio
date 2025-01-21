from flask import Flask, render_template, redirect, url_for
from flask_bootstrap import Bootstrap5
import smtplib
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, EmailField, DateField, URLField, TextAreaField
from wtforms.validators import DataRequired, length
from flask_ckeditor import CKEditor, CKEditorField
import os
from dotenv import load_dotenv

load_dotenv()


app = Flask(__name__)
bootstrap = Bootstrap5(app)
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")


my_email = os.environ.get("MY_EMAIL")
PASSWORD = os.environ.get("PASSWORD")


class ContactForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    email = EmailField('Email', validators=[DataRequired()])
    message = TextAreaField('Message', validators=[DataRequired()], )
    submit = SubmitField()


@app.route('/', methods=['POST', 'GET'])
def home():
    form = ContactForm()
    if form.validate_on_submit():
        name = form.name.data
        from_email = form.email.data
        message = form.message.data

        with smtplib.SMTP("smtp.gmail.com") as connection:
            connection.starttls()
            connection.login(my_email, PASSWORD)
            connection.sendmail(
                from_addr=my_email,
                to_addrs=my_email,
                msg=f"Subject:Email From Portfolio !\n\n Name: {name} \n Email Address: {from_email} \n\n {message}"
            )

        return render_template('email_confirmation.html')
    print(my_email)
    return render_template('index.html', form=form)


if __name__ == '__main__':
    app.run(debug=True, port=5002)
