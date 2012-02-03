<?php

class Protector extends Config {

    public function __construct($post){
        parent::__constructor($post);

        $this->_formIsTrue();
        $this->regex();
    }


    private function _formIsTrue(){
        foreach($this->fields as $fieldName => $val){
            if(!array_key_exists($fieldName , $this->data)){
                $this->finish();
            }
        }
    }

    private function formIsTrue(){
        foreach($this->fields as $fieldName => $val){
            if(!array_key_exists($fieldName , $this->data)){
                if(IS_AJAX){
                    $this->fatality = true;
                    echo json_encode(false);
                }else{
                    exit ($this->msg['error']);
                }
            }
        }
    }
    
    /** Validations **/
    public function regex(){
        foreach($this->fields as $key => $field){
                 if(isset($this->data[$key])){
                    // Exemplo: returns !false. So, isValid(!false)
                    if(!is_null($field['regex'])){
                                // This is for ajax
                            $regex = (bool)preg_match("/{$field['regex']}/" , $this->data[$key]);
                           
                        if(!$regex){
                            $this->warning[] = $key;
                                // This is for non-ajax
                            $this->invalid[$key]['message'] = $field['message'];
                            $this->fatalError[] = !$regex;
                        }

                    /** PRE-DEFINED FUNCS **/
                    }elseif(!is_null($field['func'])){
                                $return = $this->_switch($field, $key);
                        if($return){
                            $this->warning[] = $key;
                                // This is for non-ajax
                            $this->invalid[$key]['message'] = $field['message'];
                            $this->fatalError[] = $return;
                            }
                        }
                    }
               }
        }
  
    private function _switch($field , $key){
        $return = false;
        if($field['func'] == 'notempty'){
               $return = (trim($this->data[$key]));
               $return = empty($return);
        }
        elseif($field['func'] == 'sec1'){
               $return = $this->data[$key] != $_SESSION['seccode'];
        }
        if($field['func'] == 'sec2'){
               $return = $this->data[$key] != 6;
        }
        elseif($field['func'] == 'numeric'){
                $return = (bool)!preg_match('/^\b[0-9]+\b$/' , $this->data[$key]);
        }
        elseif($field['func'] == 'alpha'){
                $return = (bool)!preg_match('/^\b[A-Za-z]+\b$/' , $this->data[$key]);
                
        }elseif($field['func'] == 'email'){
                $return = (bool)!preg_match('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/' , $this->data[$key]);
        }

        
        return $return;
    }



    public function finish(){
        $this->formIsTrue();
        if(IS_AJAX){
          if(self::hasFatalError($this->fatalError)){
                echo json_encode($this->warning);
                return false;
            }else {
              // If don't have errors, return a bool
                return true;
          }
          
          /** No ajax error **/
        }else{

          if(self::hasFatalError($this->fatalError)){
            echo "The following errors were found:\n<br /><ul>";
                foreach($this->invalid as $key => $val){
                    echo "<li>{$this->fields[$key]['name']}: {$val['message']}</li>";
                }
                echo '</ul>';
                return false;
            }else{
                return true;
            }
        
        }
      
    }


    static private function hasFatalError($data){
        return in_array(true , $data);
    }

    static private function fatality($data){
        return $data == true;
    }



}
?>
