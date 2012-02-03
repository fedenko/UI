<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>


        <style type="text/css">
            @import url('assets/css/contact.css');
            @import url('assets/css/lay.css');
        </style>
        <script type="text/javascript" src="assets/js/jquery.js"></script>
        <script type="text/javascript" src="assets/js/js.js"></script>
    </head>
    <body>
        <div id="contact">
            <div id="top">
                <h1>Super Ajax Contact Form</h1>
            </div>
            <div id="center">
        <div id="contact_form">
            <form method="post" action="assets/php/send.php" id="contactForm">
                <div class="error" id="error">An error occurer and the message can't be sent!</div>
                <div class="success" id="success">Email sent successfully!<br />Thank you for contacting us.</div>

                    <span class="input">
<label for="name">Name: </label>
<input  type="text" id="name" name="name" />
<div class="warning" id="nameError">This field can't stay empty</div>
</span>

<span class="input">
<label for="email">Email: </label>
<input  type="text" id="email" name="email" />
<div class="warning" id="emailError">Enter with a valid email!</div>
</span>

<span class="input">
<label for="phone">Phone: </label>
<input  type="text" id="phone" name="phone" />
<div class="warning" id="phoneError">Only digits are accepted!</div>
</span>

<span class="input">
<label for="sales">Sales: </label>
<select id="sales" name="sales">
<option value="Support">Support</option>
<option value="Sales">Sales</option>
<option value="Other">Other</option>
</select>
</span>

<span class="input">
<label for="message">Message: </label>
<textarea id="message" name="message"></textarea>
<div class="warning" id="messageError">This field can't stay empty</div>
</span>

<span class="input">
<label for="security_code">Security Code: </label>
<input class="noicon" type="text" id="security_code" name="security_code" style="width:100px" />
                      <img src="assets/php/security/1/sec.php" style="vertical-align:sub" />
<div class="warning" id="security_codeError">The security code is wrong!</div>
</span>
                    <span id="submit" class="input">
                    <label for="submit"></label>
                    <p id="ajax_loader" style="text-align:center;"><img src="assets/img/contact/ajax-loader.gif" /></p>
                    <input id="send" type="submit" value="SEND" />
                    </span>

                </form>
                </div>
            </div>
  
        </div>
    </body>
</html>
