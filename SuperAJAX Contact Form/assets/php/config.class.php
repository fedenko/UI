<?php
error_reporting(E_ALL);
        session_start();
function pr($str){
    echo '<pre>';
    print_r($str);
    echo '</pre>';
}
class Config {

    public function __constructor($post){

        $xml = file('../xml/fields.php');
        unset($xml[0]);
        $xml = implode("\n" , $xml);
        $xml = simplexml_load_string($xml);
        $fields = array();
        foreach($xml->Fields->field as $field){
            $aliasVal = (string)$field->alias;
            $name = isset($field['name']);
            $regex = isset($field['regex']);
            $func = isset($field['func']);
            $is = isset($field['is']);
            $message = isset($field['message']);
            
               $fields[$aliasVal]['name'] = (string)$field->name;

            if(isset($field->func))
               $fields[$aliasVal]['func'] = (string)$field->func;

            if(isset($field->regex))
               $fields[$aliasVal]['regex'] = (string)$field->regex;

            if(isset($field->message))
                $fields[$aliasVal]['message'] = (string)$field->message;

            if(isset($field->is))
                $fields[$aliasVal]['is'] = (string)$field->is;

        }
        $this->fields = $fields;
        $this->data = self::clean($post);

        $this->_defFields();




        $xml = file('../xml/config.php');
        unset($xml[0]);
        $xml = implode("\n" , $xml);
        $xml = simplexml_load_string($xml);


        $this->Config->Address = array();
        $this->Config->Cc = array();

        foreach($xml->Addresses->address as $address){


                    if(isset($address['on'])){

                        if($address['on'] == 'subject'){
                             if($this->subject() == $address['value']){
                                 $this->Config->Address[] = (string)$address;

                             }

                    }elseif($address['on'] == 'cc'){
                        $this->Config->Cc[] = (string)$address;
                    }
                }elseif(!isset($address['on'])){
                      $this->Config->Address[] = (string)$address;
                  }
              }

        $conf = $xml->Config;

        $this->Config->smtp['use'] =            (string)$conf->smtp->use;
        $this->Config->smtp['auth'] =           (string)$conf->smtp->auth;
        $this->Config->smtp['secure'] =         (string)$conf->smtp->secure;
        $this->Config->smtp['host'] =           (string)$conf->smtp->host;
        $this->Config->smtp['username'] =       (string)$conf->smtp->username;
        $this->Config->smtp['password'] =       (string)$conf->smtp->password;
        $this->Config->smtp['port'] =           (string)$conf->smtp->port;
        $this->Config->charset =                (string)$conf->charset;



    }




    /** Contain the result error message  **/
    public $invalid = array();

    /** Contain the result boolean **/
    public $warning = array();

    public $msg = array('error' => 'An error occurer and the message can\'t be sent!',
                        'success' => 'Email sent successfully!<br />Thank you for contacting us.'
                    );

    // Fatal error
    protected $fatalError = array();

    static private function clean($post){
        $re = array();
        foreach($post as $key => $data){
            $re[$key] = htmlspecialchars($data);
        }
        return $re;
    }

    private function _defFields(){
        $__defaults = array('name' => NULL, 'regex' => NULL,'func' => NULL, 'message' => NULL, 'is' => NULL);
        foreach($this->fields as $key => $val){
            $this->fields[$key] = array_merge($__defaults, $val);
        }
    }
}
?>
