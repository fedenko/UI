<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="utf-8">
    <title>HTML5 AJAX Contact Form</title>
    <link href="css/style.css" media="screen" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js"></script>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="js/main.js"></script>
     <!--[if lt IE 9]>
    <link href="css/ie.css" media="screen" rel="stylesheet" type="text/css"/>
    <![endif]-->
    <style>
        body{
            background:#fafafa;
        }

        .wrapper{
            
            padding:36px;
            border:1px solid #ddd;
            border-radius:6px;
            -moz-border-radius:6px;
            -webkit-border-radius:6px;
            background:#fff;
            min-height:450px;
        }
       
    </style>
</head>
<body>

<?php include 'process-form.php'; ?>


<div class="wrapper clearfix">

    <div id="contact-wrapper" class="clearfix">

        <div class="form-wrapper clearfix">

            <h2>Contact Us</h2>

            <div class="message">
            <?php echo !empty($error_list) ? $error_list : ''; ?>
            </div>

            <form id="contact-form" action="" method="post">

                <fieldset>

                    <div class="field">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" autofocus required="required"
                               title="Your first and last name">
                    </div>

                    <div class="field" title="sadfsadf">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required="required" title="We will respond to this address">
                    </div>

                    <div class="field">
                        <label for="phone">Phone</label>
                        <input type="text" id="phone" name="phone" title="If you prefer a phone call">
                    </div>

                    <div class="field">
                        <label for="contact_reason">Contact Reason</label>
                        <select id="contact_reason" name="contact_reason" required="required"
                                title="Tell us how we can we help you">
                            <option></option>
                            <option>General Inquiry</option>
                            <option>Product Support</option>
                            <option>New Business</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div class="field">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" cols="15" rows="5" required="required"
                                ></textarea>
                    </div>

                    <div class="field submit">
                        <input type="submit" value="Submit"/>
                    </div>

                </fieldset>

            </form>
        </div>

        <div class="address-wrapper clearfix">
            <!-- This is the container for the map -->
            <div class="street-address">123 Imaginary St, Suite 200 <br/>Atlanta, GA 30314</div>
            <div id="map-outer">
                <div id="map">&nbsp;</div>
            </div>
            <a href="#" class="get-directions-button" rel="#map-overlay">Get Directions</a>
        </div>

    </div>
</div>

<span id="company-street-address"><?php echo $company_address;?></span>

</body>
</html>