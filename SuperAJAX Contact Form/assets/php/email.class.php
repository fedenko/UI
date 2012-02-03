<?php

define('IS_AJAX', isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');
class Email extends Protector {

    public function init(){


          if($this->finish()){
                $mail = $this->phpmailer();
                $mail = new PHPMailer(true);
                $mail->IsHTML(true);

                 try{
                $mail->Body = $this->body();
                $mail->Subject = $this->subject();
                $mail->From = $this->from('email');
                $mail->FromName = $this->from('name');
                $mail->AddReplyTo($this->from('email'));

                /** SMTP OPTIONS **/

                if($this->Config->smtp['use'] != 'no'){
                    $mail->IsSMTP();
                    $mail->Host = $this->Config->smtp['host'];
                    $mail->Port = $this->Config->smtp['port'];
                    $mail->SMTPSecure = $this->Config->smtp['secure'];
                    if($this->Config->smtp['auth'] != 'no'){
                        $mail->SMTPAuth = true;
                        $mail->Username = $this->Config->smtp['username'];
                        $mail->Password = $this->Config->smtp['password'];
                    }
                }
                // Adds Addresses

                    foreach($this->Config->Address as $Address){
                        if(!empty($Address))
                            $mail->AddAddress($Address);
                    }

                // Adds cc
                    foreach($this->Config->Cc as $Address){
                        if(!empty($Address))
                            $mail->AddCC($Address);
                    }


                $mail->CharSet = $this->Config->charset;
                $email = $mail->Send();
                if($email){
                   if(IS_AJAX)
                    echo json_encode(true);
                   else
                    echo $this->msg['success'];
                }
            }catch(Exception $e){
                   if(IS_AJAX)
                    echo json_encode(false);
                   else
                    echo $this->msg['error'];
            }

         }

    }
    public function __constructor($post){
        parent::__construct($post);
    }
    private function phpmailer(){
        include_once 'phpmailer' . DS . 'class.phpmailer.php';
        return new PHPMailer();
    }

    public function body(){
        $body = "<h3 style=\"color:#0066CC;border-bottom:1px solid #0066CC;\">Details</h3>\n";
        foreach($this->data as $key => $val){
          if($this->fields[$key]['func'] != 'sec1'){
              if($this->fields[$key]['func'] != 'sec2'){
                    $field = $this->fields[$key]['name'];
                    $body .= "        <strong>{$field}: </strong>{$val}<br />";
              }
        }
    }
       return $body;

}

    public function subject(){
        foreach($this->fields as $key => $val){
            if(isset($this->fields[$key]['is']) && $this->fields[$key]['is'] == 'subject')
                return $this->data[$key];
        }
    }

    public function from($a){
        foreach($this->fields as $key => $val){
         if($a == 'email'){
            if(isset($this->fields[$key]['is']) && $this->fields[$key]['is'] == 'email')
                return $this->data[$key];
         }else{
            if(isset($this->fields[$key]['is']) && $this->fields[$key]['is'] == 'name')
                return $this->data[$key];
         }
        }
    }


    // Se enviar com sucesso entao grava uma sessao e checa, para o caso do cara nao ficar dando F5
}
?>