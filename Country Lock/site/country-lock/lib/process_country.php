<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-us" lang="en-us">
  <head>
    <title>Country lock</title>
    
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Type" content="text/html" />
    
    <link href="data/css/uni-form.css" title="Default Style" media="screen" rel="stylesheet"/>
    <link href="data/css/main.css" title="Default Style" media="screen" rel="stylesheet"/>
    
    <script type="text/javascript" src="data/js/jquery.min.js"></script>
    <script src="data/js/uni-form-validation.jquery.js" type="text/javascript"></script>
  
    
    <!--[if lte ie 7]>
      <style type="text/css" media="screen">
        /* Move these to your IE6/7 specific stylesheet if possible */
        .uniForm, .uniForm fieldset, .uniForm .ctrlHolder, .uniForm .formHint, .uniForm .buttonHolder, .uniForm .ctrlHolder ul{ zoom:1; }
      </style>
    <![endif]-->
  </head>

  <body>

    <h1><img border=0 alt="Country lock" src="data/logo.png" /></h1>
    
    <form action="process_country.php" class="uniForm" method="get">
      <fieldset>
        <h3>Code generator</h3>
	    <?php
			// First we calculate the path of Country Lock.
			$path = realpath( dirname( __FILE__ ) );
			
			// Then we declare our variables.
			$countries = "";
			$type = strtolower( $_GET[ "type" ] );
			
			// We do some painstaking string $_GET logic.
			if ( $_GET[ "af" ] ) {
				$opt = "af";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "ar-sa" ] ) {
				$opt = "ar-sa";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "ar-iq" ] ) {
				$opt = "ar-iq";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "ar-eq" ] ) {
				$opt = "ar-eq";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "_zh" ] ) {
				$opt = "zh-tw/zh-cn/zh-hk/zh-sg";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "da" ] ) {
				$opt = "da";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "n" ] ) {
				$opt = "n";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "nl-be" ] ) {
				$opt = "nl-be";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "en-us" ] ) {
				$opt = "en-us";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "en-gb" ] ) {
				$opt = "en-gb";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "en-au" ] ) {
				$opt = "en-au";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "en-ca" ] ) {
				$opt = "en-ca";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "en-nz" ] ) {
				$opt = "en-nz";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "en-ie" ] ) {
				$opt = "en-ie";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "en-za" ] ) {
				$opt = "en-za";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "en-jm" ] ) {
				$opt = "en-jm";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "en" ] ) {
				$opt = "en";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "en-bz" ] ) {
				$opt = "en-bz";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "en-tt" ] ) {
				$opt = "en-tt";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "et" ] ) {
				$opt = "et";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "fi" ] ) {
				$opt = "fi";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "fr" ] ) {
				$opt = "fr";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "gd" ] ) {
				$opt = "gd";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "_de" ] ) {
				$opt = "de/de-ch/de-at/de-lu/de-li";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "e" ] ) {
				$opt = "e";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "ja" ] ) {
				$opt = "ja";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "ko" ] ) {
				$opt = "ko";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "pt-br" ] ) {
				$opt = "pt-br";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "pt" ] ) {
				$opt = "pt";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "_ru" ] ) {
				$opt = "ru/ru-mo";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "pt" ] ) {
				$opt = "pt";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "es-mx" ] ) {
				$opt = "es-mx";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "es" ] ) {
				$opt = "es";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "es-c" ] ) {
				$opt = "es-c";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "es-co" ] ) {
				$opt = "es-co";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "sv" ] ) {
				$opt = "sv";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "tr" ] ) {
				$opt = "tr";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "uk" ] ) {
				$opt = "uk";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "vi" ] ) {
				$opt = "vi";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "sr" ] ) {
				$opt = "sr";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "cs" ] ) {
				$opt = "cs";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "sk" ] ) {
				$opt = "sk";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "hu" ] ) {
				$opt = "hu";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "lv" ] ) {
				$opt = "lv";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "lt" ] ) {
				$opt = "lt";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "ur" ] ) {
				$opt = "ur";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "th" ] ) {
				$opt = "th";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "ts" ] ) {
				$opt = "ts";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			if ( $_GET[ "ro-mo" ] ) {
				$opt = "ro-mo";
				if( $countries != "" ) {
					$countries .= "/" . $opt;
				} else {
					$countries .= $opt;
				}
			}
			
			// We check if any textboxes were checked.
			if ( strlen( $countries ) >= 1 ) {
				// Generate our code.
				echo( "<div id='okMsg'> <p>" );
				echo( "<&#63;php \$type = '$type'; \$countries = '$countries'; include( '$path/core.php' ); &#63;>" );
				echo( "</p></div><p>Copy this php code to the top of every page you wish to block from the specified countries, if you want to protect another page, click <a href='../'>here</a>. If you need help installing this code, <a href='../documentation'>you can view the easy-to-understand documentation.</a>" );
			} else {
				// If not we tell Country Lock to error.
				$error = true;
			};
			if ( $error ) {
				//Here we error.
				echo( "It appears you have not selected any countries. <a href='../'>You can go back and try again by clicking here.</a>" );
			}
		?>
      </fieldset>
    </form>

    <div id="footer">
      <p><a href="../documentation"><img src="data/icn/information.png" border=0 /></a>&nbsp;<a href="admin"><img src="data/icn/database_gear.png" border=0 /></a></p>
    </div>

  </body>
</html>