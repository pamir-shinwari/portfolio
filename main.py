from flask import Flask, render_template, redirect, url_for
from flask_bootstrap import Bootstrap5
import smtplib
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, EmailField, DateField, URLField, TextAreaField
from wtforms.validators import DataRequired, length
from flask_ckeditor import CKEditor, CKEditorField
import os


app = Flask(__name__)
bootstrap = Bootstrap5(app)
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")

MY_EMAIL = os.environ.get("MY_EMAIL")
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
            connection.login(MY_EMAIL, PASSWORD)
            connection.sendmail(
                from_addr=MY_EMAIL,
                to_addrs=MY_EMAIL,
                msg=f"Subject:Email From Portfolio !\n\n Name: {name} \n Email Address: {from_email} \n\n {message}"
            )
        return render_template('email_confirmation.html')
    return render_template('index.html', form=form)


if __name__ == '__main__':
    app.run(debug=True, port=5003)
